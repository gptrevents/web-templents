import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface KmCountdownProps {
  targetDate?: string;
}

const UNITS = [
  { key: 'days', left: 16.17 },
  { key: 'hours', left: 34.68 },
  { key: 'minutes', left: 53.19 },
  { key: 'seconds', left: 71.19 },
] as const;

export const KmCountdown: React.FC<KmCountdownProps> = ({
  targetDate = '2026-04-23T09:30:00',
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
      }).from('.km-countdown__unit', {
        y: 12,
        opacity: 0,
        filter: 'blur(4px)',
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
      });
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
    <section className="km-countdown" ref={sectionRef}>
      <div className="km-countdown__stage">
        <img
          className="km-countdown__panel"
          src="/assets/kalyana-mandapam/countdown-wall.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />

        {timeLeft.expired ? (
          <p className="km-countdown__arrived km-font-script">
            The sacred hour has arrived
          </p>
        ) : (
          UNITS.map((u) => (
            <div
              key={u.key}
              className="km-countdown__unit"
              style={{
                left: `${u.left}%`,
                width: '11.5%',
                top: '52%',
                height: '24%',
              }}
            >
              <span
                suppressHydrationWarning
                className={`km-countdown__value km-countdown__value--${u.key}`}
              >
                {formattedValues[u.key]}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
