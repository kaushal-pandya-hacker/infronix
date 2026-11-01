import React, { useState } from 'react';
import {
  Globe,
  ExternalLink,
  Share2,
  Check,
  Sparkles,
  ShieldCheck,
  QrCode,
  ArrowUpRight,
  Contact2
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { BrandLogo } from './BrandLogo';
import { downloadVCard } from '../utils/vcard';

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

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAdminQr,
  isAdminMode = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleShare = async () => {
    const shareData = {
      title: siteConfig.name,
      text: `${siteConfig.name} — ${siteConfig.subtitle}`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or share failed, fallback to copy
        copyLink();
      }
    } else {
      copyLink();
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2200);
    } catch {
      showToast('Unable to copy automatically.');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-[#040914] text-[#F0F6FF] selection:bg-[#0066FF] selection:text-white">
      {/* Background Ambience: Subtle Radial Glows & Grid Mesh */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-grid-pattern opacity-60" />

      {/* Electric Blue Core Radial Flare */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-[#0066FF]/25 via-[#00D4FF]/10 to-transparent blur-[120px]" />
      
      {/* Secondary Bottom Navy Aura */}
      <div className="pointer-events-none absolute -bottom-48 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-t from-[#0047B3]/20 via-[#0B1528]/40 to-transparent blur-[140px]" />

      {/* Top Bar / Quick Actions */}
      <header className="relative z-10 w-full max-w-md px-6 pt-7 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B1528]/80 border border-[#16243E] backdrop-blur-md text-xs font-medium text-[#8EA7CC]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF]"></span>
          </span>
          <span className="tracking-wide text-slate-300">Official Portal</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Share Button */}
          <button
            onClick={handleShare}
            aria-label="Share Link"
            className="p-2.5 rounded-full bg-[#0B1528]/80 border border-[#16243E] hover:border-[#00D4FF]/50 hover:bg-[#0E1A33] text-[#8EA7CC] hover:text-[#00D4FF] transition-all duration-200 active:scale-95"
            title="Share page"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          {/* Admin QR Studio Trigger (Only visible to admin or via direct secret toggle) */}
          {isAdminMode && onOpenAdminQr && (
            <button
              onClick={onOpenAdminQr}
              aria-label="Admin QR Studio"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/60 hover:bg-[#0066FF]/30 text-xs font-medium text-[#00D4FF] transition-all duration-200"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR Studio</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-md px-6 py-8 flex flex-col items-center flex-1 justify-center">
        {/* Brand Emblem & Identification */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="mb-5 relative group">
            <BrandLogo size={96} showGlow={true} />
            <div className="absolute -bottom-1 -right-1 bg-[#040914] p-1 rounded-full">
              <div className="bg-[#0066FF] text-white p-1 rounded-full shadow-lg shadow-blue-500/50">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00D4FF]" />
              </div>
            </div>
          </div>

          {/* Exact Brand Title Requirements */}
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-white via-[#E0EDFF] to-[#8EB8FF] bg-clip-text text-transparent">
              INFRONIX
            </h1>
            <p className="text-sm font-semibold tracking-[0.28em] text-[#00D4FF] uppercase">
              WEB AGENCY
            </p>
          </div>

          {/* Verified pill */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-800/40 text-[11px] font-medium text-blue-200">
            <Sparkles className="w-3 h-3 text-[#00D4FF]" />
            <span>Digital Presence & Engineering</span>
          </div>

          {/* Headline & Subtitle as specified */}
          <div className="mt-6 space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {siteConfig.headline}
            </h2>
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

          {/* Optional Direct Contact Card (vCard) */}
          <button
            onClick={downloadVCard}
            className="w-full py-3 px-4 rounded-xl bg-[#081020]/70 border border-[#16243E] hover:border-slate-700 text-xs font-medium text-[#8EA7CC] hover:text-[#F0F6FF] flex items-center justify-center gap-2 transition-all hover:bg-[#0B1528]"
          >
            <Contact2 className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Save Contact to Phone (.vcf)</span>
          </button>
        </div>

        {/* Agency Value Statement */}
        <div className="mt-8 p-4 rounded-2xl bg-[#070E1C]/60 border border-[#121E36] text-center w-full">
          <p className="text-xs text-[#7B93B8] leading-relaxed">
            {siteConfig.description}
          </p>
        </div>
      </main>

      {/* Clean Footer (Requirement 6: White-label, no third-party branding) */}
      <footer className="relative z-10 w-full max-w-md px-6 py-6 flex flex-col items-center justify-center text-center border-t border-[#0D182E]">
        <div className="flex items-center gap-2 text-xs text-[#5D7399]">
          <span>© {CURRENT_YEAR} {siteConfig.name}</span>
          <span>•</span>
          <span>All rights reserved</span>
        </div>

        {/* Secret / Discreet Admin Access Toggle */}
        <div className="mt-3">
          <button
            onClick={onOpenAdminQr}
            className="text-[11px] text-[#3E5274] hover:text-[#00D4FF] transition-colors focus:outline-none"
            title="Open Agency QR Code Manager"
          >
            Agency QR Suite
          </button>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 z-50 px-4 py-2.5 rounded-full bg-[#0B1528] border border-[#00D4FF]/40 text-xs font-semibold text-white shadow-xl shadow-cyan-950/50 animate-bounce flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#00D4FF]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
