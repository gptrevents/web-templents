import React from 'react';
import { Heart, ChevronUp, MapPin, Calendar, Sparkles } from 'lucide-react';
import { WEDDING_COUPLE } from '../data/weddingData';

interface WeddingFooterProps {
  onNavigate: (sectionId: string) => void;
}

export const WeddingFooter: React.FC<WeddingFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative w-full bg-[#12090C] text-[#FFF7E6] border-t border-[#C59B27]/30 pt-16 pb-24 sm:pb-16 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(216,43,97,0.12)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Sacred Kalash / Monogram Motif */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2F1117] to-[#17090C] border border-[#E5C158]/60 flex items-center justify-center mb-6 shadow-[0_0_24px_rgba(229,193,88,0.3)]">
          <Sparkles className="w-6 h-6 text-[#E5C158]" />
        </div>

        {/* Auspicious Telugu Wedding Shloka */}
        <div className="max-w-2xl mx-auto mb-6 px-4 py-3 rounded-2xl bg-white/[0.03] border border-[#E5C158]/20">
          <p className="font-playfair text-[#FDE4B7] text-sm sm:text-base leading-relaxed italic tracking-wide">
            "మాంగళ్యం తంతునానేన మమజీవన హేతునా | కంఠే బధ్నామి శుభగే త్వం జీవ శరదాం శతం ||"
          </p>
          <p className="text-[11px] text-white/60 font-sans-clean mt-1">
            "May our bond of sacred love and togetherness flourish for a hundred autumns."
          </p>
        </div>

        {/* Couple Names */}
        <h2 className="font-cormorant text-4xl sm:text-5xl font-medium tracking-wide text-white mb-2">
          {WEDDING_COUPLE.groom} &amp; {WEDDING_COUPLE.bride}
        </h2>

        {/* Date & Location */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[#FDE4B7]/90 font-cinzel tracking-wider mb-8">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#E5C158]" />
            {WEDDING_COUPLE.weddingDateDisplay}
          </span>
          <span className="text-white/30">•</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#D82B61]" />
            {WEDDING_COUPLE.city}, {WEDDING_COUPLE.state}
          </span>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs font-cinzel tracking-widest text-white/70 mb-10">
          <button
            onClick={() => onNavigate('hero')}
            className="hover:text-[#FDE4B7] transition cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('invitation')}
            className="hover:text-[#FDE4B7] transition cursor-pointer"
          >
            Invitation
          </button>
          <button
            onClick={() => onNavigate('story')}
            className="hover:text-[#FDE4B7] transition cursor-pointer"
          >
            Our Story
          </button>
          <button
            onClick={() => onNavigate('celebrations')}
            className="hover:text-[#FDE4B7] transition cursor-pointer"
          >
            Events
          </button>
          <button
            onClick={() => onNavigate('venue')}
            className="hover:text-[#FDE4B7] transition cursor-pointer"
          >
            Venue
          </button>
          <button
            onClick={() => onNavigate('rsvp')}
            className="hover:text-[#FDE4B7] transition cursor-pointer text-[#E5C158]"
          >
            RSVP
          </button>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-sans-clean">
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#D82B61] fill-current" /> for Arjun &amp; Priya's Wedding
          </p>

          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#FDE4B7] transition cursor-pointer active:scale-95"
          >
            <span>Back to Top</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
