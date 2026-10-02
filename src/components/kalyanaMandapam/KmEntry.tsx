import React, { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

interface KmEntryProps {
  isOpen: boolean;
  onOpen: () => void;
  groomName?: string;
  brideName?: string;
  weddingDate?: string;
  city?: string;
}

export const KmEntry: React.FC<KmEntryProps> = ({
  isOpen,
  onOpen,
  groomName = 'Rahul',
  brideName = 'Harinya',
  weddingDate = '23 April 2026',
  city = 'Hyderabad',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    if (isClosingRef.current || isOpen) return;
    isClosingRef.current = true;
    setIsClosing(true);

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        onOpen();
      },
    });

    tl.to('.km-entry__cta', { y: 10, opacity: 0, duration: 0.28, ease: 'power2.in' })
      .to('.km-entry__names', { y: -18, opacity: 0, duration: 0.4, ease: 'power2.in' }, '-=0.16')
      .to('.km-entry__label, .km-entry__meta', { y: -14, opacity: 0, duration: 0.34, ease: 'power2.in' }, '<0.04')
      .to('.km-entry__bloom', { opacity: 1, scale: 1.6, duration: 0.55, ease: 'power2.out' }, '-=0.2')
      .to('.km-entry__card', { scale: 1.12, opacity: 0, duration: 0.95, ease: 'power2.inOut' }, '-=0.35')
      .to('.km-entry__bloom', { opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.6')
      .to('.km-entry__veil', { opacity: 0, duration: 0.55, ease: 'power1.out' }, '-=0.55');
  }, [isOpen, onOpen]);

  if (isOpen) return null;

  return (
    <div
      className={`km-entry ${isClosing ? 'km-entry--closing' : ''}`}
      ref={containerRef}
      onClick={handleOpen}
      role="dialog"
      aria-label="Wedding Invitation Envelope"
    >
      <div className="km-entry__veil">
        <div className="km-entry__card">
          <img
            className="km-entry__art"
            src="/assets/kalyana-mandapam/entry-card.jpg"
            alt=""
            aria-hidden="true"
          />
          <div className="km-entry__bloom" aria-hidden="true" />
          <img
            className="km-entry__mandala"
            src="/assets/south-indian/mandala-gold.webp"
            alt=""
            aria-hidden="true"
          />

          <div className="km-entry__content">
            <div className="km-entry__group">
              <p className="km-entry__label km-font-label">
                You are cordially invited to celebrate the wedding of
              </p>
              <h1 className="km-entry__names km-font-script">
                <span>{brideName}</span>
                <span className="km-entry__amp">&amp;</span>
                <span>{groomName}</span>
              </h1>
            </div>

            <div className="km-entry__group km-entry__meta">
              <p className="km-entry__date km-font-label">{weddingDate}</p>
              <p className="km-entry__city km-font-label">{city}</p>
            </div>

            <button
              type="button"
              className="km-entry__cta km-font-label"
              onClick={(e) => {
                e.stopPropagation();
                handleOpen();
              }}
            >
              <span className="km-entry__cta-inner">Open Invitation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
