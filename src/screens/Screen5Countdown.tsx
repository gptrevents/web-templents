import React, { useState, useEffect } from 'react';
import { ScreenIndicator } from '../components/ScreenIndicator';
import { ScreenId } from '../types';
import { WEDDING_COUPLE } from '../data/weddingData';

interface Screen5CountdownProps {
  onNext: () => void;
  onNavigate?: (id: ScreenId) => void;
  onOpenMenu?: () => void;
  isSinglePage?: boolean;
}

export const Screen5Countdown: React.FC<Screen5CountdownProps> = ({
  onNext,
  onNavigate = () => {},
  onOpenMenu = () => {},
  isSinglePage = false,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const target = new Date(WEDDING_COUPLE.targetIsoDate).getTime();

    const updateClock = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % 1000) / 1000);

        setTimeLeft({
          days: String(d).padStart(2, '0'),
          hours: String(h).padStart(2, '0'),
          minutes: String(m).padStart(2, '0'),
          seconds: String(s).padStart(2, '0'),
        });
      } else {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative w-full ${isSinglePage ? 'min-h-[100vh] py-12' : 'h-full min-h-[100dvh] max-h-[932px]'} overflow-hidden flex flex-col justify-between select-none shadow-2xl`}
      style={{
        backgroundImage:
          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2EDcHQzPrTudkiEaXSEHGIvELJkkAGSGPoTIAZHK36U5UfuzDr3Kthl9NF3NOZQVi_jUMDlNl5TA22I7TKPXrEYfQmW0aSb0qCOcP9L6AzAJbLox3DKZ9s6FyzYEVFxvYHZdonaoydLDcdRYxz8zzuGTAlqF97BvUprIH6k3MklmwxTTjVPoC-ZBQmqTHoZ4rXK8T2n2FZIHDRfNuwE_qXb4Bs-zfpYVC6SdTPvfFhik_wD6zvDhhHmLMiwIeFAQF1w')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
    >
      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55 pointer-events-none z-10" />

      {/* Top Bar Navigation (hidden in single page mode) */}
      {!isSinglePage && (
        <div className="relative z-40 w-full pt-1">
          <ScreenIndicator
            activeScreen={5}
            onNavigate={onNavigate}
            onOpenMenu={onOpenMenu}
            darkMode={true}
          />
        </div>
      )}

      {/* Animated Candles & Lanterns Overlay */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-15">
        {/* Top Lantern flames */}
        <div className="flame-glow-1 absolute top-[15%] left-[7%] w-3 h-4 bg-gradient-to-t from-[#FFAE34] to-[#FFF5A8] rounded-full blur-[0.5px] shadow-[0_0_12px_#FFAE34]" />
        <div className="flame-glow-2 absolute top-[15%] right-[9%] w-3 h-4 bg-gradient-to-t from-[#FFAE34] to-[#FFF5A8] rounded-full blur-[0.5px] shadow-[0_0_12px_#FFAE34]" />

        {/* Arch lights */}
        <div className="flame-glow-3 absolute top-[46%] left-[49%] w-2.5 h-3.5 bg-[#FFF5A8] rounded-full blur-[0.5px]" />
        <div className="flame-glow-1 absolute top-[60%] left-[13%] w-2 h-3 bg-[#FFAE34] rounded-full blur-[0.5px]" />
        <div className="flame-glow-2 absolute top-[60%] right-[14%] w-2 h-3 bg-[#FFAE34] rounded-full blur-[0.5px]" />
        <div className="flame-glow-3 absolute top-[75%] left-[10%] w-3 h-5 bg-[#FFAE34] rounded-full blur-[0.5px] shadow-[0_0_15px_#FFAE34]" />
        <div className="flame-glow-1 absolute top-[75%] right-[10%] w-3 h-5 bg-[#FFAE34] rounded-full blur-[0.5px] shadow-[0_0_15px_#FFAE34]" />
      </div>

      {/* Falling Rose Petals */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <div className="animate-petal-1 absolute top-0 left-[14%] w-3.5 h-4.5 bg-rose-300/80 rounded-full blur-[0.3px]" />
        <div className="animate-petal-2 absolute top-0 right-[20%] w-4 h-5 bg-pink-300/75 rounded-full blur-[0.4px]" />
        <div className="animate-petal-3 absolute top-0 left-[55%] w-3 h-4 bg-rose-400/70 rounded-full blur-[0.3px]" />
      </div>

      {/* Top Section - Countdown Header */}
      <header className="relative z-20 px-4 flex flex-col items-center text-center pt-2">
        <h1 className="font-playfair text-[36px] sm:text-[40px] leading-[1.15] text-[#FFFBF6] font-normal tracking-wide text-glow-grand">
          Counting Down
          <br />
          <span className="font-normal italic">to</span> Forever
        </h1>

        {/* Pink Heart Icon */}
        <div className="mt-2.5 mb-3 flex justify-center items-center">
          <span className="text-[#E2587A] text-lg animate-heartbeat">♥</span>
        </div>

        {/* 4-Column Countdown Clock */}
        <section
          aria-label="Wedding Countdown"
          className="w-full max-w-[340px] grid grid-cols-4 gap-2 px-1"
        >
          {/* Days */}
          <div className="bg-[#FAD4DF]/95 border border-white/60 rounded-[18px] py-3 px-1 flex flex-col items-center backdrop-blur-sm shadow-lg transform active:scale-95 transition">
            <span className="font-playfair text-[30px] sm:text-[32px] font-semibold text-[#4A1525] leading-none tracking-tight">
              {timeLeft.days}
            </span>
            <span className="font-sans-clean text-[11px] font-medium text-[#4A1525]/90 mt-1 tracking-wide">
              Days
            </span>
          </div>

          {/* Hours */}
          <div className="bg-[#FAD4DF]/95 border border-white/60 rounded-[18px] py-3 px-1 flex flex-col items-center backdrop-blur-sm shadow-lg transform active:scale-95 transition">
            <span className="font-playfair text-[30px] sm:text-[32px] font-semibold text-[#4A1525] leading-none tracking-tight">
              {timeLeft.hours}
            </span>
            <span className="font-sans-clean text-[11px] font-medium text-[#4A1525]/90 mt-1 tracking-wide">
              Hours
            </span>
          </div>

          {/* Minutes */}
          <div className="bg-[#FAD4DF]/95 border border-white/60 rounded-[18px] py-3 px-1 flex flex-col items-center backdrop-blur-sm shadow-lg transform active:scale-95 transition">
            <span className="font-playfair text-[30px] sm:text-[32px] font-semibold text-[#4A1525] leading-none tracking-tight">
              {timeLeft.minutes}
            </span>
            <span className="font-sans-clean text-[11px] font-medium text-[#4A1525]/90 mt-1 tracking-wide">
              Minutes
            </span>
          </div>

          {/* Seconds */}
          <div className="bg-[#FAD4DF]/95 border border-white/60 rounded-[18px] py-3 px-1 flex flex-col items-center backdrop-blur-sm shadow-lg transform active:scale-95 transition">
            <span className="font-playfair text-[30px] sm:text-[32px] font-semibold text-[#4A1525] leading-none tracking-tight">
              {timeLeft.seconds}
            </span>
            <span className="font-sans-clean text-[11px] font-medium text-[#4A1525]/90 mt-1 tracking-wide">
              Seconds
            </span>
          </div>
        </section>

        {/* Wedding Date Display */}
        <div className="mt-3.5 tracking-[0.22em] text-[#FFFBF5] font-playfair text-[18px] font-normal flex items-center gap-2 text-glow-subtle">
          <span>12</span>
          <span className="text-xs text-[#FFD37A] opacity-90">•</span>
          <span className="tracking-[0.25em]">DEC</span>
          <span className="text-xs text-[#FFD37A] opacity-90">•</span>
          <span>2026</span>
        </div>
      </header>

      {/* Middle/Lower Section - Mandapam Floral Arch Message */}
      <article
        onClick={onNext}
        className="relative z-20 px-6 flex flex-col items-center text-center pb-12 cursor-pointer"
      >
        <div className="py-2 px-5 max-w-[320px] bg-black/35 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg">
          <blockquote className="font-playfair text-white tracking-wide">
            <p className="m-0 text-[20px] sm:text-[22px] leading-[1.38] font-medium text-[#FFF7E6] text-glow-subtle">
              Good things
            </p>
            <p className="m-0 text-[20px] sm:text-[22px] leading-[1.38] font-medium text-[#FFF7E6] text-glow-subtle">
              take time
            </p>
            <p className="mt-1 m-0 text-[20px] sm:text-[22px] leading-[1.38] font-medium text-[#FFF7E6] text-glow-subtle">
              But the best things
            </p>
            <p className="m-0 text-[20px] sm:text-[22px] leading-[1.38] font-medium text-[#FFF7E6] text-glow-subtle">
              are worth the wait
            </p>
          </blockquote>
          <div className="mt-2.5 flex justify-center items-center">
            <span className="text-[#E2587A] text-sm">♥</span>
          </div>
        </div>
      </article>
    </div>
  );
};
