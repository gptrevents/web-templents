import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

export const SouthIndianRsvp: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [attending, setAttending] = useState<boolean | null>(null);
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('1');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const el = sectionRef.current;
      if (!el) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: '-12%',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=120%',
            scrub: true,
          },
        });
      }

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, ease: 'power2.out', duration: 0.15 },
          0.05
        );
      }

      if (subtextRef.current) {
        tl.fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 0.7, y: 0, ease: 'power2.out', duration: 0.1 },
          0.12
        );
      }

      if (formRef.current && formRef.current.children.length > 0) {
        tl.fromTo(
          formRef.current.children,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, stagger: 0.05, ease: 'power2.out', duration: 0.15 },
          0.25
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (attending === null || !name.trim()) return;

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E8A84C', '#F3ECBA', '#D4A438', '#C5942A', '#FFD700'],
      });
    }, 600);
  };

  return (
    <section ref={sectionRef} className="siw-rsvp siw-scene" aria-label="RSVP">
      <div ref={bgRef} className="siw-rsvp__bg">
        <img
          src="https://myshaadhilink.in/assets/south-indian-wedding/temple-sanctum-door-night.webp"
          alt=""
          className="siw-scene__bg-img"
        />
      </div>

      <div className="siw-rsvp__overlay" />
      <div className="siw-glow siw-rsvp__glow" aria-hidden="true" />
      <div className="siw-scene__blend-top" aria-hidden="true" />

      <div className="siw-scene__corner siw-scene__corner--tl" aria-hidden="true">
        <img
          src="https://myshaadhilink.in/assets/south-indian-wedding/gold-filigree-corner.png"
          alt=""
        />
      </div>
      <div className="siw-scene__corner siw-scene__corner--tr" aria-hidden="true">
        <img
          src="https://myshaadhilink.in/assets/south-indian-wedding/gold-filigree-corner.png"
          alt=""
        />
      </div>
      <div className="siw-scene__corner siw-scene__corner--bl" aria-hidden="true">
        <img
          src="https://myshaadhilink.in/assets/south-indian-wedding/gold-filigree-corner.png"
          alt=""
        />
      </div>
      <div className="siw-scene__corner siw-scene__corner--br" aria-hidden="true">
        <img
          src="https://myshaadhilink.in/assets/south-indian-wedding/gold-filigree-corner.png"
          alt=""
        />
      </div>

      <div ref={contentRef} className="siw-rsvp__content">
        <h2 ref={headingRef} className="siw-rsvp__heading siw-font-heading">
          RSVP
        </h2>

        <p ref={subtextRef} className="siw-rsvp__subtext siw-font-formal">
          We would be honoured by your presence. Kindly let us know if you can join us.
        </p>

        {submitted ? (
          <div className="siw-rsvp__success">
            <p className="siw-rsvp__success-text siw-font-formal">
              Thank you for your response!
            </p>
          </div>
        ) : (
          <form ref={formRef} className="siw-rsvp__form" onSubmit={handleSubmit}>
            <div className="siw-rsvp__attendance">
              <button
                type="button"
                className={`siw-rsvp__attendance-btn ${
                  attending === true ? 'siw-rsvp__attendance-btn--active' : ''
                }`}
                onClick={() => setAttending(true)}
              >
                Joyfully Accept
              </button>
              <button
                type="button"
                className={`siw-rsvp__attendance-btn ${
                  attending === false ? 'siw-rsvp__attendance-btn--active' : ''
                }`}
                onClick={() => setAttending(false)}
              >
                Regretfully Decline
              </button>
            </div>

            <div className="siw-rsvp__field">
              <label className="siw-rsvp__label siw-font-label">Your Name</label>
              <input
                type="text"
                className="siw-rsvp__input"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {attending && (
              <div className="siw-rsvp__field">
                <label className="siw-rsvp__label siw-font-label">Number of Guests</label>
                <select
                  className="siw-rsvp__select"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="siw-rsvp__field">
              <label className="siw-rsvp__label siw-font-label">Message for the Couple</label>
              <textarea
                className="siw-rsvp__textarea"
                placeholder="Write your wishes..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>

            {errorMsg && (
              <p style={{ color: '#f5a0a0', fontSize: '0.9rem', textAlign: 'center' }}>
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="siw-rsvp__submit"
              disabled={attending === null || !name.trim() || isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send RSVP'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
