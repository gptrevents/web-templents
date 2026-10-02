import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Check, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface KmRsvpProps {
  onRsvpSubmit?: (data: any) => void;
}

export const KmRsvp: React.FC<KmRsvpProps> = ({ onRsvpSubmit }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [attending, setAttending] = useState<boolean | null>(true);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [guestCount, setGuestCount] = useState<string>('2');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([
    'Muhurtham',
    'Reception',
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
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#c9a94e', '#9a1b41', '#fdf5e6', '#e0c878'],
      });
    } catch {
      // ignore
    }

    setIsSubmitted(true);
    if (onRsvpSubmit) {
      onRsvpSubmit({
        attending,
        name,
        phone,
        guestCount,
        selectedEvents,
        wishes,
      });
    }
  };

  const allEvents = [
    'Mangala Snanam & Haldi',
    'Sangeet & Mehendi Night',
    'Kalyana Mahotsavam (Muhurtham)',
    'Grand Reception',
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

      <div className="km-container">
        <h2 className="km-rsvp__heading km-font-heading">R. S. V. P.</h2>
        <p className="km-rsvp__sub km-font-serif">
          Kindly grace us with your esteemed presence and blessings.
        </p>

        <div className="km-rsvp__slip">
          {isSubmitted ? (
            <div className="py-12 px-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#9a1b41]/10 border border-[#c9a94e] flex items-center justify-center text-[#9a1b41]">
                <Heart className="w-8 h-8 fill-[#9a1b41]" />
              </div>
              <h3 className="km-font-heading text-2xl text-[#3d1c00]">
                ధన్యవాదములు • Thank You!
              </h3>
              <p className="km-font-serif text-lg text-[#5a2e10] max-w-md mx-auto">
                {attending
                  ? `Your presence has been joyfully reserved for ${name}. We eagerly await your gracious arrival!`
                  : `Thank you for conveying your warm wishes for ${name}. Your blessings mean the world to us.`}
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-4 text-xs font-semibold text-[#9a1b41] underline tracking-widest uppercase"
              >
                Edit Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Attendance Choice */}
              <div
                className="km-rsvp__choices"
                role="group"
                aria-label="Will you join us?"
              >
                <button
                  type="button"
                  className={`km-rsvp__choice ${attending === true ? 'km-rsvp__choice--selected' : ''}`}
                  onClick={() => setAttending(true)}
                  aria-pressed={attending === true}
                >
                  <svg
                    className="km-rsvp__marker"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 1 L15 8 L8 15 L1 8 Z"
                      fill={attending === true ? 'var(--km-maroon)' : 'none'}
                      stroke="var(--km-gold)"
                      strokeWidth="1.2"
                    />
                    {attending === true && (
                      <path
                        d="M8 4.4 L11.6 8 L8 11.6 L4.4 8 Z"
                        fill="#fbeeb8"
                      />
                    )}
                  </svg>
                  <span>Joyfully Accept</span>
                </button>

                <button
                  type="button"
                  className={`km-rsvp__choice ${attending === false ? 'km-rsvp__choice--selected' : ''}`}
                  onClick={() => setAttending(false)}
                  aria-pressed={attending === false}
                >
                  <svg
                    className="km-rsvp__marker"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 1 L15 8 L8 15 L1 8 Z"
                      fill={attending === false ? 'var(--km-maroon)' : 'none'}
                      stroke="var(--km-gold)"
                      strokeWidth="1.2"
                    />
                    {attending === false && (
                      <path
                        d="M8 4.4 L11.6 8 L8 11.6 L4.4 8 Z"
                        fill="#fbeeb8"
                      />
                    )}
                  </svg>
                  <span>Regretfully Decline</span>
                </button>
              </div>

              {/* Guest Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#692900] uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Varma & Family"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#fff9ee] border border-[#d4af37]/60 rounded-md text-[#3d1c00] placeholder-[#8a6845] focus:outline-none focus:border-[#9a1b41] focus:ring-1 focus:ring-[#9a1b41]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#692900] uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-[#fff9ee] border border-[#d4af37]/60 rounded-md text-[#3d1c00] placeholder-[#8a6845] focus:outline-none focus:border-[#9a1b41]"
                    />
                  </div>

                  {attending && (
                    <div>
                      <label className="block text-xs font-bold text-[#692900] uppercase tracking-wider mb-1.5">
                        Number of Guests
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full px-4 py-3 bg-[#fff9ee] border border-[#d4af37]/60 rounded-md text-[#3d1c00] focus:outline-none focus:border-[#9a1b41]"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5+">5+ Family Members</option>
                      </select>
                    </div>
                  )}
                </div>

                {attending && (
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-bold text-[#692900] uppercase tracking-wider mb-1.5">
                      Ceremonies You Plan to Attend
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {allEvents.map((evt) => {
                        const isChecked = selectedEvents.includes(evt);
                        return (
                          <button
                            type="button"
                            key={evt}
                            onClick={() => handleEventToggle(evt)}
                            className={`flex items-center gap-2.5 p-2.5 rounded border text-left text-xs transition-colors ${
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
                    Wishes & Blessings for the Couple
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Warmest congratulations to Harinya & Rahul..."
                    value={wishes}
                    onChange={(e) => setWishes(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fff9ee] border border-[#d4af37]/60 rounded-md text-[#3d1c00] placeholder-[#8a6845] focus:outline-none focus:border-[#9a1b41]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="km-rsvp__submit km-font-label w-full cursor-pointer"
              >
                Send RSVP &amp; Blessings
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
