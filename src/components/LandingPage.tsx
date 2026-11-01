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
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between bg-white text-gray-900 selection:bg-gray-900 selection:text-white">
      {/* Background: Pure White with Subtle Soft Gray Edge Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-50/60 via-white to-gray-50/80" />

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-md px-6 py-12 flex flex-col items-center flex-1 justify-center my-auto">
        {/* Official Brand Logo (Displayed in full authentic original colors) */}
        <div className="flex flex-col items-center text-center mb-8 w-full">
          <BrandLogo variant="banner" className="mb-6 w-full px-1" />

          {/* Headline & Subtitle */}
          <div className="mt-1 space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-black">
              {siteConfig.headline}
            </h1>
            <p className="text-sm text-gray-600 max-w-xs mx-auto leading-relaxed">
              {siteConfig.subtitle}
            </p>
          </div>
        </div>

        {/* Action Buttons Section - Pure White Theme */}
        <div className="w-full space-y-4">
          {/* Button 1: VISIT OUR WEBSITE (Clean White Theme Card) */}
          <a
            href={siteConfig.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between w-full p-4 rounded-2xl bg-white text-black font-semibold border-2 border-black hover:bg-gray-50 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-300"
          >
            <div className="flex items-center gap-3.5 relative z-10">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gray-100 text-black border border-gray-200 group-hover:bg-black group-hover:text-white transition-colors duration-200">
                <Globe className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold tracking-wide text-black">
                  VISIT OUR WEBSITE
                </span>
                <span className="block text-xs font-normal text-gray-500">
                  infronixweb.in
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-black group-hover:bg-black group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>

          {/* Button 2: FOLLOW ON INSTAGRAM (Clean White Theme Card) */}
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between w-full p-4 rounded-2xl bg-white text-black font-semibold border border-gray-300 hover:border-black hover:bg-gray-50 shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.99] transition-all duration-300"
          >
            <div className="flex items-center gap-3.5 relative z-10">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gray-100 border border-gray-200 text-black group-hover:bg-black group-hover:text-white transition-colors duration-200">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold tracking-wide text-black">
                  FOLLOW ON INSTAGRAM
                </span>
                <span className="block text-xs font-normal text-gray-500">
                  @infronixwebagency2026
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-black group-hover:bg-black group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>
        </div>
      </main>

      {/* Clean Footer - Pure White Theme */}
      <footer className="relative z-10 w-full max-w-md px-6 py-6 flex flex-col items-center justify-center text-center border-t border-gray-200">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>© {CURRENT_YEAR} {siteConfig.name}</span>
          <span>•</span>
          <span>All rights reserved</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
