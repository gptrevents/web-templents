import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ExternalLink } from 'lucide-react';
import { TeatroLang } from './TeatroLangSwitch';

interface TeatroVenueProps {
  venueName?: string;
  address?: string;
  city?: string;
  mapsUrl?: string;
  lang?: TeatroLang;
}

export const TeatroVenue: React.FC<TeatroVenueProps> = ({
  venueName = 'Villa Medicea di Artimino',
  address = 'Via di Papa Leone X, 28',
  city = 'Artimino, Florencia',
  mapsUrl = 'https://maps.google.com/?q=Villa+Medicea+di+Artimino',
  lang = 'en',
}) => {
  const translations = {
    en: {
      celebrationAt: 'The celebration will take place at',
      viewMap: 'View on Map',
    },
    it: {
      celebrationAt: 'La celebrazione avrà luogo presso',
      viewMap: 'Vedi sulla mappa',
    },
    te: {
      celebrationAt: 'వివాహ వేడుక ప్రదేశం',
      viewMap: 'గూగుల్ మ్యాప్ చూడండి',
    },
  };

  const t = translations[lang] || translations.en;

  return (
    <section className="bg-white flex flex-col items-center justify-start pt-8 pb-16 px-6">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <p
          className="font-body text-xs sm:text-sm tracking-[0.2em] uppercase"
          style={{ color: '#5C2018' }}
        >
          {t.celebrationAt}
        </p>
      </motion.div>

      {/* Architectural Venue Line-Art Illustration */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        viewport={{ once: true }}
        className="relative max-w-xl w-full mb-8 flex justify-center"
      >
        <img
          src="/assets/teatro/venue-illustration.png"
          alt="Villa Medicea di Artimino illustration"
          className="w-full max-w-lg h-auto object-contain"
          loading="lazy"
        />
      </motion.div>

      {/* Venue Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.35 }}
        viewport={{ once: true }}
        className="text-center mb-4 max-w-md"
      >
        <h2
          className="font-display text-3xl sm:text-4xl md:text-5xl tracking-wide leading-tight"
          style={{ color: '#5C2018' }}
        >
          {venueName}
        </h2>
      </motion.div>

      {/* Address */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.45 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <p
          className="font-body text-xs tracking-[0.2em] uppercase mb-1"
          style={{ color: '#5C2018', opacity: 0.85 }}
        >
          {address}
        </p>
        <p
          className="font-body text-xs tracking-[0.2em] uppercase"
          style={{ color: '#5C2018', opacity: 0.85 }}
        >
          {city}
        </p>
      </motion.div>

      {/* View on Map CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.55 }}
        viewport={{ once: true }}
      >
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-body text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            backgroundColor: 'transparent',
            color: '#5C2018',
            border: '1px solid rgba(92, 32, 24, 0.4)',
          }}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>{t.viewMap}</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>
      </motion.div>
    </section>
  );
};
