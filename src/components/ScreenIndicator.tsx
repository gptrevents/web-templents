import React from 'react';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { ScreenId } from '../types';
import { SCREENS_META } from '../data/weddingData';
import { FloatingMusicButton } from './FloatingMusicButton';

interface ScreenIndicatorProps {
  activeScreen: ScreenId;
  onNavigate: (screenId: ScreenId) => void;
  onOpenMenu: () => void;
  darkMode?: boolean;
}

export const ScreenIndicator: React.FC<ScreenIndicatorProps> = ({
  activeScreen,
  onNavigate,
  onOpenMenu,
  darkMode = false,
}) => {
  const currentMeta = SCREENS_META.find((s) => s.id === activeScreen);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeScreen > 1) {
      onNavigate((activeScreen - 1) as ScreenId);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeScreen < 10) {
      onNavigate((activeScreen + 1) as ScreenId);
    }
  };

  return (
    <div className="w-full select-none z-40 relative px-4 pt-3 pb-2">
      {/* 10-Segment Progress Line */}
      <div className="grid grid-cols-10 gap-1 mb-2">
        {SCREENS_META.map((meta) => {
          const isCurrent = meta.id === activeScreen;
          const isPassed = meta.id < activeScreen;
          return (
            <button
              key={meta.id}
              onClick={() => onNavigate(meta.id)}
              aria-label={`Go to Screen ${meta.id}: ${meta.title}`}
              title={`Screen ${meta.id}: ${meta.title}`}
              className="h-1 rounded-full overflow-hidden transition-all duration-300 relative group cursor-pointer"
            >
              <div
                className={`w-full h-full transition-all duration-300 ${
                  isCurrent
                    ? 'bg-[#D82B61] shadow-[0_0_8px_#D82B61]'
                    : isPassed
                    ? darkMode
                      ? 'bg-white/60'
                      : 'bg-[#6B1928]/45'
                    : darkMode
                    ? 'bg-white/20'
                    : 'bg-black/15'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Top Controls: Left Screen Indicator, Audio, Right Menu Button */}
      <div className="flex items-center justify-between">
        {/* Left: Previous Screen arrow + Screen Title */}
        <div className="flex items-center space-x-1">
          <button
            onClick={handlePrev}
            disabled={activeScreen <= 1}
            aria-label="Previous screen"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              activeScreen <= 1
                ? 'opacity-20 cursor-not-allowed'
                : darkMode
                ? 'bg-black/40 hover:bg-black/60 text-white active:scale-95'
                : 'bg-white/70 hover:bg-white text-[#6B1928] shadow-sm active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span
            className={`text-[11px] font-cinzel tracking-wider font-semibold px-2 py-0.5 rounded-full ${
              darkMode ? 'bg-black/40 text-[#FDE4B7]' : 'bg-[#FAF0EB]/90 text-[#6B1928] border border-[#ECD9CE]'
            }`}
          >
            {currentMeta?.badge} / 10 • {currentMeta?.title}
          </span>

          <button
            onClick={handleNext}
            disabled={activeScreen >= 10}
            aria-label="Next screen"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              activeScreen >= 10
                ? 'opacity-20 cursor-not-allowed'
                : darkMode
                ? 'bg-black/40 hover:bg-black/60 text-white active:scale-95'
                : 'bg-white/70 hover:bg-white text-[#6B1928] shadow-sm active:scale-95'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Music + Menu Drawer Button */}
        <div className="flex items-center space-x-2">
          <FloatingMusicButton />

          <button
            onClick={onOpenMenu}
            aria-label="Open Navigation Menu"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-md ${
              darkMode
                ? 'bg-black/45 backdrop-blur-md border border-white/25 text-white hover:bg-black/65'
                : 'bg-white/85 backdrop-blur-md border border-[#ECD9CE] text-[#6B1928] hover:bg-white'
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
