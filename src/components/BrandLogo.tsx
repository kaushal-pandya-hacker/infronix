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
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
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
                  stroke="#0F172A"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
                <circle cx={xMid} cy={yMid} r="3.2" fill="#FFFFFF" stroke="#00C4B4" strokeWidth="2.2" />
                <circle cx={x2} cy={y2} r="4.2" fill="#0F172A" />
              </g>
            );
          })}

          {/* Central Core */}
          <circle cx="50" cy="50" r="10.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="5" fill="#00C4B4" />
        </svg>
      </div>
    );
  }

  // Official InfronixWeb Brand Banner with Exact Original Colors
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <img
        src="./infronix-logo.png"
        alt="InfronixWeb Official Logo"
        className="w-full max-w-[360px] md:max-w-[400px] h-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
      />
    </div>
  );
};

export default BrandLogo;
