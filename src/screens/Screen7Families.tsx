import React from 'react';
import { ScreenIndicator } from '../components/ScreenIndicator';
import { ScreenId } from '../types';

interface Screen7FamiliesProps {
  onNext: () => void;
  onNavigate?: (id: ScreenId) => void;
  onOpenMenu?: () => void;
  isSinglePage?: boolean;
}

export const Screen7Families: React.FC<Screen7FamiliesProps> = ({
  onNext,
  onNavigate = () => {},
  onOpenMenu = () => {},
  isSinglePage = false,
}) => {
  return (
    <div
      className={`relative w-full ${isSinglePage ? 'min-h-[100vh] py-12' : 'h-full min-h-[100dvh] max-h-[932px] overflow-y-auto'} shadow-2xl flex flex-col justify-between select-none`}
      style={{
        background: 'radial-gradient(circle at 50% 30%, #FCFAF7 0%, #F8F3ED 60%, #F1E7DD 100%)',
      }}
    >
      {/* Top Bar Navigation (hidden in single page mode) */}
      {!isSinglePage && (
        <div className="relative z-40 w-full pt-1">
          <ScreenIndicator
            activeScreen={7}
            onNavigate={onNavigate}
            onOpenMenu={onOpenMenu}
            darkMode={false}
          />
        </div>
      )}

      {/* Corner Floral Clusters */}
      <img
        alt="Top Left Floral Corner"
        className="absolute -top-3 -left-3 w-36 pointer-events-none select-none z-10 drop-shadow-sm opacity-95"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuYYL-FZdY3_VQ4bCT_PcDC_bgmvQdZtptBB7PlcoNE5pkCDVFtdAQneMDnv_P_F4FDtLKBN_pEwrF3l5tjLt0lERl16UhTu-LF_W_Uh7SVGusdI0Wqbmitw0UrhCwONcIevoGEn4i95y1jSlf8LJbdtGfuuuvK8MdhQqlkv3gN-LEOCwoKlCZhd2BnRNI7F5T2ddOXgvqdGEQXPrBvGAp3SHHX2UkTQHhD26yIQLx97GEKWLdARA1UeYldPKXhPd3IQ"
      />
      <img
        alt="Top Right Floral Corner"
        className="absolute -top-3 -right-3 w-40 pointer-events-none select-none z-10 drop-shadow-sm opacity-95"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpwsDdKiwB0r63O1W4Uv6jr68AZUrEFjaQLV-ymn4v7rjsZ6Nbf1BtvxAl_m7JJkc5D9nry9eJrExiZenxZ1UFkJnzvP1P0snqjuY7nAOzeoVBytXgsZ_ywlgVtmXfILeUiLlrXqsLMvPbt84SSuJEikiUxtOlK0ydu876mdcalHH0DXC0ekHoNLqC_ceWJKpnG4QRN7GiRF5tCQroaNjvkpYQ1bsD6Y9MwlRZonEHS8tz5xVXG2GGm0gIEQwFG8Qu6g"
      />
      <img
        alt="Bottom Left Floral Corner"
        className="absolute -bottom-2 -left-2 w-40 pointer-events-none select-none z-10 drop-shadow-sm opacity-95"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5O9WW3_gm2vztp-OOefTGhISMBIhOepbB-XWunsdNR4JyqEOeNs-BXj5jNgRnldQkfl269wHG7OZUzWGnB1PAHu7nrSwy4bo7BE545YyQafIF1X9ciQJIN7QfVRSHNRxgHhmIK3XpYYI-vZ26Ex9kXv-pDExCANyQ15yhdgJnBUhFrB8fS8kC9LEnDIpjUEk5WAEVaL05-azD7VM9uMEZmiIQ8XONcaxDLakGZKLdRPSutDlCccVscCMOvn8JQE5CIA"
      />
      <img
        alt="Bottom Right Floral Corner"
        className="absolute -bottom-2 -right-2 w-40 pointer-events-none select-none z-10 drop-shadow-sm opacity-95"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiTKDeeO-ipfAS5VtsuHbQFL6uoJvlvTAMHDY6wl2c01DNTDFohB08U8-37coS0ErOKS59m-Nd4Wdp-VmexRe-te6qkuCDR_0UP-ICV4DpSzFa6gd51dQBJtcjQAyBwA3DCHw5NfDTMupbHG5fPMJTbOScuNRQM4D3z9l47NU09a6UPWwyoNXLkKqlluk2P6aEkfSX7Cuz3IqPKJuJu2dMsJazxu63esDDnrMmZiBkorJy8D1nOhIOPCreHee-U9DCgA"
      />

      {/* Title & Filigree Header */}
      <section className="text-center mt-1 mb-2 relative z-10">
        <p className="font-playfair italic text-[#781D33] text-[22px] font-semibold leading-tight tracking-wide mb-0.5">
          Together with
        </p>
        <h1 className="font-cinzel font-bold text-[#69152B] text-[36px] sm:text-[38px] tracking-tight leading-none">
          Our Families
        </h1>

        {/* Symmetrical Royal Golden Filigree Divider */}
        <div className="flex items-center justify-center mt-2 px-10">
          <svg className="w-48 h-6 text-[#C59B27]" viewBox="0 0 220 28" fill="none">
            <path d="M0 14H60M160 14H220" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
            <path
              d="M110 3 C105 8, 98 11, 88 12 C98 13, 102 18, 110 25 C118 18, 122 13, 132 12 C122 11, 115 8, 110 3 Z"
              stroke="currentColor"
              strokeWidth="1.3"
              fill="none"
            />
            <circle cx="110" cy="14" r="2.5" fill="currentColor" />
            <circle cx="68" cy="14" r="1.5" fill="currentColor" opacity="0.8" />
            <circle cx="152" cy="14" r="1.5" fill="currentColor" opacity="0.8" />
          </svg>
        </div>
      </section>

      {/* Family Cards Section */}
      <section className="flex flex-col gap-3.5 z-20 px-3.5 max-w-[400px] mx-auto w-full">
        {/* Bride's Family Card */}
        <article className="bg-white/80 backdrop-blur-md border border-[#D4AF37]/35 rounded-[22px] p-4 flex items-center justify-between shadow-lg">
          {/* Decorated Elephant Illustration */}
          <div className="w-[38%] flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-auto max-w-[115px]" viewBox="0 0 140 140" fill="none">
              <path
                d="M42 68 C42 54 52 44 70 44 C88 44 104 52 108 68 C112 80 114 96 112 115 L102 116 C100 102 99 90 95 86 C91 82 85 84 80 84 L76 116 L66 116 C67 101 68 86 64 82 C60 84 54 84 50 116 L40 116 C41 100 39 88 42 68 Z"
                fill="#9E9385"
              />
              <path
                d="M96 66 C105 66 116 72 120 80 C122 84 125 84 126 80 C128 72 123 68 116 62 C110 56 102 52 92 52 C88 52 80 62 80 62 C80 66 88 66 96 66 Z"
                fill="#9E9385"
              />
              <path d="M120 80 C121 82 127 82 128 78 C128 75 125 73 122 75 Z" fill="#FDF3E3" />
              <circle cx="100" cy="60" r="2.2" fill="#2D1C1C" />
              <rect x="52" y="60" width="38" height="28" rx="4" fill="#38779B" />
              <path d="M52 64 L90 64 M52 84 L90 84" stroke="#F9D776" strokeWidth="2" />
              <g transform="translate(48, 25)">
                <circle cx="18" cy="18" r="8" fill="#E24A75" />
                <ellipse cx="18" cy="7" rx="6" ry="10" fill="#FFA4B8" opacity="0.85" />
                <ellipse cx="18" cy="29" rx="6" ry="10" fill="#FFA4B8" opacity="0.85" />
                <ellipse cx="7" cy="18" rx="10" ry="6" fill="#FFA4B8" opacity="0.85" />
                <ellipse cx="29" cy="18" rx="10" ry="6" fill="#FFA4B8" opacity="0.85" />
                <circle cx="18" cy="18" r="4" fill="#FFE58F" />
              </g>
            </svg>
          </div>

          {/* Right Family Text */}
          <div className="w-[62%] text-center pl-1">
            <h2 className="font-cinzel text-[#7A1630] font-bold text-[19px] sm:text-[20px] tracking-tight mb-0.5">
              Bride’s Family
            </h2>
            <p className="font-playfair italic text-[#756B65] text-[13.5px] mb-1.5 font-medium">
              Daughter of
            </p>
            <div className="text-[#2D2424] font-playfair text-[15px] sm:text-[16px] leading-[1.38] font-bold">
              <p>Mr. Suresh Kumar</p>
              <p className="mt-0.5">&amp; Mrs. Lakshmi Devi</p>
            </div>
          </div>
        </article>

        {/* Groom's Family Card */}
        <article className="bg-white/80 backdrop-blur-md border border-[#D4AF37]/35 rounded-[22px] p-4 flex items-center justify-between shadow-lg">
          {/* Left Family Text */}
          <div className="w-[62%] text-center pr-1">
            <h2 className="font-cinzel text-[#7A1630] font-bold text-[19px] sm:text-[20px] tracking-tight mb-0.5">
              Groom’s Family
            </h2>
            <p className="font-playfair italic text-[#756B65] text-[13.5px] mb-1.5 font-medium">
              Son of
            </p>
            <div className="text-[#2D2424] font-playfair text-[15px] sm:text-[16px] leading-[1.38] font-bold">
              <p>Mr. Ramesh Babu</p>
              <p className="mt-0.5">&amp; Mrs. Padmaja</p>
            </div>
          </div>

          {/* Right Decorated Ambari Elephant */}
          <div className="w-[38%] flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-auto max-w-[115px]" viewBox="0 0 140 145" fill="none">
              <path d="M72 15 L77 26 L67 26 Z" fill="#DFAC37" />
              <path d="M60 26 L84 26 L81 33 L63 33 Z" fill="#DFAC37" />
              <rect x="63" y="33" width="18" height="22" rx="2" fill="#FCEBC1" stroke="#DFAC37" strokeWidth="1.5" />
              <line x1="68" y1="34" x2="68" y2="54" stroke="#DFAC37" strokeWidth="1.5" />
              <line x1="76" y1="34" x2="76" y2="54" stroke="#DFAC37" strokeWidth="1.5" />
              <rect x="54" y="55" width="36" height="8" rx="2" fill="#DFAC37" />
              <path
                d="M48 80 C48 68 56 62 72 62 C88 62 98 70 102 82 C104 94 105 106 102 122 L94 123 C92 112 91 100 87 97 C84 94 80 95 76 95 L72 123 L63 123 C64 110 65 98 61 95 C58 97 54 97 50 123 L42 123 C43 108 44 96 48 80 Z"
                fill="#9E9385"
              />
              <path
                d="M48 76 C40 76 33 82 30 89 C28 92 25 91 25 87 C24 80 29 74 36 69 C42 64 50 64 56 68 C58 72 54 76 48 76 Z"
                fill="#9E9385"
              />
              <circle cx="43" cy="72" r="2.2" fill="#2D1C1C" />
              <rect x="56" y="70" width="32" height="22" rx="3" fill="#9B263E" />
              <path d="M56 89 C59 93 64 93 67 89 C70 93 75 93 78 89 C81 93 86 93 88 89" stroke="#DFAC37" strokeWidth="1.8" fill="none" />
              <circle cx="94" cy="55" r="6" fill="#FFA4B8" />
              <circle cx="94" cy="55" r="2.5" fill="#FFE58F" />
            </svg>
          </div>
        </article>
      </section>

      {/* Blessings & Romantic Script Section */}
      <footer
        onClick={onNext}
        className="mt-3 mb-6 text-center relative z-20 cursor-pointer active:scale-95 transition"
      >
        <div className="font-playfair text-[#332727] text-[15px] sm:text-[16px] leading-snug">
          <p>With the blessings of</p>
          <p className="font-semibold">our grandparents and family</p>
        </div>

        {/* Center Symmetrical Filigree */}
        <div className="flex items-center justify-center my-2">
          <svg className="w-40 h-5 text-[#C59B27] opacity-90" viewBox="0 0 160 20" fill="none">
            <path d="M10 10H56M104 10H150" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <path
              d="M80 3 C76 7, 71 10, 64 10 C71 10, 74 15, 80 18 C86 15, 89 10, 96 10 C89 10, 84 7, 80 3 Z"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
            <circle cx="80" cy="10.5" r="2" fill="currentColor" />
          </svg>
        </div>

        <div className="font-script text-[#C44365] text-[33px] sm:text-[36px] leading-[1.18] tracking-wide select-none drop-shadow-sm">
          <p>Two Families</p>
          <p className="mt-0.5">One Beautiful Journey</p>
        </div>

        <div className="flex justify-center items-center mt-1">
          <span className="text-[#C44365] text-base">♥</span>
        </div>
      </footer>
    </div>
  );
};
