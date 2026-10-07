import React, { useState } from 'react';
import { TemplateId, CustomInvitationData } from './types';
import { INVITATION_TEMPLATES } from './data/templatesData';
import { DevicePreviewContainer } from './components/preview/DevicePreviewContainer';
import { SmoothScrollProvider } from './components/common/SmoothScrollProvider';
import { ArrowRight } from 'lucide-react';

export default function App() {
  // Read URL parameters
  const [urlParams] = useState(() => {
    try {
      return new URLSearchParams(window.location.search);
    } catch {
      return new URLSearchParams();
    }
  });

  // Default to 'store' (Simple Home Page with all invitations), unless URL explicitly specifies view=preview
  const [viewMode, setViewMode] = useState<'store' | 'preview'>(() => {
    const directTemplate = urlParams.get('template');
    const viewParam = urlParams.get('view');
    if (directTemplate && viewParam === 'preview') {
      return 'preview';
    }
    return 'store';
  });

  // Currently selected template
  const [selectedTemplateId, setSelectedTemplateId] = useState<TemplateId>(() => {
    const tpl = urlParams.get('template');
    if (
      tpl === 'ulems' ||
      tpl === 'neobloom' ||
      tpl === 'royal-traditional' ||
      tpl === 'myshaadhi-traditional' ||
      tpl === 'kalyana-mandapam' ||
      tpl === 'teatro'
    ) {
      return tpl as TemplateId;
    }
    return 'teatro';
  });

  // Invitation data (pre-filled with standard couple details)
  const [customData, setCustomData] = useState<CustomInvitationData>(() => {
    const guestParam = urlParams.get('to') || 'బంధుమిత్రులు (Dear Guest)';
    return {
      templateId: selectedTemplateId,
      groom: 'రాహుల్ (Rahul)',
      bride: 'హరిణ్య (Harinya)',
      date: '23 APRIL 2026',
      time: '09:30 AM',
      venue: 'శ్రీ వెంకటేశ్వర కళ్యాణ మండపం, ఎం.జి. రోడ్',
      city: 'హైదరాబాద్ (Hyderabad)',
      guestName: guestParam,
      customMessage: 'మనసైన బంధం.. కలకాలం నిలిచే శుభవేళ.. మీ ఆశీస్సులే మాకు శ్రీరామరక్ష!',
      groomFullName: 'రాహుల్ సిప్లిగంజ్ (Rahul Sipligunj)',
      brideFullName: 'హరిణ్య రెడ్డి (Harinya Reddy)',
      groomGotram: 'భరద్వాజసస గోత్రం (Bharadwaja Gotram)',
      brideGotram: 'కశ్యపసస గోత్రం (Kasyapa Gotram)',
      groomParents: 'శ్రీ శంకర్ సిప్లిగంజ్ & శ్రీమతి లక్ష్మి సిప్లిగంజ్',
      brideParents: 'శ్రీ రమేష్ రెడ్డి & శ్రీమతి లక్ష్మి రెడ్డి',
      muhurthamTime: 'సుముహూర్తం: ఉదయం 09:30 AM',
      targetDate: '2026-04-23T09:30:00',
      upiId: 'rahul.harinya@okhdfcbank',
      whatsappNumber: '919849012345',
    };
  });

  const handleOpenTemplate = (id: TemplateId) => {
    setSelectedTemplateId(id);
    setViewMode('preview');
    window.scrollTo({ top: 0, left: 0 });
    const globalLenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: unknown) => void } }).__lenis;
    if (globalLenis) {
      globalLenis.scrollTo(0, { immediate: true });
    }
  };

  return (
    <SmoothScrollProvider>
      {viewMode === 'preview' ? (
        <DevicePreviewContainer
          templateId={selectedTemplateId}
          onSelectTemplate={(id) => {
            setSelectedTemplateId(id);
            window.scrollTo({ top: 0, left: 0 });
            const globalLenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: unknown) => void } }).__lenis;
            if (globalLenis) {
              globalLenis.scrollTo(0, { immediate: true });
            }
          }}
          onBackToStore={() => {
            setViewMode('store');
            window.scrollTo({ top: 0, left: 0 });
            const globalLenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: unknown) => void } }).__lenis;
            if (globalLenis) {
              globalLenis.scrollTo(0, { immediate: true });
            }
          }}
          customData={customData}
          onUpdateCustomData={setCustomData}
        />
      ) : (
        <div className="min-h-screen w-full bg-[#FAF9F6] text-stone-900 font-sans flex flex-col justify-between selection:bg-amber-100">
          {/* Top Header */}
          <header className="w-full bg-white/90 backdrop-blur-md border-b border-stone-200/80 px-6 py-4 sticky top-0 z-30">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-stone-900 flex items-center justify-center text-white font-serif font-bold text-lg shadow-xs">
                  R
                </div>
                <div>
                  <h1 className="font-serif font-bold text-base sm:text-lg text-stone-900 leading-tight">
                    Ruvva Invitations
                  </h1>
                  <p className="text-[11px] text-stone-500 font-medium">
                    డిజిటల్ వివాహ ఆహ్వానాలు
                  </p>
                </div>
              </div>
              <span className="text-xs text-stone-500 font-medium">
                {INVITATION_TEMPLATES.length} Templates
              </span>
            </div>
          </header>

          {/* Clean Main Content */}
          <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-14">
            {/* Simple Heading */}
            <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight mb-2">
                వివాహ ఆహ్వానాలు
              </h2>
              <p className="text-sm text-stone-500">
                మీకు నచ్చిన ఆహ్వానాన్ని ఎంచుకోండి • Click to open
              </p>
            </div>

            {/* Simple Clean Grid: Image & Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {INVITATION_TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleOpenTemplate(template.id)}
                  className="group bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-stone-400 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col hover:-translate-y-1"
                >
                  {/* Template Image */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-stone-100">
                    <img
                      src={template.heroImage}
                      alt={template.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Template Name Below */}
                  <div className="p-4 sm:p-5 flex items-center justify-between gap-3 bg-white">
                    <div>
                      <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-800 transition-colors">
                        {template.teluguName}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {template.name}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Simple Clean Footer */}
          <footer className="w-full border-t border-stone-200/80 py-6 text-center text-xs text-stone-500 bg-white">
            <p className="font-medium">
              Ruvva Digital Invitations
            </p>
          </footer>
        </div>
      )}
    </SmoothScrollProvider>
  );
}

