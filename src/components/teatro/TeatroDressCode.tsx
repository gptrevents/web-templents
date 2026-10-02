import React from 'react';
import { motion } from 'motion/react';
import { TeatroLang } from './TeatroLangSwitch';

interface TeatroDressCodeProps {
  lang?: TeatroLang;
}

export const TeatroDressCode: React.FC<TeatroDressCodeProps> = ({ lang = 'en' }) => {
  const translations = {
    en: {
      title: 'Dress Code',
      description:
        'We invite you to dress elegantly and formally to celebrate this special day with us.',
      formal: 'Formal Attire',
      avoidWhite: 'Please avoid wearing white',
    },
    it: {
      title: 'Codice di Abbigliamento',
      description:
        'Vi invitiamo a vestirvi in modo elegante e formale per celebrare questo giorno speciale con noi.',
      formal: 'Abito Formale',
      avoidWhite: 'Si prega di evitare il bianco',
    },
    te: {
      title: 'డ్రెస్ కోడ్',
      description: 'ఈ ప్రత్యేకమైన శుభదినాన సంప్రదాయబద్ధమైన లేదా ఫార్మల్ దుస్తులలో విచ్చేయాల్సిందిగా కోరుతున్నాము.',
      formal: 'రాయల్ ట్రెడిషనల్ / ఫార్మల్',
      avoidWhite: 'దయచేసి తెలుపు రంగు దుస్తులను నివారించండి',
    },
  };

  const t = translations[lang] || translations.en;

  return (
    <section className="bg-white flex flex-col items-center justify-center py-16 px-6">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2
          className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide"
          style={{ color: '#5C2018' }}
        >
          {t.title}
        </h2>
      </motion.div>

      {/* Dress code illustration */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full max-w-xs mb-8 flex justify-center"
      >
        <img
          src="/assets/teatro/dresscode-illustration.png"
          alt="Dress code fashion illustration"
          className="w-full h-auto object-contain max-h-72"
          loading="lazy"
        />
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.35 }}
        viewport={{ once: true }}
        className="text-center max-w-md mb-6"
      >
        <p
          className="font-body text-sm sm:text-base leading-relaxed"
          style={{ color: '#5C2018', opacity: 0.9 }}
        >
          {t.description}
        </p>
      </motion.div>

      {/* Formal Attire Callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-4"
      >
        <p
          className="font-display text-2xl sm:text-3xl tracking-wider uppercase"
          style={{ color: '#5C2018' }}
        >
          {t.formal}
        </p>
      </motion.div>

      {/* Note about white */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.65 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p
          className="font-script text-2xl sm:text-3xl"
          style={{ color: '#5C2018', opacity: 0.85 }}
        >
          {t.avoidWhite}
        </p>
      </motion.div>
    </section>
  );
};
