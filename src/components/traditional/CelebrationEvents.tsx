import React from 'react';
import { motion } from 'motion/react';
import { CELEBRATION_EVENTS, TRADITIONAL_ASSETS } from '../../data/weddingData';
import { CelebrationEvent } from '../../types';
import { Calendar, Clock, MapPin, Navigation, Sparkles } from 'lucide-react';
import { CornerOrnament } from './WeddingBorders';

export const CelebrationEvents: React.FC = () => {
  // Google Calendar Link generator
  const createGoogleCalendarUrl = (event: CelebrationEvent) => {
    const title = encodeURIComponent(`${event.name} - Rahul & Harinya's Wedding`);
    const details = encodeURIComponent(`${event.description}\n\nVenue: ${event.venue}, ${event.address}`);
    const location = encodeURIComponent(`${event.venue}, ${event.address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  const getEventCardStyle = (type: string) => {
    switch (type) {
      case 'wedding':
        return {
          bg: 'bg-gradient-to-b from-[#FFF0DE] via-[#FDE4CD] to-[#FBD6B7]',
          border: 'border-2 border-[#8B1A1A]',
          shadow: 'shadow-[0_12px_28px_rgba(139,26,26,0.18)] ring-1 ring-[#D4A843]',
          accentText: 'text-[#8B1A1A]',
          tagBg: 'bg-[#8B1A1A] text-[#F3DC9B]',
        };
      case 'haldi':
        return {
          bg: 'bg-gradient-to-b from-[#FFFCEE] via-[#FEF3CA] to-[#FDE793]',
          border: 'border-2 border-[#D97706]',
          shadow: 'shadow-[0_10px_24px_rgba(217,119,6,0.14)]',
          accentText: 'text-[#B45309]',
          tagBg: 'bg-[#D97706] text-[#FFFDF9]',
        };
      case 'mehendi':
        return {
          bg: 'bg-gradient-to-b from-[#F8FBF3] via-[#EFF6E3] to-[#E2EECF]',
          border: 'border-2 border-[#65A30D]',
          shadow: 'shadow-[0_10px_24px_rgba(101,163,13,0.14)]',
          accentText: 'text-[#4D7C0F]',
          tagBg: 'bg-[#4D7C0F] text-[#FFFDF9]',
        };
      case 'reception':
        return {
          bg: 'bg-gradient-to-b from-[#FAF4FD] via-[#F4E8FC] to-[#ECD8FA]',
          border: 'border-2 border-[#9333EA]',
          shadow: 'shadow-[0_10px_24px_rgba(147,51,234,0.14)]',
          accentText: 'text-[#7E22CE]',
          tagBg: 'bg-[#7E22CE] text-[#FFFDF9]',
        };
      default:
        return {
          bg: 'bg-gradient-to-b from-[#FFF5DE] to-[#FCECC7]',
          border: 'border-2 border-[#D4A843]',
          shadow: 'shadow-md',
          accentText: 'text-[#8B1A1A]',
          tagBg: 'bg-[#8B1A1A] text-[#FFFDF9]',
        };
    }
  };

  return (
    <section id="celebrations" className="relative w-full py-16 px-4 sm:px-6 bg-transparent overflow-hidden">
      
      {/* Decorative Gold Dividers and Mandalas */}
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 flex flex-col items-center"
        >
          <span className="text-xs font-cinzel font-semibold tracking-[0.25em] text-[#D4A843] uppercase mb-1">
            Auspicious Ceremonies
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#8B1A1A] tracking-wide">
            The Celebrations
          </h2>
          <span className="font-telugu text-sm text-[#8B1A1A]/90 mt-0.5">
            (శుభ కార్యముల వివరములు)
          </span>
          <div className="w-44 h-4 my-2 opacity-85">
            <img src={TRADITIONAL_ASSETS.goldDivider} alt="" className="w-full h-full object-contain" />
          </div>
          <p className="font-cormorant italic text-sm sm:text-base text-[#5C4033] max-w-md">
            Join us for the following ceremonies as we step into this divine covenant of love and companionship.
          </p>
        </motion.div>

        {/* Chronological Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {CELEBRATION_EVENTS.map((event, index) => {
            const isMainMuhurtham = event.illustrationType === 'wedding';
            const cardStyle = getEventCardStyle(event.illustrationType);

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${cardStyle.bg} ${cardStyle.border} ${cardStyle.shadow}`}
              >
                <CornerOrnament position="top-left" className="absolute top-2 left-2 opacity-45" size={24} />
                <CornerOrnament position="top-right" className="absolute top-2 right-2 opacity-45" size={24} />

                {/* Main Muhurtham Ribbon */}
                {isMainMuhurtham && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#8B1A1A] text-[#F3DC9B] text-[10px] font-cinzel font-bold tracking-widest uppercase border border-[#F3DC9B] shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Sacred Muhurtham</span>
                  </div>
                )}

                <div>
                  {/* Top Number & Tag */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-cinzel font-bold text-[#D4A843] tracking-widest uppercase">
                      Ceremony 0{index + 1}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium font-cinzel ${cardStyle.tagBg}`}>
                      {event.date.split(',')[0]}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-playfair text-2xl font-bold ${cardStyle.accentText}`}>
                    {event.name}
                  </h3>
                  {event.teluguName && (
                    <p className="font-telugu text-xs text-[#8B1A1A]/85 font-semibold mb-3">
                      {event.teluguName}
                    </p>
                  )}

                  {/* Date, Time & Venue */}
                  <div className="space-y-2.5 my-4 text-xs font-sans-clean text-[#3D1C00]">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#D4A843] shrink-0" />
                      <span className="font-semibold text-[#8B1A1A]">{event.date}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#B8860B] shrink-0" />
                      <span className="font-medium">{event.time}</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#8B1A1A] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#3D1C00]">{event.venue}</p>
                        <p className="text-[#5C4033] text-[11px] leading-relaxed">{event.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Dress Code */}
                  <div className="my-3 p-2.5 rounded-xl bg-white/60 border border-[#D4A843]/40 text-[11px] text-[#5C4033]">
                    <strong className="text-[#8B1A1A] font-cinzel font-semibold">Dress Code: </strong>
                    <span>{event.dressCode}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#5C4033] font-cormorant italic leading-relaxed my-2">
                    {event.description}
                  </p>
                </div>

                {/* Bottom Action Buttons: Get Directions & Add to Calendar */}
                <div className="mt-5 pt-4 border-t border-[#D4A843]/30 flex items-center justify-between gap-2">
                  <a
                    href={event.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-lg bg-[#8B1A1A] hover:bg-[#680E0E] text-[#FFFDF9] border border-[#D4A843] text-xs font-cinzel font-semibold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#F3DC9B]" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href={createGoogleCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-lg bg-white/80 hover:bg-white text-[#5C4033] hover:text-[#8B1A1A] border border-[#D4A843]/50 text-xs font-cinzel transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    title="Add to Google Calendar"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#D4A843]" />
                    <span className="hidden sm:inline">Add to Calendar</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
