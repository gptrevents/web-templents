import React from 'react';
import { X, Calendar, Clock, MapPin, Sparkles, Navigation } from 'lucide-react';
import { CelebrationEvent } from '../../types';
import { downloadIcsFile, getGoogleCalendarUrl } from '../../utils/calendar';

interface EventDetailModalProps {
  event: CelebrationEvent | null;
  onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  const handleGoogleCalendar = () => {
    const url = getGoogleCalendarUrl({
      title: `${event.name} - Arjun & Priya's Wedding`,
      details: `${event.description}\nDress Code: ${event.dressCode}`,
      location: `${event.venue}, ${event.address}`,
      startIso: '2026-12-12T09:30:00Z',
      endIso: '2026-12-12T13:30:00Z',
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleIcs = () => {
    downloadIcsFile(`${event.name} - Arjun & Priya`, `${event.venue}, ${event.address}`);
  };

  const handleDirections = () => {
    const query = encodeURIComponent(`${event.venue} ${event.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-[380px] bg-[#FAF5EE] rounded-[28px] border border-[#D4AF37]/50 shadow-2xl overflow-hidden text-[#3D1E24]">
        {/* Modal Header */}
        <div
          className="p-6 text-white text-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, #4A101C 0%, #76142C 50%, #9E1C3B 100%)`,
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white/80 transition"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#FDE4B7] uppercase font-semibold">
            Celebration Event
          </span>
          <h2 className="font-playfair text-[26px] font-bold text-white mt-1 leading-tight">
            {event.name}
          </h2>
          <p className="font-cormorant italic text-[16px] text-[#FDE4B7]/90 mt-1">
            {event.date} • {event.time}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* Venue Details */}
          <div className="flex items-start space-x-3 bg-white/70 p-3.5 rounded-2xl border border-[#ECD9CE]">
            <MapPin className="w-5 h-5 text-[#D82B61] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-playfair font-semibold text-[16px] text-gray-900 leading-snug">
                {event.venue}
              </p>
              <p className="text-[13px] text-gray-600 mt-0.5 leading-relaxed">
                {event.address}
              </p>
            </div>
          </div>

          {/* Dress Code */}
          <div className="flex items-start space-x-3 bg-white/70 p-3.5 rounded-2xl border border-[#ECD9CE]">
            <Sparkles className="w-5 h-5 text-[#C59B27] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-cinzel font-semibold text-[12px] text-[#8C651A] uppercase tracking-wider">
                Dress Code / Attire
              </p>
              <p className="text-[14px] font-medium text-gray-800 mt-0.5">
                {event.dressCode}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-[13.5px] font-cormorant text-gray-700 italic text-center px-2 leading-relaxed">
            "{event.description}"
          </p>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleDirections}
              className="w-full py-2.5 px-4 rounded-xl bg-[#D82B61] hover:bg-[#C21E51] text-white font-playfair font-medium text-[15px] flex items-center justify-center space-x-2 shadow-md active:scale-98 transition"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions to {event.venue}</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleGoogleCalendar}
                className="py-2 px-3 rounded-xl bg-white hover:bg-gray-50 border border-[#D82B61]/40 text-[#8C1632] font-medium text-[13px] flex items-center justify-center space-x-1.5 transition active:scale-98"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Google Cal</span>
              </button>

              <button
                onClick={handleIcs}
                className="py-2 px-3 rounded-xl bg-white hover:bg-gray-50 border border-[#D82B61]/40 text-[#8C1632] font-medium text-[13px] flex items-center justify-center space-x-1.5 transition active:scale-98"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Download .ICS</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
