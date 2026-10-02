import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SouthIndianCoupleProps {
  groomFullName?: string;
  brideFullName?: string;
  groomPhoto?: string;
  bridePhoto?: string;
  groomParentLabel?: string;
  brideParentLabel?: string;
  groomParents?: string;
  brideParents?: string;
  blessingText?: string;
}

export const SouthIndianCouple: React.FC<SouthIndianCoupleProps> = ({
  groomFullName = 'Rahul Sipligunj',
  brideFullName = 'Harinya Reddy',
  groomPhoto = 'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/92ba0ee8cf-rahulll.jpeg',
  bridePhoto = 'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/1982fd6490-hiranya.jpeg',
  groomParentLabel = 'Son of',
  brideParentLabel = 'Daughter of',
  groomParents = 'Shankar Sipligunj & Laxmi Sipligunj',
  brideParents = 'Ramesh Reddy & Lakshmi Reddy',
  blessingText = '“Two hearts united, one beautiful journey begins. Wishing you a lifetime of togetherness.”',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const ganeshaRef = useRef<HTMLImageElement>(null);
  const blessingRef = useRef<HTMLParagraphElement>(null);
  const goldLineRef = useRef<HTMLDivElement>(null);
  const groomCardRef = useRef<HTMLDivElement>(null);
  const brideCardRef = useRef<HTMLDivElement>(null);
  const ampersandRef = useRef<HTMLSpanElement>(null);
  const parentsRef = useRef<HTMLDivElement>(null);

  const hasPhotos = !!(groomPhoto || bridePhoto);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (ganeshaRef.current) {
        gsap.fromTo(
          ganeshaRef.current,
          { opacity: 0, y: -30, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ganeshaRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (blessingRef.current) {
        gsap.fromTo(
          blessingRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 0.85,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: blessingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (goldLineRef.current) {
        gsap.fromTo(
          goldLineRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 0.4,
            duration: 0.8,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: goldLineRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (groomCardRef.current) {
        gsap.fromTo(
          groomCardRef.current,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: groomCardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (ampersandRef.current) {
        gsap.fromTo(
          ampersandRef.current,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 0.35,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.5)',
            delay: 0.2,
            scrollTrigger: {
              trigger: ampersandRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (brideCardRef.current) {
        gsap.fromTo(
          brideCardRef.current,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: brideCardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (parentsRef.current && parentsRef.current.children.length > 0) {
        gsap.fromTo(
          parentsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: parentsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="siw-couple" aria-label="Couple introduction">
      <div className="siw-couple__glow" aria-hidden="true" />

      <div className="siw-couple__toran" aria-hidden="true">
        <img
          src="https://myshaadhilink.in/assets/south-indian-wedding/toran-mango-marigold.png"
          alt=""
        />
      </div>

      <div className="siw-couple__content">
        <div className="siw-couple__blessing-area">
          <img
            ref={ganeshaRef}
            src="https://myshaadhilink.in/assets/south-indian-wedding/ganesha-ornament.png"
            alt="Lord Ganesha"
            className="siw-couple__ganesha"
          />
          {blessingText && (
            <p ref={blessingRef} className="siw-couple__blessing siw-font-formal">
              {blessingText}
            </p>
          )}
          <div ref={goldLineRef} className="siw-couple__gold-line" aria-hidden="true" />
        </div>

        {hasPhotos ? (
          <div className="siw-couple__photos">
            <div ref={groomCardRef} className="siw-couple__photo-card">
              <div className="siw-couple__photo-wrap">
                {groomPhoto ? (
                  <img
                    src={groomPhoto}
                    alt={groomFullName}
                    className="siw-couple__photo"
                  />
                ) : (
                  <div className="siw-couple__photo siw-couple__photo--placeholder" />
                )}
                <div className="siw-couple__photo-border" aria-hidden="true" />
              </div>
              <h2 className="siw-couple__name siw-font-heading">{groomFullName}</h2>
            </div>

            <span ref={ampersandRef} className="siw-couple__ampersand siw-font-display">
              &amp;
            </span>

            <div ref={brideCardRef} className="siw-couple__photo-card">
              <div className="siw-couple__photo-wrap">
                {bridePhoto ? (
                  <img
                    src={bridePhoto}
                    alt={brideFullName}
                    className="siw-couple__photo"
                  />
                ) : (
                  <div className="siw-couple__photo siw-couple__photo--placeholder" />
                )}
                <div className="siw-couple__photo-border" aria-hidden="true" />
              </div>
              <h2 className="siw-couple__name siw-font-heading">{brideFullName}</h2>
            </div>
          </div>
        ) : (
          <div className="siw-couple__names-only">
            <div ref={groomCardRef} className="siw-couple__name-card">
              <h2 className="siw-couple__name siw-couple__name--large siw-font-heading">
                {groomFullName}
              </h2>
            </div>
            <span ref={ampersandRef} className="siw-couple__ampersand siw-couple__ampersand--large siw-font-display">
              &amp;
            </span>
            <div ref={brideCardRef} className="siw-couple__name-card">
              <h2 className="siw-couple__name siw-couple__name--large siw-font-heading">
                {brideFullName}
              </h2>
            </div>
          </div>
        )}

        <div ref={parentsRef} className="siw-couple__parents">
          {groomParents && (
            <div className="siw-couple__parent-info">
              <span className="siw-couple__parent-label siw-font-label">{groomParentLabel}</span>
              <p className="siw-couple__parent-names siw-font-formal">{groomParents}</p>
            </div>
          )}
          {brideParents && (
            <div className="siw-couple__parent-info">
              <span className="siw-couple__parent-label siw-font-label">{brideParentLabel}</span>
              <p className="siw-couple__parent-names siw-font-formal">{brideParents}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
