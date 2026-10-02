import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SouthIndianHeroProps {
  groomName?: string;
  brideName?: string;
  weddingDateDisplay?: string;
  guestName?: string;
}

const LANTERNS = [
  { left: '2%', top: '0%', size: 48, targetOpacity: 0.8 },
  { left: '78%', top: '2%', size: 55, targetOpacity: 0.85 },
  { left: '38%', top: '1%', size: 34, targetOpacity: 0.55 },
  { left: '-2%', top: '18%', size: 60, targetOpacity: 0.9 },
  { left: '76%', top: '14%', size: 52, targetOpacity: 0.75 },
  { left: '18%', top: '10%', size: 28, targetOpacity: 0.45 },
  { left: '58%', top: '8%', size: 26, targetOpacity: 0.4 },
  { left: '-3%', top: '40%', size: 44, targetOpacity: 0.6 },
  { left: '82%', top: '35%', size: 42, targetOpacity: 0.55 },
  { left: '12%', top: '32%', size: 30, targetOpacity: 0.4 },
  { left: '68%', top: '38%', size: 32, targetOpacity: 0.45 },
];

export const SouthIndianHero: React.FC<SouthIndianHeroProps> = ({
  groomName = 'Rahul',
  brideName = 'Harinya',
  weddingDateDisplay = '17 september 2026',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lanternRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const fadeOutRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef({ time: 0 });

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Content entrance
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'power2.out', delay: 0.3 }
        );
      }

      // Lanterns rise and sway animations
      lanternRefs.current.forEach((el, i) => {
        if (!el) return;
        const config = LANTERNS[i];
        const dist = 60 + 60 * Math.random();
        const dur = 1.8 + 0.8 * Math.random();
        const del = 0.2 + 0.5 * Math.random();
        const floatDur = 3 + 3 * Math.random();
        const swayDur = 2.5 + 3 * Math.random();

        gsap.fromTo(
          el,
          { opacity: 0, y: dist },
          { opacity: config.targetOpacity, y: 0, duration: dur, delay: del, ease: 'power2.out' }
        );

        gsap.to(el, {
          y: -(8 + 15 * Math.random()),
          duration: floatDur,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: del + dur + 0.3,
        });

        gsap.to(el, {
          x: (Math.random() > 0.5 ? 1 : -1) * 4,
          duration: swayDur,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: del + 0.5 * dur,
        });
      });

      // Video frame scrubbed frame-by-frame via ScrollTrigger
      const onTick = () => {
        if (videoRef.current && videoRef.current.readyState >= 2) {
          videoRef.current.currentTime = timeRef.current.time;
        }
      };
      gsap.ticker.add(onTick);

      // Main Hero pinned timeline scrubbed with scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      if (scrollHintRef.current) {
        tl.to(scrollHintRef.current, { opacity: 0, duration: 0.05 }, 0.06);
      }
      if (contentRef.current) {
        tl.to(contentRef.current, { opacity: 0, y: -30, duration: 0.12, ease: 'power1.in' }, 0.08);
      }
      tl.to('.siw-hero__lantern', { y: '-=50', opacity: 0, stagger: 0.005, duration: 0.12 }, 0.08);
      tl.to(timeRef.current, { time: 2, duration: 0.65, ease: 'none' }, 0.05);
      if (fadeOutRef.current) {
        tl.to(fadeOutRef.current, { opacity: 1, duration: 0.2, ease: 'power2.in' }, 0.65);
      }

      return () => {
        gsap.ticker.remove(onTick);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="siw-hero siw-scene" aria-label="Wedding hero">
      <div className="siw-hero__video-wrap" aria-hidden="true">
        <video
          ref={videoRef}
          className="siw-hero__video"
          src="https://myshaadhilink.in/assets/south-indian-wedding/hero-gopuram-descent.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>

      <div className="siw-hero__lanterns" aria-hidden="true">
        {LANTERNS.map((item, idx) => (
          <div
            key={idx}
            ref={(el) => {
              lanternRefs.current[idx] = el;
            }}
            className="siw-hero__lantern"
            style={{
              left: item.left,
              top: item.top,
              width: `${item.size}px`,
              height: `${1.25 * item.size}px`,
            }}
          >
            <img
              src="https://myshaadhilink.in/assets/south-indian-wedding/sky-lantern.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      <div ref={contentRef} className="siw-hero__content">
        <div className="siw-hero__names-group">
          <h1 className="siw-hero__name">{groomName}</h1>
          <div className="siw-hero__weds-row">
            <span className="siw-hero__weds-line siw-hero__weds-line--left" aria-hidden="true" />
            <span className="siw-hero__weds">Weds</span>
            <span className="siw-hero__weds-line siw-hero__weds-line--right" aria-hidden="true" />
          </div>
          <h1 className="siw-hero__name">{brideName}</h1>
        </div>

        <div className="siw-hero__flourish" aria-hidden="true" />
        {weddingDateDisplay && <p className="siw-hero__date">{weddingDateDisplay}</p>}
      </div>

      <div ref={scrollHintRef} className="siw-hero__scroll-hint" aria-hidden="true">
        <div className="siw-hero__scroll-hint-line" />
      </div>

      <div ref={fadeOutRef} className="siw-hero__fade-out" aria-hidden="true" />
    </section>
  );
};
