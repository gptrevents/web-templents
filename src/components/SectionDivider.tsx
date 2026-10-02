import React from 'react';

interface SectionDividerProps {
  label?: string;
  variant?: 'gold' | 'rose' | 'dark';
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  label,
  variant = 'gold',
}) => {
  return (
    <div className="relative w-full py-4 flex items-center justify-center pointer-events-none select-none">
      <div className="flex items-center space-x-3 w-full max-w-sm px-6">
        <div
          className={`flex-1 h-[1px] ${
            variant === 'rose'
              ? 'bg-gradient-to-r from-transparent to-[#D82B61]/50'
              : variant === 'dark'
              ? 'bg-gradient-to-r from-transparent to-[#C59B27]/40'
              : 'bg-gradient-to-r from-transparent to-[#C59B27]/60'
          }`}
        />

        <div className="flex items-center space-x-1 text-[#E5C158]">
          <span className="text-[9px] opacity-70">✦</span>
          <span className="text-xs text-[#E5C158] font-serif">❖</span>
          <span className="text-[9px] opacity-70">✦</span>
        </div>

        <div
          className={`flex-1 h-[1px] ${
            variant === 'rose'
              ? 'bg-gradient-to-l from-transparent to-[#D82B61]/50'
              : variant === 'dark'
              ? 'bg-gradient-to-l from-transparent to-[#C59B27]/40'
              : 'bg-gradient-to-l from-transparent to-[#C59B27]/60'
          }`}
        />
      </div>

      {label && (
        <span className="absolute -top-1 px-3 bg-[#0F0B0C] text-[10px] uppercase font-cinzel tracking-[0.25em] text-[#C59B27]/80">
          {label}
        </span>
      )}
    </div>
  );
};
