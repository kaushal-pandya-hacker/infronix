import type { AgencyConfig } from '../types/config';

/**
 * =============================================================================
 * INFRONIX WEB AGENCY — MASTER CONFIGURATION FILE
 * =============================================================================
 * You can edit all brand details, URLs, headlines, color palettes, and default
 * QR generator settings here. Any changes made in this file automatically update
 * across the entire application without touching the components.
 */
export const siteConfig: AgencyConfig = {
  // Brand Identity
  name: 'INFRONIX WEB AGENCY',
  shortName: 'INFRONIX',
  tagline: 'Architects of Modern Digital Experiences',
  
  // Landing Page Display Text (As specified in requirement 2)
  headline: "Let's Connect.",
  subtitle: 'Explore our digital presence and discover what we create.',
  description: 'Premium web design, high-performance web applications, and modern digital ecosystems tailored for high-growth brands.',

  // URLs
  // Landing page published URL (Verified Production URL - Requirement 3)
  publishedUrl: 'https://kaushal-pandya-hacker.github.io/infronix/',
  websiteUrl: 'https://www.infronixweb.in/',
  instagramUrl: 'https://www.instagram.com/infronixwebagency2026?vrfl=ODdvZ3l6N3d1Z3F2',
  email: 'contact@infronixweb.in',
  location: 'India',

  // Brand Color Palette (Pure Monochrome Black & White)
  colors: {
    background: '#000000',     // Pure black obsidian
    surface: '#0D0D0D',        // Elevated dark card
    surfaceBorder: '#262626',  // Minimal border
    primary: '#FFFFFF',        // Pure white
    accent: '#A3A3A3',         // Subtle silver
    textMain: '#FFFFFF',       // Pure white text
    textMuted: '#A3A3A3',      // Muted silver text
  },

  // Primary Call-To-Action Links
  links: [
    {
      id: 'website',
      title: 'VISIT OUR WEBSITE',
      subtitle: 'infronixweb.in • Portfolio, Services & Solutions',
      url: 'https://www.infronixweb.in/',
      type: 'website',
      primary: true,
      featured: true,
      badge: 'Official Site',
    },
    {
      id: 'instagram',
      title: 'FOLLOW ON INSTAGRAM',
      subtitle: '@infronixwebagency2026 • Behind the scenes & designs',
      url: 'https://www.instagram.com/infronixwebagency2026?vrfl=ODdvZ3l6N3d1Z3F2',
      type: 'instagram',
      primary: false,
      featured: true,
      badge: 'Social Hub',
    },
  ],

  // QR Code Generation Parameters
  qrSettings: {
    defaultFormat: 'png',
    errorCorrectionLevel: 'H', // 30% recovery - industry standard for logo embedding
    dotColor: '#0066FF',       // Electric blue
    cornerColor: '#00D4FF',    // Cyber cyan
    backgroundColor: '#040914', // Matching dark navy
    includeLogo: true,
    size: 1024,                // High-resolution for print quality
  },

  // SEO & OpenGraph Meta
  meta: {
    title: 'INFRONIX WEB AGENCY | Let’s Connect',
    description: 'Connect with Infronix Web Agency. Visit our official website and follow our creative digital journey on Instagram.',
    keywords: [
      'Infronix',
      'Infronix Web Agency',
      'Web Development Agency',
      'UI/UX Design',
      'Smart QR Landing Page',
    ],
    author: 'Infronix Web Agency',
  },
};

export default siteConfig;
