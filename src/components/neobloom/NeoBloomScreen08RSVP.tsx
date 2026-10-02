import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Menu, Check, X, Minus, Plus, Send, Mail } from 'lucide-react';

interface Screen08Props {
  onBack?: () => void;
  onOpenMenu?: () => void;
  initialGuestName?: string;
}

export const NeoBloomScreen08RSVP: React.FC<Screen08Props> = ({
  onBack,
  onOpenMenu,
  initialGuestName = 'Rohit Kumar',
}) => {
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestsCount, setGuestsCount] = useState(2);
  const [name, setName] = useState(initialGuestName);
  const [phone, setPhone] = useState('+91 98765 43210');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const message = `నమస్కారం Arjun & Priya,\nRSVP నిర్ధారణ: ${name}\nహాజరు: ${
      attending === 'yes' ? 'Yes, I will be there!' : 'Sorry, cannot make it.'
    }\nఅతిథుల సంఖ్య: ${guestsCount}\nఫోన్: ${phone}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=919876543210&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="relative w-full h-full min-h-[640px] sm:min-h-[700px] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#F2F8FF] via-[#EAF4FF] to-[#D5EBF5] text-stone-900 select-none">
      {/* Top Bar with Back Arrow and Menu */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-4 pb-2">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200 flex items-center justify-center text-stone-700 transition cursor-pointer"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenMenu}
          className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200 flex items-center justify-center text-stone-700 transition cursor-pointer"
          aria-label="Menu"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Envelope Icon & Title */}
      <div className="relative z-10 px-6 pt-1 text-center">
        {/* Animated Cute Envelope Icon */}
        <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-600 mb-1.5 shadow-xs">
          <Mail className="w-6 h-6 stroke-[1.75]" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
          Will You
          <br />
          Be There?
        </h2>
        <p className="text-[11px] sm:text-xs text-stone-500 font-medium mt-1">
          Your presence makes
          <br />
          our celebration complete!
        </p>
      </div>

      {/* Main Interactive Form */}
      <div className="relative z-10 px-5 sm:px-6 py-2 my-auto max-w-[340px] mx-auto w-full">
        {isSubmitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 text-center shadow-lg border border-teal-200 space-y-2"
          >
            <div className="w-12 h-12 mx-auto rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xl font-bold">
              ✓
            </div>
            <h3 className="font-bold text-base text-stone-900">RSVP Submitted!</h3>
            <p className="text-xs text-stone-600">
              థాంక్యూ {name}! మీ వివరాలు విజయవంతంగా నమోదయ్యాయి.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-3 px-4 py-1.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200"
            >
              సవరించండి (Edit)
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Yes / No Attendance Pills */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setAttending('yes')}
                className={`w-full py-2.5 px-4 rounded-full font-bold text-xs sm:text-[13px] flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  attending === 'yes'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/25 scale-[1.02]'
                    : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
                }`}
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Yes, I&apos;ll be there</span>
              </button>

              <button
                type="button"
                onClick={() => setAttending('no')}
                className={`w-full py-2.5 px-4 rounded-full font-bold text-xs sm:text-[13px] flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  attending === 'no'
                    ? 'bg-stone-800 text-white shadow-md'
                    : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
                }`}
              >
                <X className="w-4 h-4 stroke-[2.5]" />
                <span>Sorry, can&apos;t make it</span>
              </button>
            </div>

            {/* Guest Count Stepper */}
            {attending === 'yes' && (
              <div className="flex items-center justify-between bg-white/90 backdrop-blur-xs rounded-2xl px-4 py-2 border border-stone-200/90 shadow-2xs">
                <span className="text-xs font-medium text-stone-700">
                  How many people?
                </span>
                
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                    className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center transition cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-bold text-sm text-stone-900 w-4 text-center">
                    {guestsCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuestsCount(Math.min(10, guestsCount + 1))}
                    className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-semibold text-stone-700 block ml-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rohit Kumar"
                className="w-full bg-white rounded-xl px-4 py-2 text-xs sm:text-sm text-stone-900 border border-stone-200 shadow-2xs focus:outline-rose-500 font-medium"
              />
            </div>

            {/* Phone Number Input */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-semibold text-stone-700 block ml-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-white rounded-xl px-4 py-2 text-xs sm:text-sm text-stone-900 border border-stone-200 shadow-2xs focus:outline-rose-500 font-medium"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-full bg-[#0E3D3C] hover:bg-[#134D4C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0E3D3C]/20 transition-all cursor-pointer active:scale-98"
            >
              <span>Submit RSVP</span>
              <Send className="w-4 h-4 fill-white" />
            </button>
          </form>
        )}
      </div>

      {/* Bottom Smooth Wavy Graphic */}
      <div className="relative z-10 w-full h-12 bg-gradient-to-t from-teal-500/20 to-transparent pointer-events-none" />
    </div>
  );
};
