import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { TRADITIONAL_ASSETS, WEDDING_COUPLE } from '../../data/weddingData';
import { Sparkles, Heart } from 'lucide-react';

interface TraditionalEnvelopeProps {
  guestName: string;
  onOpen: () => void;
  isOpen: boolean;
}

export const TraditionalEnvelope: React.FC<TraditionalEnvelopeProps> = ({
  guestName,
  onOpen,
  isOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Fire authentic marigold & gold flower petal confetti
    try {
      // First burst - Golden sparks & marigolds
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4A843', '#E8862A', '#8B1A1A', '#FFFDF9', '#F3DC9B'],
        shapes: ['circle'],
        scalar: 1.25,
      });

      // Second burst - Flower shower
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#E8862A', '#D4A843', '#B8860B'],
        });
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#8B1A1A', '#D4708A', '#F3DC9B'],
        });
      }, 300);
    } catch (e) {
      console.log('Confetti trigger:', e);
    }

    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: 'blur(6px)',
            transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F0A0E]/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
        >
          {/* Outer Envelope Card Container */}
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={
              isOpening
                ? {
                    scale: [1, 1.02, 1.06],
                    y: [0, -10, -35],
                    boxShadow: '0 35px 90px rgba(212,168,67,0.5)',
                    transition: { duration: 1.1, ease: 'easeInOut' },
                  }
                : {
                    scale: 1,
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  }
            }
            className="relative w-full max-w-[440px] my-auto bg-[#FFFBF2] rounded-2xl shadow-[0_25px_70px_rgba(30,10,14,0.65)] border-4 border-[#D4A843]/60 overflow-hidden flex flex-col items-center text-center select-none"
          >
            {/* Ornate Gold Border Inner Accent */}
            <div className="absolute inset-1.5 border border-[#8B1A1A]/20 rounded-xl pointer-events-none" />
            <div className="absolute inset-3 border border-[#D4A843]/30 rounded-lg pointer-events-none" />

            {/* Top Toran Mango Leaves Garland Header */}
            <div className="relative w-full h-16 sm:h-20 overflow-hidden pointer-events-none flex justify-center items-start">
              <img
                src={TRADITIONAL_ASSETS.garlandHeader}
                alt="Traditional Toran Garland"
                className="w-full h-full object-cover object-top opacity-95 animate-toran-1"
              />
            </div>

            {/* Card Body */}
            <div className="relative px-6 pt-2 pb-8 flex flex-col items-center w-full">
              {/* Sacred Lord Ganesha Icon with Sunburst Aura */}
              <div className="relative mb-3 flex flex-col items-center">
                {/* Spinning Golden Mandala Halo */}
                <div className="absolute -inset-6 flex items-center justify-center opacity-25 pointer-events-none animate-mandala-spin">
                  <img
                    src={TRADITIONAL_ASSETS.mandalaGold}
                    alt=""
                    className="w-32 h-32 object-contain"
                  />
                </div>

                {/* Lord Ganesha Image */}
                <motion.div
                  animate={{ rotate: isOpening ? [0, -5, 5, 0] : 0, scale: isOpening ? 1.1 : 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 p-2 rounded-full bg-[#FFF7E8] border border-[#D4A843]/40 shadow-sm flex items-center justify-center"
                >
                  <img
                    src={TRADITIONAL_ASSETS.ganesha}
                    alt="Lord Ganesha"
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                {/* Sacred Telugu Shloka Title */}
                <span className="mt-2 text-xs font-cinzel font-semibold tracking-[0.2em] text-[#8B1A1A]">
                  || శ్రీ గణాధిపతయే నమః ||
                </span>
              </div>

              {/* Personalized Guest Greeting (Supports ?to=Guest) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="my-2 py-1 px-4 rounded-full bg-[#8B1A1A]/8 border border-[#8B1A1A]/15"
              >
                <p className="text-xs sm:text-sm font-cinzel font-medium text-[#8B1A1A] tracking-wider">
                  Dear{' '}
                  <span className="font-semibold text-[#680E0E] underline decoration-[#D4A843] underline-offset-4">
                    {guestName || 'Guest'}
                  </span>
                  ,
                </p>
              </motion.div>

              {/* Invitation Request Line */}
              <p className="text-[12px] sm:text-[13px] font-cormorant italic text-[#5C4033] tracking-wide mt-1">
                Together with our families, we cordially invite you to celebrate the sacred wedding of
              </p>

              {/* Couple Names */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="my-3 py-1 flex flex-col items-center"
              >
                <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-[#8B1A1A] tracking-wide">
                  {WEDDING_COUPLE.groom}
                </h1>
                <span className="my-0.5 font-script text-2xl text-[#D4A843]">&amp;</span>
                <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-[#8B1A1A] tracking-wide">
                  {WEDDING_COUPLE.bride}
                </h1>
              </motion.div>

              {/* Traditional Gold Divider */}
              <div className="w-48 h-5 my-1 flex items-center justify-center opacity-85">
                <img
                  src={TRADITIONAL_ASSETS.goldDivider}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Auspicious Date & Time */}
              <div className="my-2 flex flex-col items-center text-center">
                <p className="font-cinzel text-xs sm:text-sm font-semibold text-[#8B1A1A] tracking-widest uppercase">
                  {WEDDING_COUPLE.weddingDateDisplay}
                </p>
                <p className="text-[11px] sm:text-xs font-sans-clean text-[#5C4033] mt-0.5">
                  {WEDDING_COUPLE.weddingTimeDisplay} • {WEDDING_COUPLE.city}
                </p>
              </div>

              {/* Auspicious Telugu Blessing Line */}
              <p className="text-[11px] font-telugu text-[#8B1A1A]/90 italic my-2 max-w-xs leading-relaxed">
                "మాంగళ్యం తంతునానేన మమజీవన హేతునా | కంఠే బధ్నామి శుభగే త్వం జీవ శరదాం శతం ||"
              </p>

              {/* Golden Wax Seal Medallion with Initials */}
              <motion.div
                animate={
                  isOpening
                    ? { scale: [1, 1.25, 0], opacity: [1, 1, 0], rotate: [0, 180, 360] }
                    : { scale: 1, rotate: 0 }
                }
                transition={{ duration: 0.7 }}
                className="relative my-3"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E8C874] via-[#D4A843] to-[#8B1A1A] p-[2px] shadow-md flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#8B1A1A] flex items-center justify-center text-[#F3DC9B] font-cinzel font-bold text-sm tracking-wider border border-[#F3DC9B]/40">
                    R <Heart className="w-2.5 h-2.5 mx-0.5 text-[#E8C874] fill-current inline" /> H
                  </div>
                </div>
              </motion.div>

              {/* Pulsing Royal "OPEN INVITATION" Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleOpenClick}
                disabled={isOpening}
                className="group relative mt-2 w-full max-w-[280px] py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#8B1A1A] via-[#A52A2A] to-[#8B1A1A] text-[#FFFDF9] font-cinzel font-semibold text-sm tracking-[0.18em] uppercase border-2 border-[#E8C874] shadow-[0_8px_20px_rgba(139,26,26,0.35)] animate-pulse-gold hover:shadow-[0_12px_28px_rgba(139,26,26,0.45)] transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <Sparkles
                  className="w-4 h-4 text-[#E8C874] animate-spin"
                  style={{ animationDuration: '6s' }}
                />
                <span>{isOpening ? 'OPENING...' : 'OPEN INVITATION'}</span>
                <span className="text-[10px] text-[#F3DC9B]/80 font-telugu">
                  {isOpening ? '(తెరుచుకుంటోంది...)' : '(తెరువుము)'}
                </span>
              </motion.button>

              <p className="text-[11px] text-[#8B1A1A]/60 font-sans-clean mt-3 flex items-center gap-1">
                <span>Tap to unfold &amp; hear auspicious mangala vaadyam</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

