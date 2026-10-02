import React, { useState } from 'react';
import { Calendar, Navigation, Share2, Check, RotateCcw } from 'lucide-react';
import { ScreenIndicator } from '../components/ScreenIndicator';
import { ScreenId } from '../types';
import { WEDDING_COUPLE } from '../data/weddingData';
import { downloadIcsFile, getGoogleCalendarUrl } from '../utils/calendar';

interface Screen10ThankYouProps {
  onRestart: () => void;
  onNavigate?: (id: ScreenId) => void;
  onOpenMenu?: () => void;
  isSinglePage?: boolean;
}

export const Screen10ThankYou: React.FC<Screen10ThankYouProps> = ({
  onRestart,
  onNavigate = () => {},
  onOpenMenu = () => {},
  isSinglePage = false,
}) => {
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const [calFeedback, setCalFeedback] = useState(false);

  const handleCalendar = () => {
    // Download ics file and also provide Google Calendar option
    downloadIcsFile();
    setCalFeedback(true);
    setTimeout(() => setCalFeedback(false), 2500);

    // Open Google Calendar in new tab as well
    const gCal = getGoogleCalendarUrl();
    window.open(gCal, '_blank', 'noopener,noreferrer');
  };

  const handleDirections = () => {
    const query = encodeURIComponent(WEDDING_COUPLE.mapsQuery);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Arjun & Priya - Wedding Invitation',
      text: 'You are cordially invited to celebrate the wedding of Arjun & Priya on 12 Dec 2026 in Vijayawada! ✨',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareFeedback('Shared!');
      } catch {
        // user closed share sheet
      }
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setShareFeedback('Link Copied!');
    }

    setTimeout(() => setShareFeedback(null), 2500);
  };

  return (
    <div className={`relative w-full ${isSinglePage ? 'min-h-[100vh] py-12' : 'h-full min-h-[100dvh] max-h-[932px] overflow-y-auto'} flex flex-col justify-between select-none shadow-2xl bg-[#0c0806] text-white`}>
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          alt="Arjun and Priya wedding couple"
          className="w-full h-full object-cover object-top"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGZenoxLnRLR2CII-yNsx0gDO9D9gd4L0wHXfAk4Uu2Sh2AtCj_NTQm9fh6DACsMy9LTeUedvm6ht1Ovco146oU-LDKVi77XXtnX-X25lfme-UiVoIeJFtG3h5LczhFV-8fJxMXU22Rzl1T63GvcM-lPQlLHq3nA5EVwhj8WeGM7Sn8jWddm5gBoMVCsgD9HZdGSFYybQR9X-KKXejA2RLJkTY0wPItaVthbJ7XOG4p492mf5CAIP_"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 via-45% to-black/95 pointer-events-none" />
      </div>

      {/* Top Bar Navigation (hidden in single page mode) */}
      {!isSinglePage && (
        <div className="relative z-40 w-full pt-1">
          <ScreenIndicator
            activeScreen={10}
            onNavigate={onNavigate}
            onOpenMenu={onOpenMenu}
            darkMode={true}
          />
        </div>
      )}

      {/* Spacer for photo face visibility */}
      <div aria-hidden="true" className="flex-grow min-h-[140px]" />

      {/* Content and Actions Section */}
      <section className="relative z-20 w-full px-6 flex flex-col items-center text-center mt-auto">
        <div className="space-y-1.5 mb-5">
          <h1 className="font-cormorant text-[42px] sm:text-[46px] leading-tight font-normal text-white tracking-normal drop-shadow-md">
            Thank You
          </h1>
          <p className="font-cormorant text-[19px] sm:text-[20px] text-gray-100 font-normal tracking-wide flex items-center justify-center gap-1.5 drop-shadow-md">
            <span>for being a part of our journey.</span>
            <span className="text-pink-400 inline-block text-[18px]">💖</span>
          </p>
          <p className="font-cormorant text-[18px] sm:text-[19px] text-gray-200 font-normal pt-0.5 drop-shadow-md">
            See you on our special day!
          </p>
        </div>

        {/* Action Buttons Stack */}
        <div className="w-full space-y-3 max-w-[340px]">
          {/* Add to Calendar */}
          <button
            onClick={handleCalendar}
            className="w-full h-[50px] rounded-2xl flex items-center justify-center gap-3 px-6 group cursor-pointer transition-all active:scale-[0.98] border border-pink-400/50 bg-[#160E0F]/80 backdrop-blur-md shadow-lg hover:border-pink-400 hover:bg-[#2D141C]"
          >
            <Calendar className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
            <span className="font-cormorant text-[19px] tracking-wide text-white font-medium">
              {calFeedback ? 'Saved to Calendar ✓' : 'Add to Calendar'}
            </span>
          </button>

          {/* Get Directions */}
          <button
            onClick={handleDirections}
            className="w-full h-[50px] rounded-2xl flex items-center justify-center gap-3 px-6 group cursor-pointer transition-all active:scale-[0.98] border border-pink-400/50 bg-[#160E0F]/80 backdrop-blur-md shadow-lg hover:border-pink-400 hover:bg-[#2D141C]"
          >
            <Navigation className="w-5 h-5 fill-pink-400 text-pink-400 group-hover:scale-110 transition-transform" />
            <span className="font-cormorant text-[19px] tracking-wide text-white font-medium">
              Get Directions
            </span>
          </button>

          {/* Share Invitation */}
          <button
            onClick={handleShare}
            className="w-full h-[50px] rounded-2xl flex items-center justify-center gap-3 px-6 group cursor-pointer transition-all active:scale-[0.98] border border-pink-400/50 bg-[#160E0F]/80 backdrop-blur-md shadow-lg hover:border-pink-400 hover:bg-[#2D141C]"
          >
            {shareFeedback ? (
              <Check className="w-5 h-5 text-emerald-400" />
            ) : (
              <Share2 className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
            )}
            <span className="font-cormorant text-[19px] tracking-wide text-white font-medium">
              {shareFeedback || 'Share Invitation'}
            </span>
          </button>
        </div>
      </section>

      {/* Signature Footer */}
      <footer className="relative z-20 w-full pt-5 pb-7 flex flex-col items-center justify-center">
        {/* Floral Corner Bottom Left */}
        <div className="absolute bottom-0 left-0 w-[140px] pointer-events-none z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6meN_0-Zi8_nlyrl_plFY6aV0rGYDxdADPLeFMc8b8QaP8Zry8j7Y16g-UDNJ7ZqCl4euPTZmHcXX3KkfojPweVgdufduMqjzRGaFigNgJJlEKvQvDMpRyqEnjUsMrXwLsRuHAr3kSB-q-fYoSQUIZHPama8i2NIk5th2HZEn22znfv57-p4N54UmdTnESlRVGVHLNX1hOo9aMHbqgJwOeHSimvKPWbz_vbhdNkM8yhJJLuSRAUYsAQzdM-grjbYJmA"
            alt="Floral decoration"
            className="w-full h-auto object-contain opacity-95"
          />
        </div>

        {/* Floral Corner Bottom Right */}
        <div className="absolute bottom-0 right-0 w-[140px] pointer-events-none z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPV5m9qPqWeO_VQJFQmL_iMhKN_Wt4JhsozgFvEb4moT1Nvtbgk0Cup3uHT-0POAIo1Y5g7Wr0zmAG4A0Y4Yq6ztjrsTahMILfTPTgwMSFMdlPxdb00q4Z1_FYi5BiRKQZP6IytDMJjIXCtAuD3b7J-rBLMT9bcIsQiYTMzsHQSGzUQmo-valuYsB2weML5Fp3BCxM6dPa837GMQF7G6ZUc1TA2L7L5AeshauYjUBm-c9VcgnBT2vsRetiTHovFhHrjQ"
            alt="Floral decoration"
            className="w-full h-auto object-contain opacity-95"
          />
        </div>

        <p className="font-cormorant text-gray-300 text-[17px] tracking-wider mb-0.5 relative z-10">
          With love,
        </p>

        <h2 className="font-script text-[46px] sm:text-[48px] text-[#fce7f3] tracking-wide leading-none mt-1 drop-shadow-[0_2px_10px_rgba(244,114,182,0.4)] relative z-10">
          Arjun &amp; Priya
        </h2>

        <div className="mt-2.5 flex items-center justify-center space-x-3 relative z-10">
          <button
            onClick={onRestart}
            className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-cinzel tracking-wider text-pink-200 flex items-center space-x-1.5 cursor-pointer active:scale-95 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>START OVER</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
