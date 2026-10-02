import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, MailOpen } from 'lucide-react';
import { romanticAudio } from '../../utils/romanticAudio';

interface NeoBloomEnvelopeProps {
  guestName: string;
  onOpen: () => void;
  isOpen: boolean;
}

export const NeoBloomEnvelope: React.FC<NeoBloomEnvelopeProps> = ({
  guestName,
  onOpen,
  isOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Start soothing romantic music
    try {
      romanticAudio.start();
    } catch {
      // Audio autoplay policy fallback
    }

    // Fire rose petals and soft gold confetti
    try {
      // First burst - Rose petals and blush gold
      confetti({
        particleCount: 90,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#E11D48', '#F43F5E', '#FDA4AF', '#F59E0B', '#FDE68A', '#FFFFFF'],
        shapes: ['circle'],
        scalar: 1.2,
      });

      // Second burst - Romantic rain
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0.15, y: 0.7 },
          colors: ['#E11D48', '#FB7185', '#FCD34D'],
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 0.85, y: 0.7 },
          colors: ['#FDA4AF', '#F43F5E', '#F59E0B'],
        });
      }, 300);
    } catch (e) {
      console.log('Confetti trigger:', e);
    }

    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  if (isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#2D0A14]/90 via-[#1A0B10]/95 to-[#0F0508]/98 backdrop-blur-xl p-4 select-none overflow-hidden"
      >
        {/* Floating background glowing orbs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Floating petals aesthetic */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute top-1/4 left-10 text-rose-300 animate-pulse text-2xl">🌸</div>
          <div className="absolute top-1/3 right-12 text-rose-200 animate-bounce text-xl">✨</div>
          <div className="absolute bottom-1/4 left-1/4 text-rose-300 animate-pulse text-lg">♡</div>
          <div className="absolute bottom-1/3 right-1/4 text-rose-200 text-2xl">🌸</div>
        </div>

        {/* Luxury Romantic Envelope Container */}
        <div className="relative w-full max-w-md flex flex-col items-center">
          
          {/* Top Decorative Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs font-semibold mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-300" />
              <span>Wedding Invitation • వివాహ ఆహ్వానం</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              Arjun &amp; Priya
            </h2>
            <p className="text-xs text-rose-200/80 font-sans mt-0.5 tracking-wider">
              12 DECEMBER 2026 • VIJAYAWADA
            </p>
          </motion.div>

          {/* Envelope Body */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 20, delay: 0.3 }}
            className={`relative w-full bg-gradient-to-br from-[#FFF5F7] via-[#FFF1F2] to-[#FFE4E6] rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.6)] border-2 border-rose-200 text-stone-900 transition-all duration-700 ${
              isOpening ? 'scale-105 -translate-y-4' : ''
            }`}
          >
            {/* Top Flap Decorative Border */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-48 h-6 bg-gradient-to-r from-transparent via-rose-300/40 to-transparent rounded-full blur-xs" />

            {/* Inner Embossed Card Area */}
            <div className="border border-rose-300/60 rounded-2xl p-6 text-center bg-white/70 backdrop-blur-xs relative overflow-hidden shadow-inner">
              
              {/* Monogram */}
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md border-2 border-white">
                A&amp;P
              </div>

              {/* Auspicious Telugu Blessing */}
              <p className="font-serif text-xs text-rose-800 font-semibold mb-1 tracking-wide">
                || శ్రీరస్తు • శుభమస్తు ||
              </p>

              {/* Personalized Guest Address */}
              <div className="my-4 py-2 px-4 rounded-xl bg-rose-50 border border-rose-200/70 inline-block max-w-full">
                <span className="text-[11px] text-rose-600 uppercase tracking-wider font-bold block">
                  ప్రత్యేక ఆహ్వానం (Cordially Invited)
                </span>
                <span className="font-serif text-base sm:text-lg font-bold text-stone-900 block truncate">
                  {guestName || 'బంధుమిత్రులు (Guest)'}
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto mb-6">
                రెండు మనసులు ఒకటయ్యే వేళ.. మా వివాహ శుభసందర్భానికి సకుటుంబ సపరివార సమేతంగా విచ్చేసి ఆశీర్వదించగలరని మనస్ఫూర్తిగా ఆహ్వానిస్తున్నాము.
              </p>

              {/* Wax Seal Action Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenClick}
                disabled={isOpening}
                className="group relative w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white font-serif font-bold text-sm shadow-lg hover:shadow-rose-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <MailOpen className="w-4 h-4 text-white" />
                </div>
                <span>
                  {isOpening ? 'ఆహ్వాన పత్రిక తెరుచుకుంటోంది...' : 'ఆహ్వాన పత్రిక తెరవండి (Open Invitation)'}
                </span>
                <Heart className="w-4 h-4 text-rose-200 group-hover:scale-125 transition-transform" />
              </motion.button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                <span>🎵 బ్యాక్‌గ్రౌండ్ రొమాంటిక్ మ్యూజిక్‌తో ఓపెన్ అవుతుంది</span>
              </div>
            </div>

            {/* Corner Rose Gold Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-rose-400/70 rounded-tl-lg" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-rose-400/70 rounded-tr-lg" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-rose-400/70 rounded-bl-lg" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-rose-400/70 rounded-br-lg" />
          </motion.div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
