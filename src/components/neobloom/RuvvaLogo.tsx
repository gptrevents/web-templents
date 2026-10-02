import React from 'react';

interface RuvvaLogoProps {
  className?: string;
  showSubtitle?: boolean;
  isDark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RuvvaLogo: React.FC<RuvvaLogoProps> = ({
  className = '',
  showSubtitle = false,
  isDark = false,
  size = 'md',
}) => {
  const iconSize = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div className="flex items-center gap-2">
        {/* 4-Petal Ruvva Signature Flower Icon */}
        <div className={`relative ${iconSize} shrink-0`}>
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xs">
            {/* Top-left petal (Coral / Rose) */}
            <path
              d="M50 50 C30 15, 10 30, 20 50 C30 70, 45 55, 50 50 Z"
              fill="#F43F5E"
            />
            {/* Top-right petal (Teal / Turquoise) */}
            <path
              d="M50 50 C65 20, 90 25, 85 50 C80 65, 60 55, 50 50 Z"
              fill="#14B8A6"
            />
            {/* Bottom-left petal (Royal Blue) */}
            <path
              d="M50 50 C35 70, 20 85, 40 90 C60 95, 55 65, 50 50 Z"
              fill="#3B82F6"
            />
            {/* Bottom-right petal (Slate Navy) */}
            <path
              d="M50 50 C60 65, 80 85, 90 70 C100 55, 70 50, 50 50 Z"
              fill={isDark ? '#E2E8F0' : '#1E293B'}
            />
          </svg>
        </div>

        {/* Brand Text */}
        <span
          className={`font-sans font-bold tracking-tight ${textSize} ${
            isDark ? 'text-white' : 'text-stone-900'
          }`}
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
          Ruvva
        </span>
      </div>

      {/* Subtitle */}
      {showSubtitle && (
        <span
          className={`text-[9px] sm:text-[10px] uppercase tracking-widest font-medium mt-0.5 ${
            isDark ? 'text-stone-300' : 'text-stone-500'
          }`}
        >
          Events • Invitations • Memories
        </span>
      )}
    </div>
  );
};
