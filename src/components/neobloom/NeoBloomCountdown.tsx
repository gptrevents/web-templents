import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Heart, Sparkles } from 'lucide-react';

export const NeoBloomCountdown: React.FC = () => {
  const targetDate = new Date('2026-12-12T09:30:00');

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  function calculateTimeLeft() {
    const diff = targetDate.getTime() - new Date().getTime();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'రోజులు', sub: 'DAYS', value: timeLeft.days },
    { label: 'గంటలు', sub: 'HOURS', value: timeLeft.hours },
    { label: 'నిమిషాలు', sub: 'MINUTES', value: timeLeft.minutes },
    { label: 'సెకన్లు', sub: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="relative w-full py-16 px-4 sm:px-6 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white overflow-hidden">
      
      {/* Background Floating Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold mb-3">
          <Clock className="w-3.5 h-3.5 text-amber-200" />
          <span>Shubh Muhurtham Countdown</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight mb-2">
          శుభ ముహూర్తానికి సమయం
        </h2>

        <p className="text-xs sm:text-sm text-rose-100 max-w-md mx-auto mb-8">
          మా ఏడడుగుల పవిత్ర బంధం మొదలయ్యే క్షణాల కోసం ఎదురుచూస్తూ..
        </p>

        {/* 4 Countdown Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto mb-6">
          {timeUnits.map((unit, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-4 sm:p-5 flex flex-col items-center shadow-lg"
            >
              <span className="font-serif font-bold text-3xl sm:text-4xl text-white tracking-tight leading-none mb-1">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="font-serif text-xs text-amber-200 font-semibold block">
                {unit.label}
              </span>
              <span className="text-[10px] text-white/70 font-sans tracking-widest uppercase">
                {unit.sub}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="text-xs text-white/90 font-medium flex items-center justify-center gap-2">
          <Heart className="w-3.5 h-3.5 text-rose-200 fill-current" />
          <span>శనివారం, 12 డిసెంబర్ 2026 ఉదయం 09:30 గంటలకు</span>
          <Heart className="w-3.5 h-3.5 text-rose-200 fill-current" />
        </div>

      </div>
    </section>
  );
};
