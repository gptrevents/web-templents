import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, ArrowRight, CreditCard, QrCode, Gift, X, Check } from 'lucide-react';

interface Screen09Props {
  onBack?: () => void;
}

export const NeoBloomScreen09Wishes: React.FC<Screen09Props> = ({ onBack }) => {
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: 'Sneha',
      text: 'Wishing you both a lifetime of happiness, love and wonderful adventures!',
    },
    {
      id: 2,
      name: 'Rajesh',
      text: 'May your journey together be filled with love, laughter and endless dreams!',
    },
  ]);

  const [inputWish, setInputWish] = useState('');
  const [activeModal, setActiveModal] = useState<'upi' | 'qr' | 'info' | null>(null);
  const [copiedUPI, setCopiedUPI] = useState(false);

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputWish.trim()) return;

    setWishes([
      {
        id: Date.now(),
        name: 'Guest',
        text: inputWish.trim(),
      },
      ...wishes,
    ]);
    setInputWish('');
  };

  const handleCopyUPI = () => {
    navigator.clipboard?.writeText('arjunpriya@okhdfcbank');
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2000);
  };

  return (
    <div className="relative w-full h-full min-h-[640px] sm:min-h-[700px] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EE] to-[#F5ECE2] text-stone-900 select-none">
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
          Leave a Wish
        </h2>
        <p className="text-[11px] sm:text-xs text-stone-500 font-serif italic mt-0.5">
          Your words mean a lot to us!
        </p>
      </div>

      {/* Wishes Quotes List & Input */}
      <div className="relative z-10 px-5 sm:px-6 py-2 my-auto max-w-[340px] mx-auto w-full space-y-2.5">
        {/* Quote Cards */}
        <div className="space-y-2">
          {wishes.slice(0, 2).map((w) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-3 border border-stone-200/90 shadow-xs relative"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-stone-300 font-serif text-xl leading-none">❝</span>
                <span className="text-rose-500 text-xs">♡</span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-700 leading-snug font-serif italic px-1">
                {w.text}
              </p>
              <div className="text-right mt-1">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  — {w.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Bar with Circular Pink Arrow Button */}
        <form
          onSubmit={handleSendWish}
          className="bg-white rounded-full p-1 pl-4 border border-stone-200 shadow-sm flex items-center justify-between"
        >
          <input
            type="text"
            value={inputWish}
            onChange={(e) => setInputWish(e.target.value)}
            placeholder="Write your wishes..."
            className="w-full bg-transparent text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden font-medium"
          />
          <button
            type="submit"
            className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer ml-2"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Gifts Section Header */}
        <div className="pt-2 text-center">
          <h3 className="text-sm font-bold text-stone-900">
            Gifts (Optional)
          </h3>
          <p className="text-[10px] text-stone-500">
            Your blessings are our greatest gift!
          </p>
        </div>

        {/* 3 Square Rounded Action Cards */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {/* UPI Gift */}
          <button
            type="button"
            onClick={() => setActiveModal('upi')}
            className="bg-white rounded-2xl p-2.5 border border-stone-200/90 shadow-2xs hover:border-rose-300 flex flex-col items-center justify-center text-center group cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1 group-hover:bg-blue-100">
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-stone-800">UPI Gift</span>
          </button>

          {/* View QR */}
          <button
            type="button"
            onClick={() => setActiveModal('qr')}
            className="bg-white rounded-2xl p-2.5 border border-stone-200/90 shadow-2xs hover:border-rose-300 flex flex-col items-center justify-center text-center group cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1 group-hover:bg-emerald-100">
              <QrCode className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-stone-800">View QR</span>
          </button>

          {/* Gift Info */}
          <button
            type="button"
            onClick={() => setActiveModal('info')}
            className="bg-white rounded-2xl p-2.5 border border-stone-200/90 shadow-2xs hover:border-rose-300 flex flex-col items-center justify-center text-center group cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-1 group-hover:bg-rose-100">
              <Gift className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-stone-800">Gift Info</span>
          </button>
        </div>
      </div>

      {/* Gift Box Illustration with Confetti at Bottom */}
      <div className="relative z-10 pb-4 pt-1 flex justify-center">
        <div className="flex items-center gap-2 text-2xl">
          <span>🌿</span>
          <span className="text-3xl animate-bounce">🎁</span>
          <span>✨</span>
        </div>
      </div>

      {/* Interactive Modal for UPI / QR / Info */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-2xl relative text-center"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900"
              >
                <X className="w-4 h-4" />
              </button>

              {activeModal === 'upi' && (
                <div className="space-y-3 pt-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-stone-900">UPI Digital Shagun</h4>
                  <p className="text-xs text-stone-600">
                    UPI ID: <span className="font-mono font-bold text-stone-900">arjunpriya@okhdfcbank</span>
                  </p>
                  <button
                    onClick={handleCopyUPI}
                    className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    {copiedUPI ? <Check className="w-4 h-4" /> : null}
                    <span>{copiedUPI ? 'UPI ID Copied!' : 'Copy UPI ID'}</span>
                  </button>
                </div>
              )}

              {activeModal === 'qr' && (
                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-base text-stone-900">Scan &amp; Bless</h4>
                  <div className="w-40 h-40 mx-auto bg-stone-50 border-2 border-stone-200 rounded-2xl flex items-center justify-center p-2 shadow-inner">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=arjunpriya@okhdfcbank&pn=Arjun%20And%20Priya&cu=INR"
                      alt="Wedding UPI QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 font-medium">
                    Google Pay • PhonePe • Paytm • BHIM
                  </p>
                </div>
              )}

              {activeModal === 'info' && (
                <div className="space-y-3 pt-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                    <Gift className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-stone-900">Gifts Policy</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    మీ ప్రేమ మరియు ఆశీస్సులే మాకు అత్యంత విలువైన కానుక. ఏదైనా బహుమతి పంపాలనుకుంటే వేదిక వద్ద గిఫ్ట్ కౌంటర్ అందుబాటులో ఉంటుంది.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
