import React from 'react';
import { motion } from 'motion/react';
import { TeatroLang } from './TeatroLangSwitch';

interface TeatroThankYouProps {
  coupleNames?: string;
  lang?: TeatroLang;
}

export const TeatroThankYou: React.FC<TeatroThankYouProps> = ({
  coupleNames = 'Sam & Sofía',
  lang = 'en',
}) => {
  const translations = {
    en: {
      title: 'Thank You',
      message:
        'For joining us on this special day. Your presence is the best gift we could receive.',
    },
    it: {
      title: 'Grazie',
      message:
        'Per essere stati con noi in questo giorno speciale. La vostra presenza è il dono più bello che potessimo ricevere.',
    },
    te: {
      title: 'ధన్యవాదాలు',
      message:
        'ఈ పవిత్రమైన శుభదినాన మమ్మల్ని ఆశీర్వదించడానికి విచ్చేసినందుకు మా హృదయపూర్వక ధన్యవాదాలు. మీ రాకే మాకు దక్కిన అతిపెద్ద బహుమతి.',
    },
  };

  const t = translations[lang] || translations.en;

  // The polygon polygon coordinate definition for the authentic scallop edge
  const scallopPolygon = `polygon(
    0% 4%, 4% 0%, 8% 4%, 15% 0%, 22% 4%, 29% 0%, 36% 4%, 43% 0%, 50% 4%,
    57% 0%, 64% 4%, 71% 0%, 78% 4%, 85% 0%, 92% 4%, 96% 0%, 100% 4%,
    98% 15%, 100% 22%, 98% 29%, 100% 36%, 98% 43%, 100% 50%, 98% 57%, 100% 64%, 98% 71%, 100% 78%, 98% 85%, 100% 92%,
    96% 100%, 92% 96%, 85% 100%, 78% 96%, 71% 100%, 64% 96%, 57% 100%, 50% 96%,
    43% 100%, 36% 96%, 29% 100%, 22% 96%, 15% 100%, 8% 96%, 4% 100%, 0% 96%,
    2% 85%, 0% 78%, 2% 71%, 0% 64%, 2% 57%, 0% 50%, 2% 43%, 0% 36%, 2% 29%, 0% 22%, 2% 15%
  )`;

  return (
    <section className="flex flex-col items-center justify-center pt-20 pb-32 px-6 bg-[#FAF8F5]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="w-full max-w-sm sm:max-w-md p-2"
      >
        {/* Outer Scallop Border (Deep Burgundy #5C2018) */}
        <div
          className="p-3 sm:p-4 shadow-xl transition-transform duration-500 hover:scale-[1.01]"
          style={{
            backgroundColor: '#5C2018',
            clipPath: scallopPolygon,
          }}
        >
          {/* Inner Scallop Card (Warm Cream Paper #FAF8F5) */}
          <div
            className="py-12 sm:py-16 px-6 sm:px-10 text-center flex flex-col items-center justify-center"
            style={{
              backgroundColor: '#FAF8F5',
              clipPath: scallopPolygon,
            }}
          >
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="font-script text-4xl sm:text-5xl mb-4 leading-normal"
              style={{ color: '#5C2018' }}
            >
              {t.title}
            </motion.h2>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              viewport={{ once: true }}
              className="font-body text-xs sm:text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: '#5C2018', opacity: 0.9 }}
            >
              {t.message}
            </motion.p>

            {/* Couple Names */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="font-script text-3xl sm:text-4xl"
              style={{ color: '#5C2018' }}
            >
              {coupleNames}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Footer Branding / Credits */}
      <div className="text-center mt-12 mb-4">
        <p
          className="font-body text-[10px] tracking-[0.2em] uppercase"
          style={{ color: '#5C2018', opacity: 0.6 }}
        >
          With Love • Teatro Digital Invitation
        </p>
      </div>
    </section>
  );
};
