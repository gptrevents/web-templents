import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CustomInvitationData } from '../../types';
import { KmEntry } from './KmEntry';
import { KmBell, KmScrollCue } from './KmBell';
import { KmHero } from './KmHero';
import { KmCouple } from './KmCouple';
import { KmCountdown } from './KmCountdown';
import { KmEvents } from './KmEvents';
import { KmGallery } from './KmGallery';
import { KmVideo } from './KmVideo';
import { KmRsvp } from './KmRsvp';
import { KmFooter } from './KmFooter';
import '../../styles/kalyanaMandapam.css';

interface KalyanaMandapamViewProps {
  customData?: CustomInvitationData;
}

export const KalyanaMandapamView: React.FC<KalyanaMandapamViewProps> = ({
  customData,
}) => {
  const [isEntryOpen, setIsEntryOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Groom & Bride info with defaults
  const groomName = customData?.groomName || 'Rahul';
  const brideName = customData?.brideName || 'Harinya';
  const groomFullName = customData?.groomFullName || `${groomName} Sipligunj`;
  const brideFullName = customData?.brideFullName || `${brideName} Reddy`;
  const weddingDate = customData?.date || '23 April 2026';
  const venueCity = customData?.venueCity || 'Hyderabad';
  const groomParents =
    customData?.groomParents || 'Shankar Sipligunj & Laxmi Sipligunj';
  const brideParents =
    customData?.brideParents || 'Ramesh Reddy & Lakshmi Reddy';
  const groomPhoto =
    customData?.groomPhoto ||
    'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/92ba0ee8cf-rahulll.jpeg';
  const bridePhoto =
    customData?.bridePhoto ||
    'https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/1982fd6490-hiranya.jpeg';

  const audioSrc =
    customData?.musicUrl || '/assets/kalyana-mandapam/kalyana-vaibhogam.mp3';

  // Background audio control
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audioSrc]);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log('Audio autoplay prevented:', e));
    }
  }, [isPlaying]);

  const handleOpenInvitation = useCallback(() => {
    setIsEntryOpen(true);
    // Play traditional kalyana vaibhogam music on user interaction
    if (audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log('Audio playback prevented:', e));
    }
  }, [isPlaying]);

  return (
    <div className="km-root min-h-screen relative overflow-x-hidden">
      {/* Audio Bell Floating Toggle */}
      <KmBell isPlaying={isPlaying} onToggle={toggleMusic} />

      {/* Entry Envelope Opening Card */}
      <KmEntry
        isOpen={isEntryOpen}
        onOpen={handleOpenInvitation}
        groomName={groomName}
        brideName={brideName}
        weddingDate={weddingDate}
        city={venueCity}
      />

      {/* Royal Procession Video Hero Section */}
      <KmHero
        groomName={groomName}
        brideName={brideName}
        weddingDate={weddingDate}
        venueCity={venueCity}
        isOpen={isEntryOpen}
      />

      {/* Scroll Down Cue */}
      <KmScrollCue stacked />

      {/* The Couple Section with Arches & Parallax Birds */}
      <KmCouple
        groomFullName={groomFullName}
        brideFullName={brideFullName}
        groomPhoto={groomPhoto}
        bridePhoto={bridePhoto}
        groomParents={groomParents}
        brideParents={brideParents}
      />

      {/* Historic Temple Stone Wall Countdown */}
      <KmCountdown targetDate="2026-04-23T09:30:00" />

      {/* Kalyana Vaibhavam Sacred Footsteps Yatra Events */}
      <KmEvents />

      {/* Sacred Moments Gallery with Swaying Toranam & Lightbox */}
      <KmGallery />

      {/* Stone Wall Video Highlights */}
      <KmVideo />

      {/* Royal Mandara Silk RSVP */}
      <KmRsvp />

      {/* Sacred Blessings Footer Card */}
      <KmFooter groomName={groomName} brideName={brideName} />
    </div>
  );
};
