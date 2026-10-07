import React, { useRef, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { Sparkles, Music, Heart } from 'lucide-react';

interface KmEntryProps {
  isOpen: boolean;
  onOpen: () => void;
  groomName?: string;
  brideName?: string;
  weddingDate?: string;
  city?: string;
  guestName?: string;
  lang?: 'te' | 'en';
}

interface Petal {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: number;
  rotation: number;
  color: string;
}

export const KmEntry: React.FC<KmEntryProps> = ({
  isOpen,
  onOpen,
  groomName = 'విజయ్ (Vijay)',
  brideName = 'రష్మిక (Rashmika)',
  weddingDate = '23 APRIL 2026',
  city = 'హైదరాబాద్ (HYDERABAD)',
  guestName,
  lang = 'te',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  // Clean names formatter
  const cleanBride = brideName.replace(/\s*\(.*?\)\s*/g, '').trim();
  const cleanBrideEn = brideName.match(/\((.*?)\)/)?.[1] || '';
  const cleanGroom = groomName.replace(/\s*\(.*?\)\s*/g, '').trim();
  const cleanGroomEn = groomName.match(/\((.*?)\)/)?.[1] || '';

  // 🌸 7 Lightweight falling petals (Rose and Marigold petals)
  const petals: Petal[] = useMemo(
    () => [
      { id: 1, left: '12%', delay: '0s', duration: '7.5s', size: 18, rotation: 25, color: '#FF3366' },
      { id: 2, left: '28%', delay: '1.8s', duration: '9s', size: 14, rotation: -35, color: '#FFA500' },
      { id: 3, left: '46%', delay: '3.2s', duration: '8s', size: 16, rotation: 45, color: '#E60039' },
      { id: 4, left: '64%', delay: '0.8s', duration: '10s', size: 20, rotation: -20, color: '#FFB800' },
      { id: 5, left: '78%', delay: '2.5s', duration: '8.5s', size: 15, rotation: 60, color: '#FF1493' },
      { id: 6, left: '88%', delay: '4.2s', duration: '9.2s', size: 17, rotation: -40, color: '#FFA500' },
      { id: 7, left: '38%', delay: '5.5s', duration: '8.8s', size: 16, rotation: 15, color: '#DC143C' },
    ],
    []
  );

  // 🚪 Golden Door / Curtain Opening Transition
  const handleOpen = useCallback(() => {
    if (isClosingRef.current || isOpen) return;
    isClosingRef.current = true;
    setIsClosing(true);

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        onOpen();
      },
    });

    // 1. Button click compression & golden flash
    tl.to('.km-open-btn', { scale: 0.94, opacity: 0.8, duration: 0.15, ease: 'power2.in' })
      .to('.km-door-flash', { opacity: 1, duration: 0.45, ease: 'power2.out' }, '-=0.05')
      // 2. Invitation card dissolves with subtle upward float
      .to('.km-invitation-card', { y: -30, opacity: 0, scale: 0.96, duration: 0.5, ease: 'power2.in' }, '-=0.35')
      // 3. Royal temple doors part left and right
      .to('.km-door-left', { xPercent: -100, duration: 0.95, ease: 'power3.inOut' }, '-=0.2')
      .to('.km-door-right', { xPercent: 100, duration: 0.95, ease: 'power3.inOut' }, '<')
      // 4. Background golden glow bloom expands
      .to('.km-opening-bloom', { opacity: 0, scale: 1.6, duration: 0.6, ease: 'power1.out' }, '-=0.4')
      .to('.km-entry-container', { opacity: 0, duration: 0.4 }, '-=0.3');
  }, [isOpen, onOpen]);

  if (isOpen) return null;

  const displayGuest =
    guestName && guestName.trim().length > 0 && guestName !== 'బంధుమిత్రులు (Guest)'
      ? guestName
      : 'ఆత్మీయులైన బంధుమిత్రులకు';

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden select-none km-entry-container ${
        isClosing ? 'pointer-events-none' : ''
      }`}
      ref={containerRef}
      role="dialog"
      aria-label="Royal Kalyana Mandapam Invitation Opening Stage"
    >
      <style>{`
        /* 🪔 Realistic Diya Flame Flickering Animation */
        @keyframes flameFlicker {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.95;
            filter: drop-shadow(0 0 14px rgba(255, 170, 0, 0.85));
          }
          20% {
            transform: scale(1.06, 0.96) rotate(-1.5deg);
            opacity: 0.88;
            filter: drop-shadow(0 0 18px rgba(255, 140, 0, 0.95));
          }
          40% {
            transform: scale(0.96, 1.04) rotate(1deg);
            opacity: 0.92;
            filter: drop-shadow(0 0 12px rgba(255, 200, 0, 0.8));
          }
          60% {
            transform: scale(1.04, 0.98) rotate(-0.8deg);
            opacity: 1;
            filter: drop-shadow(0 0 22px rgba(255, 160, 0, 1));
          }
          80% {
            transform: scale(0.98, 1.02) rotate(1.2deg);
            opacity: 0.86;
            filter: drop-shadow(0 0 15px rgba(255, 130, 0, 0.9));
          }
        }

        .animate-flame {
          animation: flameFlicker 1.8s ease-in-out infinite alternate;
          transform-origin: 50% 90%;
        }

        /* 🌸 Floating Rose/Marigold Petals Animation */
        @keyframes petalFall {
          0% {
            transform: translateY(-80px) rotate(0deg) scale(0.85);
            opacity: 0;
          }
          15% {
            opacity: 0.9;
          }
          50% {
            transform: translateY(50vh) translateX(25px) rotate(180deg) scale(1);
          }
          85% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(105vh) translateX(-20px) rotate(360deg) scale(0.9);
            opacity: 0;
          }
        }

        /* ✨ Golden Shimmer Sweep on CTA Button */
        @keyframes shimmerSweep {
          0% {
            transform: translateX(-150%) skewX(-25deg);
          }
          50%, 100% {
            transform: translateX(250%) skewX(-25deg);
          }
        }

        .btn-shimmer {
          animation: shimmerSweep 3.2s infinite ease-in-out;
        }

        /* Subtle Background Breathing Scale (Storyboard Step 1) */
        @keyframes bgBreathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.035);
          }
        }

        .animate-bg-breathe {
          animation: bgBreathe 12s ease-in-out infinite alternate;
        }
      `}</style>

      {/* 1. Base Grand Royal Temple Canvas */}
      <div className="absolute inset-0 bg-[#160408] overflow-hidden">
        <img
          src="/assets/temple-gold/background.jpg"
          alt="Royal Kalyana Mandapam Temple Background"
          className="absolute inset-0 w-full h-full object-cover object-center animate-bg-breathe opacity-90"
        />

        {/* Ambient Warm Golden Sunlight Gradient Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#2B0E14]/40 to-[#120206]/85 pointer-events-none" />
      </div>

      {/* 2. 🌸 7 Lightweight Floating Flower Petals Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20" aria-hidden="true">
        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: '-50px',
              width: `${p.size}px`,
              height: `${p.size * 1.3}px`,
              backgroundColor: p.color,
              borderRadius: '70% 20% 70% 20%',
              boxShadow: `0 0 10px ${p.color}88`,
              animation: `petalFall ${p.duration} linear infinite ${p.delay}`,
            }}
          />
        ))}
      </div>

      {/* 3. 🪔 Deepam Flames (Left & Right Diya Lamps) */}
      {/* Left Diya Flame */}
      <div
        className="absolute left-[3%] sm:left-[8%] md:left-[12%] bottom-[12%] sm:bottom-[15%] w-10 sm:w-14 h-16 sm:h-22 z-30 pointer-events-none"
        aria-hidden="true"
      >
        <div className="relative w-full h-full animate-flame">
          <img src="/assets/temple-gold/flame.svg" alt="" className="w-full h-full object-contain" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-amber-400/30 blur-md rounded-full" />
        </div>
      </div>

      {/* Right Diya Flame */}
      <div
        className="absolute right-[3%] sm:right-[8%] md:right-[12%] bottom-[12%] sm:bottom-[15%] w-10 sm:w-14 h-16 sm:h-22 z-30 pointer-events-none"
        aria-hidden="true"
      >
        <div className="relative w-full h-full animate-flame" style={{ animationDelay: '0.4s' }}>
          <img src="/assets/temple-gold/flame.svg" alt="" className="w-full h-full object-contain" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-amber-400/30 blur-md rounded-full" />
        </div>
      </div>

      {/* 4. 🚪 Sliding Royal Temple Doors (Left & Right Door Panels for Grand Opening) */}
      <div
        className="km-door-left absolute top-0 left-0 w-1/2 h-full z-15 pointer-events-none bg-gradient-to-r from-black/50 to-transparent"
        aria-hidden="true"
      />
      <div
        className="km-door-right absolute top-0 right-0 w-1/2 h-full z-15 pointer-events-none bg-gradient-to-l from-black/50 to-transparent"
        aria-hidden="true"
      />

      {/* 5. Golden Flash Burst Transition Layer */}
      <div
        className="km-door-flash absolute inset-0 bg-[#FFF5D6] opacity-0 pointer-events-none z-45 transition-opacity"
        aria-hidden="true"
      />

      {/* 6. Central Bloom Radial Glow */}
      <div
        className="km-opening-bloom absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-radial from-[#FFDF80]/30 via-[#D4A843]/15 to-transparent rounded-full blur-2xl pointer-events-none z-20"
        aria-hidden="true"
      />

      {/* 7. 📜 Central Royal Patrika Card (Ivory Silk & Gold Ornamental Border) */}
      <div className="relative z-30 w-full h-full flex items-center justify-center p-4 sm:p-6">
        <div className="km-invitation-card relative w-full max-w-[420px] bg-gradient-to-b from-[#FFFDF7] via-[#FFF8E8] to-[#FDF2D4] rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] border-2 border-[#D4A843]/70 text-center flex flex-col items-center justify-between backdrop-blur-xs">
          
          {/* Ornate Gold Border Corners */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#B8860B] rounded-tl-md pointer-events-none" />
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#B8860B] rounded-tr-md pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#B8860B] rounded-bl-md pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#B8860B] rounded-br-md pointer-events-none" />

          {/* Top Invocations */}
          <div className="flex flex-col items-center gap-1.5 mb-2">
            <span className="text-[#8B1A1A] text-[11px] sm:text-xs font-serif font-bold tracking-[0.2em] uppercase drop-shadow-2xs">
              || శ్రీరస్తు • శుభమస్తు • అవిఘ్నమస్తు ||
            </span>

            {/* VIP Guest Badge */}
            <div className="mt-1 px-4 py-1 rounded-full bg-[#FFF3D1] border border-[#D4A843] shadow-2xs inline-flex items-center gap-1.5 max-w-[92%]">
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
              <span className="text-[#6A1224] text-[11px] sm:text-xs font-serif font-semibold tracking-normal truncate">
                ఆహ్వానం: <strong className="text-[#8B1A1A] font-bold">{displayGuest}</strong>
              </span>
            </div>
          </div>

          {/* Heading */}
          <p className="text-[#692900] text-[11px] sm:text-xs font-serif tracking-widest uppercase my-1 font-semibold opacity-90">
            కళ్యాణ మహోత్సవ శుభ ఆహ్వాన పత్రిక
          </p>

          {/* Couple Names (Grand Royal Presentation) */}
          <div className="flex flex-col items-center my-2 gap-1">
            {/* Bride */}
            <div className="flex items-baseline gap-1.5">
              <span className="text-[#8B1A1A] font-serif text-xs opacity-75">చి.ల.సౌ.</span>
              <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#6A1024] drop-shadow-xs tracking-tight">
                {cleanBride}
              </h1>
              {cleanBrideEn && (
                <span className="text-[#8B5A2B] font-serif italic text-xs sm:text-sm">
                  ({cleanBrideEn})
                </span>
              )}
            </div>

            {/* Royal Kalash Motif & Weds */}
            <div className="flex items-center gap-2 my-1 opacity-85">
              <div className="w-10 h-[1.5px] bg-gradient-to-r from-transparent via-[#B8860B] to-[#D4A843]" />
              <div className="flex items-center gap-1 text-[#B8860B] text-xs font-serif font-bold">
                <Heart className="w-3 h-3 fill-[#B8860B] text-[#B8860B]" />
                <span>మరియు (Weds)</span>
                <Heart className="w-3 h-3 fill-[#B8860B] text-[#B8860B]" />
              </div>
              <div className="w-10 h-[1.5px] bg-gradient-to-l from-transparent via-[#B8860B] to-[#D4A843]" />
            </div>

            {/* Groom */}
            <div className="flex items-baseline gap-1.5">
              <span className="text-[#8B1A1A] font-serif text-xs opacity-75">చి.</span>
              <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#6A1024] drop-shadow-xs tracking-tight">
                {cleanGroom}
              </h1>
              {cleanGroomEn && (
                <span className="text-[#8B5A2B] font-serif italic text-xs sm:text-sm">
                  ({cleanGroomEn})
                </span>
              )}
            </div>
          </div>

          {/* Wedding Date & City */}
          <div className="flex flex-col items-center gap-1 my-2">
            <span className="text-[#8B1A1A] font-serif font-bold text-sm sm:text-base tracking-wider">
              {weddingDate}
            </span>
            <span className="text-[#5A3B18] font-serif text-xs sm:text-sm font-semibold tracking-wide">
              వేదిక: {city}
            </span>
          </div>

          {/* ✨ 8. Grand Royal "Open Invitation" Button with Golden Shimmer */}
          <div className="mt-4 flex flex-col items-center gap-2 w-full">
            <button
              type="button"
              className="km-open-btn relative w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8B1232] via-[#B81E48] to-[#800F2E] text-[#FFF9E6] font-serif font-bold text-base sm:text-lg shadow-[0_10px_25px_rgba(139,18,50,0.5)] border-2 border-[#FFDF80] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden flex items-center justify-center gap-2 group"
              onClick={handleOpen}
            >
              {/* Shimmer Light Bar */}
              <div className="btn-shimmer absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

              <Sparkles className="w-4 h-4 text-[#FFD700] animate-spin" style={{ animationDuration: '4s' }} />
              <span className="tracking-normal whitespace-nowrap font-serif drop-shadow-xs">
                ఆహ్వానాన్ని తెరవండి
              </span>
              <span className="text-xs text-[#FFEDB3] font-sans font-normal opacity-90 hidden sm:inline">
                (Open)
              </span>
            </button>

            {/* Music Prompt Note */}
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-serif font-medium text-[#7A3611] bg-[#FFF2D6]/90 px-3 py-1 rounded-full border border-[#D4A843]/50">
              <Music className="w-3 h-3 text-[#B8860B] animate-bounce" />
              <span>మంగళ వాయిద్యాల సంగీతంతో వీక్షించండి</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
