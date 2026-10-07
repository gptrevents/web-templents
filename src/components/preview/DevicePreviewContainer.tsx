import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TemplateId, CustomInvitationData } from '../../types';
import { INVITATION_TEMPLATES } from '../../data/templatesData';

// Template 1: South Indian Royal Traditional Wedding Components
import { TraditionalEnvelope } from '../traditional/TraditionalEnvelope';
import { TraditionalNavbar } from '../traditional/TraditionalNavbar';
import { TraditionalHero } from '../traditional/TraditionalHero';
import { AboutCouple } from '../traditional/AboutCouple';
import { CelebrationEvents } from '../traditional/CelebrationEvents';
import { MuhurthamCountdown } from '../traditional/MuhurthamCountdown';
import { PhotoGallery } from '../traditional/PhotoGallery';
import { VenueSection } from '../traditional/VenueSection';
import { TraditionalRSVP } from '../traditional/TraditionalRSVP';
import { LiveStreamVideo } from '../traditional/LiveStreamVideo';
import { GuestWishesRegistry } from '../traditional/GuestWishesRegistry';
import { TraditionalFooter } from '../traditional/TraditionalFooter';
import { TempleBorderVertical } from '../traditional/WeddingBorders';

// Template 2: NeoBloom Modern Romantic Full Website
import { NeoBloomView } from '../neobloom/NeoBloomView';

// Template 3: South Indian Traditional (MyShaadhiLink 1:1 Exact Clone)
import { SouthIndianTraditionalView } from '../southIndian/SouthIndianTraditionalView';

// Template 4: Kalyana Mandapam (Vijay & Rashmika Wedding Theme 1:1 Exact Clone)
import { KalyanaMandapamView } from '../kalyanaMandapam/KalyanaMandapamView';

// Template 5: Teatro (The Digital Yes 1:1 Exact Clone)
import { TeatroView } from '../teatro/TeatroView';

// Template 6: Ulems (1:1 Clean Clone with Split Screen & Bottom Nav)
import { UlemsView } from '../ulems/UlemsView';

interface DevicePreviewContainerProps {
  templateId: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
  onBackToStore: () => void;
  customData: CustomInvitationData;
  onUpdateCustomData?: (data: CustomInvitationData) => void;
}

export const DevicePreviewContainer: React.FC<DevicePreviewContainerProps> = ({
  templateId,
  onSelectTemplate,
  onBackToStore,
  customData,
  onUpdateCustomData,
}) => {
  // Traditional envelope state & music
  const [isTraditionalEnvelopeOpen, setIsTraditionalEnvelopeOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const currentTemplate =
    INVITATION_TEMPLATES.find((t) => t.id === templateId) || INVITATION_TEMPLATES[0];

  return (
    <div className="min-h-screen w-full bg-stone-900 text-gray-900 flex flex-col relative">
      
      {/* Clean, Non-overlapping Sticky Preview Toolbar */}
      <header className="sticky top-0 z-50 w-full bg-stone-950/95 backdrop-blur-md border-b border-stone-800 text-stone-200 px-3 sm:px-6 py-2 shadow-lg flex items-center justify-between gap-2 sm:gap-4 shrink-0">
        
        {/* Left: Back to Home / Store */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => {
              onBackToStore();
              window.scrollTo({ top: 0, left: 0 });
              const globalLenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: unknown) => void } }).__lenis;
              if (globalLenis) {
                globalLenis.scrollTo(0, { immediate: true });
              }
            }}
            className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-amber-200 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            title="అన్ని ఆహ్వానాలు చూడండి (All Invitations)"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">అన్ని ఆహ్వానాలు</span>
            <span className="sm:hidden">హోమ్</span>
          </button>

          {/* Current Template Name badge */}
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-stone-800">
            <span className="text-xs font-serif font-bold text-amber-200">
              {currentTemplate.name}
            </span>
            <span className="text-[10px] text-stone-400 bg-stone-900 px-2 py-0.5 rounded-full border border-stone-800">
              {currentTemplate.teluguName}
            </span>
          </div>
        </div>

        {/* Right: Templates Switcher Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
          {INVITATION_TEMPLATES.map((tpl) => {
            const isActive = tpl.id === templateId;
            const shortLabel =
              tpl.id === 'ulems'
                ? 'ఉలేమ్స్ (Ulems)'
                : tpl.id === 'teatro'
                ? 'థియేట్రో (Teatro)'
                : tpl.id === 'kalyana-mandapam'
                ? 'కళ్యాణ మండపం'
                : tpl.id === 'myshaadhi-traditional'
                ? 'మైషాదీ'
                : tpl.id === 'royal-traditional'
                ? 'రాయల్ ట్రెడిషనల్'
                : 'నియో బ్లూమ్ (Ruvva)';

            return (
              <button
                key={tpl.id}
                onClick={() => {
                  onSelectTemplate(tpl.id);
                  window.scrollTo({ top: 0, left: 0 });
                  const globalLenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: unknown) => void } }).__lenis;
                  if (globalLenis) {
                    globalLenis.scrollTo(0, { immediate: true });
                  }
                }}
                className={`px-3 py-1 text-xs rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
                }`}
                title={tpl.teluguName}
              >
                <span>{shortLabel}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Template Content Rendering */}
      <main className="flex-1 w-full">
        {templateId === 'royal-traditional' ? (
          /* TEMPLATE 1: ROYAL SOUTH INDIAN TRADITIONAL WEDDING */
          <div className="w-full min-h-screen bg-wedding-outer-sindhoori text-[#3D1C00] flex flex-col relative select-none">
            
            <TraditionalEnvelope
              guestName={customData.guestName || 'బంధుమిత్రులు (Guest)'}
              onOpen={() => setIsTraditionalEnvelopeOpen(true)}
              isOpen={isTraditionalEnvelopeOpen}
            />

            <TraditionalNavbar
              activeSection="hero"
              onNavigate={(sec) => {
                const el = document.getElementById(sec);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              guestName={customData.guestName || 'బంధుమిత్రులు (Guest)'}
              onUpdateGuestName={() => {}}
              isPlayingMusic={isPlayingMusic}
              onToggleMusic={() => setIsPlayingMusic(!isPlayingMusic)}
            />

            <div className="w-full max-w-5xl mx-auto bg-wedding-silk-patrikha relative border-x-2 border-[#D4A843] shadow-2xl">
              <TempleBorderVertical side="left" />
              <TempleBorderVertical side="right" />

              <div id="hero">
                <TraditionalHero
                  guestName={customData.guestName || 'బంధుమిత్రులు (Guest)'}
                  onExplore={() => {
                    const el = document.getElementById('couple');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>
              <AboutCouple />
              <CelebrationEvents />
              <MuhurthamCountdown />
              <PhotoGallery />
              <VenueSection />
              <TraditionalRSVP initialGuestName={customData.guestName || 'బంధుమిత్రులు (Guest)'} />
              <LiveStreamVideo />
              <GuestWishesRegistry />
              <TraditionalFooter
                onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                onReopenEnvelope={() => {
                  setIsTraditionalEnvelopeOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          </div>
        ) : templateId === 'neobloom' ? (
          /* TEMPLATE 2: NEOBLOOM MODERN ROMANTIC WEBSITE */
          <NeoBloomView
            onBackToStore={onBackToStore}
            customData={customData}
          />
        ) : templateId === 'kalyana-mandapam' ? (
          /* TEMPLATE 4: KALYANA MANDAPAM (VIJAY & RASHMIKA WEDDING THEME - 1:1 EXACT CLONE) */
          <KalyanaMandapamView
            customData={customData}
            onUpdateCustomData={onUpdateCustomData}
          />
        ) : templateId === 'teatro' ? (
          /* TEMPLATE 5: TEATRO (THE DIGITAL YES 1:1 EXACT CLONE) */
          <TeatroView customData={customData} />
        ) : templateId === 'ulems' ? (
          /* TEMPLATE 6: ULEMS 1:1 CLONE (SPLIT DESKTOP & BOTTOM NAV) */
          <UlemsView customData={customData} />
        ) : (
          /* TEMPLATE 3: MYSHAADHILINK SOUTH INDIAN TRADITIONAL (1:1 Exact Clone) */
          <SouthIndianTraditionalView />
        )}
      </main>

    </div>
  );
};
