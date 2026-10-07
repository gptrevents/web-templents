import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface KmHeroProps {
  groomName?: string;
  brideName?: string;
  weddingDate?: string;
  venueCity?: string;
  muhurthamTime?: string;
  isOpen?: boolean;
  lang?: 'te' | 'en';
}

export const KmHero: React.FC<KmHeroProps> = ({
  groomName = 'Rahul',
  brideName = 'Harinya',
  weddingDate = '23 April 2026',
  venueCity = 'Hyderabad',
  muhurthamTime = 'సుముహూర్తం: ఉదయం 09:30 AM',
  isOpen = true,
  lang = 'te',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !isOpen) return;

    const ctx = gsap.context(() => {
      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.km-hero__invocation', {
        y: 14,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
      })
        .from(
          '.km-hero__groom .km-hero__char',
          {
            y: 40,
            opacity: 0,
            rotateX: -30,
            scale: 0.85,
            filter: 'blur(8px)',
            stagger: 0.05,
            duration: 0.85,
            ease: 'back.out(1.6)',
          },
          '-=0.2'
        )
        .from(
          '.km-hero__amp',
          {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            ease: 'back.out(2)',
          },
          '-=0.2'
        )
        .from(
          '.km-hero__bride .km-hero__char',
          {
            y: 40,
            opacity: 0,
            rotateX: -30,
            scale: 0.85,
            filter: 'blur(8px)',
            stagger: 0.05,
            duration: 0.85,
            ease: 'back.out(1.6)',
          },
          '-=0.15'
        )
        .from(
          '.km-hero__badge',
          {
            y: 15,
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
          },
          '-=0.2'
        )
        .from(
          '.km-hero__date, .km-hero__venue',
          {
            opacity: 0,
            y: 10,
            duration: 0.6,
            stagger: 0.1,
          },
          '-=0.1'
        );

      // Scroll Parallax Scrubbing
      gsap.to('.km-hero__video', {
        yPercent: 12,
        scale: 1.06,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
        ease: 'none',
      });

      gsap.to('.km-hero__content', {
        yPercent: -18,
        opacity: 0.35,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '20% top',
          end: 'bottom top',
          scrub: 1,
        },
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isOpen]);

  const renderSplitText = (text: string, prefix: string) => {
    const words = text.split(/\s+/).filter(Boolean);
    let charIdx = 0;
    return words.map((word, wIdx) => (
      <React.Fragment key={`${prefix}-w-${wIdx}`}>
        <span className="km-hero__word">
          {word.split('').map((char, cIdx) => (
            <span
              className="km-hero__char"
              key={`${prefix}-${charIdx++}-${cIdx}`}
            >
              {char}
            </span>
          ))}
        </span>
        {wIdx < words.length - 1 ? ' ' : null}
      </React.Fragment>
    ));
  };

  return (
    <section className="km-hero km-section" ref={sectionRef}>
      <video
        ref={videoRef}
        className="km-hero__video"
        src="/assets/kalyana-mandapam/hero-procession-bg-v2.mp4"
        poster="/assets/kalyana-mandapam/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="km-hero__scrim" />

      <div className="km-hero__content km-container flex flex-col items-center text-center">
        {/* Sacred Telugu Invocation Banner */}
        <div className="km-hero__invocation flex flex-col items-center mb-2">
          <p className="text-[#FFD700] text-xs sm:text-sm font-serif tracking-[0.25em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] font-semibold">
            || శ్రీరస్తు • శుభమస్తు • అవిఘ్నమస్తు ||
          </p>
          <span className="text-stone-300 text-[10px] sm:text-xs tracking-widest mt-0.5">
            || శ్రీ విఘ్నేశ్వరాయ నమః ||
          </span>
        </div>

        {/* Groom Name */}
        <h1 className="km-hero__name km-hero__groom km-font-heading text-[#FFF5DB] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          {renderSplitText(groomName, 'groom')}
        </h1>

        <div className="km-hero__amp km-font-script text-[#E6C670] my-[-6px] sm:my-[-10px]">&amp;</div>

        {/* Bride Name */}
        <h1 className="km-hero__name km-hero__bride km-font-heading text-[#FFF5DB] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          {renderSplitText(brideName, 'bride')}
        </h1>

        {/* Royal Sumuhurtham Gold Badge */}
        <div className="km-hero__badge my-3 px-4 py-1.5 rounded-full bg-[#3A070D]/85 border border-[#D4A843] backdrop-blur-md inline-flex items-center gap-2 shadow-lg">
          <Clock className="w-3.5 h-3.5 text-[#FFD700] animate-pulse" />
          <span className="text-[#FFEDB3] text-xs sm:text-sm font-serif font-bold tracking-wider">
            {muhurthamTime}
          </span>
        </div>

        {/* Date and Location with Icons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-stone-200 mt-1">
          <div className="km-hero__date km-font-label flex items-center gap-1.5 text-xs sm:text-sm tracking-widest text-[#F5DE9C]">
            <Calendar className="w-3.5 h-3.5 text-[#D4A843]" />
            <span>{weddingDate}</span>
          </div>

          <div className="km-hero__venue km-font-label flex items-center gap-1.5 text-xs sm:text-sm tracking-widest text-stone-300">
            <MapPin className="w-3.5 h-3.5 text-[#D4A843]" />
            <span>{venueCity}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
