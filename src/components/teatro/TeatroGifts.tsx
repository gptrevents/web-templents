import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';
import { TeatroLang } from './TeatroLangSwitch';

interface TeatroGiftsProps {
  coupleNames?: string;
  iban?: string;
  upiId?: string;
  lang?: TeatroLang;
}

export const TeatroGifts: React.FC<TeatroGiftsProps> = ({
  coupleNames = 'Sam & Sofía',
  iban = 'IT60 X 05428 11101 000000123456',
  upiId,
  lang = 'en',
}) => {
  const [copied, setCopied] = useState(false);

  const translations = {
    en: {
      weddingList: 'Wedding Registry',
      title: 'Gifts',
      message:
        'Your presence is the most cherished gift we could ever receive. However, if you wish to honor us with a gift to support our new beginning, you may contribute via bank transfer.',
      withLove: 'With all our love',
      bankDetails: 'Bank Details',
      holder: 'Account Holder',
      accountNumber: 'IBAN',
      reference: 'Reference',
      referenceVal: `Wedding Gift - ${coupleNames}`,
      copiedText: 'Copied to clipboard!',
    },
    it: {
      weddingList: 'Lista Nozze',
      title: 'Regali',
      message:
        'La vostra presenza è il regalo più bello che potessimo desiderare. Se tuttavia desiderate farci un pensiero per la nostra nuova vita insieme, potete farlo tramite bonifico.',
      withLove: 'Con tutto il nostro affetto',
      bankDetails: 'Dati Bancari',
      holder: 'Intestatario',
      accountNumber: 'IBAN',
      reference: 'Causale',
      referenceVal: `Regalo Nozze - ${coupleNames}`,
      copiedText: 'Copiato negli appunti!',
    },
    te: {
      weddingList: 'శుభాకాంక్షలు & బహుమతులు',
      title: 'ఆశీస్సులు & కానుకలు',
      message:
        'మీ రాక మరియు హృదయపూర్వక ఆశీస్సులే మాకు లభించిన అమూల్యమైన కానుక. అయినా మీరు మా నూతన దాంపత్య జీవితానికి శుభాకాంక్షల కానుకను అందించాలనుకుంటే కింద ఉన్న ఖాతా ద్వారా పంపవచ్చు.',
      withLove: 'ప్రేమాభిమానాలతో..',
      bankDetails: 'బ్యాంక్ / UPI వివరాలు',
      holder: 'ఖాతాదారుని పేరు',
      accountNumber: 'IBAN / UPI ID',
      reference: 'వివరణ',
      referenceVal: `వివాహ కానుక - ${coupleNames}`,
      copiedText: 'కాపీ చేయబడింది!',
    },
  };

  const t = translations[lang] || translations.en;
  const payDetail = upiId || iban;

  const handleCopy = () => {
    navigator.clipboard.writeText(payDetail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="bg-white flex flex-col items-center justify-center py-16 px-6">
      {/* Header */}
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
          {t.weddingList}
        </p>

        <img
          src="/assets/teatro/gift-icon.png"
          alt="Gift vintage illustration"
          className="w-24 sm:w-28 h-24 sm:h-28 mx-auto mb-4 object-contain"
          loading="lazy"
        />

        <h2
          className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide"
          style={{ color: '#5C2018' }}
        >
          {t.title}
        </h2>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center max-w-md mb-8"
      >
        <p
          className="font-body text-sm sm:text-base leading-relaxed"
          style={{ color: '#5C2018', opacity: 0.9 }}
        >
          {t.message}
        </p>
      </motion.div>

      {/* Script Sign-off */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.35 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <p
          className="font-script text-3xl sm:text-4xl"
          style={{ color: '#5C2018' }}
        >
          {t.withLove}
        </p>
      </motion.div>

      {/* Bank details card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.45 }}
        viewport={{ once: true }}
        className="w-full max-w-md p-6 rounded-2xl border"
        style={{
          backgroundColor: '#FAF8F5',
          borderColor: 'rgba(92, 32, 24, 0.15)',
        }}
      >
        <p
          className="font-display text-xs tracking-[0.2em] uppercase text-center mb-4 font-semibold"
          style={{ color: '#5C2018' }}
        >
          {t.bankDetails}
        </p>

        <div className="space-y-3 text-sm">
          <div>
            <span
              className="block font-body text-[10px] tracking-wider uppercase"
              style={{ color: '#5C2018', opacity: 0.6 }}
            >
              {t.holder}
            </span>
            <p className="font-display text-base font-medium" style={{ color: '#5C2018' }}>
              {coupleNames}
            </p>
          </div>

          <div>
            <span
              className="block font-body text-[10px] tracking-wider uppercase"
              style={{ color: '#5C2018', opacity: 0.6 }}
            >
              {t.accountNumber}
            </span>
            <div className="flex items-center justify-between gap-2 mt-0.5">
              <p className="font-mono text-xs sm:text-sm tracking-wider break-all" style={{ color: '#5C2018' }}>
                {payDetail}
              </p>
              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 rounded-lg border border-[#5C2018]/20 hover:bg-[#5C2018]/10 transition-colors shrink-0 cursor-pointer"
                title="Copy details"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-700" />
                ) : (
                  <Copy className="w-4 h-4 text-[#5C2018]" />
                )}
              </button>
            </div>
            {copied && (
              <p className="text-[10px] text-emerald-700 mt-1 font-body">
                {t.copiedText}
              </p>
            )}
          </div>

          <div>
            <span
              className="block font-body text-[10px] tracking-wider uppercase"
              style={{ color: '#5C2018', opacity: 0.6 }}
            >
              {t.reference}
            </span>
            <p className="font-body text-xs italic" style={{ color: '#5C2018', opacity: 0.85 }}>
              {t.referenceVal}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
