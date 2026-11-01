import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'banner' | 'mark';
  size?: number;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'banner',
  size = 80,
}) => {
  if (variant === 'mark') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0066FF] via-[#00D4FF] to-blue-400 opacity-30 blur-md animate-pulse"
          style={{ transform: 'scale(1.15)' }}
        />
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          <defs>
            <radialGradient id="infronix-mark-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="48" fill="url(#infronix-mark-grad)" />
          
          {/* 8 Radial Spokes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 50 + 9 * Math.cos(rad);
            const y1 = 50 + 9 * Math.sin(rad);
            const x2 = 50 + 40 * Math.cos(rad);
            const y2 = 50 + 40 * Math.sin(rad);
            const xMid = 50 + 24 * Math.cos(rad);
            const yMid = 50 + 24 * Math.sin(rad);

            return (
              <g key={deg}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#F0F6FF"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                <circle cx={xMid} cy={yMid} r="3.2" fill="#040914" stroke="#00D4FF" strokeWidth="2" />
                <circle cx={x2} cy={y2} r="4.2" fill="#F0F6FF" stroke="#0066FF" strokeWidth="1.8" />
              </g>
            );
          })}

          {/* Central Core */}
          <circle cx="50" cy="50" r="10.5" fill="#040914" stroke="#00D4FF" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="5" fill="#0066FF" />
        </svg>
      </div>
    );
  }

  // Full Brand Banner (Official Logo with White Typography & Cyan Accents)
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 bg-[#0066FF]/20 blur-2xl rounded-full scale-95 pointer-events-none" />
      <img
        src="./infronix-logo-dark-theme.png"
        alt="InfronixWeb Agency Logo"
        className="relative z-10 w-full max-w-[340px] md:max-w-[380px] h-auto object-contain drop-shadow-[0_4px_24px_rgba(0,102,255,0.35)] transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};

export default BrandLogo;
