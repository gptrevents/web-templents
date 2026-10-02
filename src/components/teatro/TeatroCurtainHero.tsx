import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { TeatroLang } from './TeatroLangSwitch';

interface TeatroCurtainHeroProps {
  groomName?: string;
  brideName?: string;
  lang?: TeatroLang;
  onFirstClick?: () => void;
}

export const TeatroCurtainHero: React.FC<TeatroCurtainHeroProps> = ({
  groomName = 'Sam',
  brideName = 'Sofía',
  lang = 'en',
  onFirstClick,
}) => {
  const [playState, setPlayState] = useState<'idle' | 'playing' | 'done'>('idle');
  const [showTypography, setShowTypography] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const translations = {
    en: {
      tap: 'Tap to continue',
      invite: 'You are cordially invited to celebrate the wedding of',
      message:
        'We would like to invite you to celebrate with us the most special day of our lives. It would be an honor to have you present at this important moment.',
      scroll: 'Scroll',
    },
    it: {
      tap: 'Tocca per continuare',
      invite: 'Siete cordialmente invitati a celebrare il matrimonio di',
      message:
        'Vorremmo invitarvi a celebrare con noi il giorno più speciale della nostra vita. Sarebbe un onore avervi presenti in questo momento importante.',
      scroll: 'Scorri',
    },
    te: {
      tap: 'కొనసాగించడానికి తాకండి',
      invite: 'వీరి వివాహ మహోత్సవానికి మిమ్మల్ని సాదరంగా ఆహ్వానిస్తున్నాము',
      message:
        'మా జీవితంలో ఎంతో పవిత్రమైన, మధురమైన ఈ శుభదినాన మమ్మల్ని ఆశీర్వదించడానికి మీ ఆగమనం మాకెంతో గౌరవప్రదం.',
      scroll: 'కిందికి స్క్రోల్ చేయండి',
    },
  };

  const t = translations[lang] || translations.en;

  const handleStart = () => {
    if (playState !== 'idle') return;
    setPlayState('playing');
    if (onFirstClick) onFirstClick();

    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.log('Video play error:', err));
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    // When video is within 3.5 seconds of ending, fade in the typography
    const timeLeft = videoRef.current.duration - videoRef.current.currentTime;
    if (timeLeft <= 3.5 && !showTypography) {
      setShowTypography(true);
    }
  };

  const handleVideoEnded = () => {
    setPlayState('done');
    setShowTypography(true);
  };

  const scrollToNext = () => {
    const globalLenis = (window as unknown as { __lenis?: { scrollTo: (target: number | string, opts?: unknown) => void } }).__lenis;
    if (globalLenis) {
      globalLenis.scrollTo(window.innerHeight, { duration: 1.4 });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      className="relative h-screen w-full cursor-pointer overflow-hidden select-none bg-black"
      onClick={handleStart}
    >
      {/* 1. IDLE STATE: Closed Red Velvet Curtains Poster + Hand Gesture */}
      {playState === 'idle' && (
        <div className="absolute inset-0 z-20">
          <img
            src="/assets/teatro/curtain-closed.jpg"
            alt="Closed red velvet curtains"
            className="w-full h-full object-cover object-center"
          />

          {/* Gentle Pulsing Hand Touch Gesture */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="relative flex items-center justify-center">
              {/* Outer pulsing ring */}
              <div className="absolute w-16 h-16 rounded-full border-2 border-white/50 animate-ping opacity-60" />
              <div className="absolute w-14 h-14 rounded-full border border-white/40" />

              {/* Hand icon container */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  border: '1.5px solid rgba(255, 255, 255, 0.5)',
                }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-95"
                >
                  <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v0" />
                  <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v6" />
                  <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
                  <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                </svg>
              </div>
            </div>

            <p
              className="mt-4 font-body text-xs tracking-wider uppercase text-center px-4"
              style={{ color: 'rgba(255, 255, 255, 0.88)' }}
            >
              {t.tap}
            </p>
          </div>
        </div>
      )}

      {/* 2. VIDEO ELEMENT: Velvet Curtains Parting Smoothly */}
      <video
        ref={videoRef}
        src="/assets/teatro/curtain-video.mp4"
        className={`absolute inset-0 w-full h-full object-cover z-10 ${
          playState === 'idle' ? 'hidden' : 'block'
        }`}
        onEnded={handleVideoEnded}
        onTimeUpdate={handleTimeUpdate}
        playsInline
        muted
        preload="auto"
      />

      {/* Fallback image when video ends or typography is visible */}
      {playState === 'done' && (
        <img
          src="/assets/teatro/curtain-open.jpg"
          alt="Open velvet curtains"
          className="absolute inset-0 w-full h-full object-cover z-10"
        />
      )}

      {/* 3. ELEGANT INVITATION TYPOGRAPHY OVERLAY */}
      <AnimatePresence>
        {(showTypography || playState === 'done') && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-between py-12 px-6 pointer-events-auto"
          >
            {/* Top Empty buffer */}
            <div className="h-4" />

            {/* Center: Royal Couple Title */}
            <div className="flex flex-col items-center text-center max-w-[85%] sm:max-w-[70%] md:max-w-[55%] lg:max-w-[45%]">
              <p
                className="font-display text-[9px] md:text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: '#5C2018' }}
              >
                {t.invite}
              </p>

              <h1
                className="font-script text-6xl sm:text-7xl md:text-8xl leading-none"
                style={{ color: '#5C2018' }}
              >
                {brideName}
              </h1>
              <span
                className="font-script text-3xl sm:text-4xl my-1"
                style={{ color: '#5C2018' }}
              >
                &amp;
              </span>
              <h1
                className="font-script text-6xl sm:text-7xl md:text-8xl leading-none mb-6"
                style={{ color: '#5C2018' }}
              >
                {groomName}
              </h1>

              <p
                className="font-display text-[10px] sm:text-xs md:text-sm tracking-[0.14em] uppercase leading-relaxed text-center px-2 mt-2"
                style={{ color: '#5C2018', opacity: 0.9 }}
              >
                {t.message}
              </p>
            </div>

            {/* Bottom: Scroll Indicator */}
            <button
              type="button"
              onClick={scrollToNext}
              className="flex flex-col items-center gap-1 cursor-pointer transition-transform hover:translate-y-1 mt-6"
              style={{ color: '#5C2018' }}
            >
              <span className="font-display text-[10px] tracking-[0.2em] uppercase">
                {t.scroll}
              </span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
