import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Volume2, VolumeX, ArrowLeft, Heart, User, Sparkles } from 'lucide-react';
import { romanticAudio } from '../../utils/romanticAudio';

interface NeoBloomNavbarProps {
  onBackToStore: () => void;
  guestName: string;
  onUpdateGuestName: (name: string) => void;
}

export const NeoBloomNavbar: React.FC<NeoBloomNavbarProps> = ({
  onBackToStore,
  guestName,
  onUpdateGuestName,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(() => romanticAudio.getStatus());
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

  const toggleMusic = () => {
    const state = romanticAudio.toggle();
    setIsPlayingMusic(state);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'story', label: 'Our Story' },
    { id: 'events', label: 'Events' },
    { id: 'countdown', label: 'Countdown' },
    { id: 'families', label: 'Families' },
    { id: 'venue', label: 'Venue' },
    { id: 'rsvp', label: 'RSVP' },
    { id: 'wishes', label: 'Wishes' },
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
            ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(225,29,72,0.08)] py-2.5 border-b border-rose-100'
            : 'bg-white/85 backdrop-blur-sm py-3 border-b border-rose-100/60'
        }`}
      >
        {/* Rose-Gold Scroll Progress Line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-rose-500 via-pink-400 to-amber-400 origin-left z-50"
          style={{ scaleX }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Left: Back to Templates + Couple Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToStore}
              className="px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-rose-200/70"
              title="Return to Templates selection"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">అన్ని టెంప్లేట్లు</span>
              <span className="sm:hidden">Templates</span>
            </button>

            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center space-x-2 text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-amber-400 text-white font-serif font-bold text-xs flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                A&amp;P
              </div>
              <div className="hidden md:block">
                <span className="font-serif text-sm font-bold text-stone-900 tracking-wide leading-none block">
                  Arjun &amp; Priya
                </span>
                <span className="text-[10px] text-rose-600 font-medium tracking-wider block">
                  12 DEC 2026 • VIJAYAWADA
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-2.5 py-1 rounded-full text-xs font-medium text-stone-600 hover:text-rose-600 hover:bg-rose-50/80 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions: Guest Name + Music Player Toggle */}
          <div className="flex items-center space-x-2">
            
            {/* Guest Personalization Chip */}
            <button
              onClick={() => {
                setTempGuest(guestName);
                setIsEditingGuest(true);
              }}
              title="Click to personalize guest name"
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-rose-50/80 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs transition cursor-pointer"
            >
              <User className="w-3 h-3 text-rose-500" />
              <span className="max-w-[100px] truncate font-medium">{guestName || 'Guest'}</span>
            </button>

            {/* Romantic Music Player Button */}
            <button
              onClick={toggleMusic}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                isPlayingMusic
                  ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                  : 'bg-white text-rose-700 border-rose-200 hover:border-rose-400'
              }`}
              title={isPlayingMusic ? 'Mute Music' : 'Play Romantic Music'}
            >
              {isPlayingMusic ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">మ్యూజిక్</span>
                  {/* Equalizer waves */}
                  <div className="flex items-end space-x-0.5 h-3">
                    <span className="w-0.5 bg-white rounded-full animate-[bounce_0.8s_ease-in-out_infinite_alternate]" style={{ height: '70%' }} />
                    <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_ease-in-out_0.2s_infinite_alternate]" style={{ height: '100%' }} />
                    <span className="w-0.5 bg-white rounded-full animate-[bounce_0.9s_ease-in-out_0.4s_infinite_alternate]" style={{ height: '50%' }} />
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Music</span>
                </>
              )}
            </button>

          </div>
        </div>
      </header>

      {/* Guest Name Editor Modal */}
      {isEditingGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 border border-rose-200 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
              అతిథి పేరును మార్చండి
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              ఇన్విటేషన్‌లో కనిపించే మీ బంధుమిత్రుల పేరును నమోదు చేయండి:
            </p>
            <form onSubmit={handleSaveGuest}>
              <input
                type="text"
                value={tempGuest}
                onChange={(e) => setTempGuest(e.target.value)}
                placeholder="ఉదా: రమేష్ గారు & ఫ్యామిలీ"
                className="w-full px-4 py-2.5 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm mb-4"
                autoFocus
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditingGuest(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                >
                  రద్దు చేయి
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition cursor-pointer shadow-xs"
                >
                  సేవ్ చేయి
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
