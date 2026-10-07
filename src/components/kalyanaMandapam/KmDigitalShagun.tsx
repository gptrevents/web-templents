import React, { useState } from 'react';
import { QrCode, Copy, Check, Sparkles, Heart } from 'lucide-react';

interface KmDigitalShagunProps {
  upiId?: string;
  coupleNames?: string;
}

export const KmDigitalShagun: React.FC<KmDigitalShagunProps> = ({
  upiId = 'rahul.harinya@okhdfcbank',
  coupleNames = 'రాహుల్ & హరిణ్య',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const upiPayUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    coupleNames
  )}&cu=INR&tn=${encodeURIComponent('Wedding Blessings & Shagun')}`;

  return (
    <section className="py-12 px-4 sm:px-6 relative bg-gradient-to-b from-transparent via-[#FBEEC1]/40 to-transparent">
      <div className="max-w-md mx-auto text-center">
        {/* Ornate Gold Bordered Card */}
        <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border-2 border-[#D4A843]/60 shadow-xl relative overflow-hidden">
          {/* Top Decorative Arc */}
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#9A1B41] to-[#6A0E28] text-[#FFD700] flex items-center justify-center shadow-md mb-4 border border-[#FFEDB3]">
            <QrCode className="w-7 h-7" />
          </div>

          <span className="text-[11px] font-serif uppercase tracking-[0.2em] text-[#9A1B41] font-bold block mb-1">
            సాంప్రదాయ ఆశీస్సులు • Shagun
          </span>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 mb-2">
            డిజిటల్ చదివింపులు
          </h3>
          <p className="font-serif text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
            మీ ప్రేమపూర్వక ఆశీస్సులు మాకు అమూల్యమైన బహుమతి. దూరప్రాంతాల నుండి చదివింపులు పంపాలనుకునే వారి కోసం:
          </p>

          {/* UPI ID Box */}
          <div className="bg-[#FAF3E0] rounded-xl p-3 sm:p-4 border border-[#D4A843]/50 flex items-center justify-between gap-2 mb-4">
            <div className="text-left overflow-hidden">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">
                Official Wedding UPI ID
              </span>
              <p className="font-mono text-xs sm:text-sm font-bold text-[#8B1A1A] truncate">
                {upiId}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#D4A843] text-xs font-semibold text-[#8B1A1A] hover:bg-[#FDF5E6] transition-colors flex items-center gap-1 shrink-0 cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">కాపీ అయ్యింది</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>కాపీ చేయండి</span>
                </>
              )}
            </button>
          </div>

          {/* Pay Directly via UPI App (GPay / PhonePe) on Mobile */}
          <a
            href={upiPayUrl}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#9A1B41] via-[#A81F48] to-[#9A1B41] text-[#FFF5DB] font-serif font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 block"
          >
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span>GPay / PhonePe ద్వారా పంపండి</span>
          </a>

          <p className="text-[11px] text-stone-500 font-serif mt-3 flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 text-[#9A1B41] fill-[#9A1B41]" />
            <span>మీ ఆశీస్సులే మాకు శ్రీరామరక్ష</span>
          </p>
        </div>
      </div>
    </section>
  );
};
