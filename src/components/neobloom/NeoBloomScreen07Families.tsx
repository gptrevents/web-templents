import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, Heart } from 'lucide-react';

interface Screen07Props {
  onBack?: () => void;
}

export const NeoBloomScreen07Families: React.FC<Screen07Props> = ({ onBack }) => {
  return (
    <div className="relative w-full h-full min-h-[640px] sm:min-h-[700px] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EC] to-[#F3E7DC] text-stone-900 select-none">
      {/* Top Bar with Back Arrow and Sparkle */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-4 pb-2">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200 flex items-center justify-center text-stone-700 transition cursor-pointer"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="w-7 h-7 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10 px-6 pt-1 text-center">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
          Our Families
        </h2>
        <p className="text-[11px] sm:text-xs text-stone-500 font-serif italic mt-0.5">
          Two families, one love
        </p>
      </div>

      {/* 2 Side-by-Side Rounded Arch Cards */}
      <div className="relative z-10 px-5 sm:px-6 py-2 my-auto max-w-[340px] mx-auto w-full">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Bride's Family Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-3 pt-4 border border-rose-200/90 shadow-md flex flex-col items-center text-center"
          >
            {/* Illustrated Bride Avatar */}
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-rose-100/80 border-2 border-rose-300 overflow-hidden flex items-center justify-center p-1 mb-2 shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                alt="Bride Avatar"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Badge */}
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/60 uppercase tracking-wider mb-2">
              Bride&apos;s Family
            </span>

            {/* Details */}
            <div className="text-[11px] text-stone-700 leading-snug">
              <span className="text-[10px] text-stone-500 block mb-0.5">Daughter of</span>
              <p className="font-bold text-stone-900">Mr. Suresh Kumar</p>
              <p className="font-bold text-stone-900">&amp; Mrs. Lakshmi Devi</p>
            </div>
          </motion.div>

          {/* Groom's Family Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-3 pt-4 border border-blue-200/90 shadow-md flex flex-col items-center text-center"
          >
            {/* Illustrated Groom Avatar */}
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-blue-100/80 border-2 border-blue-300 overflow-hidden flex items-center justify-center p-1 mb-2 shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                alt="Groom Avatar"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Badge */}
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60 uppercase tracking-wider mb-2">
              Groom&apos;s Family
            </span>

            {/* Details */}
            <div className="text-[11px] text-stone-700 leading-snug">
              <span className="text-[10px] text-stone-500 block mb-0.5">Son of</span>
              <p className="font-bold text-stone-900">Mr. Ramesh Babu</p>
              <p className="font-bold text-stone-900">&amp; Mrs. Padmaja</p>
            </div>
          </motion.div>
        </div>

        {/* Curvy Peach / Blush Banner with Script */}
        <div className="mt-4 bg-[#FCECE4] rounded-2xl p-3 text-center border border-amber-200/60 shadow-2xs">
          <p className="font-serif italic text-xs sm:text-[13px] text-stone-800 leading-relaxed">
            Different roots,
            <br />
            Same blessings,
            <br />
            <span className="font-bold text-stone-900">One beautiful journey ♡</span>
          </p>
          <div className="flex justify-center mt-1">
            <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
          </div>
        </div>
      </div>

      {/* Traditional Heritage Palace Arch Silhouette Illustration */}
      <div className="relative z-10 w-full px-6 pb-4 pt-1 flex justify-center">
        <div className="w-full max-w-[280px] h-20 rounded-t-3xl overflow-hidden relative opacity-90 border-t border-x border-amber-300/40 bg-gradient-to-t from-amber-100 to-transparent flex items-end justify-center pb-1">
          <img
            src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=500&q=80"
            alt="Heritage Palace Mandapam"
            className="w-full h-full object-cover rounded-t-3xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F3E7DC] via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
};
