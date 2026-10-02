import React from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';

export type WeddingTheme = 'sindhoori' | 'sandalwood' | 'haldi' | 'emerald';

export interface WeddingThemeOption {
  id: WeddingTheme;
  teluguName: string;
  englishName: string;
  colorSwatch: string;
  accentBadge: string;
  description: string;
}

export const WEDDING_THEMES: WeddingThemeOption[] = [
  {
    id: 'sindhoori',
    teluguName: 'రాచరిక సింధూరం & జరీ',
    englishName: 'Royal Sindhoori & Gold',
    colorSwatch: 'bg-gradient-to-br from-[#68101A] via-[#38070D] to-[#240307]',
    accentBadge: '#8B1A1A',
    description: 'Deep royal wedding maroon with glittering golden zari brocade',
  },
  {
    id: 'sandalwood',
    teluguName: 'శ్రీగంధం & పట్టు స్వర్ణం',
    englishName: 'Sandalwood & Raw Silk',
    colorSwatch: 'bg-gradient-to-br from-[#542B0D] via-[#2F1706] to-[#1A0C03]',
    accentBadge: '#D4A843',
    description: 'Auspicious warm sandalwood gold with golden paisley damask',
  },
  {
    id: 'haldi',
    teluguName: 'పసుపు & కుంకుమ కళ్యాణం',
    englishName: 'Haldi & Kumkum Festivity',
    colorSwatch: 'bg-gradient-to-br from-[#7C2407] via-[#4A1204] to-[#290802]',
    accentBadge: '#E8862A',
    description: 'Festive turmeric gold with sacred saffron marigold aura',
  },
  {
    id: 'emerald',
    teluguName: 'కళ్యాణ వేదిక ఎమరాల్డ్',
    englishName: 'Temple Emerald & Gold',
    colorSwatch: 'bg-gradient-to-br from-[#1A4930] via-[#0E291B] to-[#06150E]',
    accentBadge: '#2D5A27',
    description: 'Traditional temple sacred emerald green with golden trim',
  },
];

/* --------------------------------------------------------------------------
   Temple Saree Zari Border (Vertical Left / Right Ribbons)
   Authentic South Indian Chevron Temple Peaks & Gold Dots
   -------------------------------------------------------------------------- */
export const TempleBorderVertical: React.FC<{ side: 'left' | 'right' }> = ({ side }) => {
  return (
    <div
      className={`absolute top-0 bottom-0 ${side === 'left' ? 'left-0' : 'right-0'} w-3.5 sm:w-5 pointer-events-none z-20 select-none overflow-hidden`}
      aria-hidden="true"
    >
      <div
        className={`w-full h-full ${side === 'right' ? '-scale-x-100' : ''}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='28' viewBox='0 0 20 28' xmlns='http://www.w3.org/2000/svg'%3E%3C!-- Temple Chevron Peak --%3E%3Cpolygon points='0,0 14,7 0,14' fill='%23D4A843'/%3E%3Cpolygon points='0,14 14,21 0,28' fill='%23D4A843'/%3E%3C!-- Auspicious Gold Dots --%3E%3Ccircle cx='17' cy='7' r='1.5' fill='%238B1A1A'/%3E%3Ccircle cx='17' cy='21' r='1.5' fill='%238B1A1A'/%3E%3C!-- Outer Edge Line --%3E%3Cline x1='0.5' y1='0' x2='0.5' y2='28' stroke='%238B1A1A' stroke-width='2'/%3E%3Cline x1='19' y1='0' x2='19' y2='28' stroke='%23D4A843' stroke-width='0.8' stroke-dasharray='1 2'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat-y',
        }}
      />
    </div>
  );
};

/* --------------------------------------------------------------------------
   Traditional Golden Corner Ornament (Lagna Patrikha Filigree)
   -------------------------------------------------------------------------- */
export const CornerOrnament: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}> = ({ position, className = '', size = 44 }) => {
  const rotationClass = {
    'top-left': '',
    'top-right': '-scale-x-100',
    'bottom-left': '-scale-y-100',
    'bottom-right': '-scale-x-100 -scale-y-100',
  }[position];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none text-[#D4A843] ${rotationClass} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M2 2 L2 30 C2 22 8 16 16 16 C24 16 30 22 30 30 C30 38 24 44 16 44 L2 44"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M2 2 L30 2 C22 2 16 8 16 16 C16 24 22 30 30 30 C38 30 44 24 44 16 L44 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M6 6 L22 6 C16 6 12 10 12 16 L12 22"
        stroke="#8B1A1A"
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="2" cy="2" r="3" fill="currentColor" />
      <circle cx="16" cy="16" r="2.5" fill="#8B1A1A" />
      <circle cx="30" cy="30" r="1.8" fill="currentColor" />
      <circle cx="22" cy="6" r="1.5" fill="currentColor" />
      <circle cx="6" cy="22" r="1.5" fill="currentColor" />
    </svg>
  );
};

/* --------------------------------------------------------------------------
   Theme Selector Popover / Drawer
   -------------------------------------------------------------------------- */
interface ThemePickerProps {
  currentTheme: WeddingTheme;
  onSelectTheme: (theme: WeddingTheme) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ThemePicker: React.FC<ThemePickerProps> = ({
  currentTheme,
  onSelectTheme,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#FFFDF9] rounded-2xl border-2 border-[#D4A843] shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <CornerOrnament position="top-left" className="absolute top-2 left-2 opacity-50" size={32} />
        <CornerOrnament position="top-right" className="absolute top-2 right-2 opacity-50" size={32} />
        
        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1A1A]/10 text-[#8B1A1A] text-xs font-cinzel font-semibold uppercase tracking-wider mb-2">
            <Palette className="w-3.5 h-3.5 text-[#D4A843]" />
            <span>Invitation Aesthetics</span>
          </div>
          <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#8B1A1A]">
            శుభలేఖ రంగుల థీమ్ (Card Theme)
          </h3>
          <p className="font-cormorant italic text-sm text-[#5C4033] mt-1">
            మీకు ఇష్టమైన సంప్రదాయ కళ్యాణ శైలిని ఎంచుకోండి
          </p>
        </div>

        {/* Theme Options */}
        <div className="space-y-3">
          {WEDDING_THEMES.map((theme) => {
            const isSelected = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  onSelectTheme(theme.id);
                  onClose();
                }}
                className={`w-full p-3.5 rounded-xl border-2 transition-all flex items-center justify-between text-left cursor-pointer group ${
                  isSelected
                    ? 'border-[#D4A843] bg-gradient-to-r from-[#FFF7E8] to-[#FFF1D4] shadow-md ring-1 ring-[#D4A843]'
                    : 'border-[#D4A843]/30 bg-[#FFFDF9] hover:bg-[#FFF9EE] hover:border-[#D4A843]/60'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  {/* Swatch Circle */}
                  <div
                    className={`w-10 h-10 rounded-full ${theme.colorSwatch} border-2 border-[#D4A843] shadow-sm flex items-center justify-center`}
                  >
                    <Sparkles className="w-4 h-4 text-[#F3DC9B] opacity-80" />
                  </div>

                  <div>
                    <h4 className="font-playfair font-bold text-sm sm:text-base text-[#8B1A1A] group-hover:text-[#680E0E]">
                      {theme.teluguName}
                    </h4>
                    <p className="text-[11px] text-[#5C4033]/80 font-sans-clean">
                      {theme.englishName} • {theme.description}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#8B1A1A] text-[#F3DC9B] flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#8B1A1A] to-[#680E0E] text-[#FFFDF9] font-cinzel font-semibold text-xs tracking-wider border border-[#D4A843] shadow-md cursor-pointer hover:opacity-95"
        >
          పూర్తయింది (Apply Theme)
        </button>
      </div>
    </div>
  );
};
