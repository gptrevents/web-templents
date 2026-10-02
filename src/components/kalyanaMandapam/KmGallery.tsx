import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

gsap.registerPlugin(ScrollTrigger);

export interface GalleryImage {
  src: string;
  caption?: string;
  isFeature?: boolean;
}

interface KmGalleryProps {
  images?: GalleryImage[];
}

const DEFAULT_IMAGES: GalleryImage[] = [
  {
    src: 'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/c03dcfc8b0-a544c4b9-11ba-4475-ae98-755746b14ea4.jpeg',
    caption: 'Sacred Vows & Eternal Love',
    isFeature: true,
  },
  {
    src: 'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/7da4ae4ec7-770df22d-3dcf-4e00-8438-e6b36caae245.jpeg',
    caption: 'Laughter, Joy & Memories',
  },
  {
    src: 'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/ff0e1be983-a4c3eef5-618d-4a11-bfe4-7e8c15db6384.jpeg',
    caption: 'In Divine Presence',
  },
  {
    src: 'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/a4f3237142-a89e9009-dc34-4530-9b36-efd3d63c3563.jpeg',
    caption: 'Celebrations in Royal Hue',
  },
  {
    src: 'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/004a43b0d5-1c39c89a-cecb-4be6-8a03-9d083bc70fe5.jpeg',
    caption: 'Tradition Meets Elegance',
  },
  {
    src: 'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/49ca9c322a-8ef7a159-25f0-4fc7-bf84-cbca6f16d137.jpeg',
    caption: 'Moments of Grace',
  },
  {
    src: 'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/5a2fe1458e-0498b8c9-8d76-476c-84ce-6934c98fca64.jpeg',
    caption: 'Sacred Rituals',
  },
  {
    src: 'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/59df262ce4-7b95bc6e-9ca2-4822-b5e1-cf2abff3847a.jpeg',
    caption: 'Together Forever',
    isFeature: true,
  },
];

export const KmGallery: React.FC<KmGalleryProps> = ({ images = DEFAULT_IMAGES }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.km-gallery__heading, .km-gallery__sub', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        y: 22,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Drifting royal umbrella (parasol)
      const parasol = sectionRef.current?.querySelector('.km-gallery__parasol');
      if (parasol && sectionRef.current) {
        gsap.set(parasol, { scaleX: 1 });
        gsap.fromTo(
          parasol,
          { y: 0 },
          {
            y: () =>
              Math.max(
                0,
                (sectionRef.current?.offsetHeight || 800) -
                  (parasol as HTMLElement).offsetHeight -
                  120
              ),
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              end: 'bottom bottom',
              scrub: 1.6,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // 12 Drifting Golden Fireflies / Motes
      gsap.utils.toArray<HTMLElement>('.km-gallery__mote').forEach((mote, i) => {
        const dur = 7 + (i % 5) * 2.4;
        const delay = (i % 7) * 1.15;

        gsap.to(mote, {
          keyframes: [
            { opacity: 0.55, duration: 0.28 * dur },
            { opacity: 0.55, duration: 0.42 * dur },
            { opacity: 0, duration: 0.3 * dur },
          ],
          repeat: -1,
          delay,
        });

        gsap.to(mote, {
          y: i % 2 === 0 ? -26 : -38,
          x: i % 3 === 0 ? 14 : -11,
          duration: dur,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay,
        });
      });

      // Subtle parallax in cells
      gsap.utils.toArray<HTMLElement>('.km-gallery__img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -3.5 },
          {
            yPercent: 3.5,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.km-gallery__cell'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="km-gallery km-section" ref={sectionRef}>
      {/* Mango Leaf Garland Toranam */}
      <div className="km-gallery__toranam" aria-hidden="true" />

      {/* Pattu Silk Weave Background */}
      <div className="km-gallery__weave" aria-hidden="true" />

      {/* Royal Parasol Drifting Down */}
      <img
        className="km-gallery__parasol"
        src="/assets/kalyana-mandapam/gallery-parasol.png"
        alt=""
        aria-hidden="true"
      />

      {/* Golden Motes / Fireflies */}
      <div className="km-gallery__motes" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={`mote-${i}`}
            className="km-gallery__mote"
            style={{
              left: `${(i * 8.3 + 4) % 100}%`,
              top: `${(i * 9.5 + 8) % 100}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
            }}
          />
        ))}
      </div>

      <div className="km-container">
        <h2 className="km-gallery__heading km-font-heading">Sacred Moments</h2>
        <p className="km-gallery__sub km-font-serif">
          Glimpses of love, tradition, and timeless celebration
        </p>

        {/* Gallery Grid */}
        <div className="km-gallery__grid">
          {images.map((img, idx) => {
            const isFeature = img.isFeature || idx === 0 || idx === images.length - 1;
            const col = isFeature ? '0' : String(idx % 2);

            return (
              <button
                type="button"
                key={`img-${idx}`}
                data-col={col}
                className={`km-gallery__cell ${isFeature ? 'km-gallery__cell--feature' : ''} is-revealed`}
                onClick={() => setLightboxIndex(idx)}
                aria-label={`Open photo ${idx + 1} of ${images.length}`}
              >
                {/* Ornate Gold Framing */}
                <div className="km-gallery__frame" aria-hidden="true" />

                <img
                  className="km-gallery__img"
                  src={img.src}
                  alt={img.caption || `Wedding moment ${idx + 1}`}
                  loading="lazy"
                />

                <div className="km-gallery__scrim" />

                {img.caption && (
                  <span className="km-gallery__caption km-font-serif">
                    {img.caption}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex >= 0 && (
        <Lightbox
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={lightboxIndex}
          slides={images.map((img) => ({
            src: img.src,
            title: img.caption,
          }))}
        />
      )}
    </section>
  );
};
