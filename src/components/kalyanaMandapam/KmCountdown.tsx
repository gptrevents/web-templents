import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface KmCountdownProps {
  targetDate?: string;
  title?: string;
}

const UNITS = [
  { key: 'days', labelTe: 'రోజులు', labelEn: 'Days', left: 16.17 },
  { key: 'hours', labelTe: 'గంటలు', labelEn: 'Hours', left: 34.68 },
  { key: 'minutes', labelTe: 'నిమిషాలు', labelEn: 'Mins', left: 53.19 },
  { key: 'seconds', labelTe: 'సెకన్లు', labelEn: 'Secs', left: 71.19 },
] as const;

export const KmCountdown: React.FC<KmCountdownProps> = ({
  targetDate = '2026-12-12T09:30:00',
  title = 'శుభ ముహూర్తానికి మిగిలిన సమయం',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    expired: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    const calculate = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, expired: false });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }).from('.km-countdown__header', {
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
      .from('.km-countdown__unit', {
        y: 12,
        opacity: 0,
        filter: 'blur(4px)',
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const format2 = (val: number) => String(val).padStart(2, '0');

  const formattedValues = {
    days: String(timeLeft.days),
    hours: format2(timeLeft.hours),
    minutes: format2(timeLeft.minutes),
    seconds: format2(timeLeft.seconds),
  };

  return (
    <section className="km-countdown py-6 flex flex-col items-center" ref={sectionRef}>
      {/* Title above stone wall */}
      <div className="km-countdown__header text-center mb-4 px-4">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#D4A843] font-serif font-bold mb-1">
          <Clock className="w-3.5 h-3.5" />
          <span>Sumuhurtham Countdown</span>
        </div>
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#9A1B41] tracking-wide">
          {title}
        </h3>
      </div>

      <div className="km-countdown__stage relative w-full max-w-[400px] mx-auto shadow-2xl rounded-2xl overflow-hidden border border-[#D4A843]/40">
        <img
          className="km-countdown__panel w-full h-auto block"
          src="/assets/kalyana-mandapam/countdown-wall.webp"
          alt="Ancient Carved Stone Wall Countdown"
          loading="lazy"
        />

        {timeLeft.expired ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-2xs">
            <p className="km-countdown__arrived km-font-script text-2xl sm:text-3xl text-[#FFD700] drop-shadow-md">
              శుభ ముహూర్తం ఆసన్నమైనది ✨
            </p>
          </div>
        ) : (
          UNITS.map((u) => (
            <div
              key={u.key}
              className="km-countdown__unit absolute flex flex-col items-center justify-center text-center"
              style={{
                left: `${u.left}%`,
                width: '11.5%',
                top: '52%',
                height: '24%',
              }}
            >
              <span
                suppressHydrationWarning
                className={`km-countdown__value km-countdown__value--${u.key} font-serif font-bold text-lg sm:text-xl text-[#FFD700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}
              >
                {formattedValues[u.key]}
              </span>
              <span className="text-[8px] sm:text-[9px] font-serif text-[#F5DE9C] leading-none mt-0.5 tracking-tight drop-shadow-xs">
                {u.labelTe}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
