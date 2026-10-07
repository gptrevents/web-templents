import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CustomInvitationData } from '../../types';
import { KmEntry } from './KmEntry';
import { KmScrollCue } from './KmBell';
import { KmHero } from './KmHero';
import { KmCouple } from './KmCouple';
import { KmCountdown } from './KmCountdown';
import { KmEvents } from './KmEvents';
import { KmGallery } from './KmGallery';
import { KmVideo } from './KmVideo';
import { KmDigitalShagun } from './KmDigitalShagun';
import { KmRsvp } from './KmRsvp';
import { KmFooter } from './KmFooter';
import { KmTalambralu } from './KmTalambralu';
import { KmFloatingDock } from './KmFloatingDock';
import { CustomizerModal } from '../customizer/CustomizerModal';
import '../../styles/kalyanaMandapam.css';

interface KalyanaMandapamViewProps {
  customData?: CustomInvitationData;
  onUpdateCustomData?: (data: CustomInvitationData) => void;
}

export const KalyanaMandapamView: React.FC<KalyanaMandapamViewProps> = ({
  customData,
  onUpdateCustomData,
}) => {
  const [isEntryOpen, setIsEntryOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [talambraluTrigger, setTalambraluTrigger] = useState<number>(0);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [localData, setLocalData] = useState<CustomInvitationData>(() => {
    return (
      customData || {
        templateId: 'kalyana-mandapam',
        groom: 'రాహుల్ (Rahul)',
        bride: 'హరిణ్య (Harinya)',
        date: '23 APRIL 2026',
        time: '09:30 AM',
        venue: 'శ్రీ వెంకటేశ్వర కళ్యాణ మండపం',
        city: 'హైదరాబాద్ (Hyderabad)',
        guestName: 'బంధుమిత్రులు (Dear Guest)',
        customMessage: 'మా వివాహ మహోత్సవానికి మీ కుటుంబ సమేతంగా విచ్చేసి ఆశీర్వదించగలరు.',
        upiId: 'rahul.harinya@okhdfcbank',
      }
    );
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Synchronize when customData prop changes
  useEffect(() => {
    if (customData) {
      setLocalData(customData);
    }
  }, [customData]);

  // Extract couple information with intelligent fallbacks
  const groomName = localData.groom || 'రాహుల్ (Rahul)';
  const brideName = localData.bride || 'హరిణ్య (Harinya)';
  const groomFullName = localData.groomFullName || `${groomName} సిప్లిగంజ్`;
  const brideFullName = localData.brideFullName || `${brideName} రెడ్డి`;
  const weddingDate = localData.date || '23 APRIL 2026';
  const venueCity = localData.city || 'హైదరాబాద్ (Hyderabad)';
  const muhurthamTime = localData.muhurthamTime || (localData.time ? `సుముహూర్తం: ${localData.time}` : 'సుముహూర్తం: ఉదయం 09:30 AM');
  const targetDate = localData.targetDate || '2026-04-23T09:30:00';
  const guestName = localData.guestName;
  const groomGotram = localData.groomGotram || 'భరద్వాజసస గోత్రం (Bharadwaja Gotram)';
  const brideGotram = localData.brideGotram || 'కశ్యపసస గోత్రం (Kasyapa Gotram)';
  const groomParents = localData.groomParents || 'శ్రీ శంకర్ సిప్లిగంజ్ & శ్రీమతి లక్ష్మి సిప్లిగంజ్';
  const brideParents = localData.brideParents || 'శ్రీ రమేష్ రెడ్డి & శ్రీమతి లక్ష్మి రెడ్డి';
  const groomPhoto = localData.groomPhoto;
  const bridePhoto = localData.bridePhoto;
  const upiId = localData.upiId || 'rahul.harinya@okhdfcbank';
  const whatsappNumber = localData.whatsappNumber || '919849012345';

  const audioSrc =
    localData.musicUrl || '/assets/kalyana-mandapam/kalyana-vaibhogam.mp3';

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
    // Shower initial blessing of talambralu
    setTalambraluTrigger((prev) => prev + 1);
  }, [isPlaying]);

  const handleTriggerTalambralu = () => {
    setTalambraluTrigger((prev) => prev + 1);
  };

  const handleShare = () => {
    const url = window.location.href;
    const shareText = `🌸 *వివాహ ఆహ్వానం (Kalyana Mandapam)* 🌸\n\n${groomName} & ${brideName} వివాహ మహోత్సవ ఆహ్వాన పత్రికను వీక్షించండి:\n👉 ${url}`;
    if (navigator.share) {
      navigator
        .share({
          title: `${groomName} & ${brideName} Wedding Invitation`,
          text: shareText,
          url,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      alert('ఆహ్వాన లింక్ కాపీ చేయబడింది! వాట్సాప్‌లో మీ బంధువులకు షేర్ చేసుకోండి.');
    }
  };

  const handleSaveCustomData = (updated: CustomInvitationData) => {
    setLocalData(updated);
    if (onUpdateCustomData) {
      onUpdateCustomData(updated);
    }
  };

  return (
    <div className="km-root min-h-screen relative overflow-x-hidden selection:bg-[#9A1B41] selection:text-[#FFF5DB]">
      {/* 1. Interactive Talambralu Particle Shower */}
      <KmTalambralu triggerKey={talambraluTrigger} />

      {/* 2. Floating Action Dock (Music, Talambralu Shower, Share, Customize) */}
      <KmFloatingDock
        isPlaying={isPlaying}
        onToggleMusic={toggleMusic}
        onTriggerTalambralu={handleTriggerTalambralu}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onShare={handleShare}
      />

      {/* 3. Entry Envelope Opening Card with VIP Guest Personalization */}
      <KmEntry
        isOpen={isEntryOpen}
        onOpen={handleOpenInvitation}
        groomName={groomName}
        brideName={brideName}
        weddingDate={weddingDate}
        city={venueCity}
        guestName={guestName}
      />

      {/* 4. Royal Procession Video Hero Section */}
      <KmHero
        groomName={groomName}
        brideName={brideName}
        weddingDate={weddingDate}
        venueCity={venueCity}
        muhurthamTime={muhurthamTime}
        isOpen={isEntryOpen}
      />

      {/* Scroll Down Cue */}
      <KmScrollCue stacked />

      {/* 5. The Couple Section with Arches, Birds & Gotrams */}
      <KmCouple
        groomFullName={groomFullName}
        brideFullName={brideFullName}
        groomPhoto={groomPhoto}
        bridePhoto={bridePhoto}
        groomGotram={groomGotram}
        brideGotram={brideGotram}
        groomParents={groomParents}
        brideParents={brideParents}
      />

      {/* 6. Historic Temple Stone Wall Countdown */}
      <KmCountdown targetDate={targetDate} />

      {/* 7. Kalyana Vaibhavam Sacred Footsteps Yatra Events */}
      <KmEvents />

      {/* 8. Sacred Moments Gallery with Swaying Toranam & Lightbox */}
      <KmGallery />

      {/* 9. Stone Wall Video Highlights */}
      <KmVideo />

      {/* 10. Digital Shagun / UPI Gifts Section */}
      <KmDigitalShagun
        upiId={upiId}
        coupleNames={`${brideName} & ${groomName}`}
      />

      {/* 11. Royal Mandara Silk RSVP with WhatsApp Confirmation */}
      <KmRsvp
        coupleNames={`${brideName} & ${groomName}`}
        whatsappNumber={whatsappNumber}
      />

      {/* 12. Sacred Blessings Footer Card */}
      <KmFooter groomName={groomName} brideName={brideName} />

      {/* 13. Live Customizer Studio Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        customData={localData}
        onSaveCustomData={handleSaveCustomData}
        onLaunchPreview={() => {}}
        lang="te"
      />
    </div>
  );
};
