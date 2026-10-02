import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';
import { RuvvaLogo } from './RuvvaLogo';

interface Screen01Props {
  onNext?: () => void;
  guestName?: string;
}

export const NeoBloomScreen01Opening: React.FC<Screen01Props> = ({
  onNext,
  guestName = 'బంధుమిత్రులు (Guest)',
}) => {
  return (
    <div className="relative w-full h-full min-h-[640px] sm:min-h-[700px] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FFF5E5] via-[#FCE4B8] to-[#0A1224] text-stone-900 select-none">
      
      {/* Top Phone Status Bar */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-3 pb-1 text-stone-800 text-[11px] font-semibold">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-xs">
          <span>📶</span>
          <span>⚡</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Top Brand Logo Section */}
      <div className="relative z-10 flex flex-col items-center pt-1 px-4 text-center">
        <RuvvaLogo size="md" showSubtitle={false} />
      </div>

      {/* Cursive Handwriting Headline matching user's reference image */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-6 text-center my-auto"
      >
        <div className="inline-block">
          <p
            className="text-4xl sm:text-5xl text-stone-800 leading-[1.15] drop-shadow-2xs"
            style={{ fontFamily: "'Caveat', 'Dancing Script', cursive", fontWeight: 600 }}
          >
            Good
            <br />
            People
            <br />
            Create
            <br />
            <span className="text-stone-950 font-bold">Beautiful</span>
            <br />
            Moments <span className="text-rose-500">♡</span>
          </p>
        </div>

        {guestName && guestName !== 'బంధుమిత్రులు (Guest)' && (
          <div className="mt-2 inline-block px-3 py-1 rounded-full bg-white/70 backdrop-blur-xs border border-amber-200 text-xs text-stone-800 font-medium">
            For: <span className="font-bold text-stone-900">{guestName}</span>
          </div>
        )}
      </motion.div>

      {/* Central Couple Silhouette on Balcony with Sunset & Warm Lanterns */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative z-10 w-full px-6 flex flex-col items-center"
      >
        <div className="relative w-full max-w-[280px] sm:max-w-[300px] h-44 sm:h-48 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
            alt="Romantic Couple Sunset"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1224]/85 via-transparent to-transparent" />
          
          {/* Subtle Lanterns floating glow */}
          <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-amber-300 text-xs">
            <span className="animate-pulse">🏮</span>
            <span className="text-[10px] text-amber-200/90 font-medium tracking-wide">Warm Lanterns &amp; Starlight</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom CTA Pill & Subtitle */}
      <div className="relative z-10 w-full px-6 pb-6 pt-4 flex flex-col items-center">
        {/* Rounded Pill CTA */}
        <div className="w-full max-w-[320px] bg-white/95 backdrop-blur-md rounded-full pl-5 pr-2 py-2 flex items-center justify-between shadow-xl border border-stone-200/80 mb-3 group hover:border-rose-400 transition-all">
          <span className="text-xs sm:text-[13px] font-medium text-stone-700 leading-tight">
            Let&apos;s celebrate
            <br />
            <span className="font-bold text-stone-900">your beautiful story</span>
          </span>
          
          <button
            onClick={onNext}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md shadow-rose-500/30 group-hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
            aria-label="Enter Invitation"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Tagline */}
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-stone-400 font-medium">
          <span>Events</span>
          <span>•</span>
          <span>Invitations</span>
          <span>•</span>
          <span>Memories</span>
        </div>
      </div>

      {/* Background Decorative Waves & Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft yellow radial top */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl" />
        {/* Night blue bottom wave */}
        <div className="absolute -bottom-10 left-0 right-0 h-48 bg-gradient-to-t from-[#0A1224] to-transparent" />
      </div>
    </div>
  );
};
