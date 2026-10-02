import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { RuvvaLogo } from './RuvvaLogo';

interface Screen05Props {
  onOpenMenu?: () => void;
}

export const NeoBloomScreen05Countdown: React.FC<Screen05Props> = ({ onOpenMenu }) => {
  const weddingDate = new Date('2026-12-12T09:30:00');

  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = weddingDate.getTime() - new Date().getTime();
    if (diff <= 0) return { days: 82, hours: 14, minutes: 37, seconds: 21 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = weddingDate.getTime() - new Date().getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[640px] sm:min-h-[700px] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#0B1E38] via-[#0E2748] to-[#081220] text-white select-none">
      {/* Background Starry Bokeh Lights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#1B3D6B_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with Ruvva Logo and Menu */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-4 pb-2">
        <RuvvaLogo size="sm" isDark={true} showSubtitle={false} />
        
        <button
          onClick={onOpenMenu}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition cursor-pointer"
          aria-label="Menu"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Title */}
      <div className="relative z-10 px-6 pt-1 text-center">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
          Counting
          <br />
          Down to
          <br />
          Forever <span className="text-rose-400 font-normal">♡</span>
        </h2>
      </div>

      {/* 4 Circular Frosted Glass Countdown Badges (2x2 Grid) */}
      <div className="relative z-10 px-6 py-2 my-auto max-w-[280px] sm:max-w-[300px] mx-auto w-full">
        <div className="grid grid-cols-2 gap-4 place-items-center">
          {/* Days */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 sm:w-26 sm:h-26 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex flex-col items-center justify-center text-center group hover:bg-white/15 transition-all"
          >
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {timeLeft.days}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-blue-200 uppercase tracking-wider mt-0.5">
              Days
            </span>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="w-24 h-24 sm:w-26 sm:h-26 rounded-full bg-rose-500/20 backdrop-blur-md border border-rose-400/30 shadow-xl flex flex-col items-center justify-center text-center group hover:bg-rose-500/30 transition-all"
          >
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {timeLeft.hours}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-rose-200 uppercase tracking-wider mt-0.5">
              Hours
            </span>
          </motion.div>

          {/* Minutes */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="w-24 h-24 sm:w-26 sm:h-26 rounded-full bg-rose-500/20 backdrop-blur-md border border-rose-400/30 shadow-xl flex flex-col items-center justify-center text-center group hover:bg-rose-500/30 transition-all"
          >
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {timeLeft.minutes}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-rose-200 uppercase tracking-wider mt-0.5">
              Minutes
            </span>
          </motion.div>

          {/* Seconds */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="w-24 h-24 sm:w-26 sm:h-26 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/30 shadow-xl flex flex-col items-center justify-center text-center group hover:bg-amber-500/30 transition-all"
          >
            <span className="text-2xl sm:text-3xl font-bold text-amber-300 tracking-tight font-mono">
              {timeLeft.seconds}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-amber-200 uppercase tracking-wider mt-0.5">
              Seconds
            </span>
          </motion.div>
        </div>

        {/* Date Marker */}
        <div className="mt-3 text-center">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-white/90 uppercase">
            12 • DEC • 2026
          </span>
        </div>
      </div>

      {/* Romantic Photo: Couple in Bohemian Wedding Lounge */}
      <div className="relative z-10 px-6 max-w-[300px] mx-auto w-full">
        <div className="w-full h-32 sm:h-36 rounded-2xl overflow-hidden shadow-2xl border border-white/20 relative">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
            alt="Wedding Celebration Lounge"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* Bottom Cursive Script */}
      <div className="relative z-10 pb-5 pt-2 px-6 text-center">
        <p className="font-serif italic text-xs sm:text-[13px] text-blue-200">
          Good Vibes,
          <br />
          Great People &amp;
          <br />
          <span className="text-white font-semibold">Unforgettable Day ♡</span>
        </p>
      </div>
    </div>
  );
};
