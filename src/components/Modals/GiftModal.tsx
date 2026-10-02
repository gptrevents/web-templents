import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Gift, Heart, ExternalLink } from 'lucide-react';
import { WEDDING_COUPLE } from '../../data/weddingData';

interface GiftModalProps {
  type: 'upi' | 'qr' | 'info' | null;
  onClose: () => void;
}

export const GiftModal: React.FC<GiftModalProps> = ({ type, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!type) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(WEDDING_COUPLE.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-[370px] bg-[#FCF8F2] rounded-[28px] border border-[#D4AF37]/50 shadow-2xl overflow-hidden text-[#341B1E]">
        {/* Modal Top Bar */}
        <div className="p-5 bg-gradient-to-r from-[#6A1527] to-[#8C1B35] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gift className="w-5 h-5 text-[#FDE4B7]" />
            <h3 className="font-playfair text-[18px] font-semibold tracking-wide text-[#FFF7E6]">
              {type === 'upi' && 'UPI Wedding Blessing'}
              {type === 'qr' && 'Scan Wedding QR'}
              {type === 'info' && 'Blessings & Gifting'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white/80 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 text-center space-y-4">
          {type === 'upi' && (
            <div className="space-y-4">
              <p className="font-serif text-[16px] text-gray-700 leading-relaxed">
                For those who wish to bless the newly-wed couple with a digital Shagun, you may send via UPI:
              </p>

              <div className="bg-white p-3.5 rounded-2xl border border-[#E8DAC7] shadow-sm flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[11px] font-cinzel text-gray-500 uppercase tracking-wider block">
                    Verified UPI ID
                  </span>
                  <span className="font-mono text-[15px] font-semibold text-[#6A1527]">
                    {WEDDING_COUPLE.upiId}
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className={`px-3 py-1.5 rounded-xl font-sans text-xs font-semibold flex items-center space-x-1 transition ${
                    copied
                      ? 'bg-green-600 text-white'
                      : 'bg-[#D82B61] hover:bg-[#C21E51] text-white active:scale-95'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={`upi://pay?pa=${WEDDING_COUPLE.upiId}&pn=Arjun%20and%20Priya&cu=INR`}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D82B61] to-[#E32D68] text-white font-playfair font-medium text-[15px] flex items-center justify-center space-x-2 shadow-md hover:opacity-95 transition"
              >
                <span>Open UPI App (GPay / PhonePe / Paytm)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {type === 'qr' && (
            <div className="space-y-3 flex flex-col items-center">
              <p className="font-serif text-[15.5px] text-gray-700">
                Scan this QR code with any UPI app to bless Arjun &amp; Priya:
              </p>

              {/* Crisp Stylized Wedding QR Card */}
              <div className="w-52 h-52 bg-white p-4 rounded-2xl border-2 border-[#D4AF37]/60 shadow-lg flex flex-col items-center justify-center relative">
                {/* SVG QR Code Simulation */}
                <svg className="w-full h-full text-[#3B151F]" viewBox="0 0 120 120" fill="currentColor">
                  {/* Outer corner markers */}
                  <rect x="10" y="10" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="18" y="18" width="14" height="14" rx="2" fill="#6A1527" />
                  <rect x="80" y="10" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="88" y="18" width="14" height="14" rx="2" fill="#6A1527" />
                  <rect x="10" y="80" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="18" y="88" width="14" height="14" rx="2" fill="#6A1527" />
                  {/* Decorative Pattern Grid */}
                  <rect x="50" y="15" width="8" height="8" fill="currentColor" />
                  <rect x="62" y="25" width="6" height="6" fill="currentColor" />
                  <rect x="48" y="35" width="10" height="6" fill="currentColor" />
                  <rect x="15" y="52" width="6" height="8" fill="currentColor" />
                  <rect x="28" y="60" width="8" height="6" fill="currentColor" />
                  <rect x="50" y="50" width="20" height="20" rx="3" fill="#D82B61" opacity="0.9" />
                  <circle cx="60" cy="60" r="5" fill="#FFF7E6" />
                  <rect x="80" y="52" width="10" height="6" fill="currentColor" />
                  <rect x="98" y="64" width="8" height="10" fill="currentColor" />
                  <rect x="50" y="82" width="8" height="8" fill="currentColor" />
                  <rect x="64" y="90" width="14" height="8" fill="currentColor" />
                  <rect x="84" y="82" width="8" height="8" fill="currentColor" />
                  <rect x="96" y="96" width="12" height="10" fill="currentColor" />
                </svg>

                <span className="text-[11px] font-cinzel text-gray-500 mt-2 font-medium">
                  {WEDDING_COUPLE.upiId}
                </span>
              </div>

              <p className="text-[12px] text-gray-500 italic">
                Supported on Google Pay, PhonePe, Paytm, BHIM &amp; Banking Apps
              </p>
            </div>
          )}

          {type === 'info' && (
            <div className="space-y-3 text-left">
              <div className="bg-white/80 p-4 rounded-2xl border border-[#ECDDCB] space-y-2">
                <div className="flex items-center space-x-2 text-[#6A1527]">
                  <Heart className="w-4 h-4 fill-current" />
                  <h4 className="font-playfair font-semibold text-[16px]">Your Presence is Our Present</h4>
                </div>
                <p className="font-serif text-[15px] text-gray-700 leading-relaxed">
                  The most precious gift you can give us is your warm presence, blessings, and love as we take our wedding vows.
                </p>
              </div>

              <div className="bg-white/80 p-4 rounded-2xl border border-[#ECDDCB] space-y-2">
                <h4 className="font-playfair font-semibold text-[16px] text-[#6A1527]">
                  Shagun &amp; Blessings
                </h4>
                <p className="font-serif text-[15px] text-gray-700 leading-relaxed">
                  If you wish to honor traditional customs with a token of blessings, boxed gift counters and envelope collection points will be available at Sri Convention Hall during the Reception and Muhurtham.
                </p>
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-[#D4AF37]/50 text-[#6A1527] font-serif font-semibold text-[16px] hover:bg-white transition active:scale-98"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
