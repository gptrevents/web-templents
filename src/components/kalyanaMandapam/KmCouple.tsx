import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface KmCoupleProps {
  groomFullName?: string;
  brideFullName?: string;
  groomPhoto?: string;
  bridePhoto?: string;
  groomGotram?: string;
  brideGotram?: string;
  groomParents?: string;
  brideParents?: string;
  heading?: string;
  subheading?: string;
}

export const KmCouple: React.FC<KmCoupleProps> = ({
  groomFullName = 'Rahul Sipligunj',
  brideFullName = 'Harinya Reddy',
  groomPhoto = 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
  bridePhoto = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
  groomGotram = 'భరద్వాజసస గోత్రం (Bharadwaja Gotram)',
  brideGotram = 'కశ్యపసస గోత్రం (Kasyapa Gotram)',
  groomParents = 'శ్రీ శంకర్ సిప్లిగంజ్ & శ్రీమతి లక్ష్మి సిప్లిగంజ్',
  brideParents = 'శ్రీ రమేష్ రెడ్డి & శ్రీమతి లక్ష్మి రెడ్డి',
  heading = 'వధూవరుల పరిచయం • The Couple',
  subheading = 'ఇరు కుటుంబాల ఆశీస్సులతో... ఏడడుగుల పవిత్ర బంధం',
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.km-couple__heading, .km-couple__sub', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        y: 24,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Units animations
      gsap.utils.toArray<HTMLElement>('.km-couple__unit').forEach((unit) => {
        const card = unit.querySelector('.km-couple__card');
        if (card) {
          gsap.from(card, {
            scrollTrigger: { trigger: unit, start: 'top 82%' },
            y: 36,
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: 'power3.out',
          });
        }
        const meta = unit.querySelector('.km-couple__meta');
        if (meta) {
          gsap.from(meta.children, {
            scrollTrigger: { trigger: meta, start: 'top 88%' },
            y: 16,
            opacity: 0,
            stagger: 0.09,
            duration: 0.6,
            ease: 'power2.out',
          });
        }
      });

      // Divider animation
      gsap.from('.km-couple__divider', {
        scrollTrigger: { trigger: '.km-couple__divider', start: 'top 90%' },
        scaleX: 0.4,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
      });

      // Parallax temple scenery
      gsap.utils.toArray<HTMLElement>('.km-couple__scenery').forEach((el, idx) => {
        gsap.to(el, {
          yPercent: idx === 0 ? -2.5 : 2.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          },
          ease: 'none',
        });
      });

      // Animated flying birds
      gsap.utils.toArray<SVGElement>('.km-couple__bird').forEach((bird, t) => {
        const dur = 38 + 11 * t;
        gsap.set(bird, { left: '-6%' });
        gsap.fromTo(
          bird,
          { x: 0 },
          { x: '110vw', duration: dur, ease: 'none', repeat: -1, delay: 13 * t }
        );
        gsap.to(bird, {
          y: 9,
          duration: 4.6 + 1.3 * t,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });

      // Glowing halos pulsing
      gsap.utils.toArray<HTMLElement>('.km-couple__halo').forEach((halo, t) => {
        gsap.fromTo(
          halo,
          { scale: 1, opacity: 0.55 },
          {
            scale: 1.12,
            opacity: 0.9,
            duration: 4.6,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 1.7 * t,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="km-couple km-section" ref={sectionRef}>
      {/* Traditional Frame with Rails and Corners */}
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

      {/* Floating Temple Scenery */}
      <img
        className="km-couple__scenery km-couple__scenery--top"
        src="/assets/kalyana-mandapam/temple-scenery.png"
        alt=""
        aria-hidden="true"
      />
      <img
        className="km-couple__scenery km-couple__scenery--bottom"
        src="/assets/kalyana-mandapam/temple-scenery.png"
        alt=""
        aria-hidden="true"
      />

      {/* Flying Birds */}
      <svg className="km-couple__bird km-couple__bird--1" viewBox="0 0 20 7" aria-hidden="true">
        <path d="M1 5.5 Q 5.5 1, 10 5 Q 14.5 1, 19 5.5" fill="none" stroke="#c9ad77" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <svg className="km-couple__bird km-couple__bird--2" viewBox="0 0 20 7" aria-hidden="true">
        <path d="M1 5.5 Q 5.5 1, 10 5 Q 14.5 1, 19 5.5" fill="none" stroke="#c9ad77" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <svg className="km-couple__bird km-couple__bird--3" viewBox="0 0 20 7" aria-hidden="true">
        <path d="M1 5.5 Q 5.5 1, 10 5 Q 14.5 1, 19 5.5" fill="none" stroke="#c9ad77" strokeWidth="1.4" strokeLinecap="round" />
      </svg>

      <div className="km-container km-couple__inner text-center">
        <h2 className="km-couple__heading km-font-heading text-[#9A1B41] font-bold tracking-wide">
          {heading}
        </h2>
        <p className="km-couple__sub km-font-serif text-stone-700 font-medium">
          {subheading}
        </p>

        {/* Sacred Mangalyam Shloka Card */}
        <div className="max-w-2xl mx-auto my-6 px-4 py-3 rounded-2xl bg-[#FFF9ED]/90 border border-[#D4A843]/50 shadow-xs">
          <p className="text-xs sm:text-sm font-serif text-[#8B1A1A] font-semibold leading-relaxed tracking-wide">
            మాంగళ్యం తంతునానేన మమజీవన హేతునా | కంఠే బధ్నామి శుభగే త్వం జీవ శరదాం శతం ||
          </p>
          <span className="text-[11px] text-[#A26815] italic mt-0.5 block font-serif">
            - కలకాలం నిలిచే అనురాగ బంధం • జీవితాంతం తోడుండే సప్తపది -
          </span>
        </div>

        {/* Groom Unit */}
        <div className="km-couple__unit">
          <div className="km-couple__card">
            <div className="km-couple__halo" aria-hidden="true" />
            <div className="km-couple__photo-window">
              <img
                className="km-couple__photo"
                src={groomPhoto}
                alt={groomFullName}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
            <img
              className="km-couple__ornament"
              src="/assets/kalyana-mandapam/peacock-arch.webp"
              alt=""
              aria-hidden="true"
            />
          </div>

          <div className="km-couple__meta">
            <h3 className="km-couple__name km-font-script text-[#9A1B41]">{groomFullName}</h3>
            {groomGotram && (
              <span className="inline-block text-[11px] font-serif font-semibold text-[#8B5A2B] bg-[#FFF2D6] px-2.5 py-0.5 rounded-full border border-[#D4A843]/40 mb-1">
                {groomGotram}
              </span>
            )}
            <p className="km-couple__parent-label km-font-label text-stone-500">కుమారుడు (Son of)</p>
            <p className="km-couple__parents km-font-serif text-stone-800 font-semibold">{groomParents}</p>
          </div>
        </div>

        {/* Ornate Gold Divider */}
        <img
          className="km-couple__divider my-8"
          src="/assets/kalyana-mandapam/gold-divider.webp"
          alt=""
          aria-hidden="true"
        />

        {/* Bride Unit */}
        <div className="km-couple__unit">
          <div className="km-couple__card km-couple__card--mirror">
            <div className="km-couple__halo" aria-hidden="true" />
            <div className="km-couple__photo-window">
              <img
                className="km-couple__photo"
                src={bridePhoto}
                alt={brideFullName}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
            <img
              className="km-couple__ornament"
              src="/assets/kalyana-mandapam/peacock-arch.webp"
              alt=""
              aria-hidden="true"
            />
          </div>

          <div className="km-couple__meta">
            <h3 className="km-couple__name km-font-script text-[#9A1B41]">{brideFullName}</h3>
            {brideGotram && (
              <span className="inline-block text-[11px] font-serif font-semibold text-[#8B5A2B] bg-[#FFF2D6] px-2.5 py-0.5 rounded-full border border-[#D4A843]/40 mb-1">
                {brideGotram}
              </span>
            )}
            <p className="km-couple__parent-label km-font-label text-stone-500">కుమార్తె (Daughter of)</p>
            <p className="km-couple__parents km-font-serif text-stone-800 font-semibold">{brideParents}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
