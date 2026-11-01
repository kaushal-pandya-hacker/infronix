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
          className="absolute inset-0 rounded-full bg-white/10 blur-md"
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
          {/* 8 Radial Spokes - Pure Monochrome */}
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
                  stroke="#FFFFFF"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                <circle cx={xMid} cy={yMid} r="3.2" fill="#0A0A0A" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx={x2} cy={y2} r="4.2" fill="#FFFFFF" />
              </g>
            );
          })}

          {/* Central Core */}
          <circle cx="50" cy="50" r="10.5" fill="#0A0A0A" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  // Pure Black & White Brand Banner
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full scale-95 pointer-events-none" />
      <img
        src="./infronix-logo-bw.png"
        alt="InfronixWeb Logo"
        className="relative z-10 w-full max-w-[340px] md:max-w-[380px] h-auto object-contain drop-shadow-[0_4px_24px_rgba(255,255,255,0.15)] transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};

export default BrandLogo;
