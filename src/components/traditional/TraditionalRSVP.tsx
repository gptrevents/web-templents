import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { CELEBRATION_EVENTS, TRADITIONAL_ASSETS } from '../../data/weddingData';
import { Check, Heart, Send, Sparkles, UserCheck, UserX } from 'lucide-react';
import { CornerOrnament } from './WeddingBorders';

interface TraditionalRSVPProps {
  initialGuestName: string;
}

export const TraditionalRSVP: React.FC<TraditionalRSVPProps> = ({
  initialGuestName,
}) => {
  const [attending, setAttending] = useState<boolean>(true);
  const [guestName, setGuestName] = useState<string>(initialGuestName || '');
  const [phone, setPhone] = useState<string>('');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([
    'wedding',
    'reception',
  ]);
  const [message, setMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const toggleEvent = (eventId: string) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter((id) => id !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    setIsSubmitted(true);

    if (attending) {
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#D4A843', '#8B1A1A', '#E8862A', '#FFFDF9'],
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section id="rsvp" className="relative w-full py-16 px-4 sm:px-6 bg-transparent overflow-hidden">
      
      <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 flex flex-col items-center"
        >
          <span className="text-xs font-cinzel font-semibold tracking-[0.25em] text-[#D4A843] uppercase mb-1">
            Kindly Respond
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#8B1A1A] tracking-wide">
            Will You Join Us?
          </h2>
          <span className="font-telugu text-sm text-[#8B1A1A]/90 mt-0.5">
            (మీ ప్రార్థనీయ హాజరు నమోదు)
          </span>
          <div className="w-44 h-4 my-2 opacity-85">
            <img src={TRADITIONAL_ASSETS.goldDivider} alt="" className="w-full h-full object-contain" />
          </div>
          <p className="font-cormorant italic text-sm sm:text-base text-[#5C4033] max-w-md">
            We would be deeply honoured by your gracious presence and heartfelt blessings on our auspicious day.
          </p>
        </motion.div>

        {/* RSVP Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-xl rounded-2xl bg-gradient-to-b from-[#FFF5DE] via-[#FCECC7] to-[#F8E1B5] border-2 border-[#D4A843] shadow-[0_16px_36px_rgba(139,26,26,0.16)] p-6 sm:p-8"
        >
          <CornerOrnament position="top-left" className="absolute top-2 left-2 opacity-50" size={28} />
          <CornerOrnament position="top-right" className="absolute top-2 right-2 opacity-50" size={28} />
          
          {isSubmitted ? (
            <div className="py-8 text-center flex flex-col items-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#8B1A1A]/10 border-2 border-[#D4A843] flex items-center justify-center text-[#8B1A1A] mb-4">
                <Heart className="w-8 h-8 fill-current text-[#8B1A1A]" />
              </div>

              <h3 className="font-playfair text-2xl font-bold text-[#8B1A1A]">
                {attending ? 'Thank You for Accepting!' : 'Thank You for Your Response'}
              </h3>
              
              <p className="font-telugu text-sm text-[#8B1A1A] mt-1">
                {attending
                  ? 'మీ రాక మా వివాహ వేడుకకు నిండు శోభను చేకూరుస్తుంది!'
                  : 'మీ ఆశీస్సులు ఎల్లప్పుడూ మాకు తోడుగా ఉంటాయని విశ్వసిస్తున్నాం.'}
              </p>

              <p className="text-xs font-sans-clean text-[#5C4033] mt-3 max-w-md leading-relaxed">
                {attending
                  ? `Dear ${guestName}, we are delighted that you and your family (${adults} Adults${children > 0 ? `, ${children} Children` : ''}) will be joining our sacred celebration.`
                  : `Dear ${guestName}, we will miss your physical presence, but we treasure your love and blessings in our hearts.`}
              </p>

              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-6 px-6 py-2 rounded-full border border-[#D4A843] text-xs font-cinzel text-[#8B1A1A] hover:bg-[#8B1A1A] hover:text-[#FFFDF9] transition cursor-pointer"
              >
                Update Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Attendance Choice: Joyfully Accept vs Respectfully Decline */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    attending
                      ? 'bg-[#8B1A1A] text-[#FFFDF9] border-[#8B1A1A] shadow-md font-semibold'
                      : 'bg-white text-[#5C4033] border-[#D4A843]/40 hover:border-[#8B1A1A]'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span className="font-cinzel text-xs uppercase tracking-wider">Joyfully Accept</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    !attending
                      ? 'bg-[#5C4033] text-[#FFFDF9] border-[#5C4033] shadow-md font-semibold'
                      : 'bg-white text-[#5C4033] border-[#D4A843]/40 hover:border-[#5C4033]'
                  }`}
                >
                  <UserX className="w-4 h-4" />
                  <span className="font-cinzel text-xs uppercase tracking-wider">Respectfully Decline</span>
                </button>
              </div>

              {/* Guest Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-cinzel font-semibold text-[#8B1A1A] uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Suresh Garu & Family"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4A843]/60 bg-white text-sm text-[#3D1C00] focus:ring-2 focus:ring-[#8B1A1A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-cinzel font-semibold text-[#8B1A1A] uppercase mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98490 00000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4A843]/60 bg-white text-sm text-[#3D1C00] focus:ring-2 focus:ring-[#8B1A1A] focus:outline-none"
                  />
                </div>
              </div>

              {attending && (
                <>
                  {/* Attendees Count */}
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div className="p-3 rounded-xl bg-[#FFF7E8] border border-[#D4A843]/40 text-center">
                      <label className="block text-[11px] font-cinzel font-bold text-[#8B1A1A] uppercase mb-1">
                        Adults
                      </label>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-7 h-7 rounded-full bg-white border border-[#D4A843] text-[#8B1A1A] font-bold text-sm hover:bg-[#8B1A1A] hover:text-white transition cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-playfair text-xl font-bold text-[#3D1C00] min-w-[20px]">
                          {adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="w-7 h-7 rounded-full bg-white border border-[#D4A843] text-[#8B1A1A] font-bold text-sm hover:bg-[#8B1A1A] hover:text-white transition cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FFF7E8] border border-[#D4A843]/40 text-center">
                      <label className="block text-[11px] font-cinzel font-bold text-[#8B1A1A] uppercase mb-1">
                        Children
                      </label>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-7 h-7 rounded-full bg-white border border-[#D4A843] text-[#8B1A1A] font-bold text-sm hover:bg-[#8B1A1A] hover:text-white transition cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-playfair text-xl font-bold text-[#3D1C00] min-w-[20px]">
                          {children}
                        </span>
                        <button
                          type="button"
                          onClick={() => setChildren(children + 1)}
                          className="w-7 h-7 rounded-full bg-white border border-[#D4A843] text-[#8B1A1A] font-bold text-sm hover:bg-[#8B1A1A] hover:text-white transition cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Events You'll Attend */}
                  <div>
                    <label className="block text-xs font-cinzel font-semibold text-[#8B1A1A] uppercase mb-2">
                      Events You'll Attend
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {CELEBRATION_EVENTS.map((ev) => {
                        const checked = selectedEvents.includes(ev.id);
                        return (
                          <div
                            key={ev.id}
                            onClick={() => toggleEvent(ev.id)}
                            className={`p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                              checked
                                ? 'bg-[#8B1A1A]/8 border-[#8B1A1A] text-[#8B1A1A]'
                                : 'bg-white border-[#D4A843]/30 text-[#5C4033] hover:border-[#D4A843]'
                            }`}
                          >
                            <span className="text-xs font-medium font-sans-clean">
                              {ev.name}
                            </span>
                            <div
                              className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                                checked
                                  ? 'bg-[#8B1A1A] border-[#8B1A1A] text-white'
                                  : 'border-gray-300'
                              }`}
                            >
                              {checked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* Message for Couple */}
              <div>
                <label className="block text-xs font-cinzel font-semibold text-[#8B1A1A] uppercase mb-1">
                  Message for the Couple
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your warm blessings and heartfelt wishes..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4A843]/60 bg-white text-sm text-[#3D1C00] focus:ring-2 focus:ring-[#8B1A1A] focus:outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#8B1A1A] via-[#A52A2A] to-[#8B1A1A] text-[#FFFDF9] font-cinzel font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase border-2 border-[#E8C874] shadow-md hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#F3DC9B]" />
                <span>Confirm Attendance (నమోదు చేయండి)</span>
              </button>

            </form>
          )}

        </motion.div>

      </div>
    </section>
  );
};
