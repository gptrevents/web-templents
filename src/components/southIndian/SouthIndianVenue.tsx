import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SouthIndianVenueProps {
  venueName?: string;
  venueAddress?: string;
  mapLink?: string;
  embedMapUrl?: string;
}

export const SouthIndianVenue: React.FC<SouthIndianVenueProps> = ({
  venueName = 'Balaji nagar, Hyderabad.',
  venueAddress = 'Venue Address, City, State',
  mapLink = 'https://maps.app.goo.gl/mBMK1HkkHVTVZ6ET8',
  embedMapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121798.1189283733!2d78.38469854999999!3d17.48507315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91f3f7645169%3A0xc312480397722eb7!2sKukatpally%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const addressRef = useRef<HTMLParagraphElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const el = sectionRef.current;
      if (!el) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: '-15%',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=150%',
            scrub: true,
          },
        });
      }

      if (ringRef.current) {
        tl.fromTo(
          ringRef.current,
          { opacity: 0, scale: 0.7, y: 20 },
          { opacity: 1, scale: 1, y: 0, ease: 'back.out(1.5)', duration: 0.1 },
          0.05
        );
      }

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 0.1 },
          0.08
        );
      }

      if (subheadingRef.current) {
        tl.fromTo(
          subheadingRef.current,
          { opacity: 0, y: 15 },
          { opacity: 0.5, y: 0, ease: 'power2.out', duration: 0.08 },
          0.12
        );
      }

      if (nameRef.current) {
        tl.fromTo(
          nameRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 0.1 },
          0.2
        );
      }

      if (addressRef.current) {
        tl.fromTo(
          addressRef.current,
          { opacity: 0, y: 15 },
          { opacity: 0.6, y: 0, ease: 'power2.out', duration: 0.08 },
          0.28
        );
      }

      if (mapRef.current) {
        tl.fromTo(
          mapRef.current,
          { opacity: 0, scale: 0.85, y: 30 },
          { opacity: 1, scale: 1, y: 0, ease: 'power3.out', duration: 0.2 },
          0.38
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 0.1 },
          0.62
        );
      }

      if (contentRef.current) {
        tl.to(
          contentRef.current,
          { y: -25, opacity: 0.85, ease: 'power1.in', duration: 0.15 },
          0.85
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="siw-venue siw-scene" aria-label="Venue">
      <div ref={bgRef} className="siw-venue__bg">
        <img
          src="https://myshaadhilink.in/assets/south-indian-wedding/temple-courtyard-banana-night.webp"
          alt=""
          className="siw-scene__bg-img"
        />
      </div>

      <div className="siw-venue__overlay" />
      <div className="siw-scene__blend-top" aria-hidden="true" />

      <div className="siw-scene__corner siw-scene__corner--tl" aria-hidden="true">
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

      <div ref={contentRef} className="siw-venue__content">
        <img
          ref={ringRef}
          src="https://myshaadhilink.in/assets/south-indian-wedding/location-ring.png"
          alt=""
          className="siw-venue__ring"
          aria-hidden="true"
        />

        <h2 ref={headingRef} className="siw-venue__heading siw-font-heading">
          Venue
        </h2>

        <p ref={subheadingRef} className="siw-venue__subheading siw-font-label">
          Find your way to us
        </p>

        {venueName && (
          <p ref={nameRef} className="siw-venue__name siw-font-heading">
            {venueName}
          </p>
        )}

        {venueAddress && (
          <p ref={addressRef} className="siw-venue__address siw-font-formal">
            {venueAddress}
          </p>
        )}

        <div ref={mapRef} className="siw-venue__map">
          <iframe
            src={embedMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue location"
          />
        </div>

        {mapLink && (
          <a
            ref={ctaRef}
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="siw-venue__cta siw-font-label"
          >
            Get Directions
          </a>
        )}
      </div>

      <div className="siw-scene__blend-bottom" aria-hidden="true" />
    </section>
  );
};
