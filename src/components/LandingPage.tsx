import React from 'react';
import {
  Globe,
  ExternalLink,
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

interface LandingPageProps {
  onOpenAdminQr?: () => void;
  isAdminMode?: boolean;
}

const CURRENT_YEAR = new Date().getFullYear();

export const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-[#040914] text-[#F0F6FF] selection:bg-[#0066FF] selection:text-white">
      {/* Background Ambience: Subtle Radial Glows & Grid Mesh */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-grid-pattern opacity-60" />

      {/* Electric Blue Core Radial Flare */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-[#0066FF]/25 via-[#00D4FF]/10 to-transparent blur-[120px]" />
      
      {/* Secondary Bottom Navy Aura */}
      <div className="pointer-events-none absolute -bottom-48 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-t from-[#0047B3]/20 via-[#0B1528]/40 to-transparent blur-[140px]" />

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-md px-6 py-12 flex flex-col items-center flex-1 justify-center my-auto">
        {/* Official Brand Logo Banner */}
        <div className="flex flex-col items-center text-center mb-8 w-full">
          <BrandLogo variant="banner" className="mb-6 w-full px-2" />

          {/* Headline & Subtitle */}
          <div className="mt-2 space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              {siteConfig.headline}
            </h1>
            <p className="text-sm text-[#8EA7CC] max-w-xs mx-auto leading-relaxed">
              {siteConfig.subtitle}
            </p>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="w-full space-y-4">
          {/* Button 1: VISIT OUR WEBSITE */}
          <a
            href={siteConfig.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between w-full p-4 rounded-2xl bg-gradient-to-r from-[#0052CC] to-[#0066FF] text-white font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 border border-blue-400/30 overflow-hidden"
          >
            {/* Subtle animated light gleam */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="flex items-center gap-3.5 relative z-10">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-white/20 transition-colors">
                <Globe className="w-5 h-5 text-[#00F0FF]" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold tracking-wide">
                  VISIT OUR WEBSITE
                </span>
                <span className="block text-xs font-normal text-blue-100/80">
                  infronixweb.in
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
              <ArrowUpRight className="w-4 h-4 text-[#00F0FF]" />
            </div>
          </a>

          {/* Button 2: FOLLOW ON INSTAGRAM */}
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between w-full p-4 rounded-2xl bg-[#0B1528] text-white font-semibold border border-[#1A2A4A] hover:border-[#00D4FF]/60 hover:bg-[#0E1B33] hover:shadow-lg hover:shadow-cyan-900/20 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-center gap-3.5 relative z-10">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-pink-600/20 via-purple-600/20 to-blue-600/20 border border-purple-500/30 text-white group-hover:border-[#00D4FF]/50 transition-colors">
                <InstagramIcon className="w-5 h-5 text-pink-400 group-hover:text-[#00D4FF] transition-colors" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold tracking-wide text-slate-100">
                  FOLLOW ON INSTAGRAM
                </span>
                <span className="block text-xs font-normal text-[#8EA7CC]">
                  @infronixwebagency2026
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#14233F] text-[#8EA7CC] group-hover:text-[#00D4FF] group-hover:translate-x-1 transition-all">
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>
        </div>
      </main>

      {/* Clean Footer (White-label, minimal) */}
      <footer className="relative z-10 w-full max-w-md px-6 py-6 flex flex-col items-center justify-center text-center border-t border-[#0D182E]">
        <div className="flex items-center gap-2 text-xs text-[#5D7399]">
          <span>© {CURRENT_YEAR} {siteConfig.name}</span>
          <span>•</span>
          <span>All rights reserved</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
