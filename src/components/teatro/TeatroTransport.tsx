import React from 'react';
import { motion } from 'motion/react';
import { TeatroLang } from './TeatroLangSwitch';

interface TeatroTransportProps {
  lang?: TeatroLang;
}

export const TeatroTransport: React.FC<TeatroTransportProps> = ({ lang = 'en' }) => {
  const translations = {
    en: {
      howToGet: 'How to Get There',
      title: 'Transport',
      description:
        'We have organized dedicated buses from the center of Florence to the villa so you can celebrate freely without worries.',
      departureTitle: 'Departure',
      departurePlace: 'Piazza della Signoria',
      departureTime: '16:00h',
      returnTitle: 'Return',
      returnPlace: 'Back to Florence Center',
      returnTime: '02:00h & 04:00h',
      note: 'Please indicate in your RSVP if you will need bus transport.',
    },
    it: {
      howToGet: 'Come Arrivare',
      title: 'Trasporto',
      description:
        'Abbiamo organizzato navette dal centro di Firenze alla villa per farvi godere la festa senza pensieri.',
      departureTitle: 'Partenza',
      departurePlace: 'Piazza della Signoria',
      departureTime: '16:00h',
      returnTitle: 'Rientro',
      returnPlace: 'Ritorno al centro di Firenze',
      returnTime: '02:00h & 04:00h',
      note: 'Vi preghiamo di indicare nel RSVP se usufruirete del trasporto.',
    },
    te: {
      howToGet: 'రవాణా సదుపాయం',
      title: 'ప్రత్యేక బస్సులు',
      description: 'అతిథుల సౌకర్యార్థం నగర కేంద్రం నుండి కళ్యాణ వేదిక వరకు ఉచిత రవాణా బస్సులు ఏర్పాటు చేయబడ్డాయి.',
      departureTitle: 'ప్రయాణ సమయం',
      departurePlace: 'సెంట్రల్ స్టేషన్ నుండి కళ్యాణ మండపానికి',
      departureTime: 'సాయంత్రం 4:00 గంటలకు',
      returnTitle: 'తిరుగు ప్రయాణం',
      returnPlace: 'కళ్యాణ వేదిక నుండి తిరుగు ప్రయాణం',
      returnTime: 'రాత్రి 10:00 & 11:30 గంటలకు',
      note: 'మీకు బస్సు రవాణా అవసరమైతే దయచేసి క్రింది RSVP లో టిక్ చేయండి.',
    },
  };

  const t = translations[lang] || translations.en;

  return (
    <section
      className="flex flex-col items-center justify-center py-16 px-6"
      style={{ backgroundColor: '#FAF8F5' }}
    >
      {/* Eyebrow & Bus Icon */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <p
          className="font-body text-xs tracking-[0.2em] uppercase mb-4"
          style={{ color: '#5C2018' }}
        >
          {t.howToGet}
        </p>

        <img
          src="/assets/teatro/transport-icon.png"
          alt="Vintage bus transport"
          className="w-48 sm:w-56 h-auto mx-auto mb-6 object-contain"
          loading="lazy"
        />

        <h2
          className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide"
          style={{ color: '#5C2018' }}
        >
          {t.title}
        </h2>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center max-w-md mb-12"
      >
        <p
          className="font-body text-sm sm:text-base leading-relaxed"
          style={{ color: '#5C2018', opacity: 0.9 }}
        >
          {t.description}
        </p>
      </motion.div>

      {/* Schedule Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-md w-full mb-10 text-center">
        {/* Outbound */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="p-4 rounded-xl bg-white/60 border border-[#5C2018]/10"
        >
          <p
            className="font-body text-[11px] tracking-[0.2em] uppercase mb-2"
            style={{ color: '#5C2018', opacity: 0.75 }}
          >
            {t.departureTitle}
          </p>
          <p
            className="font-display text-xl sm:text-2xl tracking-wide font-medium mb-1"
            style={{ color: '#5C2018' }}
          >
            {t.departurePlace}
          </p>
          <p
            className="font-display text-lg tracking-wider"
            style={{ color: '#5C2018', opacity: 0.9 }}
          >
            {t.departureTime}
          </p>
        </motion.div>

        {/* Return */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="p-4 rounded-xl bg-white/60 border border-[#5C2018]/10"
        >
          <p
            className="font-body text-[11px] tracking-[0.2em] uppercase mb-2"
            style={{ color: '#5C2018', opacity: 0.75 }}
          >
            {t.returnTitle}
          </p>
          <p
            className="font-display text-xl sm:text-2xl tracking-wide font-medium mb-1"
            style={{ color: '#5C2018' }}
          >
            {t.returnPlace}
          </p>
          <p
            className="font-display text-lg tracking-wider"
            style={{ color: '#5C2018', opacity: 0.9 }}
          >
            {t.returnTime}
          </p>
        </motion.div>
      </div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        className="font-body text-xs italic tracking-wide text-center"
        style={{ color: '#5C2018', opacity: 0.75 }}
      >
        {t.note}
      </motion.p>
    </section>
  );
};
