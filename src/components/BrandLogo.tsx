import React from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
  showGlow?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 48,
  className = '',
  showGlow = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {showGlow && (
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-400 to-blue-400 opacity-40 blur-lg animate-pulse"
          style={{ transform: 'scale(1.15)' }}
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="infronix-grad-main" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#0066FF" />
            <stop offset="100%" stopColor="#0035A0" />
          </linearGradient>
          <linearGradient id="infronix-shield-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B162C" />
            <stop offset="100%" stopColor="#040914" />
          </linearGradient>
          <linearGradient id="infronix-border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0066FF" stopOpacity="0.3" />
          </linearGradient>
          <filter id="infronix-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Shield / Rounded Polygon */}
        <rect
          x="6"
          y="6"
          width="88"
          height="88"
          rx="22"
          fill="url(#infronix-shield-bg)"
          stroke="url(#infronix-border-grad)"
          strokeWidth="2.5"
        />

        {/* Ambient Inner Shadow/Glow */}
        <circle cx="50" cy="50" r="32" fill="#0066FF" fillOpacity="0.15" />

        {/* Geometric "I" & "X" Nexus Symbol */}
        <path
          d="M32 28 H42 V72 H32 Z"
          fill="url(#infronix-grad-main)"
          rx="2"
        />
        {/* Dynamic diagonal crossbar forming the IX / Infronix nexus */}
        <path
          d="M48 30 L66 70 H56 L44 42 Z"
          fill="#00D4FF"
          opacity="0.9"
        />
        <path
          d="M66 30 L48 70 H58 L72 38 Z"
          fill="url(#infronix-grad-main)"
        />

        {/* Glowing cyber node in center */}
        <circle cx="56" cy="50" r="3.5" fill="#FFFFFF" filter="url(#infronix-glow)" />
      </svg>
    </div>
  );
};

export default BrandLogo;
