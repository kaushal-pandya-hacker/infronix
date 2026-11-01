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
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-white text-[#0F172A] selection:bg-[#00C4B4] selection:text-white">
      {/* Background Ambience: Subtle Grid & Soft Ambient Light */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-grid-light opacity-70" />

      {/* Gentle Ambient Cyan/Teal Flare */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-[#00C4B4]/[0.05] blur-[120px]" />
      
      {/* Gentle Bottom Slate Vignette */}
      <div className="pointer-events-none absolute -bottom-48 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-slate-200/40 blur-[140px]" />

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-md px-6 py-12 flex flex-col items-center flex-1 justify-center my-auto">
        {/* Official Brand Logo with Authentic Colors */}
        <div className="flex flex-col items-center text-center mb-8 w-full">
          <BrandLogo variant="banner" className="mb-6 w-full px-1" />

          {/* Headline & Subtitle */}
          <div className="mt-1 space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">
              {siteConfig.headline}
            </h1>
            <p className="text-sm text-[#475569] max-w-xs mx-auto leading-relaxed">
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
            className="group relative flex items-center justify-between w-full p-4 rounded-2xl bg-[#0F172A] text-white font-semibold shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 hover:bg-[#1E293B] hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 border border-slate-800"
          >
            <div className="flex items-center gap-3.5 relative z-10">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 text-[#00C4B4] border border-white/10 group-hover:bg-white/15 transition-colors">
                <Globe className="w-5 h-5 text-[#00C4B4]" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold tracking-wide text-white">
                  VISIT OUR WEBSITE
                </span>
                <span className="block text-xs font-normal text-slate-300">
                  infronixweb.in
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
              <ArrowUpRight className="w-4 h-4 text-[#00C4B4]" />
            </div>
          </a>

          {/* Button 2: FOLLOW ON INSTAGRAM */}
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between w-full p-4 rounded-2xl bg-white text-[#0F172A] font-semibold border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-md hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 shadow-sm"
          >
            <div className="flex items-center gap-3.5 relative z-10">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 text-[#0F172A] group-hover:border-[#00C4B4]/50 group-hover:text-[#00C4B4] transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold tracking-wide text-[#0F172A]">
                  FOLLOW ON INSTAGRAM
                </span>
                <span className="block text-xs font-normal text-[#64748B]">
                  @infronixwebagency2026
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 group-hover:text-[#00C4B4] group-hover:translate-x-1 transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="relative z-10 w-full max-w-md px-6 py-6 flex flex-col items-center justify-center text-center border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>© {CURRENT_YEAR} {siteConfig.name}</span>
          <span>•</span>
          <span>All rights reserved</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
