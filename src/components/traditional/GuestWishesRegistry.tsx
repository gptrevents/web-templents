import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_WISHES, TRADITIONAL_ASSETS, WEDDING_COUPLE } from '../../data/weddingData';
import { GuestWish } from '../../types';
import { Heart, Send, QrCode, Copy, Check, Sparkles } from 'lucide-react';
import { CornerOrnament } from './WeddingBorders';

export const GuestWishesRegistry: React.FC = () => {
  const [wishes, setWishes] = useState<GuestWish[]>(INITIAL_WISHES);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: GuestWish = {
      id: `w-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      timestamp: 'Just now',
      heartsCount: 1,
    };

    setWishes([newWish, ...wishes]);
    setName('');
    setMessage('');
  };

  const handleLike = (id: string) => {
    setWishes(
      wishes.map((w) =>
        w.id === id ? { ...w, heartsCount: (w.heartsCount || 0) + 1 } : w
      )
    );
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(WEDDING_COUPLE.upiId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <section id="wishes" className="relative w-full py-16 px-4 sm:px-6 bg-transparent overflow-hidden">
      
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 flex flex-col items-center"
        >
          <span className="text-xs font-cinzel font-semibold tracking-[0.25em] text-[#D4A843] uppercase mb-1">
            Words of Love &amp; Blessings
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#8B1A1A] tracking-wide">
            Guestbook &amp; Shagun
          </h2>
          <span className="font-telugu text-sm text-[#8B1A1A]/90 mt-0.5">
            (ఆశీస్సులు &amp; సంప్రదాయ శకునం)
          </span>
          <div className="w-44 h-4 my-2 opacity-85">
            <img src={TRADITIONAL_ASSETS.goldDivider} alt="" className="w-full h-full object-contain" />
          </div>
          <p className="font-cormorant italic text-sm sm:text-base text-[#5C4033] max-w-md">
            Your heartfelt blessings are the greatest gift you can bestow upon our new beginning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          
          {/* Left Column: Leave a Blessing Form & Live Feed (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            
            {/* Input Card */}
            <div className="relative rounded-2xl bg-gradient-to-b from-[#FFF5DE] via-[#FCECC7] to-[#F8E1B5] border-2 border-[#D4A843] shadow-[0_8px_20px_rgba(139,26,26,0.12)] p-5 sm:p-6">
              <CornerOrnament position="top-left" className="absolute top-2 left-2 opacity-40" size={24} />
              <CornerOrnament position="top-right" className="absolute top-2 right-2 opacity-40" size={24} />
              <h3 className="font-playfair text-xl font-bold text-[#8B1A1A] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4A843]" />
                <span>Write Your Blessing</span>
              </h3>

              <form onSubmit={handleAddWish} className="space-y-3.5">
                <div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name (e.g. Anand & Family)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4A843]/50 bg-white text-sm text-[#3D1C00] focus:ring-2 focus:ring-[#8B1A1A] focus:outline-none"
                  />
                </div>

                <div>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share an auspicious blessing, verse or prayer for the couple..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4A843]/50 bg-white text-sm text-[#3D1C00] focus:ring-2 focus:ring-[#8B1A1A] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#8B1A1A] hover:bg-[#680E0E] text-[#FFFDF9] font-cinzel font-semibold text-xs tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 text-[#F3DC9B]" />
                  <span>Send Blessing (ఆశీర్వదించండి)</span>
                </button>
              </form>
            </div>

            {/* Wishes Feed */}
            <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
              <AnimatePresence>
                {wishes.map((w) => (
                  <motion.div
                    key={w.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-xl bg-[#FFFDF9] border border-[#D4A843]/30 p-4 shadow-sm flex flex-col justify-between"
                  >
                    <p className="text-xs sm:text-sm text-[#3D1C00] font-sans-clean leading-relaxed italic">
                      "{w.message}"
                    </p>

                    <div className="mt-3 pt-2 border-t border-[#D4A843]/20 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-playfair font-bold text-[#8B1A1A]">{w.name}</span>
                        <span className="text-[11px] text-[#5C4033]/60 ml-2 font-sans-clean">{w.timestamp}</span>
                      </div>

                      <button
                        onClick={() => handleLike(w.id)}
                        className="flex items-center gap-1 text-[#8B1A1A] hover:scale-110 transition cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span className="text-[11px] font-semibold">{w.heartsCount || 0}</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </motion.div>

          {/* Right Column: Digital Shagun Registry (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="relative rounded-2xl bg-gradient-to-b from-[#FFF5DE] via-[#FCECC7] to-[#F8E1B5] border-2 border-[#D4A843] shadow-[0_12px_28px_rgba(139,26,26,0.15)] p-6 flex flex-col items-center text-center">
              <CornerOrnament position="top-left" className="absolute top-2 left-2 opacity-50" size={26} />
              <CornerOrnament position="top-right" className="absolute top-2 right-2 opacity-50" size={26} />
              
              <div className="w-12 h-12 rounded-full bg-[#8B1A1A] text-[#F3DC9B] flex items-center justify-center shadow-md mb-3 border border-[#F3DC9B]">
                <QrCode className="w-6 h-6" />
              </div>

              <span className="text-[11px] font-cinzel font-bold text-[#B8860B] uppercase tracking-widest">
                Traditional Shagun
              </span>
              <h3 className="font-playfair text-2xl font-bold text-[#8B1A1A] mt-0.5">
                Auspicious Shagun (శకునం)
              </h3>
              <p className="text-xs text-[#5C4033] font-sans-clean mt-1 leading-relaxed">
                For guests who wish to present traditional shagun blessings to the couple virtually.
              </p>

              {/* QR Code Graphic Box */}
              <div className="my-5 p-3 rounded-2xl bg-white border-2 border-[#D4A843] shadow-sm flex flex-col items-center">
                <div className="w-40 h-40 bg-gray-50 rounded-xl flex flex-col items-center justify-center p-2 border border-gray-100">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                      `upi://pay?pa=${WEDDING_COUPLE.upiId}&pn=Rahul_Harinya_Wedding&cu=INR`
                    )}`}
                    alt="Wedding Shagun UPI QR"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[10px] font-cinzel text-[#8B1A1A] font-semibold mt-2">
                  Scan via GPay / PhonePe / Paytm
                </span>
              </div>

              {/* Copy UPI ID Pill */}
              <div className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#D4A843]/60 text-xs">
                <span className="font-mono text-[#3D1C00] truncate font-medium">
                  {WEDDING_COUPLE.upiId}
                </span>

                <button
                  onClick={handleCopyUpi}
                  className="ml-2 px-2.5 py-1 rounded-lg bg-[#8B1A1A] hover:bg-[#680E0E] text-[#FFFDF9] font-cinzel text-[10px] font-bold tracking-wider transition flex items-center gap-1 cursor-pointer shrink-0"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-[#F3DC9B]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#F3DC9B]" />
                      <span>Copy UPI</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-[#5C4033]/80 font-cormorant italic mt-4">
                "మీ ప్రేమపూర్వక ఆశీస్సులే మాకు అత్యంత విలువైన కానుక."
              </p>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
