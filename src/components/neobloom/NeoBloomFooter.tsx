import React from 'react';
import { Heart, ChevronUp, Mail, Sparkles } from 'lucide-react';

interface NeoBloomFooterProps {
  onScrollToTop: () => void;
  onReopenEnvelope: () => void;
}

export const NeoBloomFooter: React.FC<NeoBloomFooterProps> = ({
  onScrollToTop,
  onReopenEnvelope,
}) => {
  return (
    <footer className="relative w-full py-16 px-4 sm:px-6 bg-gradient-to-b from-[#FFFDFD] via-[#FFF1F2] to-[#FFE4E6] text-stone-900 border-t border-rose-200 text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Heart Icon with Glow */}
        <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center mb-4 shadow-md">
          <Heart className="w-6 h-6 fill-current" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-2">
          ధన్యవాదాలు • Thank You
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">
          మా ఆహ్వానాన్ని మన్నించి మీ అమూల్యమైన సమయాన్ని వెచ్చించినందుకు కృతజ్ఞతలు. మీ రాక మాకు ఎనలేని సంతోషాన్నిస్తుంది!
        </p>

        <p className="font-serif italic text-lg text-rose-700 font-bold mb-8">
          With Love,<br />Arjun &amp; Priya
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={onReopenEnvelope}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-rose-50 border border-rose-300 text-rose-800 text-xs font-semibold shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-rose-600" />
            <span>మరలా కవరు ఓపెన్ చేయండి (Envelope)</span>
          </button>

          <button
            onClick={onScrollToTop}
            className="px-4 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            <span>పైకి వెళ్లు (Back to Top)</span>
          </button>
        </div>

        <div className="text-[11px] text-stone-500 font-medium border-t border-rose-200/80 pt-6 w-full">
          Ruvva Modern Digital Wedding Invitations • అందమైన జీవిత క్షణాల కోసం ♡
        </div>

      </div>
    </footer>
  );
};
