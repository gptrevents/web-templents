import React, { useState, useEffect } from 'react';
import { ChevronUp, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

interface FloatingControlsProps {
  onScrollToTop: () => void;
  onNavigateToRSVP: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  onScrollToTop,
  onNavigateToRSVP,
}) => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsub = weddingAudio.subscribe(setIsPlaying);
    return () => unsub();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside aria-label="Quick action controls" className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end space-y-2.5 pointer-events-none">
      {/* Floating RSVP Button (Mobile Only) */}
      <button
        onClick={onNavigateToRSVP}
        aria-label="RSVP to the wedding"
        className="pointer-events-auto sm:hidden px-4 py-2 rounded-full bg-gradient-to-r from-[#D82B61] to-[#991B3B] text-white font-cinzel text-xs tracking-widest font-semibold flex items-center space-x-1.5 shadow-[0_4px_18px_rgba(216,43,97,0.6)] border border-[#FDE4B7]/40 active:scale-95 transition-all cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#FDE4B7]" />
        <span>RSVP</span>
      </button>

      {/* Floating Traditional Music Button */}
      <button
        onClick={() => weddingAudio.toggle()}
        aria-label={isPlaying ? 'Pause wedding music' : 'Play Shehnai & Flute wedding music'}
        title={isPlaying ? 'Pause music' : 'Play Shehnai & Flute music'}
        className={`pointer-events-auto w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer active:scale-95 border ${
          isPlaying
            ? 'bg-[#2E1218] border-[#E5C158] text-[#FDE4B7] shadow-[0_0_18px_rgba(229,193,88,0.5)]'
            : 'bg-black/75 backdrop-blur-md border-white/25 text-white/80 hover:bg-black/90'
        }`}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-[#E5C158]" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5C158] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E5C158]"></span>
            </span>
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-white/60" />
        )}
      </button>

      {/* Scroll To Top Button */}
      <button
        onClick={onScrollToTop}
        aria-label="Scroll to top of page"
        className={`pointer-events-auto w-11 h-11 rounded-full bg-[#181113]/90 backdrop-blur-md border border-[#E5C158]/50 text-[#FDE4B7] flex items-center justify-center shadow-xl hover:bg-[#28171B] active:scale-95 transition-all duration-300 cursor-pointer ${
          showTopBtn
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <ChevronUp className="w-5 h-5 stroke-[2.5]" />
      </button>
    </aside>
  );
};
