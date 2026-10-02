import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TRADITIONAL_ASSETS, WEDDING_COUPLE } from '../../data/weddingData';
import { Heart, ChevronUp, Share2, Copy, Check, MailOpen } from 'lucide-react';

interface TraditionalFooterProps {
  onScrollToTop: () => void;
  onReopenEnvelope: () => void;
}

export const TraditionalFooter: React.FC<TraditionalFooterProps> = ({
  onScrollToTop,
  onReopenEnvelope,
}) => {
  const [guestNameInput, setGuestNameInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Generate personalized WhatsApp link for guests
  const getPersonalizedUrl = (name: string) => {
    const origin = window.location.origin + window.location.pathname;
    return `${origin}?to=${encodeURIComponent(name || 'Guest')}&demo=true`;
  };

  const handleCopyLink = () => {
    const url = getPersonalizedUrl(guestNameInput.trim());
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const name = guestNameInput.trim() || 'Guest';
    const url = getPersonalizedUrl(name);
    const text = encodeURIComponent(
      `🙏 శ్రీరస్తు - శుభమస్తు 🙏\n\nDear ${name},\n\nWe cordially invite you and your family to celebrate the wedding ceremony of *${WEDDING_COUPLE.fullNameGroom}* & *${WEDDING_COUPLE.fullNameBride}* on ${WEDDING_COUPLE.weddingDateDisplay} in Hyderabad.\n\nPlease open your personalized royal invitation below:\n${url}\n\nWith warm regards,\nBoth Families`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <footer className="relative w-full bg-[#1A0A0E] text-[#FFFDF9] pt-16 pb-24 sm:pb-16 px-4 sm:px-6 overflow-hidden border-t-2 border-[#D4A843]">
      
      {/* Background Subtle Mandala */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none opacity-5 animate-mandala-spin">
        <img src={TRADITIONAL_ASSETS.mandalaGold} alt="" className="w-full h-full object-contain" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10"
      >
        
        {/* Sacred Kalash Motif */}
        <div className="w-14 h-14 rounded-full bg-[#FFFDF9] border-2 border-[#D4A843] p-1 shadow-[0_0_24px_rgba(212,168,67,0.3)] flex items-center justify-center mb-4">
          <img src={TRADITIONAL_ASSETS.kalash} alt="Kalash" className="w-9 h-9 object-contain" />
        </div>

        {/* Traditional Blessing */}
        <h2 className="font-telugu text-3xl sm:text-4xl font-bold text-[#F3DC9B] tracking-wide mb-1">
          శుభం భవతు
        </h2>
        <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#D4A843]">
          Shubham Bhavatu • May Auspiciousness Prevail
        </p>

        <div className="w-48 h-4 my-4 opacity-80">
          <img src={TRADITIONAL_ASSETS.goldDivider} alt="" className="w-full h-full object-contain" />
        </div>

        {/* Couple Names */}
        <h3 className="font-playfair text-3xl sm:text-4xl font-bold text-white tracking-wide">
          {WEDDING_COUPLE.fullNameGroom} &amp; {WEDDING_COUPLE.fullNameBride}
        </h3>

        {/* Family Blessings Line */}
        <p className="font-cormorant italic text-sm sm:text-base text-white/80 max-w-lg mt-3 leading-relaxed">
          With prayers, love and warm regards from Sipligunj &amp; Reddy families. We look forward to welcoming you.
        </p>

        {/* WhatsApp Personalized Invite Generator Card */}
        <div className="w-full max-w-md my-10 p-5 rounded-2xl bg-[#FFFDF9]/10 border border-[#D4A843]/40 backdrop-blur-sm text-center">
          <span className="text-[11px] font-cinzel font-bold text-[#F3DC9B] uppercase tracking-wider block mb-1">
            Create Personalized Invite for Relatives &amp; Friends
          </span>
          <p className="text-xs text-white/70 font-sans-clean mb-3">
            Type your guest's name to generate a custom WhatsApp link with "Dear [Name]" envelope:
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={guestNameInput}
              onChange={(e) => setGuestNameInput(e.target.value)}
              placeholder="e.g. Venkat Garu & Family"
              className="flex-1 px-3.5 py-2 rounded-xl bg-white text-[#3D1C00] text-xs font-sans-clean placeholder:text-gray-400 focus:outline-none"
            />

            <button
              onClick={handleShareWhatsApp}
              className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-cinzel font-bold text-xs tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl bg-[#D4A843] hover:bg-[#B8860B] text-[#3D1C00] font-cinzel font-bold text-xs tracking-wider transition flex items-center justify-center gap-1 cursor-pointer"
              title="Copy Link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Quick Actions & Reopen Envelope */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-cinzel tracking-wider text-white/70 mb-8">
          <button
            onClick={onReopenEnvelope}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#F3DC9B] transition cursor-pointer"
          >
            <MailOpen className="w-3.5 h-3.5 text-[#D4A843]" />
            <span>Re-open Envelope Cover</span>
          </button>

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition cursor-pointer"
          >
            <span>Back to Top</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="w-full pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 font-sans-clean gap-2">
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> for Rahul &amp; Harinya's Wedding
          </p>
          <p className="font-cinzel text-[11px] text-[#D4A843]">
            Traditional South Indian Wedding Invitation Experience
          </p>
        </div>

      </motion.div>
    </footer>
  );
};
