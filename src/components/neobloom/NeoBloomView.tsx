import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Share2,
  ChevronLeft,
  ChevronRight,
  Heart,
  Grid,
  Maximize2
} from 'lucide-react';
import { CustomInvitationData } from '../../types';

// The 10 individual screens from user's image
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
import { RuvvaLogo } from './RuvvaLogo';

interface NeoBloomViewProps {
  customData: CustomInvitationData;
  onBackToStore: () => void;
}

export const NeoBloomView: React.FC<NeoBloomViewProps> = ({
  customData,
  onBackToStore,
}) => {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'mobile' | 'overview'>('mobile');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const guestName = customData.guestName || 'రోహిత్ కుమార్ (Guest)';

  const screens = [
    {
      num: '01',
      title: 'Opening Screen',
      subtitle: 'A delightful start',
      badgeBg: 'bg-rose-500',
      component: (
        <NeoBloomScreen01Opening
          onNext={() => setActiveScreenIndex(1)}
          guestName={guestName}
        />
      ),
    },
    {
      num: '02',
      title: 'Landing / Hero',
      subtitle: 'A bold introduction',
      badgeBg: 'bg-teal-600',
      component: (
        <NeoBloomScreen02Hero
          onNext={() => setActiveScreenIndex(2)}
        />
      ),
    },
    {
      num: '03',
      title: 'Our Story',
      subtitle: 'A creative timeline',
      badgeBg: 'bg-rose-600',
      component: <NeoBloomScreen03Story />,
    },
    {
      num: '04',
      title: 'Celebrations / Events',
      subtitle: 'A modern event list',
      badgeBg: 'bg-emerald-700',
      component: <NeoBloomScreen04Events />,
    },
    {
      num: '05',
      title: 'Countdown',
      subtitle: 'A stunning visual',
      badgeBg: 'bg-blue-600',
      component: <NeoBloomScreen05Countdown />,
    },
    {
      num: '06',
      title: 'Venue',
      subtitle: 'A unique layout',
      badgeBg: 'bg-rose-700',
      component: (
        <NeoBloomScreen06Venue
          onBack={() => setActiveScreenIndex(4)}
        />
      ),
    },
    {
      num: '07',
      title: 'Families',
      subtitle: 'A fresh & fun design',
      badgeBg: 'bg-amber-600',
      component: (
        <NeoBloomScreen07Families
          onBack={() => setActiveScreenIndex(5)}
        />
      ),
    },
    {
      num: '08',
      title: 'RSVP',
      subtitle: 'A playful interaction',
      badgeBg: 'bg-pink-600',
      component: (
        <NeoBloomScreen08RSVP
          onBack={() => setActiveScreenIndex(6)}
          initialGuestName={guestName}
        />
      ),
    },
    {
      num: '09',
      title: 'Wishes & Gifts',
      subtitle: 'A heartfelt space',
      badgeBg: 'bg-teal-600',
      component: (
        <NeoBloomScreen09Wishes
          onBack={() => setActiveScreenIndex(7)}
        />
      ),
    },
    {
      num: '10',
      title: 'Final Screen',
      subtitle: 'A warm goodbye',
      badgeBg: 'bg-indigo-600',
      component: <NeoBloomScreen10Final />,
    },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Arjun & Priya Wedding Invitation - NeoBloom',
        text: 'Join us in celebrating our wedding!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F5F2] text-stone-900 flex flex-col font-sans select-none pb-20">
      
      {/* ── 1. EXACT TOP HEADER POSTER FROM REFERENCE IMAGE ── */}
      <div className="w-full bg-[#FCF8F5] border-b border-stone-200/70 pt-6 pb-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Brand Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <RuvvaLogo size="lg" showSubtitle={true} />
          </div>

          {/* Center Calligraphy */}
          <div className="text-center">
            <p
              className="text-2xl sm:text-3xl text-stone-800 drop-shadow-2xs"
              style={{ fontFamily: "'Caveat', 'Dancing Script', cursive", fontWeight: 700 }}
            >
              Invitations for Life&apos;s Most Beautiful Moments <span className="text-rose-500">♡</span>
            </p>
            <div className="inline-block mt-1 px-3 py-0.5 rounded-full bg-rose-50 border border-rose-200/80 text-[11px] text-rose-600 font-serif italic">
              .Same Love, Different Stories, Always Special ♡
            </div>
          </div>

          {/* Right: Theme Badge Pill */}
          <div className="flex flex-col items-center md:items-end">
            <div className="bg-[#1C2024] text-white px-4 py-2 rounded-2xl shadow-md text-center md:text-right border border-stone-700">
              <span className="text-[10px] uppercase tracking-wider text-rose-300 block font-semibold">
                Theme
              </span>
              <span className="text-base sm:text-lg font-serif font-bold text-white block -my-0.5">
                NeoBloom
              </span>
              <span className="text-[10px] text-stone-300 block mt-0.5">
                Bold • Modern • Unique • Made for Real Emotions
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── 2. INTERACTIVE CONTROLS BAR ── */}
      <div className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs py-2 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          
          {/* Mode switch */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full border border-stone-200">
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>మొబైల్ ఫోన్ వ్యూ (Interactive Phone)</span>
            </button>

            <button
              onClick={() => setViewMode('overview')}
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'overview'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>10 స్క్రీన్లు ఒకేసారి (All 10 Screens)</span>
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlayingMusic(!isPlayingMusic)}
              className={`p-2 rounded-full border transition cursor-pointer ${
                isPlayingMusic
                  ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
              title={isPlayingMusic ? 'Mute Music' : 'Play Music'}
            >
              {isPlayingMusic ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 transition cursor-pointer"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* ── 3. VIEW MODE A: REALISTIC MOBILE PHONE VIEW (1 SCREEN AT A TIME, EXACT ASPECT RATIO) ── */}
      {viewMode === 'mobile' && (
        <div className="w-full max-w-4xl mx-auto px-4 mt-6 flex flex-col items-center">
          
          {/* Numbers Navigator Pills Bar (01 to 10 matching user image) */}
          <div className="w-full overflow-x-auto no-scrollbar py-2 mb-4 flex items-center justify-start sm:justify-center gap-2 px-2">
            {screens.map((scr, idx) => (
              <button
                key={scr.num}
                onClick={() => setActiveScreenIndex(idx)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeScreenIndex === idx
                    ? `${scr.badgeBg} text-white shadow-md scale-105`
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                <span className="opacity-90">{scr.num}</span>
                <span className="hidden md:inline font-normal">• {scr.title}</span>
              </button>
            ))}
          </div>

          {/* Active Screen Info Header */}
          <div className="mb-3 text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600">
              Screen {screens[activeScreenIndex].num} / 10
            </span>
            <h2 className="text-lg font-serif font-bold text-stone-900">
              {screens[activeScreenIndex].title} —{' '}
              <span className="italic font-normal text-stone-500 text-sm">
                {screens[activeScreenIndex].subtitle}
              </span>
            </h2>
          </div>

          {/* Clean Mobile Screen Box without bloated borders */}
          <div className="relative w-full max-w-[360px] sm:max-w-[375px] bg-black rounded-[44px] p-2 sm:p-2.5 shadow-2xl border-4 border-stone-800">
            {/* Phone Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-stone-950 rounded-full z-30 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-800 mr-2" />
              <div className="w-8 h-1 rounded-full bg-stone-800" />
            </div>

            {/* Content Body */}
            <div className="relative w-full h-[680px] sm:h-[720px] rounded-[36px] overflow-hidden bg-white shadow-inner flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreenIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full flex flex-col"
                >
                  {screens[activeScreenIndex].component}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Home Swipe Bar */}
            <div className="w-28 h-1 bg-stone-500 rounded-full mx-auto mt-2 mb-0.5" />
          </div>

          {/* Next / Previous Switch Buttons */}
          <div className="flex items-center justify-between w-full max-w-[360px] sm:max-w-[375px] mt-4 px-2">
            <button
              onClick={() => setActiveScreenIndex(Math.max(0, activeScreenIndex - 1))}
              disabled={activeScreenIndex === 0}
              className="px-4 py-2 rounded-full bg-white hover:bg-stone-100 disabled:opacity-30 disabled:pointer-events-none text-stone-800 text-xs font-bold border border-stone-200 shadow-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>గత స్క్రీన్ (Prev)</span>
            </button>

            <span className="text-xs font-bold text-stone-500">
              {activeScreenIndex + 1} of 10
            </span>

            <button
              onClick={() => setActiveScreenIndex(Math.min(screens.length - 1, activeScreenIndex + 1))}
              disabled={activeScreenIndex === screens.length - 1}
              className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 disabled:opacity-30 disabled:pointer-events-none text-white text-xs font-bold shadow-md shadow-rose-600/25 flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>తర్వాతి స్క్రీన్ (Next)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ── 4. VIEW MODE B: 10-SCREEN GRID OVERVIEW (EXACT 2-ROW POSTER LAYOUT AS IN USER'S IMAGE) ── */}
      {viewMode === 'overview' && (
        <div className="w-full max-w-7xl mx-auto px-4 mt-6">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              All 10 Screens Side-by-Side (ఇమేజ్ లాగే 10 స్క్రీన్‌లు)
            </h2>
            <p className="text-xs text-stone-500">
              Click any screen to open and interact in full phone view
            </p>
          </div>

          {/* 5-Column Grid exactly like top row (1-5) and bottom row (6-10) in image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {screens.map((scr, idx) => (
              <div key={scr.num} className="flex flex-col items-center">
                
                {/* Header label like user's image */}
                <div className="flex items-center gap-2 mb-2 text-left w-full max-w-[280px]">
                  <div
                    className={`w-6 h-6 rounded-full ${scr.badgeBg} text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs`}
                  >
                    {scr.num}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-stone-900 leading-tight truncate">
                      {scr.title}
                    </h3>
                    <p className="text-[10px] text-stone-500 leading-tight truncate">
                      {scr.subtitle}
                    </p>
                  </div>
                </div>

                {/* Scaled Mini Phone Container */}
                <div
                  onClick={() => {
                    setActiveScreenIndex(idx);
                    setViewMode('mobile');
                  }}
                  className="w-full max-w-[280px] h-[520px] rounded-3xl overflow-hidden shadow-lg border-2 border-stone-300 hover:border-rose-500 hover:shadow-2xl transition-all cursor-pointer relative bg-white group"
                >
                  <div className="w-full h-full transform scale-90 origin-top pointer-events-none">
                    {scr.component}
                  </div>

                  <div className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/10 transition-colors flex items-end justify-center pb-4">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                      Open Screen {scr.num} ↗
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 5. EXACT FOOTER STRIP FROM REFERENCE IMAGE: EXPLORE MORE THEMES & TRUST BADGES ── */}
      <footer className="w-full max-w-6xl mx-auto px-4 mt-16 pt-8 border-t border-stone-300">
        
        {/* Explore More Themes Strip */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-rose-600 font-serif italic mb-1">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>More Themes, More Love ♡</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-0.5">
            Explore More Themes
          </h3>
          <p className="text-xs text-stone-500 mb-5">
            Different moods for different stories
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2.5">
            {[
              { name: 'NeoBloom', color: 'from-rose-500 to-pink-500', active: true, tag: '(Current)' },
              { name: 'Dark Mode', color: 'from-stone-900 to-stone-800' },
              { name: 'Glassmorphism', color: 'from-blue-400 to-indigo-500' },
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
                  className={`w-full aspect-[4/3] rounded-xl bg-gradient-to-tr ${theme.color} mb-1.5 shadow-2xs flex items-center justify-center text-white text-[11px] font-bold`}
                >
                  {theme.active ? '✓' : ''}
                </div>
                <span className="text-[10px] font-semibold text-stone-800 leading-tight">
                  {theme.name}
                </span>
                {theme.tag && (
                  <span className="text-[9px] text-rose-600 font-bold block">
                    {theme.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Feature Badges from Bottom of Image */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-semibold text-stone-700">
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
            <span>Custom URL (e.g. ruvva.com/arjunpriya)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-500">🔒</span>
            <span>Secure &amp; Private</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-rose-500">❤️</span>
            <span>Made with love in India</span>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-stone-400">
          © 2026 Ruvva Invitations • All Rights Reserved
        </div>

      </footer>

    </div>
  );
};
