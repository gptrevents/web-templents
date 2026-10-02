import React from 'react';
import { ScreenIndicator } from '../components/ScreenIndicator';
import { ScreenId } from '../types';

interface Screen3StoryProps {
  onNext: () => void;
  onNavigate?: (id: ScreenId) => void;
  onOpenMenu?: () => void;
  isSinglePage?: boolean;
}

export const Screen3Story: React.FC<Screen3StoryProps> = ({
  onNext,
  onNavigate = () => {},
  onOpenMenu = () => {},
  isSinglePage = false,
}) => {
  return (
    <div
      className={`relative w-full ${isSinglePage ? 'min-h-[100vh] py-12' : 'h-full min-h-[100dvh] max-h-[932px] overflow-y-auto'} shadow-2xl flex flex-col justify-between select-none`}
      style={{
        background: 'radial-gradient(circle at 50% 18%, #fdf9f4 0%, #f7ede0 65%, #f1e2ce 100%)',
      }}
    >
      {/* Top Bar Navigation (hidden in single page mode) */}
      {!isSinglePage && (
        <div className="relative z-40 w-full pt-1">
          <ScreenIndicator
            activeScreen={3}
            onNavigate={onNavigate}
            onOpenMenu={onOpenMenu}
            darkMode={false}
          />
        </div>
      )}

      {/* Corner Floral Framing */}
      <img
        alt="Top Left Botanical"
        className="absolute -top-6 -left-6 w-28 sm:w-32 z-[5] pointer-events-none drop-shadow-sm opacity-90"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPsOgMvRBueeRNCcXkhUwLoVI28e8bKOzNdfVizqag6lreMxTP78EqeLto5qEhkamHfxTRmO6RggLe6N3GJLCTimEFzrth81e1REltnwCos0HZR8BTBZv8GMrHvms-drBNXM6ewgcffRFUtynMMzrx1AwItsZjNwoWrzX-ugp2Gfk8o7i8Hc8nmOx8qxxt1TcM2FIRMqC60tkfHbRqKkzYGzD9wgBVqcjs274TRRz8hhtXTpOQxl2GIjHp0J5QR3mDXw"
      />
      <img
        alt="Top Right Botanical"
        className="absolute -top-6 -right-5 w-32 sm:w-36 z-[5] pointer-events-none drop-shadow-sm opacity-90"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM6CrEsPThQHDKrH4lnVTqs6qnEiQWIbgXjTxaZoRLBfoMBrXObnbliYsWVwz7_Nkvz7v1q9lNz-b3iRTdFpoZ6T9YsYYpqSG1bs35sXQS4ytKlhVvI2Q9LgScp3b6rW8nCME6QohWMOIyaNw7BNgNHlsGn2iyrexvf-TvztLunlMn2Rstn-gnI6sbsA2G6cLuLLJM4fuHz-Tcle2CD_YR2yl1JEAvPTH4ossrBjQc9GzbwnQH4dTC9_ra1YuKa8MAGg"
      />
      <img
        alt="Bottom Left Botanical"
        className="absolute -bottom-6 -left-6 w-32 sm:w-36 z-[5] pointer-events-none drop-shadow-sm opacity-90"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiMUwzTN3uPO_ln4Xh31wWblgJrpPMI5aSZ4HJq-bS0jhNDrP6dPUcnJgn1crCZCA35oKcMQlnrWMH_-5LQTffhLBfhJuUnU_oT1d9hCXfT8eGhxzte9npdZ1hNX13P_dzQZoAAOPt01hSaJkT80QCRRgI4-oiBgdzX8A_O1-Qyb6RYh1xw90qWdg3h-curpAzL1Brmz4bB1Qm4q1g5du2oiVz1WSN7GIvH-24rz_ClzId8m3JbOJT-SZgss9_hSOdSA"
      />
      <img
        alt="Bottom Right Botanical"
        className="absolute -bottom-6 -right-5 w-36 sm:w-40 z-[5] pointer-events-none drop-shadow-sm opacity-90"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4gwz9BmuJGjnTTk19plTARpARbim24hoxC_s51cAiRWnupE2hR-NPDTnL-Jv6C0BF1GvW3LBjNSXWPMhDiZuEwmn3MCikBJpgNckYqEJC_5dOlv1KGw5wURenACzBZS__wdxO0y0OzAayK0mChyFzpCXXUwdFBi3ANDs2dFAL9kM4iTwybTpUW1mdKpHLS05gXZjGZ2n-XAy-lwria-SSKO7BNslixxByl_Ps7TBNAsZm9N2SbVYQFfGZVBlDy6_9Dg"
      />

      {/* Floating Petals */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="animate-petal-1 absolute top-0 left-[16%] w-3.5 h-4.5 bg-pink-300/80 rounded-full blur-[0.3px]" />
        <div className="animate-petal-2 absolute top-0 right-[20%] w-4 h-5 bg-rose-300/75 rounded-full blur-[0.4px]" />
      </div>

      {/* Header Title Section */}
      <section className="relative z-20 text-center px-4 pt-1 pb-1">
        <h1 className="font-playfair text-[40px] sm:text-[44px] leading-tight font-bold text-[#6b1928] tracking-tight">
          Our Story
        </h1>
        <p className="font-cormorant italic text-lg sm:text-xl text-[#6f4b4f] mt-0.5 tracking-wide">
          It all started with a simple hello...
        </p>
      </section>

      {/* Timeline Section */}
      <section className="relative z-20 flex-1 px-4 my-auto flex flex-col justify-center max-w-[390px] mx-auto w-full py-2">
        {/* Timeline Vertical Guide Line with Shimmer Beam */}
        <div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#eec2cb]/60 via-[#df99aa] to-[#d87c94]/70 rounded-full overflow-hidden pointer-events-none">
          <div className="timeline-beam" />
        </div>

        {/* Milestone 1 (2022 - First Meeting) */}
        <article className="relative grid grid-cols-2 items-center gap-3 py-2.5">
          {/* Photo Left */}
          <div className="flex justify-end pr-3">
            <div className="relative w-[130px] h-[130px] rounded-2xl p-[3px] bg-gradient-to-tr from-[#dfa97b]/40 via-[#ffffff] to-[#e47690]/40 shadow-[0_8px_20px_-4px_rgba(107,25,40,0.18)] group">
              <div className="w-full h-full rounded-[13px] overflow-hidden bg-stone-200">
                <img
                  alt="First meeting of Arjun and Priya"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC84-_xTfvQxqss-F-aCOY9quTlDLFGKaZbTi0VQnwgzw0pNAnN1FR70618TRpk5HPbpnOX9YUUsfmW-eq8gfPPFtJK3YxCJiUxVx_j8RMYOl20QN4VdhXLglvhkTz9tkqYNEkrecq6F6cegp_qz2BojSEsWn04Ddn-jCS2bANRUThVUMKAMUti_aDh1RHhQep9qgGcLlj4VX4KOkDLoPRSs95p9H4RM5aXQnJ-ksdEGXdyvBT0WgU8"
                />
              </div>
            </div>
          </div>

          {/* Central Heart Node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="animate-heartbeat bg-[#faf5ee] p-1.5 rounded-full border border-[#f3d2dc] shadow-md flex items-center justify-center">
              <span className="text-[#d85276] text-xs leading-none block">♥</span>
            </div>
          </div>

          {/* Content Right */}
          <div className="pl-3 text-left">
            <span className="block font-playfair text-[24px] sm:text-[26px] font-semibold text-[#6b1928] leading-none mb-1">
              2022
            </span>
            <h2 className="font-playfair font-bold text-[18px] text-[#6b1928] leading-snug">
              First Meeting
            </h2>
            <p className="font-sans-clean text-[12px] sm:text-[12.5px] text-[#554044] leading-relaxed mt-1 font-normal">
              A random hi turned into a beautiful conversation.
            </p>
          </div>
        </article>

        {/* Milestone 2 (2024 - First Journey) */}
        <article className="relative grid grid-cols-2 items-center gap-3 py-2.5">
          {/* Content Left */}
          <div className="pr-3 text-right">
            <span className="block font-playfair text-[24px] sm:text-[26px] font-semibold text-[#6b1928] leading-none mb-1">
              2024
            </span>
            <h2 className="font-playfair font-bold text-[18px] text-[#6b1928] leading-snug">
              First Journey
            </h2>
            <p className="font-sans-clean text-[12px] sm:text-[12.5px] text-[#554044] leading-relaxed mt-1 font-normal">
              Different places,
              <br />
              countless memories.
            </p>
          </div>

          {/* Central Heart Node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="animate-heartbeat bg-[#faf5ee] p-1.5 rounded-full border border-[#f3d2dc] shadow-md flex items-center justify-center">
              <span className="text-[#d85276] text-xs leading-none block">♥</span>
            </div>
          </div>

          {/* Photo Right */}
          <div className="flex justify-start pl-3">
            <div className="relative w-[130px] h-[130px] rounded-2xl p-[3px] bg-gradient-to-tr from-[#dfa97b]/40 via-[#ffffff] to-[#e47690]/40 shadow-[0_8px_20px_-4px_rgba(107,25,40,0.18)] group">
              <div className="w-full h-full rounded-[13px] overflow-hidden bg-stone-200">
                <img
                  alt="Romantic sunset mountain journey together"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC0ftp_QQWxtnrZapvBvNECDrSdRhNlKNqp1eJ49C1d7DPvyH2BS2S0SDzAlA5yd3D0VgmRS2B81hz17ennpb7u8H5atzH1H4OxMwY93j7j7XCguqzFBoEJtTEU1oY7ZrF75VlbG0cNrmyVga05ubQcExr6xSuDi6FBfhakjDNVKOb8QX-e3u2nNHhbarzFH_8xuV0tA6p5emZ8OtqSS74D_wghOyLM1sqfqMg7uiSL6-JyatW6W9g"
                />
              </div>
            </div>
          </div>
        </article>

        {/* Milestone 3 (2026 - Forever) */}
        <article className="relative grid grid-cols-2 items-center gap-3 py-2.5">
          {/* Photo Left */}
          <div className="flex justify-end pr-3">
            <div className="relative w-[130px] h-[130px] rounded-2xl p-[3px] bg-gradient-to-tr from-[#dfa97b]/40 via-[#ffffff] to-[#e47690]/40 shadow-[0_8px_20px_-4px_rgba(107,25,40,0.18)] group">
              <div className="w-full h-full rounded-[13px] overflow-hidden bg-stone-200">
                <img
                  alt="Beginning the forever adventure"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl3pwZO-dQ10TLj2vb6CHQoWnWTF-w62xlw3CplsuwbDYCHRbUBy3AvGIQasRd9e8A3ucUnfX2MI35FGR3FdE6OX-b8QhNKp2VUHQOlIlSMNbiWfd20BBB3vPU5cS0-Ft0HZF2JtVuY0c5DsXo3mnfpeUzyMoqD6Y78D_P-A73eqjtyrye8IxAR15lf_6_j_j9IZjyO291gtj4KPzY7BSR-fRBwD5vx9OMSodZCQZXe8Q_bmgaiWvk"
                />
              </div>
            </div>
          </div>

          {/* Central Heart Node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="animate-heartbeat bg-[#faf5ee] p-1.5 rounded-full border border-[#f3d2dc] shadow-md flex items-center justify-center">
              <span className="text-[#d85276] text-xs leading-none block">♥</span>
            </div>
          </div>

          {/* Content Right */}
          <div className="pl-3 text-left">
            <span className="block font-playfair text-[24px] sm:text-[26px] font-semibold text-[#6b1928] leading-none mb-1">
              2026
            </span>
            <h2 className="font-playfair font-bold text-[18px] text-[#6b1928] leading-snug">
              Forever
            </h2>
            <p className="font-sans-clean text-[12px] sm:text-[12.5px] text-[#554044] leading-relaxed mt-1 font-normal">
              Now, we begin
              <br />
              our greatest adventure together.
            </p>
          </div>
        </article>
      </section>

      {/* Bottom Calligraphy Footer with Next Trigger */}
      <footer className="relative z-20 pb-7 pt-1 px-4 text-center">
        <button
          onClick={onNext}
          className="inline-flex items-center justify-center gap-2 group cursor-pointer active:scale-95 transition"
        >
          <div className="text-center">
            <span className="block font-script text-[34px] sm:text-[38px] leading-tight text-[#aa3351] -rotate-3 filter drop-shadow-sm group-hover:text-[#c43256] transition-colors">
              Same Souls
            </span>
            <span className="block font-script text-[36px] sm:text-[40px] leading-none text-[#aa3351] -rotate-3 -mt-1.5 filter drop-shadow-sm group-hover:text-[#c43256] transition-colors">
              New Adventures
            </span>
          </div>
          <span
            aria-hidden="true"
            className="animate-heartbeat text-[#d85276] text-2xl -mt-2 inline-block"
          >
            ♥
          </span>
        </button>
      </footer>
    </div>
  );
};
