import React from 'react';
import { motion } from 'motion/react';
import { TRADITIONAL_ASSETS, WEDDING_COUPLE } from '../../data/weddingData';
import { Heart, Sparkles } from 'lucide-react';
import { CornerOrnament } from './WeddingBorders';

export const AboutCouple: React.FC = () => {
  return (
    <section id="couple" className="relative w-full py-16 px-4 sm:px-6 bg-transparent overflow-hidden">
      
      {/* Decorative Golden Mandala Accent */}
      <div className="absolute -top-16 -right-16 w-64 h-64 pointer-events-none opacity-15 animate-mandala-spin">
        <img src={TRADITIONAL_ASSETS.mandalaGold} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center mb-10"
        >
          <span className="text-xs font-cinzel font-semibold tracking-[0.25em] text-[#D4A843] uppercase mb-1">
            Soulmates United By Destiny
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#8B1A1A] tracking-wide">
            About the Couple
          </h2>
          <div className="w-40 h-4 my-2 opacity-85">
            <img src={TRADITIONAL_ASSETS.goldDivider} alt="" className="w-full h-full object-contain" />
          </div>
          <p className="font-cormorant italic text-sm sm:text-base text-[#5C4033] max-w-lg mt-1">
            {WEDDING_COUPLE.blessingQuote}
          </p>
        </motion.div>

        {/* Groom & Bride Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 w-full max-w-3xl items-center">
          
          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="relative flex flex-col items-center p-6 rounded-2xl bg-gradient-to-b from-[#FFF5DE] via-[#FCECC7] to-[#F8E1B5] border-2 border-[#D4A843]/60 shadow-[0_12px_28px_rgba(139,26,26,0.12)] hover:shadow-xl transition-all"
          >
            <CornerOrnament position="top-left" className="absolute top-2 left-2 opacity-60" size={28} />
            <CornerOrnament position="top-right" className="absolute top-2 right-2 opacity-60" size={28} />
            
            {/* Framed Portrait with Ornate Gold Ring */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-2 bg-gradient-to-tr from-[#D4A843] via-[#F3DC9B] to-[#8B1A1A] shadow-lg mb-4">
              <img
                src={WEDDING_COUPLE.groomPhoto}
                alt={WEDDING_COUPLE.fullNameGroom}
                className="w-full h-full object-cover rounded-full border-2 border-[#F3DC9B]"
              />
              <div className="absolute -bottom-2 right-2 w-8 h-8 rounded-full bg-[#8B1A1A] text-[#F3DC9B] flex items-center justify-center border border-[#F3DC9B] shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <span className="text-[11px] font-cinzel font-semibold tracking-widest text-[#B8860B] uppercase">
              The Groom
            </span>
            <h3 className="font-playfair text-2xl font-bold text-[#8B1A1A] mt-0.5">
              {WEDDING_COUPLE.fullNameGroom}
            </h3>

            <div className="mt-3 pt-3 border-t border-[#D4A843]/40 w-full text-center">
              <p className="text-xs font-cinzel text-[#8B1A1A] font-semibold">
                {WEDDING_COUPLE.groomGotram}
              </p>
              <p className="text-xs text-[#5C4033] mt-1 font-sans-clean">
                {WEDDING_COUPLE.groomParentLabel} <br />
                <strong className="text-[#3D1C00] font-medium">{WEDDING_COUPLE.groomParents}</strong>
              </p>
            </div>
          </motion.div>

          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="relative flex flex-col items-center p-6 rounded-2xl bg-gradient-to-b from-[#FFF5DE] via-[#FCECC7] to-[#F8E1B5] border-2 border-[#D4A843]/60 shadow-[0_12px_28px_rgba(139,26,26,0.12)] hover:shadow-xl transition-all"
          >
            <CornerOrnament position="top-left" className="absolute top-2 left-2 opacity-60" size={28} />
            <CornerOrnament position="top-right" className="absolute top-2 right-2 opacity-60" size={28} />
            
            {/* Framed Portrait with Ornate Gold Ring */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-2 bg-gradient-to-tr from-[#8B1A1A] via-[#F3DC9B] to-[#D4A843] shadow-lg mb-4">
              <img
                src={WEDDING_COUPLE.bridePhoto}
                alt={WEDDING_COUPLE.fullNameBride}
                className="w-full h-full object-cover rounded-full border-2 border-[#F3DC9B]"
              />
              <div className="absolute -bottom-2 right-2 w-8 h-8 rounded-full bg-[#8B1A1A] text-[#F3DC9B] flex items-center justify-center border border-[#F3DC9B] shadow-sm">
                <Heart className="w-4 h-4 fill-current" />
              </div>
            </div>

            <span className="text-[11px] font-cinzel font-semibold tracking-widest text-[#B8860B] uppercase">
              The Bride
            </span>
            <h3 className="font-playfair text-2xl font-bold text-[#8B1A1A] mt-0.5">
              {WEDDING_COUPLE.fullNameBride}
            </h3>

            <div className="mt-3 pt-3 border-t border-[#D4A843]/40 w-full text-center">
              <p className="text-xs font-cinzel text-[#8B1A1A] font-semibold">
                {WEDDING_COUPLE.brideGotram}
              </p>
              <p className="text-xs text-[#5C4033] mt-1 font-sans-clean">
                {WEDDING_COUPLE.brideParentLabel} <br />
                <strong className="text-[#3D1C00] font-medium">{WEDDING_COUPLE.brideParents}</strong>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Traditional Sacred Kalash Centerpiece Motif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-12 flex flex-col items-center"
        >
          <div className="w-12 h-12 p-1 rounded-full bg-[#FFF3DC] border-2 border-[#D4A843]/70 shadow-md flex items-center justify-center mb-2">
            <img src={TRADITIONAL_ASSETS.kalash} alt="Kalash" className="w-9 h-9 object-contain" />
          </div>
          <p className="font-telugu text-xs text-[#8B1A1A] max-w-md italic font-semibold">
            "సుముహూర్తే శుభలగ్నే సావధానాః సుప్రతిష్ఠా భవతు"
          </p>
        </motion.div>

      </div>
    </section>
  );
};
