import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface KmVideoProps {
  youtubeId?: string;
  videoUrl?: string;
  title?: string;
}

export const KmVideo: React.FC<KmVideoProps> = ({
  youtubeId = 'dQw4w9WgXcQ', // or empty if videoUrl is used
  videoUrl,
  title = 'A Glimpse of Our Joy',
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.km-video__label, .km-video__title', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        y: 22,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.km-video__wall', {
        scrollTrigger: { trigger: '.km-video__wall', start: 'top 86%' },
        y: 26,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="km-video km-section"
      ref={sectionRef}
      aria-label="Wedding video"
    >
      <div className="km-container">
        <p className="km-video__label km-font-label">Watch</p>
        <h2 className="km-video__title km-font-heading">{title}</h2>
      </div>

      <div className="km-video__wall">
        <img
          className="km-video__wall-img"
          src="/assets/kalyana-mandapam/video-wall.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />

        <div className="km-video__opening">
          {videoUrl ? (
            <video
              className="w-full h-full object-cover rounded-lg"
              src={videoUrl}
              controls
              playsInline
            />
          ) : (
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/gLgS5T0x14k?rel=0&modestbranding=1"
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </section>
  );
};
