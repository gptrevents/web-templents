import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SouthIndianHero } from './SouthIndianHero';
import { SouthIndianCouple } from './SouthIndianCouple';
import { SouthIndianEvents } from './SouthIndianEvents';
import { SouthIndianCountdown } from './SouthIndianCountdown';
import { SouthIndianGallery } from './SouthIndianGallery';
import { SouthIndianVenue } from './SouthIndianVenue';
import { SouthIndianRsvp } from './SouthIndianRsvp';
import { SouthIndianFooter } from './SouthIndianFooter';
import { SouthIndianAudioPlayer } from './SouthIndianAudioPlayer';
import '../../styles/southIndianWedding.css';

gsap.registerPlugin(ScrollTrigger);

export const SouthIndianTraditionalView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sync with Global Lenis Inertia Smooth Scroll
    const globalLenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    const lenis =
      globalLenis ||
      new Lenis({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
      });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      if (!globalLenis) {
        lenis.raf(time * 1000);
      }
    };
    if (!globalLenis) {
      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0);
    }

    const refresh = () => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };
    refresh();
    window.addEventListener('load', refresh);
    const t1 = setTimeout(refresh, 300);
    const t2 = setTimeout(refresh, 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('load', refresh);
      if (!globalLenis) {
        gsap.ticker.remove(tickerCb);
        lenis.destroy();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="south-indian-wedding relative w-full min-h-screen text-[#F3ECBA]">
      <style>{`
        html, body { scrollbar-width: none; -ms-overflow-style: none; }
        html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Hero Section with Gopuram descent video scrubbed by ScrollTrigger & floating lanterns */}
      <SouthIndianHero
        groomName="Rahul"
        brideName="Harinya"
        weddingDateDisplay="17 september 2026"
      />

      {/* Couple Section with Ganesha, blessing text & photos */}
      <SouthIndianCouple
        groomFullName="Rahul Sipligunj"
        brideFullName="Harinya Reddy"
        groomPhoto="https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/92ba0ee8cf-rahulll.jpeg"
        bridePhoto="https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/1982fd6490-hiranya.jpeg"
        groomParentLabel="Son of"
        brideParentLabel="Daughter of"
        groomParents="Shankar Sipligunj & Laxmi Sipligunj"
        brideParents="Ramesh Reddy & Lakshmi Reddy"
        blessingText="“Two hearts united, one beautiful journey begins. Wishing you a lifetime of togetherness.”"
      />

      {/* Celebrations / Events Section */}
      <SouthIndianEvents />

      {/* Shubh Muhurtham Countdown */}
      <SouthIndianCountdown
        weddingDateDisplay="17 september 2026"
        targetDate="2026-09-17T10:30:00"
      />

      {/* Gallery Section with Lightbox */}
      <SouthIndianGallery />

      {/* Venue Section with Map and Directions */}
      <SouthIndianVenue
        venueName="Balaji nagar, Hyderabad."
        venueAddress="Venue Address, City, State"
        mapLink="https://maps.app.goo.gl/mBMK1HkkHVTVZ6ET8"
      />

      {/* RSVP Section */}
      <SouthIndianRsvp />

      {/* Footer with Gopuram night backdrop */}
      <SouthIndianFooter
        groomFirstName="Rahul"
        brideFirstName="Harinya"
        weddingDateDisplay="17 september 2026"
      />

      {/* Floating Music Control Button */}
      <SouthIndianAudioPlayer />
    </div>
  );
};
