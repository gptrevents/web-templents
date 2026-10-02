import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, MessageCircle, Users, Utensils, Send, Heart } from 'lucide-react';

interface NeoBloomRSVPProps {
  initialGuestName?: string;
}

export const NeoBloomRSVP: React.FC<NeoBloomRSVPProps> = ({
  initialGuestName = '',
}) => {
  const [name, setName] = useState(initialGuestName || '');
  const [attendance, setAttendance] = useState<'yes' | 'maybe' | 'no'>('yes');
  const [guestsCount, setGuestsCount] = useState(2);
  const [diet, setDiet] = useState<'veg' | 'both'>('veg');
  const [wishes, setWishes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const statusText =
      attendance === 'yes'
        ? 'ఖచ్చితంగా వస్తున్నాము (Yes, Attending!)'
        : attendance === 'maybe'
        ? 'ప్రయత్నిస్తాము (Tentative)'
        : 'క్షమించండి, రాలేకపోతున్నాము (Regretfully cannot)';

    const msg = `నమస్కారం అర్జున్ & ప్రియ,\nనేను/మేము: ${name || 'బంధుమిత్రులు'}\nహాజరు స్థితి: ${statusText}\nమొత్తం హాజరయ్యే వారి సంఖ్య: ${guestsCount}\nఆహార ప్రాధాన్యత: ${diet === 'veg' ? 'కేవలం శాఖాహారం (Pure Veg)' : 'శాకాహారం/మిశ్రమం'}\nసందేశం: ${wishes || 'నూతన దంపతులకు హృదయపూర్వక శుభాకాంక్షలు!'}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=919876543210&text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="rsvp" className="relative w-full py-16 px-4 sm:px-6 bg-white border-t border-rose-100">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
            <span>Smart RSVP &amp; Confirmation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            మీ హాజరును తెలియజేయండి
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto">
            విందు ఏర్పాట్లు ఘనంగా నిర్వహించేందుకు దయచేసి మీ వివరాలను నిర్ధారించండి:
          </p>
        </div>

        <div className="bg-[#FFFDFD] rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-sm">
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8 space-y-3"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl">
                ✓
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                ధన్యవాదాలు! మీ RSVP నమోదయింది
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                మీ రాక కోసం అర్జున్ &amp; ప్రియ కుటుంబం ఎంతో ఆనందంగా ఎదురుచూస్తోంది.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 text-xs font-bold text-rose-600 underline cursor-pointer"
              >
                మరొక సమాధానాన్ని నమోదు చేయండి
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSendWhatsApp} className="space-y-6">
              
              {/* Guest Name Input */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  మీ పేరు / కుటుంబం పేరు:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ఉదా: రమేష్ రావు &amp; ఫ్యామిలీ"
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-white"
                />
              </div>

              {/* Attendance Options */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  మీరు వివాహానికి హాజరవుతున్నారా?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'yes', label: 'ఖచ్చితంగా వస్తాం!', sub: 'Attending' },
                    { id: 'maybe', label: 'ప్రయత్నిస్తాం', sub: 'Tentative' },
                    { id: 'no', label: 'రాలేకపోతున్నాం', sub: 'Regretfully' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAttendance(opt.id as 'yes' | 'maybe' | 'no')}
                      className={`p-3 rounded-2xl border text-center transition cursor-pointer ${
                        attendance === opt.id
                          ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-rose-300'
                      }`}
                    >
                      <span className="text-xs font-bold block">{opt.label}</span>
                      <span className="text-[10px] opacity-80 block">{opt.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Headcount Counter if Attending */}
              {attendance !== 'no' && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-rose-50/70 border border-rose-200/60">
                  <div className="flex items-center gap-2.5 text-stone-800">
                    <Users className="w-5 h-5 text-rose-600" />
                    <div>
                      <span className="text-xs font-bold block">హాజరయ్యే వారి సంఖ్య (Guests Count):</span>
                      <span className="text-[11px] text-stone-500">మీతో పాటు ఎంతమంది వస్తున్నారు?</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 bg-white px-3 py-1.5 rounded-xl border border-rose-200 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setGuestsCount((prev) => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-rose-100 text-stone-800 font-bold flex items-center justify-center transition cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-serif font-bold text-lg text-rose-700 w-6 text-center">
                      {guestsCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuestsCount((prev) => Math.min(10, prev + 1))}
                      className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-rose-100 text-stone-800 font-bold flex items-center justify-center transition cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Wishes Note */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  నూతన దంపతులకు మీ ఆశీస్సులు / సందేశం:
                </label>
                <textarea
                  rows={3}
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  placeholder="అర్జున్ & ప్రియ గార్లకు హృదయపూర్వక వివాహ శుభాకాంక్షలు..."
                  className="w-full px-4 py-2.5 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-white"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white font-serif font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>వాట్సాప్ ద్వారా RSVP పంపండి (Submit via WhatsApp)</span>
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
