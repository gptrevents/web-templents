import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Volume2, VolumeX, Menu, Heart, User, Calendar, Palette } from 'lucide-react';
import { WEDDING_COUPLE } from '../../data/weddingData';

interface TraditionalNavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  guestName: string;
  onUpdateGuestName: (name: string) => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onOpenThemePicker?: () => void;
}

export const TraditionalNavbar: React.FC<TraditionalNavbarProps> = ({
  activeSection,
  onNavigate,
  guestName,
  onUpdateGuestName,
  isPlayingMusic,
  onToggleMusic,
  onOpenThemePicker,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEditingGuest, setIsEditingGuest] = useState(false);
  const [tempGuest, setTempGuest] = useState(guestName);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'couple', label: 'The Couple' },
    { id: 'celebrations', label: 'Events' },
    { id: 'countdown', label: 'Muhurtham' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'venue', label: 'Venue' },
    { id: 'rsvp', label: 'RSVP' },
  ];

  const handleSaveGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempGuest.trim()) {
      onUpdateGuestName(tempGuest.trim());
      setIsEditingGuest(false);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFDF9]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(139,26,26,0.12)] py-2.5 border-b border-[#D4A843]/30'
            : 'bg-[#FFFDF9]/85 backdrop-blur-sm py-3.5 border-b border-[#D4A843]/20'
        }`}
      >
        {/* Royal Gold Scroll Progress Bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D4A843] via-[#F3DC9B] to-[#8B1A1A] origin-left z-50"
          style={{ scaleX }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Couple Logo & Date */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center space-x-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8B1A1A] to-[#680E0E] text-[#F3DC9B] font-cinzel font-bold text-xs flex items-center justify-center border border-[#D4A843] shadow-sm group-hover:scale-105 transition-transform">
              <span>R&amp;H</span>
            </div>
            <div>
              <span className="font-playfair text-base sm:text-lg font-bold text-[#8B1A1A] tracking-wide leading-none block">
                {WEDDING_COUPLE.groom} &amp; {WEDDING_COUPLE.bride}
              </span>
              <span className="text-[10px] sm:text-[11px] font-cinzel tracking-widest text-[#5C4033] block mt-0.5">
                12 DEC 2026 • HYDERABAD
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-cinzel tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#8B1A1A] text-[#FFFDF9] font-bold shadow-sm'
                      : 'text-[#5C4033] hover:text-[#8B1A1A] hover:bg-[#8B1A1A]/8'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Guest Name Button + Music Player */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Guest Name Display & Editor Button */}
            <button
              onClick={() => {
                setTempGuest(guestName);
                setIsEditingGuest(true);
              }}
              title="Personalize Guest Name"
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full bg-[#8B1A1A]/8 hover:bg-[#8B1A1A]/15 border border-[#8B1A1A]/20 text-[#8B1A1A] text-xs font-cinzel transition cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#D4A843]" />
              <span className="max-w-[110px] truncate font-medium">{guestName || 'Guest'}</span>
            </button>

            {/* Theme Picker Button */}
            {onOpenThemePicker && (
              <button
                onClick={onOpenThemePicker}
                title="Change Theme (థీమ్)"
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full bg-[#D4A843]/15 hover:bg-[#D4A843]/25 border border-[#D4A843]/50 text-[#8B1A1A] text-xs font-cinzel transition cursor-pointer"
              >
                <Palette className="w-3.5 h-3.5 text-[#D4A843]" />
                <span className="hidden lg:inline text-[11px] font-semibold">Theme</span>
              </button>
            )}

            {/* Music Equalizer & Player Toggle */}
            <button
              onClick={onToggleMusic}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                isPlayingMusic
                  ? 'bg-[#8B1A1A] text-[#F3DC9B] border-[#D4A843] shadow-[0_0_12px_rgba(212,168,67,0.4)]'
                  : 'bg-[#FFFDF9] text-[#8B1A1A] border-[#8B1A1A]/30 hover:border-[#8B1A1A]'
              }`}
              title={isPlayingMusic ? 'Mute Music' : 'Play Shehnai Music'}
            >
              {isPlayingMusic ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#F3DC9B]" />
                  {/* Animated Equalizer Wave Bars */}
                  <div className="flex items-end space-x-0.5 h-3.5">
                    <span className="w-1 bg-[#F3DC9B] rounded-full animate-[bounce_0.8s_ease-in-out_infinite_alternate]" style={{ height: '70%' }} />
                    <span className="w-1 bg-[#F3DC9B] rounded-full animate-[bounce_0.6s_ease-in-out_0.2s_infinite_alternate]" style={{ height: '100%' }} />
                    <span className="w-1 bg-[#F3DC9B] rounded-full animate-[bounce_0.9s_ease-in-out_0.4s_infinite_alternate]" style={{ height: '50%' }} />
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#8B1A1A]" />
                  <span className="text-[11px] font-cinzel font-semibold hidden sm:inline">MUSIC</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Guest Personalization Modal */}
      {isEditingGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#FFFDF9] w-full max-w-sm rounded-2xl p-6 border-2 border-[#D4A843] shadow-2xl">
            <h3 className="font-playfair text-xl font-bold text-[#8B1A1A] mb-1">
              Personalize Invitation
            </h3>
            <p className="text-xs text-[#5C4033] font-sans-clean mb-4">
              Enter any guest or family name (e.g. <em>Ramesh Garu &amp; Family</em>) to see how their personalized invite looks.
            </p>

            <form onSubmit={handleSaveGuest} className="space-y-4">
              <div>
                <label className="block text-xs font-cinzel font-semibold text-[#8B1A1A] uppercase mb-1">
                  Guest Name
                </label>
                <input
                  type="text"
                  value={tempGuest}
                  onChange={(e) => setTempGuest(e.target.value)}
                  placeholder="e.g. Suresh Garu & Family"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4A843]/60 bg-white text-[#3D1C00] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingGuest(false)}
                  className="px-4 py-2 rounded-lg text-xs font-cinzel text-[#5C4033] hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#8B1A1A] hover:bg-[#680E0E] text-[#FFFDF9] text-xs font-cinzel font-semibold tracking-wider transition cursor-pointer shadow-md"
                >
                  Apply Name
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
