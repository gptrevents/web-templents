import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Check, Heart, MessageCircle, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface KmRsvpProps {
  coupleNames?: string;
  whatsappNumber?: string;
  onRsvpSubmit?: (data: {
    attending: boolean;
    name: string;
    phone: string;
    guestCount: string;
    selectedEvents: string[];
    wishes: string;
  }) => void;
}

export const KmRsvp: React.FC<KmRsvpProps> = ({
  coupleNames = 'రాహుల్ & హరిణ్య',
  whatsappNumber = '919849012345',
  onRsvpSubmit,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [attending, setAttending] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [guestCount, setGuestCount] = useState<string>('2');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([
    'కళ్యాణ మహోత్సవం (Muhurtham)',
    'వివాహ విందు (Grand Reception)',
  ]);
  const [wishes, setWishes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.km-rsvp__heading, .km-rsvp__sub', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 22,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.km-rsvp__slip', {
        scrollTrigger: { trigger: '.km-rsvp__slip', start: 'top 88%' },
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleEventToggle = (eventName: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventName)
        ? prev.filter((e) => e !== eventName)
        : [...prev, eventName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Trigger celebratory royal confetti
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#c9a94e', '#9a1b41', '#fdf5e6', '#e0c878'],
      });
    } catch {
      // ignore
    }

    const payload = {
      attending,
      name: name.trim(),
      phone: phone.trim(),
      guestCount,
      selectedEvents,
      wishes: wishes.trim(),
      timestamp: new Date().toISOString(),
    };

    // Save to LocalStorage so responses are never lost
    try {
      const existing = JSON.parse(localStorage.getItem('km_wedding_rsvp_list') || '[]');
      existing.unshift(payload);
      localStorage.setItem('km_wedding_rsvp_list', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setIsSubmitted(true);
    if (onRsvpSubmit) {
      onRsvpSubmit(payload);
    }
  };

  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');

  const whatsappMessage = attending
    ? `🌸 *వివాహ ఆహ్వానం - RSVP నిర్ధారణ* 🌸\n\nనమస్కారం! మేము *${name}* (${guestCount} మందితో) *${coupleNames}* వివాహ మహోత్సవానికి తప్పకుండా హాజరవుతున్నాము.\n\n📅 హాజరయ్యే వేడుకలు:\n${selectedEvents.map((ev) => `• ${ev}`).join('\n')}\n\n💌 మా శుభాకాంక్షలు: "${wishes || 'నూరేళ్ల దాంపత్యం కలకాలం వర్ధిల్లాలి!'}"`
    : `🌸 *వివాహ ఆహ్వానం - RSVP సందేశం* 🌸\n\nనమస్కారం! నేను *${name}*, తప్పనిసరి కారణాల వల్ల వివాహానికి హాజరు కాలేకపోతున్నాను. కానీ *${coupleNames}* దంపతులకు మా నిండు హృదయపూర్వక ఆశీస్సులు!\n\n💌 మా సందేశం: "${wishes || 'సదా సంతోషాలతో వర్ధిల్లాలి!'}"`;

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;

  const allEvents = [
    'మంగళ స్నానాలు & Haldi',
    'గోరింటాకు & Sangeet',
    'కళ్యాణ మహోత్సవం (Muhurtham)',
    'వివాహ విందు (Grand Reception)',
  ];

  return (
    <section className="km-rsvp km-section" ref={sectionRef} aria-label="RSVP">
      {/* Mandara Silk Weave */}
      <div className="km-rsvp__silk" aria-hidden="true" />

      {/* Frame Rails and Corners */}
      <div className="km-frame" aria-hidden="true">
        <div className="km-frame-rail km-frame-rail--top" />
        <div className="km-frame-rail km-frame-rail--bottom" />
        <div className="km-frame-rail km-frame-rail--left" />
        <div className="km-frame-rail km-frame-rail--right" />
        <div className="km-frame-corner km-frame-corner--tl" />
        <div className="km-frame-corner km-frame-corner--tr" />
        <div className="km-frame-corner km-frame-corner--bl" />
        <div className="km-frame-corner km-frame-corner--br" />
      </div>

      <div className="km-container text-center">
        <h2 className="km-rsvp__heading km-font-heading text-[#9A1B41] font-bold">
          మీ హాజరును తెలియజేయండి • RSVP
        </h2>
        <p className="km-rsvp__sub km-font-serif text-stone-700 font-medium">
          మీ అమూల్యమైన రాక మాకు అత్యంత ఆనందదాయకం.
        </p>

        <div className="km-rsvp__slip mt-6">
          {isSubmitted ? (
            <div className="py-10 px-4 sm:px-6 text-center space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#9a1b41]/10 border border-[#c9a94e] flex items-center justify-center text-[#9a1b41] shadow-xs">
                <Heart className="w-8 h-8 fill-[#9a1b41]" />
              </div>
              <div>
                <h3 className="km-font-heading text-2xl text-[#3d1c00] font-bold">
                  ధన్యవాదములు • Thank You!
                </h3>
                <p className="km-font-serif text-base sm:text-lg text-[#5a2e10] max-w-md mx-auto mt-2 leading-relaxed">
                  {attending
                    ? `శ్రీ/శ్రీమతి ${name} గారు, మీ రాక మాకు ఎంతో సంతోషాన్నిస్తుంది! మీ సమాచారం నమోదు చేయబడింది.`
                    : `శ్రీ/శ్రీమతి ${name} గారు, మీ ఆశీస్సులకు ధన్యవాదాలు.`}
                </p>
              </div>

              {/* Direct WhatsApp Share Button */}
              <div className="pt-2 flex flex-col items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#25D366] text-white font-serif font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg hover:bg-[#1EBE5D] transition-all hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>వాట్సాప్‌లో కన్ఫర్మ్ చేయండి (Send WhatsApp)</span>
                </a>
                <span className="text-[11px] text-stone-500">
                  వధూవరుల కుటుంబానికి నేరుగా మెసేజ్ వెళ్తుంది
                </span>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-3 text-xs font-semibold text-[#9a1b41] underline tracking-widest uppercase cursor-pointer"
                >
                  సమాధానాన్ని సవరించండి (Edit Response)
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              {/* Attendance Choice */}
              <div className="km-rsvp__choices" role="group" aria-label="Will you join us?">
                <button
                  type="button"
                  className={`km-rsvp__choice ${attending === true ? 'km-rsvp__choice--selected' : ''}`}
                  onClick={() => setAttending(true)}
                  aria-pressed={attending === true}
                >
                  <Check className="w-4 h-4 text-[#9a1b41] mr-1 inline" />
                  <span>తప్పకుండా విచ్చేస్తాము (Joyfully Attend)</span>
                </button>

                <button
                  type="button"
                  className={`km-rsvp__choice ${attending === false ? 'km-rsvp__choice--selected' : ''}`}
                  onClick={() => setAttending(false)}
                  aria-pressed={attending === false}
                >
                  <span>రాలేకపోతున్నాము (Regretfully Decline)</span>
                </button>
              </div>

              {/* Guest Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#692900] uppercase tracking-wider mb-1.5">
                    మీ పూర్తి పేరు (Full Name) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ఉదా: శ్రీ రమేష్ వర్మ & ఫ్యామిలీ"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#fff9ee] border border-[#d4af37]/60 rounded-lg text-[#3d1c00] placeholder-[#8a6845] focus:outline-none focus:border-[#9a1b41] focus:ring-1 focus:ring-[#9a1b41]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#692900] uppercase tracking-wider mb-1.5">
                      ఫోన్ నెంబర్ (Mobile Number)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98490 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-[#fff9ee] border border-[#d4af37]/60 rounded-lg text-[#3d1c00] placeholder-[#8a6845] focus:outline-none focus:border-[#9a1b41]"
                    />
                  </div>

                  {attending && (
                    <div>
                      <label className="block text-xs font-bold text-[#692900] uppercase tracking-wider mb-1.5">
                        మొత్తం సభ్యుల సంఖ్య (Guest Count)
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full px-4 py-3 bg-[#fff9ee] border border-[#d4af37]/60 rounded-lg text-[#3d1c00] focus:outline-none focus:border-[#9a1b41]"
                      >
                        <option value="1">1 వ్యక్తి (1 Person)</option>
                        <option value="2">2 వ్యక్తులు (2 People)</option>
                        <option value="3">3 వ్యక్తులు (3 People)</option>
                        <option value="4">4 వ్యక్తులు (4 People)</option>
                        <option value="5+">5+ కుటుంబ సభ్యులు (5+ Family)</option>
                      </select>
                    </div>
                  )}
                </div>

                {attending && (
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-bold text-[#692900] uppercase tracking-wider mb-1.5">
                      హాజరయ్యే వేడుకలను ఎంచుకోండి (Select Ceremonies)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {allEvents.map((evt) => {
                        const isChecked = selectedEvents.includes(evt);
                        return (
                          <button
                            type="button"
                            key={evt}
                            onClick={() => handleEventToggle(evt)}
                            className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                              isChecked
                                ? 'bg-[#9a1b41]/10 border-[#9a1b41] text-[#9a1b41] font-semibold'
                                : 'bg-[#fffaf0] border-[#d4af37]/40 text-[#553018]'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 ${
                                isChecked
                                  ? 'bg-[#9a1b41] border-[#9a1b41] text-white'
                                  : 'border-[#d4af37]'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3" />}
                            </span>
                            <span>{evt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#692900] uppercase tracking-wider mb-1.5">
                    వధూవరులకు మీ శుభాకాంక్షలు (Wishes & Blessings)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="నూరేళ్ల దాంపత్యం వర్ధిల్లాలి..."
                    value={wishes}
                    onChange={(e) => setWishes(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fff9ee] border border-[#d4af37]/60 rounded-lg text-[#3d1c00] placeholder-[#8a6845] focus:outline-none focus:border-[#9a1b41]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="km-rsvp__submit km-font-label w-full cursor-pointer flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#9A1B41] to-[#781232] text-white font-bold rounded-lg shadow-md hover:opacity-95"
              >
                <span>వివరాలను పంపండి • Confirm RSVP</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
