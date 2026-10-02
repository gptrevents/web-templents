import React, { useState, useEffect } from 'react';
import { Menu, Volume2, VolumeX, Heart, Sparkles } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

interface WeddingNavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenMenu: () => void;
}

export const WeddingNavbar: React.FC<WeddingNavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenMenu,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe(setIsPlaying);
    return () => unsubscribe();
  }, []);

  // Track scroll progress for the top gold progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'invitation', label: 'Invitation' },
    { id: 'story', label: 'Our Story' },
    { id: 'celebrations', label: 'Celebrations' },
    { id: 'countdown', label: 'Countdown' },
    { id: 'venue', label: 'Venue' },
    { id: 'families', label: 'Families' },
    { id: 'rsvp', label: 'RSVP' },
    { id: 'wishes', label: 'Wishes' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#150D10]/92 backdrop-blur-md border-b border-[#C59B27]/25 text-[#FFF7E6] transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
      {/* Dynamic Gold Scroll Progress Line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#D82B61] via-[#E5C158] to-[#D82B61] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Couple Monogram */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center space-x-2 text-left group cursor-pointer focus:outline-none"
          aria-label="Scroll to top"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#2E1218] to-[#150B0D] border border-[#E5C158]/60 flex items-center justify-center shadow-[0_0_12px_rgba(229,193,88,0.3)] group-hover:scale-105 transition-transform">
            <span className="font-cinzel text-xs font-bold text-[#FDE4B7] tracking-tighter">
              A&amp;P
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1">
              <span className="font-cormorant text-lg sm:text-xl font-medium tracking-wide text-[#FFF7E6] group-hover:text-[#FDE4B7] transition-colors">
                Arjun &amp; Priya
              </span>
              <Heart className="w-3 h-3 text-[#D82B61] fill-current" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-cinzel tracking-[0.2em] text-[#E5C158]/80 uppercase -mt-0.5">
              12 DEC 2026
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center space-x-1 lg:space-x-1.5"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-2.5 lg:px-3 py-1.5 rounded-full text-xs font-cinzel tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#8C1632] to-[#6A1224] text-[#FDE4B7] font-semibold border border-[#E5C158]/50 shadow-[0_0_12px_rgba(216,43,97,0.4)]'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Music Player + RSVP Button + Mobile Menu */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Traditional Audio Control */}
          <button
            onClick={() => weddingAudio.toggle()}
            title={isPlaying ? 'Pause Shehnai & Flute' : 'Play Shehnai & Flute'}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            className={`h-9 px-2.5 sm:px-3 rounded-full flex items-center space-x-1.5 border transition-all duration-200 cursor-pointer text-xs ${
              isPlaying
                ? 'bg-[#2B1015] border-[#E5C158]/70 text-[#FDE4B7] shadow-[0_0_14px_rgba(229,193,88,0.35)]'
                : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#E5C158]" />
                <span className="hidden sm:inline font-cinzel text-[11px] tracking-wider text-[#FDE4B7]">
                  Shehnai
                </span>
                {/* Animated Sound Equalizer Bars */}
                <span className="flex items-end space-x-0.5 h-3 ml-0.5" aria-hidden="true">
                  <span className="w-0.5 h-2.5 bg-[#E5C158] rounded-full animate-pulse" />
                  <span className="w-0.5 h-3.5 bg-[#E5C158] rounded-full animate-pulse delay-75" />
                  <span className="w-0.5 h-2 bg-[#E5C158] rounded-full animate-pulse delay-150" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/50" />
                <span className="hidden sm:inline font-cinzel text-[11px] tracking-wider text-white/60">
                  Music
                </span>
              </>
            )}
          </button>

          {/* Quick RSVP CTA */}
          <button
            onClick={() => onNavigate('rsvp')}
            className="hidden sm:flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#D82B61] to-[#991B3B] text-white font-cinzel text-xs tracking-wider font-semibold shadow-[0_0_14px_rgba(216,43,97,0.5)] hover:from-[#E32D68] hover:to-[#B31D42] active:scale-95 transition cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-[#FDE4B7]" />
            <span>RSVP</span>
          </button>

          {/* Mobile Drawer Trigger */}
          <button
            onClick={onOpenMenu}
            aria-label="Open wedding navigation"
            className="md:hidden w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 flex items-center justify-center text-white/90 active:scale-95 transition cursor-pointer"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
