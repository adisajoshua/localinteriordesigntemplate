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

## 🎨 2. Using the Client Admin CMS (No Code Required)

To update photos, projects, prices, and contact information:

1. Open your live website in any browser.
2. Add **`/#admin`** or **`/admin`** to the end of the URL:
   * Example: `https://your-studio.pages.dev/#admin`
3. You will enter the **Client Admin CMS**.

### Available Admin Sections:
* **Brand Profile & Logo:** Upload your official studio logo file directly from your phone/computer. Update brand name, tagline, address, Instagram, and WhatsApp number.
* **Section Visibility Toggles:** Use 1-click checkboxes to turn off sections you don't need yet (e.g. hide Testimonials or Before & After if you're a new studio).
* **Before & After Project Transformation:** Upload your raw site photo and finished interior photo directly from your device. Edit the project headline and scope tags.
* **Hero Slideshow (7 Slides):** Replace any of the 7 crossfading hero slides with photos of your own work.
* **Studio Narrative & Metrics:** Edit your studio introduction, founding year, completed commissions count, and satisfaction percentage.
* **Projects Archive:** Add, edit, or delete projects across 6 interior categories (*Kitchen, Furnitures, POP Ceilings, Wardrobe, Lighting, Living room*).
* **Backup & Export:** Download an exact copy of your website data as a single JSON file.

> **Automatic Photo Optimization:** Whenever you upload photos from your phone or camera, the built-in image compression engine automatically shrinks them to under 250KB WebP. Your website will always load at high speed.

---

## 🌐 3. Connecting Your Custom Domain (`.com` or `.com.ng`)

1. In Cloudflare Pages, click on your project name.
2. Click the **"Custom domains"** tab.
3. Click **"Set up a custom domain"** and type your domain name (e.g., `studiointeriors.com`).
4. Follow the on-screen instructions to verify your DNS records. Cloudflare automatically generates your free HTTPS security certificate.

---

## 🚀 4. Enabling Cloudflare Edge KV (Optional Global Sync)

By default, edits made in your Admin are cached and saved immediately. To enable instant global multi-device synchronization using Cloudflare's free Edge KV:

1. In your Cloudflare dashboard, go to **Workers & Pages** > **KV**.
2. Click **Create Namespace** and name it `SITE_DATA`.
3. Go back to your Pages project > **Settings** > **Functions**.
4. Scroll down to **KV namespace bindings**, click **Add binding**:
   * **Variable name:** `SITE_DATA`
   * **KV namespace:** Select `SITE_DATA`
5. Click **Save and Deploy**. Your admin changes now instantly sync across every device in the world.

---

## 🛠️ Need Assistance? Done-For-You Launch Service

If you prefer not to touch GitHub, DNS, or deployment settings:
* We provide a **Done-For-You 48-Hour Launch Service**.
* We will connect your custom domain, set up Cloudflare, upload your first 10 projects, and configure your WhatsApp consultation buttons.
* **Book Setup on WhatsApp:** Contact us with your purchase receipt.
