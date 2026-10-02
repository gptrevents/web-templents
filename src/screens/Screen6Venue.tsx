import React from 'react';
import { MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';
import { ScreenIndicator } from '../components/ScreenIndicator';
import { ScreenId } from '../types';
import { WEDDING_COUPLE } from '../data/weddingData';

interface Screen6VenueProps {
  onNext: () => void;
  onNavigate?: (id: ScreenId) => void;
  onOpenMenu?: () => void;
  isSinglePage?: boolean;
}

export const Screen6Venue: React.FC<Screen6VenueProps> = ({
  onNext,
  onNavigate = () => {},
  onOpenMenu = () => {},
  isSinglePage = false,
}) => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    WEDDING_COUPLE.mapsQuery
  )}`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    WEDDING_COUPLE.mapsQuery
  )}`;

  return (
    <div className={`relative w-full ${isSinglePage ? 'min-h-[100vh] py-12' : 'h-full min-h-[100dvh] max-h-[932px] overflow-y-auto'} bg-[#faf6f0] flex flex-col items-center select-none shadow-2xl`}>
      {/* Background Template Image */}
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS5mVH04oeIaHspZ8e_lVZtkyQQL8VEodytE3ls4EsTbK-pjTmtRqso_oM2cFjd29kkRLJ6bYIchnYJfI5_GC4BgS6oGLg7HCVLa2m18tBLmtnX3R_dZv4MzXGnLjk_UuBRq0rxiSCRMh1Axy_O2nc_aYZ_rh4KpyAD45B86TENPRAzEp6uCRzHhxYtXiMAkGjGXFO1-u3JoHztPZsCMO7ojDkBkx3sjUCsB6oSMZ01V8QBixV8_eknOlpyiPiuKeR_g"
        alt="Venue Background"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Top Bar Navigation (hidden in single page mode) */}
      {!isSinglePage && (
        <div className="relative z-40 w-full pt-1">
          <ScreenIndicator
            activeScreen={6}
            onNavigate={onNavigate}
            onOpenMenu={onOpenMenu}
            darkMode={false}
          />
        </div>
      )}

      {/* Title: The Venue */}
      <div className="relative z-10 flex flex-col items-center mt-1 mb-1">
        <h1 className="font-playfair text-[36px] sm:text-[40px] font-medium tracking-tight text-[#701a35] text-center leading-none">
          The Venue
        </h1>

        {/* Golden Filigree */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#cbb28a]" />
          <svg className="w-6 h-3 text-[#bfa172]" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2C9 2 7 6 7 6S5 2 2 2" strokeLinecap="round" />
            <path d="M12 2C15 2 17 6 17 6S19 2 22 2" strokeLinecap="round" />
            <circle cx="12" cy="6" r="1.5" fill="#bfa172" />
            <path d="M12 10C9 10 7 6 7 6S5 10 2 10" strokeLinecap="round" />
            <path d="M12 10C15 10 17 6 17 6S19 10 22 10" strokeLinecap="round" />
          </svg>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#cbb28a]" />
        </div>
      </div>

      {/* Space for the beautiful top photo */}
      <div className="w-full h-[180px] relative z-0 pointer-events-none" />

      {/* Middle Details Container */}
      <main className="relative z-10 w-full px-5 flex flex-col items-center mt-1">
        {/* Venue Title & Address */}
        <div className="text-center mb-3">
          <h2 className="font-playfair text-[24px] font-semibold text-[#1f2430] tracking-tight leading-snug">
            {WEDDING_COUPLE.primaryVenue}
          </h2>
          <p className="text-[14px] text-[#4a4f5c] font-normal mt-0.5 leading-relaxed">
            MG Road, Vijayawada
            <br />
            <span className="text-[13px] text-[#6b7280]">Andhra Pradesh - 520010</span>
          </p>
        </div>

        {/* 3 Action Buttons Card */}
        <div className="w-full max-w-[370px] bg-white/95 backdrop-blur-sm rounded-2xl p-2 flex items-center justify-between border border-[#ebdccf] shadow-lg mb-3">
          {/* Open in Maps */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center py-2 px-1 rounded-xl transition hover:bg-[#faf4ef] active:scale-95 text-center group"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1 text-[#e11d48] group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5 fill-current" />
            </div>
            <span className="text-[12px] font-semibold text-[#2b2e38] tracking-tight whitespace-nowrap">
              Open in Maps
            </span>
          </a>

          <div className="w-[1px] h-9 bg-[#f0e3d8]" />

          {/* Get Directions */}
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center py-2 px-1 rounded-xl transition hover:bg-[#faf4ef] active:scale-95 text-center group"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1 text-[#e11d48] group-hover:scale-110 transition-transform">
              <Navigation className="w-5 h-5 fill-current" />
            </div>
            <span className="text-[12px] font-semibold text-[#2b2e38] tracking-tight whitespace-nowrap">
              Get Directions
            </span>
          </a>

          <div className="w-[1px] h-9 bg-[#f0e3d8]" />

          {/* Call Venue */}
          <a
            href={`tel:${WEDDING_COUPLE.venuePhone}`}
            className="flex-1 flex flex-col items-center py-2 px-1 rounded-xl transition hover:bg-[#faf4ef] active:scale-95 text-center group"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1 text-[#e11d48] group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5 fill-current" />
            </div>
            <span className="text-[12px] font-semibold text-[#2b2e38] tracking-tight whitespace-nowrap">
              Call Venue
            </span>
          </a>
        </div>

        {/* Map Preview Card */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full max-w-[370px] h-[115px] rounded-2xl overflow-hidden border border-[#ebdccf] shadow-md bg-[#e5f0e8] flex flex-col items-center justify-center group cursor-pointer transition-transform active:scale-[0.98]"
        >
          {/* Stylized Map Grid Pattern */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(#9ca3af 1px, transparent 1px), linear-gradient(90deg, #9ca3af 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />

          {/* Pin */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-white shadow-md border border-[#ebdccf] flex items-center justify-center text-[#e11d48] group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5 fill-current" />
            </div>
            <span className="text-[12.5px] font-semibold text-[#2b2e38] mt-1 bg-white/90 px-3 py-0.5 rounded-full shadow-sm flex items-center space-x-1">
              <span>View Sri Convention Hall on Google Maps</span>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </span>
          </div>
        </a>

        {/* Quote: A beautiful place for a beautiful beginning */}
        <div
          onClick={onNext}
          className="flex flex-col items-center mt-4 cursor-pointer active:scale-95 transition"
        >
          <p className="font-playfair italic text-[16px] sm:text-[17px] text-[#4a4038] text-center tracking-wide font-normal">
            A beautiful place
            <br />
            for a beautiful beginning
          </p>

          <div className="flex items-center justify-center gap-2 mt-1.5">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d2b48c]" />
            <span className="text-[#e11d48] text-sm">♥</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d2b48c]" />
          </div>
        </div>
      </main>

      <div className="w-full flex-1 min-h-[140px] pointer-events-none" />
    </div>
  );
};
