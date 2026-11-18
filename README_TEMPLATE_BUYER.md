# The Executive Architectural Interior & Space Design Website System
### Complete Commercial Launch Guide & Setup Blueprint

Thank you for purchasing **The Executive Architectural Interior Website Template**. This codebase was built specifically for interior designers, architects, renovation practices, and false ceiling contractors who want a high-converting, high-luxury web presence without paying expensive monthly software subscriptions.

---

## ⚡ 1. 3-Minute Zero-Cost Deployment (Cloudflare Pages)

You do **NOT** need to pay for web hosting. This site is engineered to run on **Cloudflare Pages** with **100% free unlimited bandwidth** and automated SSL security certificates.

### Step 1: Upload to GitHub
1. Create a free account at [github.com](https://github.com).
2. Click **"New Repository"**, name it `my-interior-studio`, and set it to **Private** or **Public**.
3. Upload the contents of this template folder to your repository.

### Step 2: Connect to Cloudflare Pages
1. Create a free account at [cloudflare.com](https://cloudflare.com).
2. In the left navigation, click **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your GitHub repository.
4. Set the Build settings:
   * **Framework preset:** `Vite`
   * **Build command:** `npm run build`
   * **Build output directory:** `dist`
5. Click **"Save and Deploy"**. 
6. Within 60 seconds, your luxury website is live worldwide at `your-name.pages.dev`!

---

## 🎨 2. Using the Password-Protected Client Admin CMS (No Code Required)

To update photos, projects, theme colors, and contact information:

1. Open your live website in any browser.
2. Add **`/#admin`** or **`/admin`** to the end of the URL:
   * Example: `https://your-studio.pages.dev/#admin`
3. On your first visit, enter the starter password: **`studio2026`**
4. Inside the **Brand & Logo** tab, click **"Change Admin Password"** and complete the 3-field password update (*Current Password*, *New Password*, *Confirm New Password*) to lock the dashboard with your own secret password.

### Available Admin Sections:
* **Brand & Logo:** Upload your official studio logo, choose from **5 One-Click Luxury Theme Presets**, update brand name, tagline, address, social links, WhatsApp number, change your Admin Password, or export/restore a JSON backup.
* **Section Toggles:** Use 1-click checkboxes to turn off sections you don't need yet (e.g. hide Testimonials or Before & After if you're a new studio).
* **Before & After:** Upload your raw site photo and finished interior photo directly from your device.
* **Hero Slideshow (7):** Replace any of the 7 crossfading hero slides with photos of your own work.
* **Studio Narrative:** Edit your studio introduction, founding year, completed commissions count, and satisfaction percentage.
* **Projects Archive:** Add, edit, or delete projects across 6 interior categories (*Kitchen, Furnitures, POP Ceilings, Wardrobe, Lighting, Living room*).
* **Testimonials:** Add or edit client reviews and project quotes.

> **Automatic Photo Optimization:** Whenever you upload photos from your phone or camera, the built-in image compression engine automatically shrinks them to under 250KB WebP. Your website will always load at high speed.

---

## 🌐 3. Connecting Your Custom Domain (`.com`, `.ng`, or `.com.ng`)

1. In Cloudflare Pages, click on your project name.
2. Click the **"Custom domains"** tab.
3. Click **"Set up a custom domain"** and type your domain name (e.g., `studiointeriors.com.ng`).
4. Follow the on-screen instructions to verify your DNS records. Cloudflare automatically generates your free HTTPS security certificate.

---

## 🚀 4. Enabling Cloudflare Edge KV (Required for Live Cloud Saving & Password Updates)

To enable instant global multi-device synchronization and server-side password storage using Cloudflare's free Edge KV:

1. In your Cloudflare dashboard left sidebar, go to **Storage & Databases** > **KV**.
2. Click **Create namespace** and name it `SITE_DATA_KV`.
3. Go back to **Workers & Pages** > select your Pages project > **Settings** > **Bindings**.
4. Click **Add** > **KV namespace**:
   * **Variable name:** `SITE_DATA_KV`
   * **KV namespace:** Select `SITE_DATA_KV`
5. Click **Save**, then go to **Deployments** > click `...` on the latest deployment > **Retry deployment**.
6. You can verify your connection anytime by visiting `https://your-studio.pages.dev/api/health` (it will display `"kvConnected": true`).

---

## 🛠️ Need Assistance? Complimentary 20-Min Call or Done-For-You VIP Launch

* **Complimentary 20-Minute Setup & Admin Walkthrough Call:** Included with your purchase to help verify your setup or walk you through the admin panel.
* **Done-For-You 48-Hour VIP Launch (+₦50,000 Add-On | ₦75,000 Total):** Let **isalabs** handle domain connection, Cloudflare KV setup, logo/project uploads, and private password configuration for you.
* **Contact isalabs on WhatsApp:** **09030497063** ([https://wa.me/2349030497063](https://wa.me/2349030497063))
