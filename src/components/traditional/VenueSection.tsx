import React from 'react';
import { motion } from 'motion/react';
import { TRADITIONAL_ASSETS, WEDDING_COUPLE } from '../../data/weddingData';
import { MapPin, Navigation, Phone, Car, ExternalLink } from 'lucide-react';
import { CornerOrnament } from './WeddingBorders';

export const VenueSection: React.FC = () => {
  return (
    <section id="venue" className="relative w-full py-16 px-4 sm:px-6 bg-transparent overflow-hidden">
      
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 flex flex-col items-center"
        >
          <span className="text-xs font-cinzel font-semibold tracking-[0.25em] text-[#D4A843] uppercase mb-1">
            Find Your Way to Us
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#8B1A1A] tracking-wide">
            The Venue
          </h2>
          <span className="font-telugu text-sm text-[#8B1A1A]/90 mt-0.5">
            (కళ్యాణ వేదిక &amp; ప్రయాణ మార్గం)
          </span>
          <div className="w-44 h-4 my-2 opacity-85">
            <img src={TRADITIONAL_ASSETS.goldDivider} alt="" className="w-full h-full object-contain" />
          </div>
          <p className="font-cormorant italic text-sm sm:text-base text-[#5C4033] max-w-md">
            We eagerly look forward to greeting you with folded hands and heartfelt smiles at our wedding venue.
          </p>
        </motion.div>

        {/* Venue Details & Map Card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-3xl rounded-2xl bg-gradient-to-b from-[#FFF5DE] via-[#FCECC7] to-[#F8E1B5] border-2 border-[#D4A843] shadow-[0_12px_28px_rgba(139,26,26,0.15)] overflow-hidden flex flex-col"
        >
          <CornerOrnament position="top-left" className="absolute top-2 left-2 opacity-50 z-20" size={28} />
          <CornerOrnament position="top-right" className="absolute top-2 right-2 opacity-50 z-20" size={28} />
          
          {/* Top Info Banner */}
          <div className="p-6 sm:p-8 bg-[#FFF3DC]/90 border-b border-[#D4A843]/50 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-cinzel font-bold text-[#8B1A1A] uppercase tracking-wider">
                  Primary Muhurtham Venue
                </span>
                <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#8B1A1A] mt-0.5">
                  {WEDDING_COUPLE.primaryVenue}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4033] font-sans-clean mt-1 leading-relaxed max-w-md">
                  {WEDDING_COUPLE.primaryAddress}
                </p>
              </div>

              {/* Call Helpline Button */}
              <a
                href={`tel:${WEDDING_COUPLE.venuePhone}`}
                className="self-start sm:self-center px-4 py-2.5 rounded-xl bg-[#8B1A1A] hover:bg-[#680E0E] text-[#FFFDF9] border border-[#D4A843] text-xs font-cinzel font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-[#F3DC9B]" />
                <span>Guest Helpline</span>
              </a>
            </div>

            {/* Quick Navigation & Cab Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-[#D4A843]/40">
              <a
                href={WEDDING_COUPLE.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl bg-[#8B1A1A] hover:bg-[#680E0E] text-[#FFFDF9] font-cinzel font-semibold text-xs tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#D4A843]"
              >
                <Navigation className="w-4 h-4 text-[#F3DC9B]" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={`https://m.uber.com/ul/?action=setPickup&client_id=uber&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(WEDDING_COUPLE.primaryAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-white/90 hover:bg-white text-[#3D1C00] border border-[#D4A843] font-cinzel text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Car className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Book Cab / Uber</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="relative w-full h-72 sm:h-80 bg-gray-100">
            <iframe
              title="Wedding Venue Location Map"
              src={WEDDING_COUPLE.mapsEmbedUrl}
              className="w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Parking & Hospitality Note */}
          <div className="p-4 bg-[#FFF0D4] text-center text-xs text-[#5C4033] font-sans-clean border-t border-[#D4A843]/40">
            <p>
              ✨ Valet parking is available at the main entrance. For outstation guest accommodation and transport assistance, please contact our hospitality desk.
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
