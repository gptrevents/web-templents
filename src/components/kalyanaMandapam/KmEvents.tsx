import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, CalendarPlus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface WeddingEventItem {
  id: string;
  name: string;
  teluguName?: string;
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
  heading?: string;
  subheading?: string;
}

const DEFAULT_EVENTS: WeddingEventItem[] = [
  {
    id: 'haldi',
    name: 'Mangala Snanam & Haldi',
    teluguName: 'మంగళ స్నానాలు & పసుపు వేడుక',
    date: '21 April 2026',
    time: '09:00 AM Onwards',
    venue: 'Family Residence, Jubilee Hills',
    city: 'Hyderabad',
    mapUrl: 'https://maps.google.com/?q=Jubilee+Hills+Hyderabad',
    dressCode: 'Traditional Yellow & Festive Pattu',
    icon: '/assets/kalyana-mandapam/events/haldi-bowl.png',
  },
  {
    id: 'sangeet',
    name: 'Sangeet & Mehendi Night',
    teluguName: 'గోరింటాకు & సంగీత్ రాత్రి',
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
    teluguName: 'కళ్యాణ మహోత్సవం (సుముహూర్తం)',
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
    teluguName: 'వివాహ విందు మహోత్సవం',
    date: '23 April 2026',
    time: '07:00 PM Onwards',
    venue: 'The Grand Ballroom, ITC Kohenur',
    city: 'HITEC City, Hyderabad',
    mapUrl: 'https://maps.google.com/?q=ITC+Kohenur+Hyderabad',
    dressCode: 'Royal Ethnic & Traditional Silk',
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

export const KmEvents: React.FC<KmEventsProps> = ({
  events = DEFAULT_EVENTS,
  heading = 'కళ్యాణ యాత్ర • Sacred Events',
  subheading = 'వివాహ వేడుకల పవిత్ర ప్రయాణం & శుభ సందర్భాలు',
}) => {
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
        const card = stop.querySelector('.km-events__card');
        const med = stop.querySelector('.km-events__medallion');

        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: stop,
              start: 'top 85%',
            },
            y: 30,
            opacity: 0,
            scale: 0.95,
            duration: 0.9,
            ease: 'power3.out',
          });
        }

        if (med) {
          gsap.from(med, {
            scrollTrigger: {
              trigger: stop,
              start: 'top 85%',
            },
            scale: 0,
            opacity: 0,
            duration: 0.7,
            ease: 'back.out(2)',
          });
        }
      });

      // Footsteps scrub illumination along the sacred path
      const footElements = gsap.utils.toArray<HTMLElement>('.km-events__foot');
      if (stageRef.current && footElements.length > 0) {
        gsap.to(footElements, {
          opacity: 1,
          scale: 1.05,
          stagger: 0.08,
          scrollTrigger: {
            trigger: stageRef.current,
            start: 'top 70%',
            end: 'bottom 85%',
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCalendarClick = (evt: WeddingEventItem) => {
    const title = encodeURIComponent(evt.teluguName ? `${evt.name} (${evt.teluguName})` : evt.name);
    const details = encodeURIComponent(`Wedding Event: ${evt.name}\nAttire: ${evt.dressCode || 'Traditional'}\nVenue: ${evt.venue}, ${evt.city}`);
    const location = encodeURIComponent(`${evt.venue}, ${evt.city}`);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  return (
    <section className="km-events km-section" ref={sectionRef}>
      <div className="km-container text-center">
        <h2 className="km-events__heading km-font-heading text-[#9A1B41] font-bold">
          {heading}
        </h2>
        <p className="km-events__sub km-font-serif text-stone-700 font-medium">
          {subheading}
        </p>

        {/* Footsteps Stage */}
        <div className="km-events__stage" ref={stageRef}>
          {/* Path SVG */}
          <svg
            className="km-events__path"
            viewBox="0 0 400 1083"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 200 40 C 130 180, 110 320, 200 420 C 290 520, 280 660, 180 760 C 100 840, 220 980, 200 1040"
              fill="none"
              stroke="#e3c280"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              opacity="0.6"
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
                opacity: 0.18,
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

            return (
              <div
                key={evt.id}
                className={`km-events__stop km-events__stop--${stop.side}`}
                style={{ top: `${stop.top}%` }}
              >
                {/* Event Card */}
                <div className="km-events__card shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="km-events__card-head">
                    <h3 className="km-events__name km-font-script text-[#9A1B41] font-bold">
                      {evt.name}
                    </h3>
                    {evt.teluguName && (
                      <span className="text-[11px] font-serif font-semibold text-[#8B5A2B] block -mt-1 mb-1">
                        {evt.teluguName}
                      </span>
                    )}
                  </div>

                  <p className="km-events__when km-font-label text-stone-800 font-bold">
                    {evt.date} • {evt.time}
                  </p>

                  <p className="km-events__venue km-font-serif text-stone-700">
                    {evt.venue}, {evt.city}
                  </p>

                  {evt.dressCode && (
                    <p className="km-events__dress km-font-label text-[#8B5A2B] bg-[#FFF2D6] px-2 py-0.5 rounded-full inline-block my-1 text-[10px]">
                      డ్రెస్ కోడ్: {evt.dressCode}
                    </p>
                  )}

                  {/* Action Buttons: Google Maps & Add to Calendar */}
                  <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-[#D4A843]/30">
                    {evt.mapUrl && (
                      <a
                        href={evt.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-md bg-[#FFF9ED] border border-[#D4A843]/60 text-xs text-[#8B1A1A] font-serif font-semibold hover:bg-[#FBEEC1] transition-colors inline-flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MapPin className="w-3 h-3 text-[#D4A843]" />
                        <span>దిశలు (Map)</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCalendarClick(evt);
                      }}
                      className="px-2.5 py-1 rounded-md bg-[#FFF9ED] border border-[#D4A843]/60 text-xs text-[#8B1A1A] font-serif font-semibold hover:bg-[#FBEEC1] transition-colors inline-flex items-center gap-1 cursor-pointer"
                      title="Add event to Google Calendar"
                    >
                      <CalendarPlus className="w-3 h-3 text-[#D4A843]" />
                      <span>క్యాలెండర్</span>
                    </button>
                  </div>
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
