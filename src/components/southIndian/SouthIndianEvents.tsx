import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface WeddingEventItem {
  name: string;
  date?: string;
  time?: string;
  venue?: string;
}

const DEFAULT_EVENTS: WeddingEventItem[] = [
  {
    name: 'Pellikuthuru & Snathakam',
    date: '15 September 2026',
    time: '09:00 AM',
    venue: 'Groom & Bride Residence',
  },
  {
    name: 'Mehendi & Sangeet',
    date: '16 September 2026',
    time: '06:00 PM',
    venue: 'Royal Palace Lawns, Hyderabad',
  },
  {
    name: 'Shubh Muhurtham (Lagna Patrika)',
    date: '17 September 2026',
    time: '10:30 AM',
    venue: 'Balaji Nagar Convention Centre, Hyderabad',
  },
  {
    name: 'Grand Reception',
    date: '17 September 2026',
    time: '07:00 PM',
    venue: 'Balaji Nagar Convention Centre, Hyderabad',
  },
];

export const SouthIndianEvents: React.FC<{ events?: WeddingEventItem[] }> = ({
  events = DEFAULT_EVENTS,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const lampRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const goldLineRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || events.length === 0) return;

    const ctx = gsap.context(() => {
      if (lampRef.current) {
        gsap.fromTo(
          lampRef.current,
          { opacity: 0, y: -20, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: lampRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 0.5,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: subtextRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (goldLineRef.current) {
        gsap.fromTo(
          goldLineRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 0.4,
            duration: 0.8,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: goldLineRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (listRef.current && listRef.current.children.length > 0) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [events.length]);

  if (events.length === 0) return null;

  return (
    <section ref={sectionRef} className="siw-events" aria-label="Wedding events">
      <div className="siw-events__glow" aria-hidden="true" />

      <div className="siw-events__toran" aria-hidden="true">
        <img
          src="https://myshaadhilink.in/assets/south-indian-wedding/toran-mango-marigold.png"
          alt=""
        />
      </div>

      <div className="siw-events__content">
        <div className="siw-events__header">
          <img
            ref={lampRef}
            src="https://myshaadhilink.in/assets/south-indian-wedding/kuthu-vilakku-icon.png"
            alt=""
            className="siw-events__lamp-icon"
            aria-hidden="true"
          />
          <h2 ref={headingRef} className="siw-events__heading siw-font-heading">
            Celebrations
          </h2>
          <p ref={subtextRef} className="siw-events__subtext siw-font-label">
            Join us for the following ceremonies
          </p>
          <div ref={goldLineRef} className="siw-events__gold-line" aria-hidden="true" />
        </div>

        <div ref={listRef} className="siw-events__list">
          {events.map((ev, idx) => (
            <div key={idx} className="siw-events__card">
              <h3 className="siw-events__card-name siw-font-label">{ev.name}</h3>
              {(ev.date || ev.time) && (
                <p className="siw-events__card-datetime siw-font-formal">
                  {ev.date}
                  {ev.date && ev.time && ' · '}
                  {ev.time}
                </p>
              )}
              {ev.venue && (
                <>
                  <div className="siw-events__card-dot" aria-hidden="true" />
                  <p className="siw-events__card-venue siw-font-formal">{ev.venue}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
