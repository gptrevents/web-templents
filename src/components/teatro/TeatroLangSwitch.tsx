import React, { useState, useEffect } from 'react';

export type TeatroLang = 'en' | 'it' | 'te';

interface TeatroLangSwitchProps {
  lang: TeatroLang;
  onChangeLang: (lang: TeatroLang) => void;
}

export const TeatroLangSwitch: React.FC<TeatroLangSwitchProps> = ({
  lang,
  onChangeLang,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-12 sm:top-14 right-3 sm:right-5 z-40 flex items-center gap-1 backdrop-blur-md rounded-full p-1 transition-all duration-300 shadow-md"
      style={{
        backgroundColor: scrolled
          ? 'rgba(250, 248, 245, 0.85)'
          : 'rgba(250, 248, 245, 0.95)',
        border: '1px solid rgba(92, 32, 24, 0.25)',
      }}
    >
      <button
        type="button"
        onClick={() => onChangeLang('en')}
        className="px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer"
        style={{
          backgroundColor: lang === 'en' ? '#5C2018' : 'transparent',
          color: lang === 'en' ? '#FAF8F5' : '#5C2018',
        }}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onChangeLang('it')}
        className="px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer"
        style={{
          backgroundColor: lang === 'it' ? '#5C2018' : 'transparent',
          color: lang === 'it' ? '#FAF8F5' : '#5C2018',
        }}
      >
        IT
      </button>
      <button
        type="button"
        onClick={() => onChangeLang('te')}
        className="px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer"
        style={{
          backgroundColor: lang === 'te' ? '#5C2018' : 'transparent',
          color: lang === 'te' ? '#FAF8F5' : '#5C2018',
        }}
      >
        తె
      </button>
    </div>
  );
};
