import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, UserPlus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TeatroLang } from './TeatroLangSwitch';

interface Companion {
  name: string;
  dietary: string;
}

interface TeatroRsvpProps {
  lang?: TeatroLang;
  onSuccess?: (data: {
    fullName: string;
    email: string;
    attending: boolean;
    guestCount: number;
    companions: Companion[];
    needsTransport: boolean;
    dietary: string;
    message: string;
  }) => void;
}

export const TeatroRsvp: React.FC<TeatroRsvpProps> = ({ lang = 'en', onSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no' | null>('yes');
  const [guestCount, setGuestCount] = useState(1);
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [needsTransport, setNeedsTransport] = useState(false);
  const [dietary, setDietary] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const translations = {
    en: {
      subtitle: 'Confirm your attendance',
      deadline: 'Please confirm your attendance before September 1st',
      fullName: 'Full Name',
      fullNamePlaceholder: 'e.g. Maria Rossi',
      email: 'Email',
      willAttend: 'Will you attend?',
      yes: "Yes, I'll be there!",
      no: "No, I can't make it",
      guestCount: 'Number of guests (including you)',
      companionTitle: 'Companion Information',
      guestLabel: 'Guest',
      companionNamePlaceholder: "Companion's full name",
      companionDietaryPlaceholder: 'Dietary requirements / allergies',
      transportLabel: 'I will need bus transport from Florence',
      dietaryLabel: 'Dietary Requirements (Optional)',
      dietaryPlaceholder: 'e.g. Vegetarian, celiac, allergies...',
      messageLabel: 'Message for the Couple (Optional)',
      messagePlaceholder: 'Write a few words...',
      confirmButton: 'Confirm',
      successTitle: 'Thank you for your response!',
      successMessage: 'We have received your confirmation and look forward to celebrating together.',
      resubmit: 'Submit another response',
    },
    it: {
      subtitle: 'Conferma la tua presenza',
      deadline: 'Si prega di confermare la presenza entro il 1 settembre',
      fullName: 'Nome e Cognome',
      fullNamePlaceholder: 'es. Maria Rossi',
      email: 'Email',
      willAttend: 'Parteciperai?',
      yes: 'Sì, ci sarò!',
      no: 'Purtroppo non posso',
      guestCount: 'Numero di ospiti (incluso te)',
      companionTitle: 'Dati degli accompagnatori',
      guestLabel: 'Ospite',
      companionNamePlaceholder: "Nome dell'accompagnatore",
      companionDietaryPlaceholder: 'Intolleranze alimentari / allergie',
      transportLabel: 'Avrò bisogno della navetta da Firenze',
      dietaryLabel: 'Richieste Alimentari (Opzionale)',
      dietaryPlaceholder: 'es. Vegetariano, celiaco, allergie...',
      messageLabel: 'Messaggio per gli Sposi (Opzionale)',
      messagePlaceholder: 'Scrivi qualche parola...',
      confirmButton: 'Conferma',
      successTitle: 'Grazie per la conferma!',
      successMessage: 'Abbiamo ricevuto la tua risposta e non vediamo l’ora di festeggiare insieme.',
      resubmit: 'Invia un’altra risposta',
    },
    te: {
      subtitle: 'మీ హాజరును ధృవీకరించండి (RSVP)',
      deadline: 'దయచేసి సెప్టెంబర్ 1 లోపు మీ రాకను తెలియజేయండి',
      fullName: 'మీ పూర్తి పేరు',
      fullNamePlaceholder: 'ఉదా: వెంకటేశ్వర రావు',
      email: 'ఇమెయిల్ లేదా ఫోన్ నంబర్',
      willAttend: 'మీరు విచ్చేస్తున్నారా?',
      yes: 'తప్పకుండా వస్తాము!',
      no: 'రాలేకపోతున్నాము',
      guestCount: 'మొత్తం అతిథుల సంఖ్య (మీతో కలిపి)',
      companionTitle: 'తోటి అతిథుల వివరాలు',
      guestLabel: 'అతిథి',
      companionNamePlaceholder: 'తోటి అతిథి పేరు',
      companionDietaryPlaceholder: 'ఆహార నియమాలు / ప్రత్యేకతలు',
      transportLabel: 'మాకు ప్రత్యేక బస్సు రవాణా అవసరం',
      dietaryLabel: 'ఆహార ప్రాధాన్యతలు (ఐచ్ఛికం)',
      dietaryPlaceholder: 'ఉదా: శాకాహారం, ప్రత్యేక ఆహారం...',
      messageLabel: 'వధూవరులకు మీ సందేశం (ఐచ్ఛికం)',
      messagePlaceholder: 'కొన్ని శుభాకాంక్షల మాటలు వ్రాయండి...',
      confirmButton: 'ధృవీకరించండి',
      successTitle: 'ధన్యవాదాలు!',
      successMessage: 'మీ సమాచారం మాకు చేరింది. మీతో కలిసి వేడుక జరుపుకోవడానికి ఎదురుచూస్తున్నాము.',
      resubmit: 'మరొక సమాధానం పంపండి',
    },
  };

  const t = translations[lang] || translations.en;

  const handleGuestCountChange = (count: number) => {
    const val = Math.max(1, Math.min(10, count));
    setGuestCount(val);

    const neededCompanions = val - 1;
    setCompanions((prev) => {
      const updated = [...prev];
      if (updated.length < neededCompanions) {
        while (updated.length < neededCompanions) {
          updated.push({ name: '', dietary: '' });
        }
      } else {
        updated.splice(neededCompanions);
      }
      return updated;
    });
  };

  const updateCompanion = (index: number, field: 'name' | 'dietary', value: string) => {
    setCompanions((prev) => {
      const next = [...prev];
      if (next[index]) {
        next[index] = { ...next[index], [field]: value };
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#5C2018', '#D4AF37', '#FAF8F5'],
    });

    setIsSubmitted(true);

    if (onSuccess) {
      onSuccess({
        fullName,
        email,
        attending: attending === 'yes',
        guestCount: attending === 'yes' ? guestCount : 0,
        companions,
        needsTransport,
        dietary,
        message,
      });
    }
  };

  return (
    <section className="bg-white flex flex-col items-center justify-center py-16 px-6">
      {/* RSVP Banner Illustration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <img
          src="/assets/teatro/rsvp-icon.png"
          alt="RSVP decorative ribbon banner"
          className="w-48 sm:w-56 h-auto mx-auto mb-4 object-contain"
          loading="lazy"
        />
        <h2
          className="font-script text-4xl sm:text-5xl md:text-6xl mb-2"
          style={{ color: '#5C2018' }}
        >
          {t.subtitle}
        </h2>
        <p
          className="font-body text-xs sm:text-sm tracking-wider uppercase"
          style={{ color: '#5C2018', opacity: 0.75 }}
        >
          {t.deadline}
        </p>
      </motion.div>

      {/* Form or Success State */}
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm border"
              style={{
                backgroundColor: 'rgba(250, 248, 245, 0.75)',
                borderColor: 'rgba(92, 32, 24, 0.15)',
              }}
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="teatro-full-name"
                  className="font-body text-xs tracking-widest uppercase mb-2 block font-semibold"
                  style={{ color: '#5C2018' }}
                >
                  {t.fullName} *
                </label>
                <input
                  id="teatro-full-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t.fullNamePlaceholder}
                  className="w-full px-4 py-3 rounded-xl border bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#5C2018]/30 transition-all text-sm"
                  style={{
                    borderColor: 'rgba(92, 32, 24, 0.25)',
                    color: '#5C2018',
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="teatro-email"
                  className="font-body text-xs tracking-widest uppercase mb-2 block font-semibold"
                  style={{ color: '#5C2018' }}
                >
                  {t.email}
                </label>
                <input
                  id="teatro-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#5C2018]/30 transition-all text-sm"
                  style={{
                    borderColor: 'rgba(92, 32, 24, 0.25)',
                    color: '#5C2018',
                  }}
                />
              </div>

              {/* Attendance Choice */}
              <div>
                <label
                  className="font-body text-xs tracking-widest uppercase mb-3 block font-semibold"
                  style={{ color: '#5C2018' }}
                >
                  {t.willAttend} *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`py-3 px-4 rounded-xl font-body text-sm font-medium transition-all duration-200 cursor-pointer ${
                      attending === 'yes' ? 'shadow-md scale-[1.01]' : 'hover:bg-white/80'
                    }`}
                    style={{
                      backgroundColor: attending === 'yes' ? '#5C2018' : 'rgba(255, 255, 255, 0.85)',
                      color: attending === 'yes' ? '#FAF8F5' : '#5C2018',
                      border: `1px solid ${
                        attending === 'yes' ? '#5C2018' : 'rgba(92, 32, 24, 0.25)'
                      }`,
                    }}
                  >
                    {t.yes}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    className={`py-3 px-4 rounded-xl font-body text-sm font-medium transition-all duration-200 cursor-pointer ${
                      attending === 'no' ? 'shadow-md scale-[1.01]' : 'hover:bg-white/80'
                    }`}
                    style={{
                      backgroundColor: attending === 'no' ? '#5C2018' : 'rgba(255, 255, 255, 0.85)',
                      color: attending === 'no' ? '#FAF8F5' : '#5C2018',
                      border: `1px solid ${
                        attending === 'no' ? '#5C2018' : 'rgba(92, 32, 24, 0.25)'
                      }`,
                    }}
                  >
                    {t.no}
                  </button>
                </div>
              </div>

              {/* Conditional Attendance Fields */}
              {attending === 'yes' && (
                <div className="space-y-6 pt-2 border-t border-[#5C2018]/10">
                  {/* Guest Count */}
                  <div>
                    <label
                      htmlFor="teatro-guests"
                      className="font-body text-xs tracking-widest uppercase mb-2 block font-semibold"
                      style={{ color: '#5C2018' }}
                    >
                      {t.guestCount}
                    </label>
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => handleGuestCountChange(num)}
                          className={`w-11 h-11 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                            guestCount === num ? 'shadow-sm' : 'hover:bg-white'
                          }`}
                          style={{
                            backgroundColor:
                              guestCount === num ? '#5C2018' : 'rgba(255, 255, 255, 0.8)',
                            color: guestCount === num ? '#FAF8F5' : '#5C2018',
                            border: `1px solid ${
                              guestCount === num ? '#5C2018' : 'rgba(92, 32, 24, 0.2)'
                            }`,
                          }}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Companions Details */}
                  {guestCount > 1 && (
                    <div
                      className="p-4 rounded-2xl space-y-4"
                      style={{ backgroundColor: 'rgba(92, 32, 24, 0.04)' }}
                    >
                      <div className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4 text-[#5C2018]" />
                        <span
                          className="font-body text-xs tracking-widest uppercase font-semibold"
                          style={{ color: '#5C2018' }}
                        >
                          {t.companionTitle}
                        </span>
                      </div>

                      {companions.map((comp, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white/70 space-y-2 border border-[#5C2018]/10">
                          <span
                            className="font-body text-[11px] font-medium"
                            style={{ color: 'rgba(92, 32, 24, 0.7)' }}
                          >
                            {t.guestLabel} {idx + 2}
                          </span>
                          <input
                            type="text"
                            required
                            value={comp.name}
                            onChange={(e) => updateCompanion(idx, 'name', e.target.value)}
                            placeholder={t.companionNamePlaceholder}
                            className="w-full px-3 py-2 rounded-lg border bg-white focus:outline-none text-xs"
                            style={{ borderColor: 'rgba(92, 32, 24, 0.2)', color: '#5C2018' }}
                          />
                          <input
                            type="text"
                            value={comp.dietary}
                            onChange={(e) => updateCompanion(idx, 'dietary', e.target.value)}
                            placeholder={t.companionDietaryPlaceholder}
                            className="w-full px-3 py-2 rounded-lg border bg-white focus:outline-none text-xs"
                            style={{ borderColor: 'rgba(92, 32, 24, 0.2)', color: '#5C2018' }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Transport Checkbox */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/60 border border-[#5C2018]/15">
                    <input
                      id="teatro-transport"
                      type="checkbox"
                      checked={needsTransport}
                      onChange={(e) => setNeedsTransport(e.target.checked)}
                      className="w-4 h-4 accent-[#5C2018] rounded cursor-pointer"
                    />
                    <label
                      htmlFor="teatro-transport"
                      className="font-body text-xs cursor-pointer select-none"
                      style={{ color: '#5C2018' }}
                    >
                      {t.transportLabel}
                    </label>
                  </div>

                  {/* Dietary Requirements */}
                  <div>
                    <label
                      htmlFor="teatro-dietary"
                      className="font-body text-xs tracking-widest uppercase mb-2 block font-semibold"
                      style={{ color: '#5C2018' }}
                    >
                      {t.dietaryLabel}
                    </label>
                    <input
                      id="teatro-dietary"
                      type="text"
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      placeholder={t.dietaryPlaceholder}
                      className="w-full px-4 py-3 rounded-xl border bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#5C2018]/30 transition-all text-sm"
                      style={{
                        borderColor: 'rgba(92, 32, 24, 0.25)',
                        color: '#5C2018',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Message for Couple */}
              <div>
                <label
                  htmlFor="teatro-message"
                  className="font-body text-xs tracking-widest uppercase mb-2 block font-semibold"
                  style={{ color: '#5C2018' }}
                >
                  {t.messageLabel}
                </label>
                <textarea
                  id="teatro-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-xl border bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#5C2018]/30 transition-all text-sm resize-none"
                  style={{
                    borderColor: 'rgba(92, 32, 24, 0.25)',
                    color: '#5C2018',
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl font-body text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:opacity-95 active:scale-[0.99] cursor-pointer"
                style={{
                  backgroundColor: '#5C2018',
                  color: '#FAF8F5',
                }}
              >
                <Send className="w-4 h-4" />
                <span>{t.confirmButton}</span>
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl p-8 sm:p-10 text-center space-y-4 border shadow-sm"
              style={{
                backgroundColor: '#FAF8F5',
                borderColor: 'rgba(92, 32, 24, 0.2)',
              }}
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-800">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3
                className="font-display text-2xl sm:text-3xl font-semibold"
                style={{ color: '#5C2018' }}
              >
                {t.successTitle}
              </h3>

              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: '#5C2018', opacity: 0.85 }}
              >
                {t.successMessage}
              </p>

              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full border text-xs tracking-wider uppercase font-body cursor-pointer transition-colors"
                style={{
                  borderColor: 'rgba(92, 32, 24, 0.3)',
                  color: '#5C2018',
                }}
              >
                {t.resubmit}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
