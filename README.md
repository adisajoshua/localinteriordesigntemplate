# Executive Architectural Interior & Space Design Commercial Website Template

> A turnkey, high-converting digital product and client template engineered for interior design studios, architectural renovation practices, and bespoke POP false ceiling contractors. Built with modern React, TypeScript, Tailwind CSS, in-browser WebP image optimization, and zero-server Cloudflare Pages Edge persistence.

---

## 🌟 Key Architecture & Highlights

* **Luxury Editorial Design:** Typography driven by *Cormorant Garamond* (Editorial Serif), *Plus Jakarta Sans* (Clean Body), and *Caveat* (Script Accents).
* **Multi-Project Before & After Split-Slider:** Interactive split-screen comparison slider with drag physics for both mouse and touch, featuring left/right navigation arrows, live counters, and active project toggles.
* **Mobile-First Client Admin CMS (`/#admin`):**
  * Fully responsive mobile layout with horizontal swipeable pill navigation and a full-screen drawer menu.
  * Upload photos directly from phone/laptop with automatic client-side WebP compression (<250KB).
  * Section visibility toggles: turn on/off Before & After, Testimonials, Stats Strip, and Google Maps.
  * Full Brand & About management: direct logo upload, WhatsApp phone link, address, founder story, and metrics.
* **Zero-Server Backend (Cloudflare Pages + Edge KV):**
  * Serverless persistence at `/functions/api/site-data.ts`.
  * Free tier: 100,000 reads/day, 1,000 writes/day, 0 cost forever with no sleeping databases.
* **Automated WhatsApp Consultation Modal:** Pre-populates lead inquiries with property type, project scope, budget range, and city directly into the contractor's WhatsApp.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Access the Public Site
http://localhost:5173/

# 4. Access the Client Admin CMS
http://localhost:5173/#admin
```

---

## ☁️ 3-Minute Deployment to Cloudflare Pages

This website is engineered to run on **Cloudflare Pages** with **100% free unlimited bandwidth** and automated SSL security certificates.

1. Push this repository to GitHub.
2. Go to your [Cloudflare Dashboard](https://dash.cloudflare.com) > **Workers & Pages** > **Create application** > **Pages** tab.
3. Select **"Connect to Git"** and choose this repository.
4. Set Build Settings:
   * **Framework preset:** `Vite`
   * **Build command:** `npm run build`
   * **Build output directory:** `dist`
5. Click **"Save and Deploy"**.

### (Optional) Enabling Edge KV for Global Multi-Device Sync
1. In Cloudflare dashboard, go to **Workers & Pages** > **KV** and create a namespace named `SITE_DATA`.
2. In your Pages project settings, go to **Settings** > **Functions** > **KV namespace bindings** and add a binding named `SITE_DATA` pointing to your KV namespace.
3. Click **Save and Deploy**.

---

## 📦 Tech Stack

* **Framework:** React 18, Vite 6, TypeScript 5
* **Styling:** Tailwind CSS, PostCSS, Autoprefixer
* **Icons:** Lucide React
* **Image Compression:** Browser-native HTML5 Canvas WebP Engine
* **Deployment & Edge Functions:** Cloudflare Pages & Pages Functions

---

## 📄 License & Distribution
Commercial template codebase designed for productized agency setups and digital product distribution.
