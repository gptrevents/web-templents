import React from 'react';
import { motion } from 'motion/react';
import { TRADITIONAL_ASSETS, WEDDING_COUPLE } from '../../data/weddingData';
import { ChevronDown, Calendar, MapPin, Sparkles } from 'lucide-react';

interface TraditionalHeroProps {
  guestName: string;
  onExplore: () => void;
}

export const TraditionalHero: React.FC<TraditionalHeroProps> = ({
  guestName,
  onExplore,
}) => {
  return (
    <section className="relative w-full min-h-[92vh] flex flex-col items-center justify-between text-center overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FDF5E6] to-[#F5EBD5] pt-14 pb-16 px-4 sm:px-6">
      
      {/* Top Toran Mango Leaves Garland Header */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 overflow-hidden pointer-events-none flex justify-center z-10">
        <img
          src={TRADITIONAL_ASSETS.garlandHeader}
          alt="Traditional Toran"
          className="w-full h-full object-cover object-top opacity-95 animate-toran-1"
        />
      </div>

      {/* Background Temple Gopuram Architectural Backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.07] overflow-hidden z-0">
        <img
          src={TRADITIONAL_ASSETS.gopuram}
          alt="Temple Gopuram"
          className="w-full max-w-2xl h-auto object-contain translate-y-16"
        />
      </div>

      {/* Rotating Background Gold Mandala */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] pointer-events-none opacity-[0.06] animate-mandala-spin z-0">
        <img
          src={TRADITIONAL_ASSETS.mandalaGold}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Top Auspicious Invocation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center mt-6"
      >
        {/* Lord Ganesha Icon with Radiant Aura */}
        <motion.div
          initial={{ scale: 0.8, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative w-20 h-20 sm:w-24 sm:h-24 p-2.5 rounded-full bg-[#FFFBF2] border border-[#D4A843]/60 shadow-[0_8px_24px_rgba(212,168,67,0.25)] flex items-center justify-center mb-3"
        >
          <img
            src={TRADITIONAL_ASSETS.ganesha}
            alt="Lord Ganesha"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Traditional Auspicious Words */}
        <p className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.25em] text-[#8B1A1A] uppercase">
          || శ్రీ గణాధిపతయే నమః ||
        </p>
        <p className="font-telugu text-[11px] sm:text-xs text-[#8B1A1A]/80 tracking-widest mt-1">
          {WEDDING_COUPLE.blessingTelugu}
        </p>

        {/* Personalized Guest Welcome */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-4 px-4 py-1.5 rounded-full bg-[#8B1A1A]/8 border border-[#8B1A1A]/20"
        >
          <span className="text-xs sm:text-sm font-cinzel font-medium text-[#8B1A1A]">
            Warm Welcome to <strong className="font-semibold text-[#680E0E]">{guestName || 'Our Respected Guest'}</strong>
          </span>
        </motion.div>
      </motion.div>

      {/* Central Couple Announcement */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 my-6 max-w-2xl mx-auto flex flex-col items-center"
      >
        <p className="font-cormorant italic text-sm sm:text-base text-[#5C4033] tracking-wider mb-2">
          Together with their families, cordially invite your gracious company and blessings at the wedding of
        </p>

        {/* Couple Names in Grand Serif Typography */}
        <div className="flex flex-col items-center my-3">
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#8B1A1A] tracking-tight drop-shadow-sm">
            {WEDDING_COUPLE.fullNameGroom}
          </h1>
          <p className="text-xs sm:text-sm font-cinzel text-[#5C4033] mt-1">
            ({WEDDING_COUPLE.groomGotram}) • {WEDDING_COUPLE.groomParentLabel} {WEDDING_COUPLE.groomParents}
          </p>

          <div className="my-2 flex items-center space-x-3">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4A843]" />
            <span className="font-script text-3xl sm:text-4xl text-[#D4A843] px-2 font-normal">
              weds
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4A843]" />
          </div>

          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#8B1A1A] tracking-tight drop-shadow-sm">
            {WEDDING_COUPLE.fullNameBride}
          </h1>
          <p className="text-xs sm:text-sm font-cinzel text-[#5C4033] mt-1">
            ({WEDDING_COUPLE.brideGotram}) • {WEDDING_COUPLE.brideParentLabel} {WEDDING_COUPLE.brideParents}
          </p>
        </div>

        {/* Gold Traditional Ornament Divider */}
        <div className="w-56 h-6 my-2 opacity-90">
          <img
            src={TRADITIONAL_ASSETS.goldDivider}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* Sacred Muhurtham Date, Time & City */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="mt-3 px-6 py-3 rounded-2xl bg-white/70 backdrop-blur-xs border border-[#D4A843]/50 shadow-sm flex flex-col items-center"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-cinzel font-bold text-[#8B1A1A] tracking-wider">
            <Calendar className="w-4 h-4 text-[#D4A843]" />
            <span>{WEDDING_COUPLE.weddingDateDisplay}</span>
          </div>
          <p className="text-xs font-sans-clean font-medium text-[#5C4033] mt-1">
            {WEDDING_COUPLE.weddingTimeDisplay}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-[#8B1A1A] font-cinzel mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>{WEDDING_COUPLE.primaryVenue}, {WEDDING_COUPLE.city}</span>
          </div>
        </motion.div>

        {/* Sacred Telugu Mangalasutra Shloka */}
        <div className="mt-5 max-w-lg px-4 py-2 rounded-xl bg-[#8B1A1A]/5 border border-[#8B1A1A]/10">
          <p className="font-telugu text-xs sm:text-sm text-[#8B1A1A] italic leading-relaxed">
            "{WEDDING_COUPLE.mangalyamShloka}"
          </p>
        </div>
      </motion.div>

      {/* Bottom Scroll Cue Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 flex flex-col items-center"
      >
        <button
          onClick={onExplore}
          className="group flex flex-col items-center text-[#8B1A1A] hover:text-[#B8860B] transition-colors cursor-pointer"
        >
          <span className="text-[11px] font-cinzel font-semibold tracking-[0.2em] uppercase">
            Scroll to Explore
          </span>
          <ChevronDown className="w-5 h-5 mt-1 animate-bounce text-[#D4A843]" />
        </button>
      </motion.div>
    </section>
  );
};
