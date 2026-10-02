import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TeatroLang } from './TeatroLangSwitch';

interface TeatroCountdownProps {
  targetDate?: string;
  lang?: TeatroLang;
}

export const TeatroCountdown: React.FC<TeatroCountdownProps> = ({
  targetDate = '2027-09-10T16:30:00',
  lang = 'en',
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const translations = {
    en: {
      title: 'Countdown',
      days: 'Days',
      hours: 'Hours',
      min: 'Min',
      sec: 'Sec',
      until: 'until the big day',
    },
    it: {
      title: 'Conto alla rovescia',
      days: 'Giorni',
      hours: 'Ore',
      min: 'Min',
      sec: 'Sec',
      until: 'fino al grande giorno',
    },
    te: {
      title: 'కౌంట్‌డౌన్',
      days: 'రోజులు',
      hours: 'గంటలు',
      min: 'నిమిషాలు',
      sec: 'సెకన్లు',
      until: 'శుభముహూర్తం కోసం ఎదురుచూపులు',
    },
  };

  const t = translations[lang] || translations.en;

  useEffect(() => {
    const calculateTime = () => {
      const diff = new Date(targetDate).getTime() - new Date().getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="py-16 bg-white flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2
          className="font-script text-4xl sm:text-5xl md:text-6xl mb-2"
          style={{ color: '#5C2018' }}
        >
          {t.title}
        </h2>
      </motion.div>

      {/* Digits row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 sm:gap-6 md:gap-8"
      >
        {[
          { label: t.days, value: timeLeft.days },
          { label: t.hours, value: timeLeft.hours },
          { label: t.min, value: timeLeft.minutes },
          { label: t.sec, value: timeLeft.seconds },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className="w-16 h-18 sm:w-20 sm:h-22 rounded-xl flex items-center justify-center shadow-sm"
              style={{
                backgroundColor: 'rgba(92, 32, 24, 0.05)',
                border: '1px solid rgba(92, 32, 24, 0.15)',
              }}
            >
              <span
                className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold"
                style={{ color: '#5C2018' }}
              >
                {String(item.value).padStart(2, '0')}
              </span>
            </div>
            <span
              className="font-body text-[10px] sm:text-xs uppercase tracking-widest mt-2"
              style={{ color: '#5C2018', opacity: 0.75 }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="font-display text-xs sm:text-sm tracking-[0.2em] uppercase mt-8"
        style={{ color: '#5C2018' }}
      >
        {t.until}
      </motion.p>
    </section>
  );
};
