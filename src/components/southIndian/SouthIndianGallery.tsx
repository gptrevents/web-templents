import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_GALLERY_IMAGES = [
  'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/c0cfc86b3c-WhatsApp-Image-2026-03-25-at-5.32.08-PM.jpeg',
  'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/26a6132107-WhatsApp-Image-2026-03-25-at-5.32.09-PM.jpeg',
  'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/125d9cbc52-WhatsApp-Image-2026-03-25-at-5.32.11-PM.jpeg',
  'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/d159a54d49-WhatsApp-Image-2026-03-25-at-5.32.12-PM.jpeg',
  'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/2cb2927ba8-12334.jpeg',
  'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/b8de9af4fe-mm.jpeg',
];

export const SouthIndianGallery: React.FC<{ images?: string[] }> = ({
  images = DEFAULT_GALLERY_IMAGES,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || images.length === 0) return;

    const ctx = gsap.context(() => {
      const el = sectionRef.current;
      if (!el) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=180%',
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
            end: '+=180%',
            scrub: true,
          },
        });
      }

      if (headerRef.current && headerRef.current.children.length > 0) {
        tl.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, stagger: 0.02, ease: 'power2.out', duration: 0.1 },
          0.03
        );
      }

      if (gridRef.current && gridRef.current.children.length > 0) {
        const children = Array.from(gridRef.current.children) as HTMLElement[];
        const count = children.length;
        const step = 0.55 / count;

        children.forEach((item, r) => {
          const startTime = 0.15 + r * step;
          const xOffset = r % 2 === 0 ? -40 : 40;
          tl.fromTo(
            item,
            { opacity: 0, scale: 0.85, x: xOffset, y: 30 },
            { opacity: 1, scale: 1, x: 0, y: 0, ease: 'power3.out', duration: 1.5 * step },
            startTime
          );
        });
      }

      if (contentRef.current) {
        tl.to(
          contentRef.current,
          { y: -25, opacity: 0.85, ease: 'power1.in', duration: 0.12 },
          0.88
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [images.length]);

  const openPhoto = useCallback((idx: number) => {
    setLightboxIndex(idx);
  }, []);

  if (images.length === 0) return null;

  return (
    <section ref={sectionRef} className="siw-gallery siw-scene" aria-label="Photo gallery">
      <div ref={bgRef} className="siw-gallery__bg">
        <img
          src="https://myshaadhilink.in/assets/south-indian-wedding/temple-entrance-marigold-night.webp"
          alt=""
          className="siw-scene__bg-img"
        />
      </div>

      <div className="siw-gallery__overlay" />
      <div className="siw-scene__blend-top" aria-hidden="true" />

      <div className="siw-gallery__leaf siw-gallery__leaf--left" aria-hidden="true">
        <img
          src="https://myshaadhilink.in/assets/south-indian-wedding/banana-leaf-pair.png"
          alt=""
        />
      </div>
      <div className="siw-gallery__leaf siw-gallery__leaf--right" aria-hidden="true">
        <img
          src="https://myshaadhilink.in/assets/south-indian-wedding/banana-leaf-pair.png"
          alt=""
        />
      </div>

      <div ref={contentRef} className="siw-gallery__content">
        <div ref={headerRef} className="siw-gallery__header">
          <img
            src="https://myshaadhilink.in/assets/south-indian-wedding/peacock.png"
            alt=""
            className="siw-gallery__peacock"
            aria-hidden="true"
          />
          <h2 className="siw-gallery__heading siw-font-heading">Gallery</h2>
          <p className="siw-gallery__subtext siw-font-label">Our moments together</p>
        </div>

        <div ref={gridRef} className="siw-gallery__grid">
          {images.map((src, idx) => (
            <div
              key={idx}
              className={`siw-gallery__item ${idx === 0 ? 'siw-gallery__item--wide' : ''}`}
              onClick={() => openPhoto(idx)}
              role="button"
              tabIndex={0}
              aria-label={`View photo ${idx + 1}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openPhoto(idx);
              }}
            >
              <img
                src={src}
                alt={`Gallery photo ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="siw-scene__blend-bottom" aria-hidden="true" />

      {/* Yet Another React Lightbox Modal */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={images.map((url) => ({ src: url }))}
      />
    </section>
  );
};
