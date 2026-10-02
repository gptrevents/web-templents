import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, Music, Volume2, VolumeX, Sparkles, Smartphone, Layers, LayoutGrid } from 'lucide-react';
import { CustomInvitationData } from '../../types';
import { RuvvaLogo } from './RuvvaLogo';
import { NeoBloomScreen01Opening } from './NeoBloomScreen01Opening';
import { NeoBloomScreen02Hero } from './NeoBloomScreen02Hero';
import { NeoBloomScreen03Story } from './NeoBloomScreen03Story';
import { NeoBloomScreen04Events } from './NeoBloomScreen04Events';
import { NeoBloomScreen05Countdown } from './NeoBloomScreen05Countdown';
import { NeoBloomScreen06Venue } from './NeoBloomScreen06Venue';
import { NeoBloomScreen07Families } from './NeoBloomScreen07Families';
import { NeoBloomScreen08RSVP } from './NeoBloomScreen08RSVP';
import { NeoBloomScreen09Wishes } from './NeoBloomScreen09Wishes';
import { NeoBloomScreen10Final } from './NeoBloomScreen10Final';
import { romanticAudio } from '../../utils/romanticAudio';

interface NeoBloomWebsiteProps {
  onBackToStore: () => void;
  customData: CustomInvitationData;
}

export const NeoBloomWebsite: React.FC<NeoBloomWebsiteProps> = ({
  onBackToStore,
  customData,
}) => {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [displayMode, setDisplayMode] = useState<'screen-by-screen' | 'continuous' | 'poster'>('screen-by-screen');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const screens = [
    {
      num: '01',
      title: 'Opening Screen',
      subtitle: 'A delightful start',
      component: (
        <NeoBloomScreen01Opening
          onNext={() => setActiveScreenIndex(1)}
          guestName={customData.guestName}
        />
      ),
    },
    {
      num: '02',
      title: 'Landing / Hero',
      subtitle: 'A bold introduction',
      component: (
        <NeoBloomScreen02Hero
          onNext={() => setActiveScreenIndex(2)}
          onOpenMenu={() => setIsMenuOpen(true)}
        />
      ),
    },
    {
      num: '03',
      title: 'Our Story',
      subtitle: 'A creative timeline',
      component: (
        <NeoBloomScreen03Story onNext={() => setActiveScreenIndex(3)} />
      ),
    },
    {
      num: '04',
      title: 'Celebrations / Events',
      subtitle: 'A modern event list',
      component: (
        <NeoBloomScreen04Events
          onSelectEvent={() => setActiveScreenIndex(5)}
          onOpenMenu={() => setIsMenuOpen(true)}
        />
      ),
    },
    {
      num: '05',
      title: 'Countdown',
      subtitle: 'A stunning visual',
      component: (
        <NeoBloomScreen05Countdown onOpenMenu={() => setIsMenuOpen(true)} />
      ),
    },
    {
      num: '06',
      title: 'Venue',
      subtitle: 'A unique layout',
      component: (
        <NeoBloomScreen06Venue onBack={() => setActiveScreenIndex(3)} />
      ),
    },
    {
      num: '07',
      title: 'Families',
      subtitle: 'A fresh & fun design',
      component: (
        <NeoBloomScreen07Families onBack={() => setActiveScreenIndex(5)} />
      ),
    },
    {
      num: '08',
      title: 'RSVP',
      subtitle: 'A playful interaction',
      component: (
        <NeoBloomScreen08RSVP
          onBack={() => setActiveScreenIndex(6)}
          onOpenMenu={() => setIsMenuOpen(true)}
          initialGuestName={customData.guestName}
        />
      ),
    },
    {
      num: '09',
      title: 'Wishes & Gifts',
      subtitle: 'A heartfelt space',
      component: (
        <NeoBloomScreen09Wishes onBack={() => setActiveScreenIndex(7)} />
      ),
    },
    {
      num: '10',
      title: 'Final Screen',
      subtitle: 'A warm goodbye',
      component: (
        <NeoBloomScreen10Final onOpenMenu={() => setIsMenuOpen(true)} />
      ),
    },
  ];

  const handleToggleMusic = () => {
    if (isPlayingMusic) {
      romanticAudio.stop();
      setIsPlayingMusic(false);
    } else {
      try {
        romanticAudio.start();
        setIsPlayingMusic(true);
      } catch (err) {
        console.error('Audio toggle error:', err);
      }
    }
  };

  const handleNextScreen = () => {
    setActiveScreenIndex((prev) => Math.min(screens.length - 1, prev + 1));
  };

  const handlePrevScreen = () => {
    setActiveScreenIndex((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F5F0] text-stone-900 flex flex-col items-center select-none pb-16">
      
      {/* Top Brand Bar & Controller */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-40 px-4 sm:px-6 py-3 shadow-2xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Left: Back Button & Ruvva Logo */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <button
              onClick={onBackToStore}
              className="px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-stone-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>అన్ని టెంప్లేట్లు</span>
            </button>

            <div className="flex items-center gap-2">
              <RuvvaLogo size="sm" showSubtitle={false} />
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-wider">
                Theme: NeoBloom (1:1)
              </span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleMusic}
              className={`p-2 rounded-full border transition cursor-pointer ${
                isPlayingMusic
                  ? 'bg-rose-500 border-rose-600 text-white shadow-md shadow-rose-500/30 animate-pulse'
                  : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200'
              }`}
              title={isPlayingMusic ? 'మ్యూజిక్ ఆఫ్ చేయండి' : 'మ్యూజిక్ ఆన్ చేయండి'}
            >
              {isPlayingMusic ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* Right: View Mode Toggle Tabs */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full border border-stone-200 text-xs font-medium">
            <button
              onClick={() => setDisplayMode('screen-by-screen')}
              className={`px-3 py-1 rounded-full transition flex items-center gap-1.5 cursor-pointer ${
                displayMode === 'screen-by-screen'
                  ? 'bg-white text-stone-900 font-bold shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-rose-500" />
              <span>📱 10 స్క్రీన్స్ (ఒక్కొక్కటి)</span>
            </button>

            <button
              onClick={() => setDisplayMode('continuous')}
              className={`px-3 py-1 rounded-full transition flex items-center gap-1.5 cursor-pointer ${
                displayMode === 'continuous'
                  ? 'bg-white text-stone-900 font-bold shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              <span>📜 కంటిన్యూయస్ స్క్రోల్</span>
            </button>

            <button
              onClick={() => setDisplayMode('poster')}
              className={`px-3 py-1 rounded-full transition flex items-center gap-1.5 cursor-pointer ${
                displayMode === 'poster'
                  ? 'bg-white text-stone-900 font-bold shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-teal-600" />
              <span>🖼️ షోకేస్ వ్యూ</span>
            </button>
          </div>

        </div>

        {/* 10 Screen Selector Pills (Exact Replica of image top pills) */}
        {displayMode === 'screen-by-screen' && (
          <div className="max-w-6xl mx-auto mt-2 pt-2 border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {screens.map((scr, idx) => {
              const isActive = idx === activeScreenIndex;
              return (
                <button
                  key={scr.num}
                  onClick={() => setActiveScreenIndex(idx)}
                  className={`px-2.5 py-1 rounded-full text-xs transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-rose-500 text-white font-bold shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200/70'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                      isActive ? 'bg-white text-rose-600' : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {scr.num}
                  </span>
                  <span>{scr.title}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Display Container */}
      <main className="w-full max-w-6xl mx-auto px-4 mt-6 flex-1 flex flex-col items-center">
        
        {/* Banner Tagline from Image */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs text-rose-600 font-serif italic mb-1">
            <span>Same Love, Different Stories, Always Special ♡</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Invitations for Life&apos;s Most Beautiful Moments ♡
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-sans">
            Bold • Modern • Unique • Made for Real Emotions
          </p>
        </div>

        {/* MODE 1: SCREEN-BY-SCREEN MOBILE PHONE SIMULATOR */}
        {displayMode === 'screen-by-screen' && (
          <div className="flex flex-col items-center w-full max-w-md">
            
            {/* Phone Frame */}
            <div className="relative w-full max-w-[360px] sm:max-w-[380px] bg-stone-950 rounded-[48px] p-3 shadow-2xl border-4 border-stone-800 ring-1 ring-black/40">
              
              {/* Speaker / Dynamic Island Top Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-stone-950 rounded-full z-30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-stone-800 mr-2" />
                <div className="w-8 h-1 rounded-full bg-stone-800" />
              </div>

              {/* Screen Canvas Container */}
              <div className="relative w-full aspect-[9/18.5] min-h-[660px] rounded-[38px] overflow-hidden bg-white shadow-inner flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScreenIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col"
                  >
                    {screens[activeScreenIndex].component}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="w-28 h-1 bg-stone-600 rounded-full mx-auto mt-2" />
            </div>

            {/* Previous / Next Controls */}
            <div className="flex items-center justify-between w-full max-w-[360px] sm:max-w-[380px] mt-4 px-2">
              <button
                onClick={handlePrevScreen}
                disabled={activeScreenIndex === 0}
                className="px-4 py-2 rounded-full bg-white hover:bg-stone-100 disabled:opacity-40 disabled:pointer-events-none text-stone-800 text-xs font-bold border border-stone-200 shadow-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>గత స్క్రీన్ (Prev)</span>
              </button>

              <span className="text-xs font-bold text-stone-600">
                {activeScreenIndex + 1} / {screens.length}
              </span>

              <button
                onClick={handleNextScreen}
                disabled={activeScreenIndex === screens.length - 1}
                className="px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold shadow-md shadow-rose-500/25 flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>తర్వాతి స్క్రీన్ (Next)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* MODE 2: CONTINUOUS SCROLL */}
        {displayMode === 'continuous' && (
          <div className="w-full max-w-md bg-stone-950 rounded-[44px] p-2.5 sm:p-3 shadow-2xl border-4 border-stone-800">
            <div className="w-full rounded-[36px] overflow-hidden bg-white shadow-inner divide-y divide-stone-200">
              {screens.map((scr) => (
                <div key={scr.num} className="w-full relative min-h-[660px]">
                  {scr.component}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODE 3: POSTER / SHOWCASE VIEW (ALL 10 SCREENS SIDE-BY-SIDE) */}
        {displayMode === 'poster' && (
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {screens.map((scr, idx) => (
                <div
                  key={scr.num}
                  onClick={() => {
                    setActiveScreenIndex(idx);
                    setDisplayMode('screen-by-screen');
                  }}
                  className="group bg-white rounded-3xl p-2 border border-stone-200/90 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between px-2 py-1 mb-1">
                    <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      {scr.num} {scr.title}
                    </span>
                    <span className="text-[10px] text-stone-400 group-hover:text-stone-700">
                      View ↗
                    </span>
                  </div>

                  {/* Thumbnail Container */}
                  <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden border border-stone-100 pointer-events-none transform scale-95 group-hover:scale-100 transition-transform">
                    {scr.component}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Footer Explore More Themes & Trust Strip from User's Image */}
      <footer className="w-full max-w-6xl mx-auto px-4 mt-16 pt-10 border-t border-stone-200">
        
        {/* Explore More Themes Strip */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="font-serif italic text-rose-600 text-lg">More Themes More Love ♡</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-1">
            Explore More Themes
          </h3>
          <p className="text-xs text-stone-500 mb-6">
            Different moods for different stories
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
            {[
              { name: 'NeoBloom (Current)', color: 'from-rose-500 to-pink-500', active: true },
              { name: 'Dark Mode', color: 'from-stone-900 to-stone-800' },
              { name: 'Glassmorphism', color: 'from-blue-400/80 to-indigo-500/80' },
              { name: 'Minimal White', color: 'from-stone-100 to-stone-200' },
              { name: 'Illustrative', color: 'from-amber-400 to-orange-500' },
              { name: '3D Playful', color: 'from-purple-400 to-pink-500' },
              { name: 'Retro Vibes', color: 'from-amber-600 to-yellow-700' },
              { name: 'Nature Touch', color: 'from-emerald-500 to-teal-700' },
              { name: 'Royal Elegance', color: 'from-amber-500 to-yellow-600' },
            ].map((theme, i) => (
              <div
                key={i}
                className={`p-2 rounded-2xl border transition-all text-center flex flex-col items-center ${
                  theme.active
                    ? 'bg-rose-50 border-rose-400 shadow-xs'
                    : 'bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                <div
                  className={`w-full aspect-[4/3] rounded-xl bg-gradient-to-tr ${theme.color} mb-2 shadow-2xs flex items-center justify-center text-white text-xs font-bold`}
                >
                  {theme.active ? '✓' : ''}
                </div>
                <span className="text-[10px] font-semibold text-stone-800 leading-tight">
                  {theme.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Badges from Bottom of Image */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-semibold text-stone-700">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-500">⚡</span>
            <span>Fast Loading</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-blue-500">📱</span>
            <span>Mobile Optimized</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-rose-500">🎨</span>
            <span>Beautiful Animations</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-purple-500">🔗</span>
            <span>Custom URL (ruvva.com/arjunpriya)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-500">🔒</span>
            <span>Secure &amp; Private</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-rose-600">🤍 Made with ❤️ in India</span>
          </div>
        </div>

        <div className="mt-8 text-center text-stone-500 text-xs font-serif italic">
          Celebrate • Invite • Remember • Forever ♡
        </div>

      </footer>

      {/* Slide-out Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-xs bg-white h-full p-6 shadow-2xl flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <RuvvaLogo size="sm" showSubtitle={false} />
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="py-4 space-y-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                    నావిగేషన్ (Navigation)
                  </span>
                  {screens.map((scr, idx) => (
                    <button
                      key={scr.num}
                      onClick={() => {
                        setActiveScreenIndex(idx);
                        setDisplayMode('screen-by-screen');
                        setIsMenuOpen(false);
                      }}
                      className={`w-full py-2 px-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                        idx === activeScreenIndex
                          ? 'bg-rose-50 text-rose-700 font-bold'
                          : 'hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-stone-400">{scr.num}</span>
                        <span>{scr.title}</span>
                      </div>
                      <span className="text-[10px] text-stone-400">{scr.subtitle}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 text-center">
                <button
                  onClick={handleToggleMusic}
                  className="w-full py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>{isPlayingMusic ? 'మ్యూజిక్ ఆఫ్' : 'మ్యూజిక్ ఆన్ చేయండి'}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
