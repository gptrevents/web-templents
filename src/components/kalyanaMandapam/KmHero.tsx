import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface KmHeroProps {
  groomName?: string;
  brideName?: string;
  weddingDate?: string;
  venueCity?: string;
  muhurthamTime?: string;
  isOpen?: boolean;
}

export const KmHero: React.FC<KmHeroProps> = ({
  groomName = 'Rahul',
  brideName = 'Harinya',
  weddingDate = '23 April 2026',
  venueCity = 'Hyderabad',
  muhurthamTime = 'Subhamuhurtham 09:30 AM',
  isOpen = true,
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
          '.km-hero__date',
          {
            y: 10,
            opacity: 0,
            duration: 0.5,
          },
          '-=0.2'
        )
        .from(
          '.km-hero__venue',
          {
            opacity: 0,
            duration: 0.6,
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
        opacity: 0.4,
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

      <div className="km-hero__content km-container">
        <p className="km-hero__invocation km-font-serif">
          || Shree Ganeshay Namah ||
        </p>

        <h1 className="km-hero__name km-hero__groom km-font-heading">
          {renderSplitText(groomName, 'groom')}
        </h1>

        <div className="km-hero__amp km-font-script">&amp;</div>

        <h1 className="km-hero__name km-hero__bride km-font-heading">
          {renderSplitText(brideName, 'bride')}
        </h1>

        <p className="km-hero__date km-font-label">{weddingDate}</p>

        <div className="km-hero__venue km-font-label">
          <span className="km-hero__venue-at">at </span>
          <span>{venueCity}</span>
        </div>
      </div>
    </section>
  );
};
