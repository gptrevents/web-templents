import React from 'react';
import { motion } from 'motion/react';
import { TeatroLang } from './TeatroLangSwitch';

interface TeatroMenuProps {
  lang?: TeatroLang;
}

export const TeatroMenu: React.FC<TeatroMenuProps> = ({ lang = 'en' }) => {
  const translations = {
    en: {
      reception: 'Reception to Follow',
      aperitivo: 'Aperitivo',
      aperitivoSub: 'Selection of Tuscan antipasti',
      aperitivoDetail: 'Bruschetta, crostini & cured Italian specialties',
      primo: 'Primo',
      primoSub: 'Risotto al tartufo nero di Norcia',
      primoDetail: 'Parmigiano Reggiano aged 24 months & wild herbs',
      secondo: 'Secondo',
      secondoSub: 'Tagliata di manzo al rosmarino',
      secondoDetail: 'Roasted rosemary potatoes & seasonal greens',
      dolce: 'Dolce',
      dolceSub: 'Torta nuziale & Spumante',
      dolceDetail: 'Traditional Italian wedding cake with sweet berries',
    },
    it: {
      reception: 'Ricevimento a seguire',
      aperitivo: 'Aperitivo',
      aperitivoSub: 'Selezione di antipasti toscani',
      aperitivoDetail: 'Bruschetta, crostini & affettati misti artigianali',
      primo: 'Primo',
      primoSub: 'Risotto al tartufo nero di Norcia',
      primoDetail: 'Mantecato al Parmigiano 24 mesi e burro di malga',
      secondo: 'Secondo',
      secondoSub: 'Tagliata di manzo al rosmarino',
      secondoDetail: 'Patate novelle al forno con erbe aromatiche',
      dolce: 'Dolce',
      dolceSub: 'Torta nuziale & Spumante',
      dolceDetail: 'Millefoglie tradizionale e brindisi di prosecco',
    },
    te: {
      reception: 'విందు భోజనం (రిసెప్షన్ మెనూ)',
      aperitivo: 'ఆరంభం (స్టార్టర్స్)',
      aperitivoSub: 'ప్రత్యేక స్వాగత రుచులు',
      aperitivoDetail: 'వెల్‌కమ్ డ్రింక్స్, తాజా వెజ్ & నాన్-వెజ్ స్నాక్స్',
      primo: 'ప్రధాన వంటకం (రైస్ & రోటీ)',
      primoSub: 'షాహీ బిర్యానీ & ఘుమఘుమలాడే పులావ్',
      primoDetail: 'బాస్మతి దమ్ బిర్యానీ, రుచికరమైన గ్రేవీలు',
      secondo: 'ప్రత్యేక కూరలు (స్పెషల్ కర్రీస్)',
      secondoSub: 'రాయల్ పనీర్ & దమ్ కుర్మా',
      secondoDetail: 'తాజా ఆంధ్రా స్పైసీ వంటకాలు మరియు పప్పు సాంబారు',
      dolce: 'మిఠాయిలు & స్వీట్స్',
      dolceSub: 'వెడ్డింగ్ కేక్ & నోరూరించే జిలేబీ',
      dolceDetail: 'బాదం హల్వా, రసమలై మరియు ఐస్ క్రీమ్',
    },
  };

  const t = translations[lang] || translations.en;

  return (
    <section
      className="flex flex-col items-center justify-center py-16 px-4"
      style={{ backgroundColor: '#FAF8F5' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="relative w-full max-w-md md:max-w-lg"
      >
        {/* Frame image */}
        <img
          src="/assets/teatro/menu-frame.png"
          alt="Menu vintage ornate frame"
          className="w-full h-auto pointer-events-none select-none"
        />

        {/* Menu content placed neatly within the ornate frame */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-[12%] py-[10%] text-center">
          {/* Header */}
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-script text-2xl sm:text-3xl md:text-4xl mb-3"
            style={{ color: '#5C2018' }}
          >
            {t.reception}
          </motion.h3>

          {/* Courses */}
          <div className="space-y-3 sm:space-y-4 w-full">
            {/* Aperitivo */}
            <div>
              <p
                className="font-display text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold"
                style={{ color: '#5C2018' }}
              >
                {t.aperitivo}
              </p>
              <p
                className="font-body text-[10px] sm:text-xs leading-tight"
                style={{ color: '#5C2018', opacity: 0.9 }}
              >
                {t.aperitivoSub}
              </p>
              <p
                className="font-body text-[9px] sm:text-[10px] italic leading-tight"
                style={{ color: '#5C2018', opacity: 0.7 }}
              >
                {t.aperitivoDetail}
              </p>
            </div>

            {/* Primo */}
            <div>
              <p
                className="font-display text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold"
                style={{ color: '#5C2018' }}
              >
                {t.primo}
              </p>
              <p
                className="font-body text-[10px] sm:text-xs leading-tight"
                style={{ color: '#5C2018', opacity: 0.9 }}
              >
                {t.primoSub}
              </p>
              <p
                className="font-body text-[9px] sm:text-[10px] italic leading-tight"
                style={{ color: '#5C2018', opacity: 0.7 }}
              >
                {t.primoDetail}
              </p>
            </div>

            {/* Secondo */}
            <div>
              <p
                className="font-display text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold"
                style={{ color: '#5C2018' }}
              >
                {t.secondo}
              </p>
              <p
                className="font-body text-[10px] sm:text-xs leading-tight"
                style={{ color: '#5C2018', opacity: 0.9 }}
              >
                {t.secondoSub}
              </p>
              <p
                className="font-body text-[9px] sm:text-[10px] italic leading-tight"
                style={{ color: '#5C2018', opacity: 0.7 }}
              >
                {t.secondoDetail}
              </p>
            </div>

            {/* Dolce */}
            <div>
              <p
                className="font-display text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold"
                style={{ color: '#5C2018' }}
              >
                {t.dolce}
              </p>
              <p
                className="font-body text-[10px] sm:text-xs leading-tight"
                style={{ color: '#5C2018', opacity: 0.9 }}
              >
                {t.dolceSub}
              </p>
              <p
                className="font-body text-[9px] sm:text-[10px] italic leading-tight"
                style={{ color: '#5C2018', opacity: 0.7 }}
              >
                {t.dolceDetail}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
