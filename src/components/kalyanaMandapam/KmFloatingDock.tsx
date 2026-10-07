import React from 'react';
import { Sparkles, Share2, Edit3, Volume2, VolumeX } from 'lucide-react';

interface KmFloatingDockProps {
  isPlaying: boolean;
  onToggleMusic: () => void;
  onTriggerTalambralu: () => void;
  onOpenCustomizer?: () => void;
  onShare?: () => void;
}

export const KmFloatingDock: React.FC<KmFloatingDockProps> = ({
  isPlaying,
  onToggleMusic,
  onTriggerTalambralu,
  onOpenCustomizer,
  onShare,
}) => {
  return (
    <aside
      aria-label="Wedding Controls"
      className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2.5"
    >
      {/* 1. Talambralu Shower Button */}
      <button
        type="button"
        onClick={onTriggerTalambralu}
        className="group relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FFF9ED] text-[#8B1A1A] border-2 border-[#D4A843] shadow-lg hover:bg-[#FBEEC1] transition-all hover:scale-105 active:scale-95 cursor-pointer"
        title="అక్షతలు / తలంబ్రాలు చల్లండి"
      >
        <span className="text-base leading-none">🌾</span>
        <span className="text-xs font-serif font-bold tracking-wide hidden sm:inline">
          తలంబ్రాలు చల్లండి
        </span>
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
      </button>

      {/* 2. Audio Toggle Bell */}
      <button
        type="button"
        onClick={onToggleMusic}
        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer ${
          isPlaying
            ? 'bg-gradient-to-tr from-[#9A1B41] to-[#D4A843] text-white border-[#FFF0B3]'
            : 'bg-[#FFF9ED] text-stone-700 border-[#D4A843]/60'
        }`}
        title={isPlaying ? 'పాటను ఆపండి' : 'మంగళ వాయిద్యాలు ప్లే చేయండి'}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>

      {/* 3. Share Invitation Link */}
      {onShare && (
        <button
          type="button"
          onClick={onShare}
          className="w-10 h-10 rounded-full bg-[#25D366] text-white border border-white/60 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="బంధుమిత్రులకు వాట్సాప్‌లో షేర్ చేయండి"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}

      {/* 4. Edit Details Button */}
      {onOpenCustomizer && (
        <button
          type="button"
          onClick={onOpenCustomizer}
          className="w-10 h-10 rounded-full bg-stone-900 text-[#FFD700] border border-[#D4A843] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="వివరాలు మార్చుకోండి (Customize Details)"
        >
          <Edit3 className="w-4 h-4" />
        </button>
      )}
    </aside>
  );
};
