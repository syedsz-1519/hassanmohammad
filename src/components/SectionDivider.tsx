import React from 'react';

interface SectionDividerProps {
  variant?: 'wave' | 'grid' | 'circuit' | 'dots' | 'curve';
  color?: string;
  className?: string;
  flip?: boolean;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'wave',
  color = '#0F62FE',
  className = '',
  flip = false,
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none pointer-events-none select-none ${
        flip ? 'rotate-180' : ''
      } ${className}`}
      aria-hidden="true"
    >
      {variant === 'wave' && (
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 md:h-12 block text-white/5"
          preserveAspectRatio="none"
        >
          <path
            d="M0 32C240 56 480 64 720 48C960 32 1200 8 1440 24V64H0V32Z"
            fill="currentColor"
          />
          <path
            d="M0 32C240 56 480 64 720 48C960 32 1200 8 1440 24"
            stroke={color}
            strokeWidth="1.5"
            strokeOpacity="0.3"
            fill="none"
          />
        </svg>
      )}

      {variant === 'grid' && (
        <svg
          viewBox="0 0 1440 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-6 md:h-8 block"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="20"
            x2="1440"
            y2="20"
            stroke={color}
            strokeWidth="1"
            strokeDasharray="4 8"
            strokeOpacity="0.25"
          />
          <line
            x1="0"
            y1="28"
            x2="1440"
            y2="28"
            stroke="white"
            strokeWidth="0.5"
            strokeDasharray="12 12"
            strokeOpacity="0.1"
          />
          <circle cx="720" cy="20" r="4" fill={color} fillOpacity="0.6" />
          <circle cx="720" cy="20" r="8" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
        </svg>
      )}

      {variant === 'circuit' && (
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 md:h-10 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 24H360L390 12H700L730 36H1050L1080 24H1440"
            stroke={color}
            strokeWidth="1.5"
            strokeOpacity="0.35"
            strokeLinecap="round"
          />
          <circle cx="390" cy="12" r="3" fill={color} />
          <circle cx="730" cy="36" r="3" fill={color} />
          <circle cx="1080" cy="24" r="3" fill={color} />
        </svg>
      )}

      {variant === 'dots' && (
        <div className="w-full h-8 flex items-center justify-center gap-3">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F62FE]/40" />
            <span className="w-2 h-2 rounded-full bg-[#0F62FE]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F62FE]/40" />
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      )}

      {variant === 'curve' && (
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 md:h-10 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 48 Q 720 0 1440 48"
            stroke={color}
            strokeWidth="1.5"
            strokeOpacity="0.25"
            fill="none"
          />
        </svg>
      )}
    </div>
  );
};
