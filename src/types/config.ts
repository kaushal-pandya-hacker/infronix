export interface SocialLink {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  type: 'website' | 'instagram' | 'email' | 'phone' | 'custom';
  primary?: boolean;
  featured?: boolean;
  badge?: string;
}

export interface BrandColors {
  primary: string;       // Electric blue
  accent: string;        // Cyber cyan glow
  background: string;    // Deep navy/black
  surface: string;       // Elevated navy card
  surfaceBorder: string; // Border color
  textMain: string;      // High contrast text
  textMuted: string;     // Secondary text
}

export interface QRSettings {
  defaultFormat: 'png' | 'svg';
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  dotColor: string;
  cornerColor: string;
  backgroundColor: string;
  includeLogo: boolean;
  size: number;
}

export interface AgencyConfig {
  name: string;
  shortName: string;
  tagline: string;
  headline: string;
  subtitle: string;
  description: string;
  publishedUrl: string;
  websiteUrl: string;
  instagramUrl: string;
  email?: string;
  phone?: string;
  location?: string;
  colors: BrandColors;
  links: SocialLink[];
  qrSettings: QRSettings;
  meta: {
    title: string;
    description: string;
    keywords: string[];
    author: string;
  };
}

