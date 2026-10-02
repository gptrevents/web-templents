import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TRADITIONAL_ASSETS, WEDDING_COUPLE } from '../../data/weddingData';
import { Flame, Sparkles } from 'lucide-react';

export const MuhurthamCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(WEDDING_COUPLE.targetIsoDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'Days', telugu: 'రోజులు', value: timeLeft.days },
    { label: 'Hours', telugu: 'గంటలు', value: timeLeft.hours },
    { label: 'Mins', telugu: 'నిమిషాలు', value: timeLeft.minutes },
    { label: 'Secs', telugu: 'సెకన్లు', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="relative w-full py-16 px-4 sm:px-6 bg-transparent overflow-hidden">
      
      {/* Background Subtle Mandalas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none opacity-15 animate-mandala-spin">
        <img src={TRADITIONAL_ASSETS.mandalaGold} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center mb-10"
        >
          <div className="flex items-center gap-1.5 text-xs font-cinzel font-semibold tracking-[0.25em] text-[#D4A843] uppercase mb-1">
            <Flame className="w-4 h-4 text-[#E8862A] fill-current animate-pulse" />
            <span>Auspicious Sumuhurtham</span>
            <Flame className="w-4 h-4 text-[#E8862A] fill-current animate-pulse" />
          </div>
          
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#8B1A1A] tracking-wide">
            Shubh Muhurtham
          </h2>
          <p className="font-telugu text-sm text-[#8B1A1A] mt-1 font-semibold">
            (కళ్యాణ ఘడియల శుభ ముహూర్తం)
          </p>

          <div className="w-44 h-4 my-2 opacity-85">
            <img src={TRADITIONAL_ASSETS.goldDivider} alt="" className="w-full h-full object-contain" />
          </div>

          <p className="font-cormorant italic text-sm sm:text-base text-[#5C4033] max-w-md">
            The auspicious moment awaits as two souls step together around the sacred fire.
          </p>
        </motion.div>

        {/* Live Countdown Cards Grid */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-6 w-full max-w-xl">
          {timeBlocks.map((block, idx) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, scale: 0.85, y: 25 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ y: -4, scale: 1.04 }}
              className="relative flex flex-col items-center p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-[#FFF5DE] via-[#FCECC7] to-[#F8E1B5] border-2 border-[#D4A843] shadow-[0_10px_24px_rgba(212,168,67,0.25)] ring-1 ring-[#D4A843]/40"
            >
              <span className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#8B1A1A] tracking-tight">
                {String(block.value).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs font-cinzel font-bold text-[#9E2A2B] uppercase tracking-wider mt-1">
                {block.label}
              </span>
              <span className="text-[11px] text-[#5C4033] font-telugu font-medium">
                {block.telugu}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Date & Muhurtham Timing Reminder Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 px-6 py-3 rounded-full bg-[#8B1A1A] border-2 border-[#D4A843] shadow-md flex items-center gap-2 text-xs font-cinzel text-[#FFFDF9] tracking-wider"
        >
          <Sparkles className="w-4 h-4 text-[#F3DC9B]" />
          <span>Sumuhurtham: <strong className="text-[#F3DC9B]">Saturday, 12 December 2026 at 10:48 AM</strong></span>
        </motion.div>

      </div>
    </section>
  );
};
