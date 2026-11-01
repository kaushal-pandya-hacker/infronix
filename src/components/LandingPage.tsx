import React from 'react';
import {
  Globe,
  ArrowUpRight
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { BrandLogo } from './BrandLogo';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const CURRENT_YEAR = new Date().getFullYear();

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-[#000000] text-[#FFFFFF] selection:bg-white selection:text-black">
      {/* Background Ambience: Subtle Monochrome Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-grid-bw opacity-40" />

      {/* Soft Monochromatic Top Vignette Flare */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-white/[0.04] blur-[120px]" />
      
      {/* Soft Monochromatic Bottom Vignette */}
      <div className="pointer-events-none absolute -bottom-48 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-white/[0.03] blur-[140px]" />

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-md px-6 py-12 flex flex-col items-center flex-1 justify-center my-auto">
        {/* Official Brand Logo Banner (Monochrome White) */}
        <div className="flex flex-col items-center text-center mb-8 w-full">
          <BrandLogo variant="banner" className="mb-6 w-full px-2" />

          {/* Headline & Subtitle */}
          <div className="mt-2 space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              {siteConfig.headline}
            </h1>
            <p className="text-sm text-[#A3A3A3] max-w-xs mx-auto leading-relaxed">
              {siteConfig.subtitle}
            </p>
          </div>
        </div>

        {/* Action Buttons Section - Pure Black & White */}
        <div className="w-full space-y-4">
          {/* Button 1: VISIT OUR WEBSITE (High Contrast Pure White) */}
          <a
            href={siteConfig.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between w-full p-4 rounded-2xl bg-white text-black font-semibold shadow-xl shadow-white/5 hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 border border-white"
          >
            <div className="flex items-center gap-3.5 relative z-10">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-black text-white">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold tracking-wide text-black">
                  VISIT OUR WEBSITE
                </span>
                <span className="block text-xs font-normal text-neutral-600">
                  infronixweb.in
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
              <ArrowUpRight className="w-4 h-4 text-black" />
            </div>
          </a>

          {/* Button 2: FOLLOW ON INSTAGRAM (Sleek Obsidian & Pure White) */}
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between w-full p-4 rounded-2xl bg-[#0D0D0D] text-white font-semibold border border-[#262626] hover:border-white/60 hover:bg-[#171717] hover:scale-[1.02] active:scale-[0.99] transition-all duration-300"
          >
            <div className="flex items-center gap-3.5 relative z-10">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 border border-white/20 text-white group-hover:border-white/40 transition-colors">
                <InstagramIcon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold tracking-wide text-white">
                  FOLLOW ON INSTAGRAM
                </span>
                <span className="block text-xs font-normal text-neutral-400">
                  @infronixwebagency2026
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>
        </div>
      </main>

      {/* Clean Footer - Pure Minimal Monochrome */}
      <footer className="relative z-10 w-full max-w-md px-6 py-6 flex flex-col items-center justify-center text-center border-t border-[#1A1A1A]">
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span>© {CURRENT_YEAR} {siteConfig.name}</span>
          <span>•</span>
          <span>All rights reserved</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
