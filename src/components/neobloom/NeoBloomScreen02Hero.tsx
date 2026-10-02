import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, ArrowRight, ChevronDown, Menu } from 'lucide-react';
import { RuvvaLogo } from './RuvvaLogo';

interface Screen02Props {
  onNext?: () => void;
  onOpenMenu?: () => void;
}

export const NeoBloomScreen02Hero: React.FC<Screen02Props> = ({
  onNext,
  onOpenMenu,
}) => {
  return (
    <div className="relative w-full h-full min-h-[640px] sm:min-h-[700px] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EE] to-[#F5ECE1] text-stone-900 select-none">
      {/* Top Bar with Ruvva Logo and Hamburger Menu */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-4 pb-2">
        <RuvvaLogo size="sm" showSubtitle={false} />
        
        <button
          onClick={onOpenMenu}
          className="w-8 h-8 rounded-full bg-stone-100/80 hover:bg-stone-200 border border-stone-200 flex items-center justify-center text-stone-700 transition cursor-pointer"
          aria-label="Menu"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-2 text-center">
        {/* Tracked Uppercase Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] font-bold tracking-[0.2em] text-stone-600 uppercase mb-2"
        >
          Together is a beautiful place
        </motion.p>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-1"
        >
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            Arjun
            <br />
            <span className="font-light italic text-2xl sm:text-3xl text-stone-500 font-serif block -my-1">
              &amp;
            </span>
            Priya
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm sm:text-base font-medium text-stone-700 mb-4"
        >
          We&apos;re Getting Married!
        </motion.p>

        {/* Romantic Couple Photo in Soft Rounded Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative w-full max-w-[270px] sm:max-w-[290px] aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white mb-4 group"
        >
          <img
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
            alt="Arjun & Priya"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </motion.div>

        {/* Floating Date & Venue Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-[300px] bg-white rounded-2xl p-3.5 shadow-lg border border-stone-200/90 flex items-center justify-between text-left"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-stone-900">
              <Calendar className="w-3.5 h-3.5 text-stone-600 shrink-0" />
              <span>12 DEC 2026</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-stone-600 font-medium">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Vijayawada, Andhra Pradesh</span>
            </div>
          </div>

          <button
            onClick={onNext}
            className="w-9 h-9 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0 ml-2"
            aria-label="View Details"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Scroll to explore Cue */}
      <div className="relative z-10 pb-5 pt-1 flex flex-col items-center text-center">
        <button
          onClick={onNext}
          className="flex flex-col items-center text-[11px] font-medium text-stone-500 hover:text-stone-800 transition cursor-pointer group"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 text-stone-400 group-hover:text-stone-700 animate-bounce mt-0.5" />
        </button>
      </div>

      {/* Ambient background blur */}
      <div className="absolute top-1/4 -right-16 w-52 h-52 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-16 w-52 h-52 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
