import React from 'react';
import { X, ChevronRight, Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { ScreenId } from '../types';
import { SCREENS_META, WEDDING_COUPLE } from '../data/weddingData';
import { weddingAudio } from '../utils/audio';

interface NavigationDrawerProps {
  isOpen: boolean;
  activeScreen?: ScreenId;
  activeSection?: string;
  onSelectScreen?: (screenId: ScreenId) => void;
  onSelectSection?: (sectionId: string) => void;
  onClose: () => void;
}

const SECTION_ID_MAP: Record<number, string> = {
  1: 'hero',
  2: 'invitation',
  3: 'story',
  4: 'celebrations',
  5: 'countdown',
  6: 'venue',
  7: 'families',
  8: 'rsvp',
  9: 'wishes',
  10: 'thankyou',
};

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  activeScreen = 1,
  activeSection,
  onSelectScreen,
  onSelectSection,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    const unsub = weddingAudio.subscribe(setIsPlaying);
    return () => unsub();
  }, []);

  if (!isOpen) return null;

  const handleItemClick = (metaId: number) => {
    const targetSection = SECTION_ID_MAP[metaId] || 'hero';
    if (onSelectSection) {
      onSelectSection(targetSection);
    } else if (onSelectScreen) {
      onSelectScreen(metaId as ScreenId);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
      {/* Backdrop tap to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Content */}
      <aside className="relative z-10 w-full max-w-[340px] h-full bg-[#181113] text-[#FFF7E6] border-l border-[#C59B27]/30 flex flex-col justify-between shadow-2xl overflow-y-auto">
        {/* Top Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-b from-[#2A141A] to-transparent">
          <div className="flex items-center space-x-2">
            <span className="font-playfair font-semibold text-xl text-[#FDE4B7] tracking-wide">
              {WEDDING_COUPLE.groom} &amp; {WEDDING_COUPLE.bride}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#D82B61]/25 border border-[#D82B61]/50 text-[#FFAEC3]">
              Spec 1–10
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 active:scale-95 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Screens Navigation List (1 to 10) */}
        <div className="p-4 space-y-2 flex-1">
          <div className="px-2 py-1 text-[11px] font-cinzel tracking-[0.25em] text-[#C59B27] uppercase flex items-center justify-between">
            <span>Prototype Navigation (1 to 10)</span>
            <span className="text-white/40">{activeScreen}/10</span>
          </div>

          <nav className="space-y-1.5" aria-label="Screens list">
            {SCREENS_META.map((meta) => {
              const targetSection = SECTION_ID_MAP[meta.id];
              const isActive = activeSection
                ? activeSection === targetSection
                : activeScreen === meta.id;
              return (
                <button
                  key={meta.id}
                  onClick={() => handleItemClick(meta.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D82B61] to-[#8C1632] text-white shadow-lg border border-[#FDE4B7]/40 scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`font-cinzel text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                        isActive
                          ? 'bg-[#FFF7E6] text-[#8C1632]'
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {meta.badge}
                    </span>
                    <div>
                      <p className="font-playfair font-medium text-[15px] leading-tight text-white">
                        {meta.title}
                      </p>
                      <p className="text-[11px] text-white/60 leading-tight">
                        {meta.subtitle}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-[#FDE4B7] translate-x-0.5' : 'text-white/30'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Drawer Footer with Music Toggle and Wedding Date */}
        <div className="p-4 border-t border-white/10 bg-black/40 space-y-3">
          {/* Background Audio Control */}
          <button
            onClick={() => weddingAudio.toggle()}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-[#C59B27]/30 flex items-center justify-between text-xs tracking-wide text-[#FDE4B7] cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              {isPlaying ? (
                <Volume2 className="w-4 h-4 text-[#E5C158] animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-white/50" />
              )}
              <span className="font-medium">
                {isPlaying ? 'Classical Shehnai & Flute Playing' : 'Play Background Music'}
              </span>
            </div>
            <span className="text-[10px] uppercase font-cinzel px-2 py-0.5 rounded bg-[#C59B27]/20 border border-[#C59B27]/40">
              {isPlaying ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Couple Signoff */}
          <div className="text-center pt-1">
            <p className="font-playfair text-[13px] text-white/70">
              12 December 2026 • Vijayawada
            </p>
            <div className="flex items-center justify-center space-x-1 mt-1 text-[#D82B61]">
              <span className="font-script text-[18px]">Arjun &amp; Priya</span>
              <Heart className="w-3 h-3 fill-current inline-block" />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
