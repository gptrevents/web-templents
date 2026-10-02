import React, { useState } from 'react';
import { ChevronUp, RotateCcw, ArrowRight, Heart } from 'lucide-react';
import { ScreenIndicator } from '../components/ScreenIndicator';
import { ScreenId } from '../types';

interface Screen1OpeningProps {
  onNext: () => void;
  onNavigate?: (id: ScreenId) => void;
  onOpenMenu?: () => void;
  isSinglePage?: boolean;
}

export const Screen1Opening: React.FC<Screen1OpeningProps> = ({
  onNext,
  onNavigate = () => {},
  onOpenMenu = () => {},
  isSinglePage = false,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [curtainsArrived, setCurtainsArrived] = useState(false);
  const [curtainsParted, setCurtainsParted] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  const startSequence = () => {
    if (isRevealing) return;
    setIsRevealing(true);
    setIsZoomed(true);

    // At 2.2s: Curtain appears in the zoomed archway
    setTimeout(() => {
      setCurtainsArrived(true);

      // At 2.5s: Curtains part grandly
      setTimeout(() => {
        setCurtainsParted(true);
      }, 350);
    }, 2200);
  };

  const resetSequence = () => {
    setCurtainsParted(false);
    setTimeout(() => {
      setCurtainsArrived(false);
      setIsZoomed(false);
      setTimeout(() => {
        setIsRevealing(false);
      }, 1200);
    }, 400);
  };

  return (
    <div className={`relative w-full ${isSinglePage ? 'min-h-[100vh] h-[100vh]' : 'h-full min-h-[100dvh] max-h-[932px]'} overflow-hidden flex flex-col justify-between bg-black text-white font-serif select-none`}>
      {/* Top Bar Navigation & Screen Progress (hidden in single-page mode) */}
      {!isSinglePage && (
        <div className="relative z-40 w-full pt-1">
          <ScreenIndicator
            activeScreen={1}
            onNavigate={onNavigate}
            onOpenMenu={onOpenMenu}
            darkMode={true}
          />
        </div>
      )}

      {/* BEGIN: Zooming Cinematic Wrapper (Mandapam Arch + Glowing Lanterns) */}
      <div
        className={`cinematic-scene absolute inset-0 w-full h-full z-0 transition-transform duration-[2500ms] ${
          isZoomed ? 'scale-[1.85] translate-y-[4.5%]' : 'scale-100 translate-y-0'
        }`}
        style={{
          transformOrigin: '50% 42%',
          willChange: 'transform',
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Mandapam Photo Layer */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Romantic floral arch walkway with lanterns"
            className="w-full h-full object-cover object-center pointer-events-none"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAncKICX3KVIDQ7gxHh7AAxvE0G8svBnxwA3cCYKFBxZJ-L30P7Q07oAGDE2L5xvdQ2Qv8dw_RhCwk0lvWBsRGHZDBhql8-4rk-OzyQu6H748mFZWA5aZRNk4tsZyGgwExVCFfCvID1tQ0pZ4c_VE1D1TtI1ISeJ4WnnvIOSowKVqTrQTsxnXNpoV-yFRhGBp26AGLHvJZZpR8Zwwasn-koq54wh6M5ry82onTZGhHd9LiNL6kV-pr3kOlDUkSXyFsRMQ"
          />
          <div className="absolute inset-0 arch-ambient-light pointer-events-none" />
          <div
            className={`absolute inset-0 sanctum-glow pointer-events-none transition-opacity duration-[1800ms] ${
              isZoomed ? 'opacity-95' : 'opacity-0'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
        </div>

        {/* 9 Glowing Lanterns & Candles Layer */}
        <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
          {/* Top Hanging Lantern - Left */}
          <div className="absolute top-[27.8%] left-[4.8%] -translate-x-1/2 -translate-y-1/2">
            <div className="ambient-halo w-16 h-16 rounded-full absolute -top-4 -left-4 flame-glow-2" />
            <div className="lantern-light flame-glow-1 w-6 h-8 rounded-full blur-[1.5px]" />
          </div>

          {/* Top Hanging Lantern - Right */}
          <div className="absolute top-[28.5%] right-[4.5%] translate-x-1/2 -translate-y-1/2">
            <div className="ambient-halo w-16 h-16 rounded-full absolute -top-4 -right-4 flame-glow-1" />
            <div className="lantern-light flame-glow-2 w-6 h-8 rounded-full blur-[1.5px]" />
          </div>

          {/* Mid Pillar Lantern - Left */}
          <div className="absolute top-[46.2%] left-[7%] -translate-x-1/2 -translate-y-1/2">
            <div className="ambient-halo w-14 h-14 rounded-full absolute -top-3 -left-3 flame-glow-3" />
            <div className="lantern-light flame-glow-2 w-5 h-7 rounded-full blur-[1px]" />
          </div>

          {/* Mid Pillar Lantern - Right */}
          <div className="absolute top-[46.2%] right-[7%] translate-x-1/2 -translate-y-1/2">
            <div className="ambient-halo w-14 h-14 rounded-full absolute -top-3 -right-3 flame-glow-1" />
            <div className="lantern-light flame-glow-3 w-5 h-7 rounded-full blur-[1px]" />
          </div>

          {/* Bottom Lanterns on Steps - Left Large */}
          <div className="absolute top-[69.5%] left-[5.5%] -translate-x-1/2 -translate-y-1/2">
            <div className="ambient-halo w-16 h-20 rounded-full absolute -top-4 -left-4 flame-glow-1" />
            <div className="lantern-light flame-glow-3 w-6 h-10 rounded-full blur-[1.5px]" />
          </div>

          {/* Step Candle - Left */}
          <div className="absolute top-[73.6%] left-[14.2%] -translate-x-1/2 -translate-y-1/2">
            <div className="ambient-halo w-8 h-8 rounded-full absolute -top-2 -left-2 flame-glow-2" />
            <div className="lantern-light flame-glow-1 w-3.5 h-5 rounded-full blur-[0.8px]" />
          </div>

          {/* Bottom Lantern on Steps - Right */}
          <div className="absolute top-[70.8%] right-[5.2%] translate-x-1/2 -translate-y-1/2">
            <div className="ambient-halo w-16 h-20 rounded-full absolute -top-4 -right-4 flame-glow-2" />
            <div className="lantern-light flame-glow-1 w-6 h-10 rounded-full blur-[1.5px]" />
          </div>

          {/* Step Lantern - Right Floor Level */}
          <div className="absolute top-[80.5%] right-[14.8%] translate-x-1/2 -translate-y-1/2">
            <div className="ambient-halo w-14 h-14 rounded-full absolute -top-3 -right-3 flame-glow-3" />
            <div className="lantern-light flame-glow-2 w-5 h-8 rounded-full blur-[1px]" />
          </div>

          {/* Floor Diya - Left Foreground */}
          <div className="absolute top-[82.8%] left-[20%] -translate-x-1/2 -translate-y-1/2">
            <div className="ambient-halo w-10 h-10 rounded-full absolute -top-2 -left-2 flame-glow-1" />
            <div className="lantern-light flame-glow-3 w-3 h-4 rounded-full blur-[1px]" />
          </div>
        </div>
      </div>
      {/* END: Zooming Cinematic Wrapper */}

      {/* BEGIN: Inner Sanctum Divine Blessing (Revealed when curtains part) */}
      <div
        className={`absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center text-center px-6 transition-all duration-[1300ms] ${
          curtainsParted
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-90 translate-y-4'
        }`}
      >
        <div className="max-w-xs flex flex-col items-center bg-black/40 p-5 rounded-3xl border border-[#ECC98F]/40 backdrop-blur-md shadow-2xl">
          <div className="px-3 py-1 rounded-full border border-[#ECC98F]/70 bg-black/60 shadow-[0_0_24px_rgba(236,201,143,0.55)] mb-2.5">
            <span className="font-cinzel text-[11px] tracking-[0.3em] text-[#ECC98F] uppercase font-semibold">
              ॥ शुभमस्तु ॥
            </span>
          </div>

          <span className="font-cinzel text-[11px] tracking-[0.35em] text-[#ECC98F] uppercase text-glow-subtle font-semibold">
            Together With Their Families
          </span>

          <h2 className="font-cormorant text-[42px] text-white font-normal mt-1 leading-tight text-glow-grand">
            Arjun &amp; Priya
          </h2>

          <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-[#E5C158] to-transparent my-2.5" />

          <p className="font-cormorant text-[19px] text-[#FFF7E6] tracking-wide text-glow-subtle font-normal">
            Welcome to our Celebration
          </p>

          <p className="font-cormorant italic text-[#FFF7E6]/90 text-[14px] leading-relaxed text-glow-subtle mt-1 max-w-[260px]">
            Request the pleasure of your company as they embark on this sacred journey of love and togetherness.
          </p>

          <div className="mt-3 px-4 py-1.5 rounded-full bg-black/60 border border-[#ECC98F]/60 backdrop-blur-md shadow-[0_0_16px_rgba(236,201,143,0.3)]">
            <span className="font-cinzel text-[12px] tracking-[0.22em] text-[#FDE4B7] font-medium">
              DECEMBER 12, 2026
            </span>
          </div>

          {/* Action to proceed to Screen 2 */}
          <button
            onClick={onNext}
            className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D82B61] to-[#991B3B] text-white font-cinzel text-xs tracking-widest font-semibold flex items-center space-x-2 shadow-[0_0_20px_rgba(216,43,97,0.6)] active:scale-95 transition cursor-pointer"
          >
            <span>VIEW INVITATION</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      {/* END: Inner Sanctum Divine Blessing */}

      {/* BEGIN: Realistic Silk & Velvet Curtains (Arrives at end of zoom, then parts) */}
      <div
        className={`curtains-container absolute inset-0 z-30 pointer-events-none overflow-hidden transition-opacity duration-500 ${
          curtainsArrived ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Left Drape */}
        <div
          className={`realistic-curtain-left absolute top-0 bottom-0 left-0 w-[53%] z-10 flex flex-col justify-between transition-transform duration-[1800ms] ${
            curtainsParted ? '-translate-x-[104%] -skew-y-2 scale-x-[0.7]' : 'translate-x-0'
          }`}
          style={{
            transformOrigin: 'left center',
            transitionTimingFunction: 'cubic-bezier(0.4, 0.05, 0.2, 1)',
          }}
        >
          {/* Valance Fringe */}
          <div className="w-full h-11 border-b border-[#ECC98F]/50 bg-gradient-to-b from-[#1a0104] to-transparent flex items-center px-3 space-x-1">
            <div className="h-[1.5px] flex-1 bg-gradient-to-r from-[#C59B27] via-[#FFF7E6] to-[#C59B27]" />
            <div className="w-2.5 h-2.5 rotate-45 bg-[#E5C158] shadow-[0_0_8px_#ECC98F]" />
          </div>

          {/* Gold Brocade Ribbon Trim */}
          <div className="absolute right-0 top-0 bottom-0 w-[7px] gold-embroidery-strip flex flex-col justify-around py-4 items-center" />

          {/* Hanging Golden Tassel */}
          <div className="absolute right-2 top-[50%] -translate-y-1/2 flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#8C651A] via-[#FDE4B7] to-[#8C651A] shadow-md border border-[#FFE4B5]" />
            <div className="w-[2px] h-14 bg-gradient-to-b from-[#FDE4B7] via-[#C59B27] to-[#8C651A]" />
            <div className="w-5 h-8 bg-gradient-to-b from-[#E7C282] via-[#C59B27] to-[#5a3a0a] rounded-b-lg shadow-lg" />
          </div>
        </div>

        {/* Right Drape */}
        <div
          className={`realistic-curtain-right absolute top-0 bottom-0 right-0 w-[53%] z-10 flex flex-col justify-between transition-transform duration-[1800ms] ${
            curtainsParted ? 'translate-x-[104%] skew-y-2 scale-x-[0.7]' : 'translate-x-0'
          }`}
          style={{
            transformOrigin: 'right center',
            transitionTimingFunction: 'cubic-bezier(0.4, 0.05, 0.2, 1)',
          }}
        >
          {/* Valance Fringe */}
          <div className="w-full h-11 border-b border-[#ECC98F]/50 bg-gradient-to-b from-[#1a0104] to-transparent flex items-center justify-end px-3 space-x-1">
            <div className="w-2.5 h-2.5 rotate-45 bg-[#E5C158] shadow-[0_0_8px_#ECC98F]" />
            <div className="h-[1.5px] flex-1 bg-gradient-to-r from-[#C59B27] via-[#FFF7E6] to-[#C59B27]" />
          </div>

          {/* Gold Brocade Ribbon Trim */}
          <div className="absolute left-0 top-0 bottom-0 w-[7px] gold-embroidery-strip flex flex-col justify-around py-4 items-center" />

          {/* Hanging Golden Tassel */}
          <div className="absolute left-2 top-[50%] -translate-y-1/2 flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#8C651A] via-[#FDE4B7] to-[#8C651A] shadow-md border border-[#FFE4B5]" />
            <div className="w-[2px] h-14 bg-gradient-to-b from-[#FDE4B7] via-[#C59B27] to-[#8C651A]" />
            <div className="w-5 h-8 bg-gradient-to-b from-[#E7C282] via-[#C59B27] to-[#5a3a0a] rounded-b-lg shadow-lg" />
          </div>
        </div>

        {/* Center Joint Medallion */}
        <div
          className={`absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 pointer-events-none ${
            curtainsParted ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFF7E6] via-[#D4AF37] to-[#8C651A] border border-[#FFF7E6] shadow-[0_0_15px_rgba(212,175,55,0.85)] flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3A000A]" />
          </div>
        </div>
      </div>
      {/* END: Realistic Silk Curtains */}

      {/* Floating Rose Petals */}
      <div aria-hidden="true" className="absolute inset-0 z-35 pointer-events-none overflow-hidden">
        <div className="animate-petal-1 absolute top-0 left-[16%] w-4 h-5 bg-gradient-to-br from-rose-200/90 via-rose-300/80 to-pink-400/70 rounded-full blur-[0.4px]" />
        <div className="animate-petal-2 absolute top-0 right-[22%] w-4 h-5.5 bg-gradient-to-bl from-pink-100/95 via-pink-200/85 to-rose-300/80 rounded-full blur-[0.3px]" />
        <div className="animate-petal-3 absolute top-0 left-[38%] w-3.5 h-4.5 bg-gradient-to-tr from-rose-300/85 via-pink-200/80 to-rose-100/90 rounded-full blur-[0.5px]" />
        <div className="animate-petal-4 absolute top-0 right-[15%] w-4.5 h-5 bg-gradient-to-b from-rose-200/85 via-pink-300/75 to-rose-400/65 rounded-full blur-[0.3px]" />
      </div>

      {/* BEGIN: Initial Invitation Typography (Fades out when user zooms) */}
      <section
        className={`relative z-20 w-full flex-1 flex flex-col items-center justify-center text-center px-4 -mt-4 transition-all duration-500 ${
          isZoomed
            ? 'opacity-0 -translate-y-6 scale-95 pointer-events-none'
            : 'opacity-100 translate-y-0 scale-100'
        }`}
      >
        <h2 className="font-cinzel text-[13px] sm:text-[14px] font-semibold tracking-[0.36em] text-[#FFF7E6] text-glow-subtle uppercase">
          YOU ARE INVITED
        </h2>

        {/* Gold Heart Divider */}
        <div className="flex items-center justify-center w-40 sm:w-48 my-2.5 opacity-90">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#ECC98F] to-[#ECC98F]" />
          <span className="px-2.5 text-[#ECC98F] text-[11px] drop-shadow-[0_0_6px_rgba(236,201,143,0.8)]">
            ♥
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#ECC98F] to-[#ECC98F]" />
        </div>

        {/* Couple Names */}
        <div className="flex flex-col items-center my-0.5">
          <h1 className="font-cormorant text-[48px] sm:text-[54px] font-normal leading-[1.05] tracking-wide text-[#FFFDF8] text-glow-grand">
            Arjun
          </h1>
          <span className="font-cormorant italic text-[36px] sm:text-[40px] leading-[0.85] text-[#F3DCB3] -my-1 text-glow-subtle font-light">
            &amp;
          </span>
          <h1 className="font-cormorant text-[48px] sm:text-[54px] font-normal leading-[1.05] tracking-wide text-[#FFFDF8] text-glow-grand">
            Priya
          </h1>
        </div>

        {/* Date */}
        <div className="mt-4 sm:mt-5 font-cormorant text-[18px] sm:text-[19px] tracking-[0.24em] text-[#FFFDF8] text-glow-subtle font-normal">
          <span>12</span>
          <span className="mx-2 text-[12px] text-[#ECC98F] align-middle">•</span>
          <span>DEC</span>
          <span className="mx-2 text-[12px] text-[#ECC98F] align-middle">•</span>
          <span>2026</span>
        </div>

        <p className="mt-2.5 font-cormorant italic text-[16px] sm:text-[17px] tracking-wider text-[#F7EDE0] text-glow-subtle font-normal">
          A new chapter begins...
        </p>
      </section>

      {/* BEGIN: Bottom CTA (Tap to Open) */}
      <footer
        className={`relative z-20 w-full flex flex-col items-center pb-8 pt-1 transition-all duration-500 ${
          isZoomed
            ? 'opacity-0 translate-y-6 pointer-events-none'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <button
          onClick={startSequence}
          aria-label="Tap to Open Invitation"
          className="glow-circle-btn pulse-glow w-[78px] h-[78px] rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-200 outline-none group"
        >
          <ChevronUp className="w-7 h-7 text-white/95 stroke-[2.2] animate-bounce -mt-0.5 group-hover:scale-110 transition-transform" />
        </button>

        <span className="mt-2.5 text-[15px] font-cormorant tracking-wider text-[#FFFDF8] text-glow-subtle">
          Tap to Open
        </span>

        <div className="flex items-center justify-center w-24 mt-1.5 opacity-85">
          <div className="h-[0.75px] flex-1 bg-gradient-to-r from-transparent via-[#E8C68A] to-[#E8C68A]" />
          <span className="px-1.5 text-[#E8C68A] text-[9px]">♥</span>
          <div className="h-[0.75px] flex-1 bg-gradient-to-l from-transparent via-[#E8C68A] to-[#E8C68A]" />
        </div>
      </footer>

      {/* Replay Scene Button (Appears when curtains parted) */}
      {curtainsParted && (
        <div className="absolute bottom-6 left-0 right-0 z-40 flex flex-col items-center justify-center animate-fadeIn">
          <div className="flex items-center space-x-3">
            <button
              onClick={resetSequence}
              aria-label="Replay invitation reveal"
              className="px-5 py-2 rounded-full bg-black/70 backdrop-blur-md border border-[#ECC98F]/70 text-[11px] font-cinzel tracking-[0.2em] text-[#FFF7E6] hover:bg-black/90 active:scale-95 transition shadow-lg flex items-center space-x-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>REPLAY</span>
            </button>

            <button
              onClick={onNext}
              className="px-5 py-2 rounded-full bg-[#D82B61] text-[11px] font-cinzel tracking-[0.2em] text-white hover:bg-[#C21E51] active:scale-95 transition shadow-lg flex items-center space-x-2 cursor-pointer font-semibold"
            >
              <span>CONTINUE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
