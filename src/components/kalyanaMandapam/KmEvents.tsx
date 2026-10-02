import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface WeddingEventItem {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  mapUrl?: string;
  dressCode?: string;
  icon: string;
}

interface KmEventsProps {
  events?: WeddingEventItem[];
}

const DEFAULT_EVENTS: WeddingEventItem[] = [
  {
    id: 'haldi',
    name: 'Mangala Snanam & Haldi',
    date: '21 April 2026',
    time: '09:00 AM Onwards',
    venue: 'Sipligunj Residence, Jubilee Hills',
    city: 'Hyderabad',
    mapUrl: 'https://maps.google.com/?q=Jubilee+Hills+Hyderabad',
    dressCode: 'Traditional Yellow & Festive Pattu',
    icon: '/assets/kalyana-mandapam/events/haldi-bowl.png',
  },
  {
    id: 'sangeet',
    name: 'Sangeet & Mehendi Night',
    date: '22 April 2026',
    time: '06:30 PM Onwards',
    venue: 'Taj Falaknuma Palace Gardens',
    city: 'Hyderabad',
    mapUrl: 'https://maps.google.com/?q=Taj+Falaknuma+Palace+Hyderabad',
    dressCode: 'Royal Indo-Western & Vibrant Silk',
    icon: '/assets/kalyana-mandapam/events/sangeet-music.png',
  },
  {
    id: 'muhurtham',
    name: 'Kalyana Mahotsavam',
    date: '23 April 2026',
    time: 'Subhamuhurtham 09:30 AM',
    venue: 'Sri Venkateswara Kalyana Mandapam',
    city: 'Hyderabad',
    mapUrl: 'https://maps.google.com/?q=Hyderabad',
    dressCode: 'South Indian Kanchipuram Pattu & Pancha',
    icon: '/assets/kalyana-mandapam/events/nadaswaram.png',
  },
  {
    id: 'reception',
    name: 'Grand Reception',
    date: '23 April 2026',
    time: '07:00 PM Onwards',
    venue: 'The Grand Ballroom, ITC Kohenur',
    city: 'HITEC City, Hyderabad',
    mapUrl: 'https://maps.google.com/?q=ITC+Kohenur+Hyderabad',
    dressCode: 'Black Tie & Elegant Ethnic',
    icon: '/assets/kalyana-mandapam/events/reception-sofa.png',
  },
];

// Coordinate stops along the 400x1083 stage
const STOPS = [
  { top: 21.88, side: 'left', medLeft: 29.5 },
  { top: 44.97, side: 'right', medLeft: 70.5 },
  { top: 68.05, side: 'left', medLeft: 29.5 },
  { top: 91.14, side: 'right', medLeft: 70.5 },
];

// Sacred footsteps along the path
const FEET = [
  { x: 195, y: 80, rot: -8, isLeft: true },
  { x: 175, y: 130, rot: -18, isLeft: false },
  { x: 145, y: 180, rot: -28, isLeft: true },
  { x: 130, y: 235, rot: 5, isLeft: false },
  { x: 155, y: 310, rot: 25, isLeft: true },
  { x: 190, y: 360, rot: 35, isLeft: false },
  { x: 235, y: 410, rot: 40, isLeft: true },
  { x: 270, y: 485, rot: -10, isLeft: false },
  { x: 250, y: 550, rot: -30, isLeft: true },
  { x: 210, y: 610, rot: -35, isLeft: false },
  { x: 155, y: 670, rot: -20, isLeft: true },
  { x: 135, y: 735, rot: 15, isLeft: false },
  { x: 170, y: 810, rot: 35, isLeft: true },
  { x: 215, y: 865, rot: 40, isLeft: false },
  { x: 260, y: 920, rot: 25, isLeft: true },
  { x: 275, y: 980, rot: -5, isLeft: false },
];

export const KmEvents: React.FC<KmEventsProps> = ({ events = DEFAULT_EVENTS }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.km-events__heading, .km-events__sub', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 24,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Stops reveal
      gsap.utils.toArray<HTMLElement>('.km-events__stop').forEach((stop) => {
        gsap.from(stop, {
          scrollTrigger: {
            trigger: stop,
            start: 'top 85%',
          },
          y: 30,
          scale: 0.94,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      });

      // Sacred Footsteps landing animation
      gsap.utils.toArray<HTMLElement>('.km-events__foot').forEach((foot) => {
        gsap.fromTo(
          foot,
          { opacity: 0, scale: 0.7, rotate: '-=12' },
          {
            scrollTrigger: {
              trigger: foot,
              start: 'top 88%',
            },
            opacity: 0.85,
            scale: 1,
            rotate: '+=12',
            duration: 0.5,
            ease: 'power2.out',
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="km-events km-section" ref={sectionRef}>
      {/* Traditional Ornate Frame */}
      <div className="km-frame" aria-hidden="true">
        <div className="km-frame-rail km-frame-rail--top" />
        <div className="km-frame-rail km-frame-rail--bottom" />
        <div className="km-frame-rail km-frame-rail--left" />
        <div className="km-frame-rail km-frame-rail--right" />
        <div className="km-frame-corner km-frame-corner--tl" />
        <div className="km-frame-corner km-frame-corner--tr" />
        <div className="km-frame-corner km-frame-corner--bl" />
        <div className="km-frame-corner km-frame-corner--br" />
      </div>

      <div className="km-container">
        <h2 className="km-events__heading km-font-heading">Kalyana Vaibhavam</h2>
        <p className="km-events__sub km-font-serif">
          The sacred ceremonies celebrating our eternal union
        </p>

        {/* Sacred Pilgrimage Yatra Stage */}
        <div
          ref={stageRef}
          className="km-events__stage"
          style={{ aspectRatio: '400 / 1083' }}
        >
          {/* Kolam Pattern Wall Background */}
          <div className="km-events__kolam" aria-hidden="true" />

          {/* S-Curve Path SVG */}
          <svg
            className="km-events__path"
            viewBox="0 0 400 1083"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M 200 40 C 120 120, 110 200, 120 250 C 135 320, 280 340, 280 440 C 280 540, 120 570, 120 670 C 120 770, 280 810, 280 910 C 280 980, 230 1030, 200 1060"
              stroke="rgba(201, 169, 78, 0.45)"
              strokeWidth="2.5"
              strokeDasharray="5 7"
            />
          </svg>

          {/* Footsteps along the path */}
          {FEET.map((f, i) => (
            <div
              key={`foot-${i}`}
              className={`km-events__foot km-events__foot--${f.isLeft ? 'left' : 'right'}`}
              style={{
                left: `${(f.x / 400) * 100}%`,
                top: `${(f.y / 1083) * 100}%`,
                transform: `translate(-50%, -50%) rotate(${f.rot}deg)`,
              }}
            >
              <img
                src={
                  f.isLeft
                    ? '/assets/kalyana-mandapam/yatra-foot-left.png'
                    : '/assets/kalyana-mandapam/yatra-foot-right.png'
                }
                alt=""
                aria-hidden="true"
              />
            </div>
          ))}

          {/* Event Stops */}
          {events.map((evt, idx) => {
            const stop = STOPS[idx % STOPS.length];
            const isLeft = stop.side === 'left';

            return (
              <div
                key={evt.id}
                className={`km-events__stop km-events__stop--${stop.side}`}
                style={{ top: `${stop.top}%` }}
              >
                {/* Event Card */}
                <div className="km-events__card">
                  <div className="km-events__card-head">
                    <h3 className="km-events__name km-font-script">{evt.name}</h3>
                  </div>

                  <p className="km-events__when km-font-label">
                    {evt.date} • {evt.time}
                  </p>

                  <p className="km-events__venue km-font-serif">
                    {evt.venue}, {evt.city}
                  </p>

                  {evt.dressCode && (
                    <p className="km-events__dress km-font-label">
                      Attire: {evt.dressCode}
                    </p>
                  )}

                  {evt.mapUrl && (
                    <a
                      href={evt.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="km-events__map km-font-label"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MapPin className="w-3.5 h-3.5 mr-1 inline" />
                      <span>View on Google Maps</span>
                    </a>
                  )}
                </div>

                {/* Medallion Icon on the Sacred Path */}
                <div
                  className="km-events__medallion"
                  style={{ left: `${stop.medLeft}%` }}
                  aria-hidden="true"
                >
                  <img
                    className="km-events__icon"
                    src={evt.icon}
                    alt={evt.name}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
