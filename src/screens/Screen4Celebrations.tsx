import React, { useState } from 'react';
import { ChevronRight, Calendar, MapPin } from 'lucide-react';
import { ScreenIndicator } from '../components/ScreenIndicator';
import { ScreenId, CelebrationEvent } from '../types';
import { CELEBRATION_EVENTS } from '../data/weddingData';
import { EventDetailModal } from '../components/Modals/EventDetailModal';

interface Screen4CelebrationsProps {
  onNext: () => void;
  onNavigate?: (id: ScreenId) => void;
  onOpenMenu?: () => void;
  isSinglePage?: boolean;
}

export const Screen4Celebrations: React.FC<Screen4CelebrationsProps> = ({
  onNext,
  onNavigate = () => {},
  onOpenMenu = () => {},
  isSinglePage = false,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<CelebrationEvent | null>(null);

  return (
    <div
      className={`relative w-full ${isSinglePage ? 'min-h-[100vh] py-12' : 'h-full min-h-[100dvh] max-h-[932px] overflow-y-auto'} shadow-2xl flex flex-col justify-between select-none`}
      style={{
        background: 'radial-gradient(circle at 50% 30%, #FFFDF9 0%, #FBF6EF 60%, #F5ECE0 100%)',
      }}
    >
      {/* Top Bar Navigation (hidden in single page mode) */}
      {!isSinglePage && (
        <div className="relative z-40 w-full pt-1">
          <ScreenIndicator
            activeScreen={4}
            onNavigate={onNavigate}
            onOpenMenu={onOpenMenu}
            darkMode={false}
          />
        </div>
      )}

      {/* Falling Petals */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="animate-petal-1 absolute top-0 left-[12%] w-4 h-5 bg-pink-300/70 rounded-full blur-[0.4px]" />
        <div className="animate-petal-2 absolute top-0 right-[15%] w-4 h-5 bg-rose-300/70 rounded-full blur-[0.4px]" />
      </div>

      {/* Corner Flower Assets */}
      <img
        alt="Floral decoration"
        className="absolute -top-1 -left-1 w-24 max-w-[24%] pointer-events-none z-10 opacity-95"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW7EPj-4XuRz5QyLAch40eRCxaRNhS02TQ3n87i7gO7AWAgGZkuU-FKLsnaFARuVarcKiyTr__OT8CQHrBewL02tSHWBP-ev2Q0TFZTzhczndFJKI1-iwmuLuubCjTtWLKXTNsgOOJnHENaljheH3MSgezyhrO0DCd0jt_B9GwzB0xPudRT1lhn-Q0-GLQNTIvuKh1_dQmZ2_-bwqHC6t_L4vSesW61cNnoq9pqUS-Qxav0wic0X-PVeTTU896eBQzcw"
      />
      <img
        alt="Floral decoration"
        className="absolute -top-1 -right-1 w-24 max-w-[24%] pointer-events-none z-10 opacity-95"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxRRWefGoSBPfIVSV3wBzrAZhpXYN7zLKGgxWkiNcnXnDqpoTG_TbU4bfGyyoTR3CHRaiqGn7zUiiDmDZLBaluqDrVuE-rubxootTDFQP4z7bt_-AcK-4oZfdvSQNd5k9AQ3_5H_CcoezfP_tAmQL8cpt8fVHqNGG9fKbUjkvDG5KWyZU-XB0BiT1kVC94FVphS_UEeyTk5Z88l4xhlcEw5Cz_9FQ-m_7kbSIXZg4U_wRNttqiW7rbxOfUGV3IFFJ5GQ"
      />

      {/* Header Block */}
      <header className="pt-2 px-6 pb-2 relative z-20 text-center">
        <h2 className="font-cormorant text-2xl md:text-[26px] font-normal tracking-wide text-[#38312B] leading-snug">
          The
        </h2>
        <h1 className="font-playfair text-[38px] sm:text-[42px] tracking-normal font-semibold text-[#6A0D25] -mt-1 leading-tight">
          Celebrations
        </h1>

        {/* Golden Filigree Divider */}
        <div className="flex items-center justify-center mt-2 px-6">
          <svg className="w-44 h-5 text-[#C5A059] fill-current opacity-85" viewBox="0 0 200 24">
            <path d="M10 12H80M120 12H190" stroke="currentColor" strokeLinecap="round" strokeWidth="0.8" />
            <circle cx="82" cy="12" fill="currentColor" r="1.5" />
            <circle cx="118" cy="12" fill="currentColor" r="1.5" />
            <path
              d="M100 4C94 9 92 12 88 12C92 12 95 15 100 20C105 15 108 12 112 12C108 12 106 9 100 4Z"
              fill="currentColor"
            />
            <circle cx="100" cy="12" fill="#FFFDF9" r="2" />
          </svg>
        </div>
      </header>

      {/* Event Cards Container */}
      <section className="px-4 py-1 space-y-3 relative z-20 max-w-[420px] mx-auto w-full">
        {CELEBRATION_EVENTS.map((event) => (
          <article
            key={event.id}
            onClick={() => setSelectedEvent(event)}
            className="group relative bg-white/95 rounded-[22px] p-3.5 shadow-[0_6px_20px_rgba(184,134,11,0.12)] border border-[#C5A059]/40 hover:border-[#C5A059] transition-all duration-300 transform active:scale-[0.985] cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center space-x-3.5 flex-1 min-w-0">
              {/* Event Illustration Motif */}
              <div
                className="w-[62px] h-[62px] rounded-full flex-shrink-0 flex items-center justify-center p-1 border shadow-inner group-hover:rotate-2 transition-transform"
                style={{
                  background: 'linear-gradient(135deg, #FFFDF8 0%, #FFF4E5 100%)',
                  borderColor: '#E7C282',
                }}
              >
                {event.illustrationType === 'haldi' && (
                  <svg className="w-11 h-11" viewBox="0 0 70 70" fill="none">
                    <circle cx="35" cy="35" r="28" stroke="#F1CA74" strokeDasharray="2 2" strokeWidth="0.7" opacity="0.6" />
                    <ellipse cx="35" cy="53" rx="12" ry="3.5" fill="#B37418" opacity="0.4" />
                    <path d="M24 51C24 45 27 34 35 34C43 34 46 45 46 51C46 53 43 54 35 54C27 54 24 53 24 51Z" fill="#F4AF23" />
                    <path d="M29 34C29 30 31 27 35 27C39 27 41 30 41 34Z" fill="#DF9918" />
                    <path d="M30 27C27 21 21 21 24 17C28 20 31 23 31 27Z" fill="#69923E" />
                    <path d="M40 27C43 21 49 21 46 17C42 20 39 23 39 27Z" fill="#69923E" />
                    <circle cx="35" cy="21" r="5" fill="#A7601C" />
                    <circle cx="35" cy="51" r="3.5" fill="#E88219" />
                  </svg>
                )}

                {event.illustrationType === 'mehendi' && (
                  <svg className="w-11 h-11" viewBox="0 0 70 70" fill="none">
                    <circle cx="21" cy="45" r="3" fill="#84A864" />
                    <circle cx="49" cy="45" r="3" fill="#84A864" />
                    <path d="M22 26C15 22 17 38 23 35Z" fill="#5A7D43" />
                    <path d="M48 26C55 22 53 38 47 35Z" fill="#5A7D43" />
                    <circle cx="35" cy="35" r="10" fill="#F8A7B7" opacity="0.9" />
                    <circle cx="35" cy="35" r="5" fill="#D95370" />
                    <circle cx="35" cy="35" r="2.5" fill="#FFDB6E" />
                  </svg>
                )}

                {event.illustrationType === 'wedding' && (
                  <svg className="w-11 h-11" viewBox="0 0 70 70" fill="none">
                    <path d="M22 28V53M48 28V53" stroke="#DCA23E" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M19 28C25 18 45 18 51 28Z" fill="#F4B733" />
                    <path d="M22 28C28 35 42 35 48 28" stroke="#D1364A" strokeWidth="2" fill="none" />
                    <path d="M30 48L32 52H38L40 48H30Z" fill="#BF7A1A" />
                    <path d="M35 42C33 45 34 47 35 48C36 47 37 45 35 42Z" fill="#E24A21" />
                  </svg>
                )}

                {event.illustrationType === 'reception' && (
                  <svg className="w-11 h-11" viewBox="0 0 70 70" fill="none">
                    <circle cx="27" cy="30" r="6" fill="#6D8B55" opacity="0.8" />
                    <circle cx="43" cy="30" r="6" fill="#6D8B55" opacity="0.8" />
                    <circle cx="35" cy="24" r="5" fill="#81A265" opacity="0.9" />
                    <circle cx="30" cy="32" r="6" fill="#FCA5B7" />
                    <circle cx="40" cy="32" r="6" fill="#F88DA4" />
                    <circle cx="35" cy="38" r="6.5" fill="#F57692" />
                    <circle cx="35" cy="34" r="3.5" fill="#FFF2BF" />
                  </svg>
                )}
              </div>

              {/* Event Content Info */}
              <div className="flex-1 min-w-0 pr-1">
                <h3 className="font-playfair font-bold text-[18px] sm:text-[19px] text-gray-900 leading-tight">
                  {event.name.split(' ')[0]}
                </h3>

                <div className="flex items-center text-[12.5px] sm:text-[13px] text-gray-800 font-medium mt-1">
                  <Calendar className="w-3.5 h-3.5 text-[#E11D48] flex-shrink-0 mr-1.5" />
                  <span className="truncate tracking-tight font-medium">
                    {event.date} &nbsp;|&nbsp; {event.time}
                  </span>
                </div>

                <div className="flex items-center text-[12.5px] sm:text-[13px] text-gray-700 font-normal mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E11D48] flex-shrink-0 mr-1.5" />
                  <span className="truncate font-medium">{event.venue}</span>
                </div>
              </div>
            </div>

            {/* Right Arrow */}
            <div className="text-[#E11D48] pl-2 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1">
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </article>
        ))}
      </section>

      {/* Bottom Poetic Footer */}
      <footer className="relative z-20 pt-3 pb-7 px-6 text-center">
        <div className="space-y-0.5 cursor-pointer" onClick={onNext}>
          <p className="font-cormorant text-[20px] text-[#55473F] tracking-wide leading-relaxed font-normal">
            Different moments
          </p>
          <p className="font-cormorant text-[20px] text-[#55473F] tracking-wide leading-relaxed font-normal">
            Same blessings
          </p>
          <p className="font-cormorant text-[20px] text-[#55473F] tracking-wide leading-relaxed font-normal">
            Be there for all
          </p>
          <div className="flex justify-center items-center mt-2">
            <span className="text-[#E11D48] text-base animate-heartbeat">♥</span>
          </div>
        </div>

        {/* Bottom Corner Florals */}
        <img
          alt=""
          className="absolute -bottom-1 -left-1 w-24 max-w-[24%] pointer-events-none z-10 opacity-95"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxrBRhoaHEFdolIhUKzdeI7jrSZgQlwdwP7ABdP2qb10b4-jiY8qWDkuT_b1ykJ8C_TIt5EfzAP0F3iVU2yojI2ims2O71jebkwL-Viyqr1hGrKPqfwLkPSpfcnFWtceRaS5rLuCFkOeO6UOGYKKf4ePtCcdXvdQ4OWBi39uW_v_zPnenJrVNoK6N7tp7DLQwrdR8oYDCUdSBsbwA6L6Boxj0cAOAB242Q9KnfhSujBLtZAvtQgGPqESAnnl4vGlYSQQ"
        />
        <img
          alt=""
          className="absolute -bottom-1 -right-1 w-24 max-w-[24%] pointer-events-none z-10 opacity-95"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0EKBJyr_Mv0z3O1YPt5u-QouFdKeUq3kG-A_hwBYfEn7XrPuNq-qKcMTW520E6PBkLbsgwLWK_kDSEMIoj_H-ektN3g0FmeOOx1GKvQc5YV7CezKjJ2PoDfKO3gJFgF2nMeAnqz2ew3lmX_Dh4MPtz7oAzyTkPGBvd25PJ9aECVTsdjukEiWZtjh7E6Xb8gMyZ9aKNkK4Q-MC7ITpy8IgvLaQLQ_mYkPChcVWO3ix4AxjOOve6J8Klzohxb5joR3MWw"
        />
      </footer>

      {/* Event Details Modal */}
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};
