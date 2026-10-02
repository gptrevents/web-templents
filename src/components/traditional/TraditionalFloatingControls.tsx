import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ChevronUp, CalendarCheck, MailOpen, Palette } from 'lucide-react';

interface TraditionalFloatingControlsProps {
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onScrollToTop: () => void;
  onNavigateToRSVP: () => void;
  onReopenEnvelope: () => void;
  onOpenThemePicker?: () => void;
}

export const TraditionalFloatingControls: React.FC<TraditionalFloatingControlsProps> = ({
  isPlayingMusic,
  onToggleMusic,
  onScrollToTop,
  onNavigateToRSVP,
  onReopenEnvelope,
  onOpenThemePicker,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-center space-y-2.5">
      
      {/* RSVP Quick Action */}
      <button
        onClick={onNavigateToRSVP}
        className="px-3.5 py-2 rounded-full bg-[#8B1A1A] hover:bg-[#680E0E] text-[#FFFDF9] border border-[#D4A843] shadow-[0_6px_16px_rgba(139,26,26,0.35)] text-xs font-cinzel font-bold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
        title="RSVP Now"
      >
        <CalendarCheck className="w-3.5 h-3.5 text-[#F3DC9B]" />
        <span className="hidden sm:inline">RSVP</span>
      </button>

      {/* Theme Picker Button */}
      {onOpenThemePicker && (
        <button
          onClick={onOpenThemePicker}
          className="w-10 h-10 rounded-full bg-[#FFFDF9] hover:bg-[#F5EBD5] text-[#8B1A1A] border border-[#D4A843] shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
          title="Change Invitation Theme (థీమ్ మార్చు)"
        >
          <Palette className="w-4 h-4 text-[#D4A843]" />
        </button>
      )}

      {/* Floating Music Button */}
      <button
        onClick={onToggleMusic}
        className={`w-11 h-11 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 active:scale-95 ${
          isPlayingMusic
            ? 'bg-[#8B1A1A] text-[#F3DC9B] border-[#D4A843] shadow-[0_0_16px_rgba(212,168,67,0.5)]'
            : 'bg-[#FFFDF9] text-[#8B1A1A] border-[#D4A843]/60'
        }`}
        title={isPlayingMusic ? 'Mute Music' : 'Play Music'}
      >
        {isPlayingMusic ? (
          <Volume2 className="w-5 h-5 text-[#F3DC9B] animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-[#8B1A1A]" />
        )}
      </button>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={onScrollToTop}
          className="w-10 h-10 rounded-full bg-[#FFFDF9] hover:bg-[#F5EBD5] text-[#8B1A1A] border border-[#D4A843] shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95 animate-in fade-in zoom-in duration-200"
          title="Scroll to Top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
