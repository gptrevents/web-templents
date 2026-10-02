import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SouthIndianCountdownProps {
  weddingDateDisplay?: string;
  targetDate?: string;
}

export const SouthIndianCountdown: React.FC<SouthIndianCountdownProps> = ({
  weddingDateDisplay = '17 september 2026',
  targetDate = '2026-09-17T10:30:00',
}) => {
  const calculateTimeLeft = useCallback(() => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const diff = Math.max(0, target - now);

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lampRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const el = sectionRef.current;
      if (!el) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: '-18%',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=150%',
            scrub: true,
          },
        });
      }

      if (lampRef.current) {
        tl.fromTo(
          lampRef.current,
          { opacity: 0, scale: 0.6, y: 20 },
          { opacity: 1, scale: 1, y: 0, ease: 'back.out(1.5)', duration: 0.12 },
          0.05
        );
      }

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 0.1 },
          0.1
        );
      }

      if (subtextRef.current) {
        tl.fromTo(
          subtextRef.current,
          { opacity: 0, y: 15 },
          { opacity: 0.5, y: 0, ease: 'power2.out', duration: 0.08 },
          0.15
        );
      }

      if (timerRef.current && timerRef.current.children.length > 0) {
        tl.fromTo(
          timerRef.current.children,
          { opacity: 0, scale: 0.7, y: 30 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.04, ease: 'back.out(1.5)', duration: 0.2 },
          0.25
        );
      }

      if (dateRef.current) {
        tl.fromTo(
          dateRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 0.1 },
          0.55
        );
      }

      if (contentRef.current) {
        tl.to(
          contentRef.current,
          { y: -25, opacity: 0.85, ease: 'power1.in', duration: 0.15 },
          0.85
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Min' },
    { value: timeLeft.seconds, label: 'Sec' },
  ];

  return (
    <section
      ref={sectionRef}
      className="siw-countdown siw-scene"
      aria-label="Wedding countdown"
    >
      <div ref={bgRef} className="siw-countdown__bg">
        <img
          src="https://myshaadhilink.in/assets/south-indian-wedding/kuthu-vilakku-kolam-night.webp"
          alt=""
          className="siw-scene__bg-img"
        />
      </div>

      <div className="siw-countdown__overlay" />
      <div className="siw-glow siw-countdown__glow" aria-hidden="true" />
      <div className="siw-scene__blend-top" aria-hidden="true" />

      <div className="siw-scene__corner siw-scene__corner--tl" aria-hidden="true">
        <img
          src="https://myshaadhilink.in/assets/south-indian-wedding/gold-filigree-corner.png"
          alt=""
        />
      </div>
      <div className="siw-scene__corner siw-scene__corner--br" aria-hidden="true">
        <img
          src="https://myshaadhilink.in/assets/south-indian-wedding/gold-filigree-corner.png"
          alt=""
        />
      </div>

      <div ref={contentRef} className="siw-countdown__content">
        <img
          ref={lampRef}
          src="https://myshaadhilink.in/assets/south-indian-wedding/kuthu-vilakku-icon.png"
          alt=""
          className="siw-countdown__lamp"
          aria-hidden="true"
        />

        <h2 ref={headingRef} className="siw-countdown__heading siw-font-heading">
          Shubh Muhurtham
        </h2>

        <p ref={subtextRef} className="siw-countdown__subtext siw-font-label">
          The auspicious moment awaits
        </p>

        <div
          ref={timerRef}
          className="siw-countdown__timer"
          role="timer"
          aria-label="Countdown timer"
        >
          {timeUnits.map((u) => (
            <div key={u.label} className="siw-countdown__unit">
              <span className="siw-countdown__number siw-font-heading">
                {String(u.value).padStart(2, '0')}
              </span>
              <span className="siw-countdown__label siw-font-label">{u.label}</span>
            </div>
          ))}
        </div>

        {weddingDateDisplay && (
          <p ref={dateRef} className="siw-countdown__date siw-font-formal">
            {weddingDateDisplay}
          </p>
        )}
      </div>

      <div className="siw-scene__blend-bottom" aria-hidden="true" />
    </section>
  );
};
