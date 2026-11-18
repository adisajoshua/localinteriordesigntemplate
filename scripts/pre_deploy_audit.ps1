param(
  [switch]$SkipFrontendTypecheck
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$RepoRoot = Split-Path -Parent $PSScriptRoot
$Failures = New-Object System.Collections.Generic.List[string]

function Write-Pass {
  param([string]$Message)
  Write-Host "[PASS] $Message" -ForegroundColor Green
}

function Write-Info {
  param([string]$Message)
  Write-Host "[INFO] $Message" -ForegroundColor Cyan
}

function Write-Warn {
  param([string]$Message)
  Write-Host "[WARN] $Message" -ForegroundColor Yellow
}

function Add-Failure {
  param([string]$Message)
  Write-Host "[FAIL] $Message" -ForegroundColor Red
  $Failures.Add($Message)
}

function Invoke-NativeCommand {
  param(
    [string]$Executable,
    [string[]]$Arguments
  )
  $prevPref = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  try {
    $output = & $Executable @Arguments 2>&1
    $exitCode = $LASTEXITCODE
    return [PSCustomObject]@{
      ExitCode = $exitCode
      Output   = ($output | ForEach-Object { $_.ToString() }) -join "`n"
    }
  } finally {
    $ErrorActionPreference = $prevPref
  }
}

function Assert-ZeroGrepMatches {
  param(
    [string]$Label,
    [string[]]$GitGrepArgs
  )
  $effectiveArgs = if ($GitGrepArgs -contains '--no-index') {
    $GitGrepArgs
  } else {
    @('--untracked') + $GitGrepArgs
  }
  $res = Invoke-NativeCommand -Executable 'git' -Arguments (@('grep') + $effectiveArgs)
  if ($res.ExitCode -eq 1) {
    Write-Pass "$Label (0 matches)"
  } elseif ($res.ExitCode -eq 0) {
    Write-Host $res.Output
    Add-Failure "$Label found forbidden matches"
  } else {
    Write-Host $res.Output
    Add-Failure "$Label failed to run (git grep exit $($res.ExitCode))"
  }
}

Push-Location $RepoRoot
try {
  Write-Host "=== Kenry Interiors TPA Pre-Deploy Audit ===" -ForegroundColor White

  # 1. TypeScript Strict Check (Gate 6)
  if (-not (Test-Path 'tsconfig.json')) {
    Add-Failure 'Missing tsconfig.json'
  } elseif ($SkipFrontendTypecheck) {
    Write-Warn 'Frontend tsc skipped via -SkipFrontendTypecheck (M1 interim mode only; NOT valid for release)'
  } else {
    $tscFront = Invoke-NativeCommand -Executable 'npx' -Arguments @('tsc', '--noEmit', '-p', 'tsconfig.json')
    if ($tscFront.ExitCode -eq 0) {
      Write-Pass 'Frontend TypeScript check (tsconfig.json)'
    } else {
      Write-Host $tscFront.Output
      Add-Failure "Frontend TypeScript check failed (exit $($tscFront.ExitCode))"
    }
  }

  if (-not (Test-Path 'functions/tsconfig.json')) {
    Add-Failure 'Missing functions/tsconfig.json'
  } else {
    $tscFunc = Invoke-NativeCommand -Executable 'npx' -Arguments @('tsc', '--noEmit', '-p', 'functions/tsconfig.json')
    if ($tscFunc.ExitCode -eq 0) {
      Write-Pass 'Functions TypeScript check (functions/tsconfig.json)'
    } else {
      Write-Host $tscFunc.Output
      Add-Failure "Functions TypeScript check failed (exit $($tscFunc.ExitCode))"
    }
  }

  # 2. Production Build (Gate 6)
  $buildRes = Invoke-NativeCommand -Executable 'npm' -Arguments @('run', 'build')
  if ($buildRes.ExitCode -eq 0 -and (Test-Path 'dist/index.html')) {
    Write-Pass 'Production build (npm run build -> dist/index.html)'
  } else {
    Write-Host $buildRes.Output
    Add-Failure "Production build failed (exit $($buildRes.ExitCode))"
  }

  # 3. Secret, Credential & Banned-Pattern Scans (Gates 3, 4, 14, 16)
  $clientSecretPattern = '(sk_live_|sk_test_|BEGIN PRIVATE KEY|\?passcode=|\?token=|\?key=|\?secret=|localStorage\.setItem\([^)]*unlocked|adminPassword|AUTH_SECRET|admin_auth_hash|admin_signing_secret|DEFAULT_STARTER_HASH)'
  Assert-ZeroGrepMatches -Label 'Gate 3 client source secret/boundary scan (src/)' -GitGrepArgs @('-inE', $clientSecretPattern, '--', 'src/')

  Assert-ZeroGrepMatches -Label 'Gate 3 client-side password check scan (src/)' -GitGrepArgs @('-inE', '(=== *[''"]studio2026[''"]|!== *[''"]studio2026[''"]|password *=== *[''"])', '--', 'src/')

  if (Test-Path 'dist') {
    Assert-ZeroGrepMatches -Label 'Gate 3 build bundle secret/boundary scan (dist/)' -GitGrepArgs @('--no-index', '-inE', $clientSecretPattern, '--', 'dist/')
  } else {
    Add-Failure 'dist/ directory missing for bundle scan'
  }

  Assert-ZeroGrepMatches -Label 'Gate 3/4 functions plaintext starter password scan (functions/)' -GitGrepArgs @('-inE', '[''"]studio2026[''"]', '--', 'functions/')
  Assert-ZeroGrepMatches -Label 'Gate 16 ephemeral new Map() scan (functions/)' -GitGrepArgs @('-inE', '\bnew\s+Map\s*\(', '--', 'functions/')
  Assert-ZeroGrepMatches -Label 'Banned code shortcut scan (TODO/FIXME/CHANGEME/REPLACE_ME)' -GitGrepArgs @('-inE', '\b(TODO|FIXME|CHANGEME|REPLACE_ME)\b', '--', 'src/', 'functions/')

  # 4. Supply Chain Vulnerability Defense (Gate 8)
  $prodAudit = Invoke-NativeCommand -Executable 'npm' -Arguments @('audit', '--omit=dev', '--audit-level=high')
  if ($prodAudit.ExitCode -eq 0) {
    Write-Pass 'Gate 8 production dependency audit (npm audit --omit=dev --audit-level=high)'
  } else {
    Write-Host $prodAudit.Output
    Add-Failure "Gate 8 production dependency audit failed (exit $($prodAudit.ExitCode))"
  }

  $devAudit = Invoke-NativeCommand -Executable 'npm' -Arguments @('audit', '--audit-level=high')
  if ($devAudit.ExitCode -eq 0) {
    Write-Info 'Full npm audit (including devDependencies): 0 high/critical vulnerabilities'
  } else {
    $summaryLine = ($devAudit.Output -split "`n" | Where-Object { $_ -match 'vulnerabilities' } | Select-Object -Last 1)
    Write-Info "Dev-dependency audit (non-blocking): $summaryLine"
  }

  # 5. Pure UTF-8 Byte Scan for U+FFFD (EF BF BD) (Gate 12)
  $utf8Targets = @()
  foreach ($dir in @('src', 'functions')) {
    if (Test-Path $dir) {
      $utf8Targets += Get-ChildItem -Path $dir -Recurse -File | Where-Object { $_.Extension -in @('.ts', '.tsx', '.js', '.jsx', '.css', '.json') }
    }
  }
  foreach ($singleFile in @('index.html', 'public/_routes.json', 'public/_redirects')) {
    if (Test-Path $singleFile) {
      $utf8Targets += Get-Item -LiteralPath $singleFile
    }
  }
  $badUtf8Files = New-Object System.Collections.Generic.List[string]
  foreach ($file in $utf8Targets) {
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    for ($i = 0; $i -lt ($bytes.Length - 2); $i++) {
      if ($bytes[$i] -eq 0xEF -and $bytes[$i + 1] -eq 0xBF -and $bytes[$i + 2] -eq 0xBD) {
        $badUtf8Files.Add($file.FullName.Substring($RepoRoot.Length + 1))
        break
      }
    }
  }
  if ($badUtf8Files.Count -eq 0) {
    Write-Pass 'Gate 12 UTF-8 encoding scan (0 U+FFFD replacement byte sequences)'
  } else {
    Add-Failure ("Gate 12 UTF-8 U+FFFD found in: " + ($badUtf8Files -join ', '))
  }

  # 6. Modular SRP & File Length Ceiling (Gate 7 + SPEC-2 + Global Rule 6)
  $legacyCaps = @{
    'src/components/Admin/AdminDashboard.tsx' = 1350
    'src/data/siteData.ts'                    = 520
    'src/components/FeaturedProjects.tsx'     = 420
  }
  $strictSpec2Files = @(
    'src/components/Admin/AdminLoginModal.tsx',
    'src/components/Admin/AdminSecurityCard.tsx'
  )

  $sourceFiles = Get-ChildItem -Path @('src', 'functions') -Recurse -File | Where-Object { $_.Extension -in @('.ts', '.tsx', '.js', '.jsx') }
  $lineViolations = New-Object System.Collections.Generic.List[string]
  foreach ($sf in $sourceFiles) {
    $rel = $sf.FullName.Substring($RepoRoot.Length + 1).Replace('\', '/')
    $lineCount = [System.IO.File]::ReadAllLines($sf.FullName).Length
    if ($strictSpec2Files -contains $rel) {
      if ($lineCount -ge 250) {
        $lineViolations.Add("$rel ($lineCount lines; limit < 250)")
      }
    } elseif ($legacyCaps.ContainsKey($rel)) {
      $cap = $legacyCaps[$rel]
      if ($lineCount -gt $cap) {
        $lineViolations.Add("$rel ($lineCount lines; legacy cap <= $cap)")
      } else {
        Write-Info "Gate 7 grandfathered legacy file: $rel ($lineCount / cap $cap lines)"
      }
    } else {
      if ($lineCount -gt 400) {
        $lineViolations.Add("$rel ($lineCount lines; limit <= 400)")
      }
    }
  }
  foreach ($spec2 in $strictSpec2Files) {
    if (-not (Test-Path $spec2)) {
      Write-Info "SPEC-2 component not yet present (M2): $spec2"
    }
  }
  if ($lineViolations.Count -eq 0) {
    Write-Pass 'Gate 7 SRP line-count limits satisfied'
  } else {
    Add-Failure ("Gate 7 line-count violations: " + ($lineViolations -join '; '))
  }

  # 7. Mandatory Global CSS Import (Gate 10)
  $mainContent = Get-Content -LiteralPath 'src/main.tsx' -Raw
  $cssContent = Get-Content -LiteralPath 'src/index.css' -Raw
  if (($mainContent -match "import\s+['""]\./index\.css['""]") -and ($cssContent -match '@tailwind\s+base')) {
    Write-Pass 'Gate 10 global CSS import verified (src/main.tsx -> ./index.css)'
  } else {
    Add-Failure 'Gate 10 global CSS import missing in src/main.tsx or @tailwind base missing in src/index.css'
  }

  # 8. Admin Isolation in Public Navigation & Footer (Gate 11)
  Assert-ZeroGrepMatches -Label 'Gate 11 public nav/footer admin link isolation' -GitGrepArgs @('-inE', '(href|to)\s*=\s*[''"]/?#?admin', '--', 'src/components/Navigation.tsx', 'src/components/Footer.tsx', 'src/components/Header.tsx')

  # 9. .gitignore Secret Isolation & Git Tracked Secrets Check (Gate 4)
  if (-not (Test-Path '.gitignore')) {
    Add-Failure 'Missing .gitignore'
  } else {
    $gitignoreLines = [System.IO.File]::ReadAllLines((Join-Path $RepoRoot '.gitignore')) | ForEach-Object { $_.Trim() }
    $requiredIgnoreRules = @('.env', '.env.*', '.dev.vars', '.env.deploy')
    $missingRules = @($requiredIgnoreRules | Where-Object { $gitignoreLines -notcontains $_ })
    if ($missingRules.Count -eq 0) {
      Write-Pass 'Gate 4 .gitignore secret rules verified (.env, .env.*, .dev.vars, .env.deploy)'
    } else {
      Add-Failure ('Gate 4 .gitignore missing required rules: ' + ($missingRules -join ', '))
    }
  }

  $trackedRes = Invoke-NativeCommand -Executable 'git' -Arguments @('ls-files')
  if ($trackedRes.ExitCode -eq 0) {
    $trackedSecrets = @(($trackedRes.Output -split "`n") | Where-Object {
      $t = $_.Trim()
      ($t -match '(^|/)\.env($|\.)' -and $t -notmatch '\.example$') -or
      ($t -match '(^|/)\.dev\.vars($|\.)') -or
      ($t -match '(^|/)\.wrangler(/|$)')
    })
    if ($trackedSecrets.Count -eq 0) {
      Write-Pass 'Gate 4 zero tracked secret/env files in git'
    } else {
      Add-Failure ('Gate 4 tracked secret files in git: ' + ($trackedSecrets -join ', '))
    }
  } else {
    Add-Failure 'git ls-files failed'
  }

  # 10. Gate 2 Static Firewall Files, _routes.json Schema & Public/Dist Stray Sensitive Files Check
  if (Test-Path 'functions/_middleware.ts') {
    Write-Pass 'Gate 2 static firewall middleware present (functions/_middleware.ts)'
  } else {
    Add-Failure 'Gate 2 static firewall middleware missing (functions/_middleware.ts)'
  }

  foreach ($routesPath in @('public/_routes.json', 'dist/_routes.json')) {
    if (-not (Test-Path $routesPath)) {
      Add-Failure "Gate 2 missing $routesPath"
      continue
    }
    try {
      $routesObj = (Get-Content -LiteralPath $routesPath -Raw -Encoding UTF8) | ConvertFrom-Json
      $versionProp = if ($null -ne $routesObj) { $routesObj.PSObject.Properties['version'] } else { $null }
      $includeProp = if ($null -ne $routesObj) { $routesObj.PSObject.Properties['include'] } else { $null }
      $hasVersion = ($null -ne $versionProp) -and ($versionProp.Value -eq 1)
      $hasWildcardInclude = ($null -ne $includeProp) -and (@($includeProp.Value) -contains '/*')
      if ($hasVersion -and $hasWildcardInclude) {
        Write-Pass "Gate 2 $routesPath schema valid (version=1, include contains /*)"
      } else {
        Add-Failure "Gate 2 $routesPath invalid (requires version -eq 1 and include containing '/*')"
      }
    } catch {
      Add-Failure "Gate 2 $routesPath failed JSON parse: $($_.Exception.Message)"
    }
  }

  $straySensitive = @()
  foreach ($staticDir in @('public', 'dist')) {
    if (Test-Path $staticDir) {
      $hits = @(Get-ChildItem -Path $staticDir -Force -Recurse -File | Where-Object {
        $_.Name -match '^\.(env|git)' -or $_.Extension -in @('.csv', '.log', '.bak', '.tmp', '.sh', '.sql')
      })
      foreach ($hit in $hits) {
        $straySensitive += $hit.FullName.Substring($RepoRoot.Length + 1).Replace('\', '/')
      }
    }
  }
  if ($straySensitive.Count -eq 0) {
    Write-Pass 'Gate 2 zero stray sensitive files in public/ or dist/'
  } else {
    Add-Failure ('Gate 2 stray sensitive files in public/ or dist/: ' + ($straySensitive -join ', '))
  }

  Write-Host ''
  if ($Failures.Count -gt 0) {
    Write-Host "AUDIT FAILED ($($Failures.Count) failure(s)):" -ForegroundColor Red
    foreach ($f in $Failures) {
      Write-Host "  - $f" -ForegroundColor Red
    }
    exit 1
  }

  Write-Host 'ALL PRE-DEPLOY AUDIT GATES PASSED.' -ForegroundColor Green
  exit 0
} finally {
  Pop-Location
}
