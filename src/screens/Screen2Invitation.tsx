import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { ScreenIndicator } from '../components/ScreenIndicator';
import { ScreenId } from '../types';

interface Screen2InvitationProps {
  onNext: () => void;
  onNavigate?: (id: ScreenId) => void;
  onOpenMenu?: () => void;
  isSinglePage?: boolean;
}

export const Screen2Invitation: React.FC<Screen2InvitationProps> = ({
  onNext,
  onNavigate = () => {},
  onOpenMenu = () => {},
  isSinglePage = false,
}) => {
  return (
    <div
      className={`relative w-full ${isSinglePage ? 'min-h-[100vh] py-10' : 'h-full min-h-[100dvh] max-h-[932px]'} overflow-hidden shadow-2xl flex flex-col justify-between select-none`}
      style={{
        background: 'linear-gradient(180deg, #FBF3EF 0%, #F9EDE8 45%, #F7E4DF 75%, #F4D9D3 100%)',
      }}
    >
      {/* Top Bar Navigation (hidden in single page mode) */}
      {!isSinglePage && (
        <div className="relative z-40 w-full pt-1">
          <ScreenIndicator
            activeScreen={2}
            onNavigate={onNavigate}
            onOpenMenu={onOpenMenu}
            darkMode={false}
          />
        </div>
      )}

      {/* Hero Couple Portrait (70% viewport, feathered bottom) */}
      <div className="absolute top-0 inset-x-0 h-[68%] w-full overflow-hidden pointer-events-none z-0">
        <img
          alt="Romantic Portrait of Arjun & Priya"
          className="w-full h-full object-cover object-top"
          src="https://lh3.googleusercontent.com/aida/AEtjO1XBI0rhug3c2phDWsliiUSsnZ1_nKIT2v05ZhLxi8_HL4jEh8KW-QBEdZmDQaxdLmoVMEY2EYcCFrUoBLxgnZj2p_xB7R9zElRPNUkM4whDeCDup9mIRExoBzc9ul0ERJWnnEnOlOdKqUY1DuYR3C9AhzsL_A_WZv72AM_7F-oNA1r4Vq8wbQTH9tOLa-VOBc-PwQOcETWI5qs9kxRYyBZiiv6j31oG4JLPnc9eZb-RjXIkOklOVL0h6FQ"
          style={{
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,0.3) 88%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,0.3) 88%, rgba(0,0,0,0) 100%)',
          }}
        />
        {/* Soft feather overlay */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[#FAF0EB]/60 to-[#F8E5E1] pointer-events-none" />
      </div>

      {/* Floating Petals */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none z-25">
        <div className="animate-petal-1 absolute top-0 left-[10%] w-4 h-5 bg-pink-300/80 rounded-full blur-[0.3px]" />
        <div className="animate-petal-2 absolute top-0 right-[12%] w-5 h-6 bg-rose-300/75 rounded-full blur-[0.4px]" />
        <div className="animate-petal-3 absolute top-0 left-[75%] w-3.5 h-4.5 bg-pink-200/85 rounded-full blur-[0.3px]" />
        <div className="animate-petal-4 absolute top-0 left-[22%] w-4 h-5.5 bg-rose-400/70 rounded-full blur-[0.4px]" />
      </div>

      {/* Floral Botanical Garlands in Lower Corners */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 pointer-events-none z-10 select-none overflow-hidden h-[360px]">
        <img
          alt="Left Floral Bouquet"
          className="absolute bottom-0 left-0 w-[42%] max-w-[160px] pointer-events-none z-10 object-contain object-bottom-left select-none drop-shadow-sm opacity-95"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvWeIVBFiZAJI_IW0WLAYoHNhwQkaDVSbgsgPyX1KN6sztjmkL2_U7kKv2OCDMFqZ2jpBvHNiXuCe721Se-HdgK8NKg6tfzcQ79Tz4kwEehOPH7CrnOBvhySWZ5nFMQlBN33wP5ml3O_S8sW5cInryePO4PX4Q1iH2s7t_lfmZjFhgtdCtbYsWZgviuPHdk4pVZuJJtw9dizIAlhmaIefjNb-VCqyCwtlzBXNgH3rQ6omDbNlsEKSeRz1aX0ORIDwKOA"
        />
        <img
          alt="Right Floral Bouquet"
          className="absolute bottom-0 right-0 w-[42%] max-w-[160px] pointer-events-none z-10 object-contain object-bottom-right select-none drop-shadow-sm opacity-95"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSsA3YSyFiRQS0iNCTNmGvnsj1JDWY9iyZk2jkOFawxzjHXLmqSqhAId9F6uHpFjCkEMEQeam3Tz8maP5eK7pcLh5Hd1tVHb0oINEiM8V7e99R8PnebFCZbJLFDwALVKCbaV3lLEpNvOhFs8Z6DV1fro3GeT7nBT0xmEYQ8PQh3qwhCt4o8LosKgrb5V7tZLN6x8-NuR9LFZST3xziP_KYi1EqhrkHUjAiqjgiFC1W-VKpbZsTkTM66F8R0hu07uX-HA"
        />
      </div>

      {/* Lower Half - Wedding Card Details */}
      <section className="relative z-20 flex flex-col items-center text-center justify-end px-5 pb-8 mt-auto">
        <p className="font-cormorant text-[18px] font-medium text-[#5c3b43] tracking-wide mb-1 drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]">
          Together with our families
        </p>

        {/* Couple Names */}
        <div className="flex flex-col items-center justify-center leading-none my-0.5">
          <h1
            className="font-playfair text-[48px] sm:text-[52px] font-normal tracking-tight m-0 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
            style={{ color: 'rgb(184, 51, 88)' }}
          >
            Arjun
          </h1>
          <div className="flex items-center justify-center gap-2 mt-0.5">
            <span
              className="font-cormorant italic font-normal text-[38px] leading-none"
              style={{ color: '#c95175' }}
            >
              &amp;
            </span>
            <span
              className="font-playfair text-[48px] sm:text-[52px] font-normal tracking-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] leading-none"
              style={{ color: '#b83358' }}
            >
              Priya
            </span>
          </div>
        </div>

        {/* Date */}
        <div className="mt-3.5 mb-1">
          <p className="font-cormorant text-[22px] font-semibold text-[#4a2e35] tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
            12 December 2026
          </p>
        </div>

        {/* Location with Pin */}
        <div className="flex items-center justify-center gap-1.5 text-[#52383e] mt-0.5">
          <MapPin className="w-[17px] h-[17px] text-[#87203b] flex-shrink-0" />
          <span className="font-sans-clean text-[15.5px] font-normal text-[#52383e] tracking-tight">
            Vijayawada, Andhra Pradesh
          </span>
        </div>

        {/* Scroll Action Prompt */}
        <div className="flex flex-col items-center mt-6 mb-0.5">
          <span className="font-sans-clean text-[15px] text-[#553b42] font-normal tracking-wide mb-2 opacity-90">
            Scroll to explore
          </span>
          <button
            onClick={onNext}
            aria-label="Scroll down to invitation story"
            className="animate-bounce-soft w-11 h-11 rounded-full bg-white/95 hover:bg-white shadow-[0_4px_16px_rgba(135,32,59,0.18)] border border-pink-100 flex items-center justify-center text-[#87203b] transition-all cursor-pointer group active:scale-95"
          >
            <ChevronDown className="w-5 h-5 stroke-[2.5] text-[#87203b] group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};
