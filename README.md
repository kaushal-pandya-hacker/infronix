# INFRONIX WEB AGENCY — Smart QR Landing Page & QR Studio

Production-ready, white-label Smart QR Landing Page and High-Resolution QR Generation Engine built for **INFRONIX WEB AGENCY**.

---

## 1. Brand Identity & Requirements

- **Brand Name**: INFRONIX WEB AGENCY
- **Headline**: Let's Connect.
- **Subtitle**: Explore our digital presence and discover what we create.
- **Button 1**: `VISIT OUR WEBSITE` → [https://www.infronixweb.in/](https://www.infronixweb.in/)
- **Button 2**: `FOLLOW ON INSTAGRAM` → [https://www.instagram.com/infronixwebagency2026?vrfl=ODdvZ3l6N3d1Z3F2](https://www.instagram.com/infronixwebagency2026?vrfl=ODdvZ3l6N3d1Z3F2)
- **Palette**: Deep Navy (`#040914`), Elevated Midnight Slate (`#0B1528`), Electric Blue (`#0066FF`), and Cyber Cyan (`#00D4FF`).

---

## 2. Key Features

- **Strict URL Encoding**: The QR code encodes the **landing page URL** (`siteConfig.publishedUrl`), not the separate individual website or Instagram links, enabling single-scan access to the agency's full digital hub.
- **100% White-Label**: Zero third-party generator watermarks, zero redirects, zero third-party tracking scripts or cookie prompts.
- **Computer Vision Verification**: Uses `jsQR` to decode and verify generated QR codes against the expected URL in real time.
- **High Error Correction (Level H)**: Tolerates up to 30% visual obstruction, allowing the high-contrast Infronix emblem to be embedded at the center with 100% scan confidence.
- **Print & Digital Formats**:
  - Scalable Vector Graphics (**SVG**) for billboards, print flyers, and high-DPI business cards.
  - High-Resolution **PNG** (1024px, 2048px, 4096px).
  - Physical standee/table card layout with 1-click print support.
- **Hidden Admin QR Studio**: Accessible via `?admin=true` or discreet footer key so public visitors see only the clean, client-facing experience.
- **Digital Business Card**: 1-click `vCard (.vcf)` export for mobile contact saving.

---

## 3. Architecture Map

```
Infronix/
├── public/
│   ├── favicon.svg                   # Vector brand favicon
│   └── qr-exports/                   # Pre-compiled high-res QR files
│       ├── infronix-qr-dark.png      # Dark navy + electric blue PNG (1024px)
│       ├── infronix-qr-print.png     # High-contrast white paper PNG (1024px)
│       ├── infronix-qr-dark.svg      # Dark theme vector SVG
│       ├── infronix-qr-print.svg     # Print-ready vector SVG
│       └── infronix-qr-with-brand-badge.svg # Center-logo vector SVG
├── src/
│   ├── config/
│   │   └── siteConfig.ts             # MASTER CONFIGURATION FILE (Edit brand details here)
│   ├── types/
│   │   └── config.ts                 # TypeScript type definitions
│   ├── components/
│   │   ├── LandingPage.tsx           # Customer-facing dark navy & electric blue hub
│   │   ├── AdminQRStudio.tsx         # Hidden QR generator, scanner tester & export panel
│   │   └── BrandLogo.tsx             # Precision geometric SVG logo
│   ├── utils/
│   │   ├── qrGenerator.ts            # Client-side QR rendering & SVG builder
│   │   └── vcard.ts                  # vCard generator for mobile contact saving
│   ├── App.tsx                       # Root view switcher (Landing Page vs. Admin Studio)
│   ├── index.css                     # Tailwind CSS v4 styling & glow animations
│   └── main.tsx                      # Vite React entry point
├── scripts/
│   ├── verify-qr.mjs                 # Headless QR generation & jsQR decode tester
│   └── test-suite.mjs                # 27-point comprehensive automated production audit
├── netlify.toml                      # Netlify single-click deployment configuration
└── vercel.json                       # Vercel deployment & caching configuration
```

---

## 4. Customization Guide

All agency details are centralized in:
`src/config/siteConfig.ts`

```typescript
export const siteConfig: AgencyConfig = {
  name: 'INFRONIX WEB AGENCY',
  headline: "Let's Connect.",
  subtitle: 'Explore our digital presence and discover what we create.',
  publishedUrl: 'https://infronix-connect.vercel.app', // Landing page URL encoded in QR
  websiteUrl: 'https://www.infronixweb.in/',
  instagramUrl: 'https://www.instagram.com/infronixwebagency2026?vrfl=ODdvZ3l6N3d1Z3F2',
  colors: {
    background: '#040914',
    surface: '#0B1528',
    primary: '#0066FF',
    accent: '#00D4FF',
    // ...
  }
};
```

---

## 5. Development & Testing Commands

```bash
# Start local development server
npm run dev

# Generate production build
npm run build

# Preview production build locally
npm run preview

# Run automated computer vision QR verification test
npm run test:qr

# Run full 27-check production audit suite
npm run test:audit
```

---

## 6. Deployment Instructions

### Free Static Hosting Providers:

#### Option A: Vercel (Recommended)
1. Push this repository to GitHub or install Vercel CLI (`npm i -g vercel`).
2. Run `vercel` in the project root.
3. The included `vercel.json` automatically configures Vite build and SPA routing.

#### Option B: Netlify
1. Connect repository in Netlify or run `netlify deploy --prod --dir=dist`.
2. The included `netlify.toml` handles the build and rewrite headers.

#### Option C: Cloudflare Pages / GitHub Pages
- **Build command**: `npm run build`
- **Build output directory**: `dist`
