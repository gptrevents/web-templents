import React, { useState, useRef, useEffect } from 'react';
import { TeatroLang, TeatroLangSwitch } from './TeatroLangSwitch';
import { TeatroAudioToggle } from './TeatroAudioToggle';
import { TeatroCurtainHero } from './TeatroCurtainHero';
import { TeatroScratchReveal } from './TeatroScratchReveal';
import { TeatroCountdown } from './TeatroCountdown';
import { TeatroVenue } from './TeatroVenue';
import { TeatroMenu } from './TeatroMenu';
import { TeatroDressCode } from './TeatroDressCode';
import { TeatroTransport } from './TeatroTransport';
import { TeatroGifts } from './TeatroGifts';
import { TeatroPhotoFrame } from './TeatroPhotoFrame';
import { TeatroRsvp } from './TeatroRsvp';
import { TeatroThankYou } from './TeatroThankYou';
import { CustomInvitationData } from '../../types';
import '../../styles/teatro.css';

interface TeatroViewProps {
  customData?: CustomInvitationData;
}

export const TeatroView: React.FC<TeatroViewProps> = ({ customData }) => {
  const [lang, setLang] = useState<TeatroLang>('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Custom data or default demo couple data
  const groom = customData?.groom || 'Sam';
  const bride = customData?.bride || 'Sofía';
  const coupleNames = `${bride} & ${groom}`;
  const venue = customData?.venue || 'Villa Medicea di Artimino';
  const city = customData?.city || 'Artimino, Florencia';

  // Parse day, month, year from customData or default
  let day = '10';
  let month = 'Sept';
  let year = '2027';

  if (customData?.date) {
    const d = new Date(customData.date);
    if (!isNaN(d.getTime())) {
      day = String(d.getDate()).padStart(2, '0');
      month = d.toLocaleString('en-US', { month: 'short' });
      year = String(d.getFullYear());
    }
  }

  // Audio handling
  const startAudio = () => {
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.log('Audio autoplay prevented:', err);
      });
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio play error:', err));
    }
  };

  useEffect(() => {
    // Attempt lazy preload
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
    }
  }, []);

  return (
    <main className="teatro-root relative w-full min-h-screen bg-white text-[#5C2018] overflow-x-hidden selection:bg-[#5C2018] selection:text-white">
      {/* Background Music Audio Element */}
      <audio
        ref={audioRef}
        src="/assets/teatro/intro-music.mp3"
        loop
        preload="auto"
      />

      {/* 1. Floating Top Language Switcher */}
      <TeatroLangSwitch lang={lang} onChangeLang={setLang} />

      {/* 2. Floating Bottom Sound Controller */}
      <TeatroAudioToggle isPlaying={isPlaying} onToggle={toggleAudio} />

      {/* 3. Hero Section: Velvet Curtains Parting Video + Large Script Typography */}
      <TeatroCurtainHero
        groomName={groom}
        brideName={bride}
        lang={lang}
        onFirstClick={startAudio}
      />

      {/* 4. Scratch-to-Reveal Gold Card (10 • Sept • 2027) */}
      <TeatroScratchReveal
        day={day}
        month={month}
        year={year}
        lang={lang}
      />

      {/* 5. Countdown to Wedding Day */}
      <TeatroCountdown
        targetDate={`${year}-09-${day}T16:30:00`}
        lang={lang}
      />

      {/* 6. Venue Section with Hand-drawn Line-Art Illustration */}
      <TeatroVenue
        venueName={venue}
        address="Via di Papa Leone X, 28"
        city={city}
        lang={lang}
      />

      {/* 7. Dinner & Reception Menu with Ornate Vintage Frame */}
      <TeatroMenu lang={lang} />

      {/* 8. Dress Code with Fashion Line Art Illustration */}
      <TeatroDressCode lang={lang} />

      {/* 9. Transport with Classic Coach Bus Schedule */}
      <TeatroTransport lang={lang} />

      {/* 10. Gifts & Wedding Registry with Bank Details */}
      <TeatroGifts
        coupleNames={coupleNames}
        upiId={customData?.upiId}
        lang={lang}
      />

      {/* 11. Baroque Gold Frame Couple Portrait */}
      <TeatroPhotoFrame coupleNames={coupleNames} />

      {/* 12. Interactive RSVP Confirmation Form */}
      <TeatroRsvp lang={lang} />

      {/* 13. Scallop-Edged Thank You Card & Credits */}
      <TeatroThankYou
        coupleNames={coupleNames}
        lang={lang}
      />
    </main>
  );
};
