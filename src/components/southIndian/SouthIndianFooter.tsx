import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SouthIndianFooterProps {
  groomFirstName?: string;
  brideFirstName?: string;
  weddingDateDisplay?: string;
}

export const SouthIndianFooter: React.FC<SouthIndianFooterProps> = ({
  groomFirstName = 'Rahul',
  brideFirstName = 'Harinya',
  weddingDateDisplay = '17 september 2026',
}) => {
  const footerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const el = footerRef.current;
      if (!el) return;

      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: '-8%',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (contentRef.current && contentRef.current.children.length > 0) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            ease: 'power2.out',
            duration: 0.8,
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="siw-footer siw-scene" aria-label="Footer">
      <div ref={bgRef} className="siw-footer__bg">
        <img
          src="https://myshaadhilink.in/assets/south-indian-wedding/gopuram-night-temple.webp"
          alt=""
          className="siw-scene__bg-img"
        />
      </div>

      <div className="siw-footer__overlay" />

      <div className="siw-glow siw-footer__glow" aria-hidden="true">
        <img
          src="https://myshaadhilink.in/assets/south-indian-wedding/gold-filigree-divider.png"
          alt=""
        />
      </div>

      <div className="siw-scene__blend-top" aria-hidden="true" />

      <div ref={contentRef} className="siw-footer__content">
        <div className="siw-footer__symbol" aria-hidden="true">
          <img
            src="https://myshaadhilink.in/assets/south-indian-wedding/lord-ganesha.png"
            alt=""
          />
        </div>

        <p className="siw-footer__tagline siw-font-telugu">శుభం భవతు</p>

        <h2 className="siw-footer__names siw-font-heading">
          {groomFirstName} &amp; {brideFirstName}
        </h2>

        {weddingDateDisplay && (
          <p className="siw-footer__date siw-font-formal">{weddingDateDisplay}</p>
        )}

        <p className="siw-footer__hashtag">
          #{groomFirstName}{brideFirstName}Wedding
        </p>

        <p className="siw-footer__credit">
          Created with ♥ by{' '}
          <a
            href="https://myshaadhilink.in"
            target="_blank"
            rel="noopener noreferrer"
            className="siw-footer__credit-link"
          >
            MyShaadhiLink.in
          </a>
        </p>
      </div>
    </footer>
  );
};
