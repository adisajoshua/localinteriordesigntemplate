import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, ArrowLeft, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';

interface AdminLoginModalProps {
  onSuccess: (token: string) => void;
  onBackToSite: () => void;
}

interface HealthResponse {
  ok?: boolean;
  kvConnected?: boolean;
  authInitialized?: boolean;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  onSuccess,
  onBackToSite,
}) => {
  const { data } = useSiteData();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [shakeError, setShakeError] = useState(false);
  const [showStarterHint, setShowStarterHint] = useState(false);
  const [kvConnected, setKvConnected] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/health', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((health: HealthResponse | null) => {
        if (!active || !health) return;
        setShowStarterHint(health.authInitialized === false);
        if (typeof health.kvConnected === 'boolean') {
          setKvConnected(health.kvConnected);
        }
      })
      .catch(() => {
        // Keep starter hint hidden if health endpoint is unreachable
      });
    return () => {
      active = false;
    };
  }, []);

  const triggerShake = (msg: string) => {
    setErrorMsg(msg);
    setShakeError(false);
    window.requestAnimationFrame(() => setShakeError(true));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = password.trim();
    if (!trimmed) {
      triggerShake('Please enter your studio password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password }),
      });

      const body = await res.json().catch(() => ({}));
      if (res.ok && body?.authenticated && typeof body.token === 'string') {
        sessionStorage.setItem('kenry_admin_token', body.token);
        onSuccess(body.token);
        return;
      }

      const message =
        typeof body?.error === 'string'
          ? body.error
          : res.status === 503
          ? 'Cloud storage is not connected yet. Bind SITE_DATA_KV in Cloudflare Pages settings.'
          : 'Incorrect studio password. Please try again.';
      triggerShake(message);
    } catch {
      triggerShake('Unable to reach authentication service. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-center items-center px-4 py-12 font-sans">
      <div
        className={`w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 ${
          shakeError ? 'animate-shake' : ''
        }`}
        onAnimationEnd={() => setShakeError(false)}
      >
        {/* Top Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-brand/20 border border-brand/40 flex items-center justify-center mx-auto text-brand">
            <Lock className="w-5 h-5" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-stone-400 font-semibold">
            {data.brand?.name || 'Executive Interior Studio'}
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-wide">
            Studio Admin Gateway
          </h1>
          <p className="text-xs text-stone-400">
            Enter your private studio password to manage projects, themes, and client inquiries.
          </p>
        </div>

        {kvConnected === false && (
          <div className="p-3 rounded-lg bg-amber-950/60 border border-amber-700/60 text-amber-200 text-xs flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <span>
              Cloud storage (`SITE_DATA_KV`) is not bound yet. Bind `SITE_DATA_KV` in Cloudflare Pages Settings &rarr; Bindings to enable live cloud saving.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="studio-login-password"
              className="block text-[11px] uppercase tracking-wider font-bold text-stone-300 mb-1.5"
            >
              Studio Password
            </label>
            <div className="relative">
              <input
                id="studio-login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter studio password"
                className="w-full bg-stone-950 border border-stone-700 focus:border-brand rounded-lg px-4 py-3 pr-11 text-sm text-white placeholder-stone-500 focus:outline-none transition-colors"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div
              role="alert"
              className="p-3 rounded-lg bg-red-950/70 border border-red-800 text-red-200 text-xs flex items-center space-x-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-2 bg-brand hover:bg-brand-hover text-white text-xs uppercase tracking-[0.2em] font-bold py-3.5 rounded-lg shadow-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Unlock Studio Admin</span>
              </>
            )}
          </button>
        </form>

        {showStarterHint && (
          <div className="p-3 rounded-lg bg-stone-950/80 border border-stone-800 text-center">
            <p className="text-[11px] text-stone-400">
              First-time setup starter password:{' '}
              <code className="text-stone-200 font-mono bg-stone-800 px-1.5 py-0.5 rounded">
                studio2026
              </code>
            </p>
          </div>
        )}

        <div className="pt-2 border-t border-stone-800 text-center">
          <button
            type="button"
            onClick={onBackToSite}
            className="inline-flex items-center space-x-1.5 text-xs text-stone-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </button>
        </div>
      </div>
    </div>
  );
};
