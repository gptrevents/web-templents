import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, Phone, Navigation, MapPin } from 'lucide-react';

interface Screen06Props {
  onBack?: () => void;
}

export const NeoBloomScreen06Venue: React.FC<Screen06Props> = ({ onBack }) => {
  const address = 'Sri Convention Hall, MG Road, Vijayawada, Andhra Pradesh - 520010';
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;

  return (
    <div className="relative w-full h-full min-h-[640px] sm:min-h-[700px] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#F8F4EE] to-[#EFE8DE] text-stone-900 select-none">
      {/* Top Bar with Back Arrow and Sparkle */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-4 pb-2">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200 flex items-center justify-center text-stone-700 transition cursor-pointer"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="w-7 h-7 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10 px-6 pt-1 text-center">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
          The Venue
        </h2>
        <p className="text-[11px] sm:text-xs text-stone-500 font-serif italic mt-0.5">
          A place where beautiful stories come alive
        </p>
      </div>

      {/* Main Venue Section */}
      <div className="relative z-10 px-5 sm:px-6 py-2 my-auto max-w-[340px] mx-auto w-full space-y-3">
        {/* Large Modern Architecture / Venue Photo */}
        <div className="w-full h-36 sm:h-40 rounded-2xl overflow-hidden shadow-lg border-2 border-white relative group">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=700&q=80"
            alt="Sri Convention Hall Venue"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Venue Info Card with 3 Round Action Buttons */}
        <div className="bg-white rounded-2xl p-3.5 shadow-md border border-stone-200/90 text-center">
          <h3 className="font-bold text-sm sm:text-base text-stone-900">
            Sri Convention Hall
          </h3>
          <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
            MG Road, Vijayawada
            <br />
            Andhra Pradesh - 520010
          </p>

          {/* 3 Circular Action Buttons */}
          <div className="flex items-center justify-center gap-5 sm:gap-6 mt-3 pt-2.5 border-t border-stone-100">
            {/* Call Button */}
            <a
              href="tel:+919876543210"
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-amber-400 group-hover:bg-amber-500 text-stone-900 flex items-center justify-center shadow-md transition-all group-hover:scale-105">
                <Phone className="w-4 h-4 fill-stone-900 text-stone-900" />
              </div>
              <span className="text-[10px] font-semibold text-stone-700">Call</span>
            </a>

            {/* Direction Button */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-teal-500 group-hover:bg-teal-600 text-white flex items-center justify-center shadow-md transition-all group-hover:scale-105">
                <Navigation className="w-4 h-4 fill-white text-white" />
              </div>
              <span className="text-[10px] font-semibold text-stone-700">Direction</span>
            </a>

            {/* View Map Button */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-rose-500 group-hover:bg-rose-600 text-white flex items-center justify-center shadow-md transition-all group-hover:scale-105">
                <MapPin className="w-4 h-4 fill-white text-white" />
              </div>
              <span className="text-[10px] font-semibold text-stone-700">View Map</span>
            </a>
          </div>
        </div>

        {/* Embedded Stylized Map Graphic */}
        <div className="w-full h-20 rounded-xl overflow-hidden shadow-xs border border-stone-200/80 relative bg-[#E5E3DF]">
          {/* Simulated clean map lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#DDD_1px,transparent_1px),linear-gradient(to_bottom,#DDD_1px,transparent_1px)] bg-[size:20px_20px] opacity-70" />
          
          {/* Roads */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-amber-100 border-y border-amber-300" />
          <div className="absolute top-0 bottom-0 left-1/3 w-2 bg-blue-100 border-x border-blue-300" />

          {/* Centered Map Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border border-white animate-bounce">
              <MapPin className="w-3.5 h-3.5 fill-white" />
            </div>
            <span className="text-[9px] font-bold bg-white/95 px-1.5 py-0.5 rounded-full shadow-2xs text-stone-800 border border-stone-200 -mt-1">
              Sri Convention Hall
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Beach / Sunset Strip Photo & Script */}
      <div className="relative z-10 pb-4 pt-1 px-6 flex items-center justify-between max-w-[340px] mx-auto w-full">
        <div className="w-20 h-10 rounded-lg overflow-hidden border border-white shadow-xs">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80"
            alt="Sunset Beach"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <p className="font-serif italic text-base sm:text-lg text-stone-800 text-right">
          See
          <br />
          you there! <span className="text-rose-500 not-italic">♡</span>
        </p>
      </div>
    </div>
  );
};
