import React, { useState, useEffect } from 'react';
import { ScreenIndicator } from '../components/ScreenIndicator';
import { ScreenId, GuestWish } from '../types';
import { INITIAL_WISHES } from '../data/weddingData';
import { GiftModal } from '../components/Modals/GiftModal';
import { Heart, QrCode, Gift, Play } from 'lucide-react';

interface Screen9WishesProps {
  onNext: () => void;
  onNavigate?: (id: ScreenId) => void;
  onOpenMenu?: () => void;
  isSinglePage?: boolean;
}

export const Screen9Wishes: React.FC<Screen9WishesProps> = ({
  onNext,
  onNavigate = () => {},
  onOpenMenu = () => {},
  isSinglePage = false,
}) => {
  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    try {
      const saved = localStorage.getItem('arjun_priya_wishes');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_WISHES;
  });

  const [message, setMessage] = useState(
    'Wishing you both a lifetime of happiness, love and wonderful adventures together! ❤️'
  );
  const [name, setName] = useState('Rohit Kumar');
  const [sentNotice, setSentNotice] = useState(false);
  const [modalType, setModalType] = useState<'upi' | 'qr' | 'info' | null>(null);
  const [showFeed, setShowFeed] = useState(false);

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !name.trim()) return;

    const newWish: GuestWish = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      timestamp: 'Just now',
      heartsCount: 1,
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('arjun_priya_wishes', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setSentNotice(true);
    setTimeout(() => {
      setSentNotice(false);
    }, 2800);
  };

  return (
    <div
      className={`relative w-full ${isSinglePage ? 'min-h-[100vh] py-12' : 'h-full min-h-[100dvh] max-h-[932px] overflow-y-auto'} shadow-2xl flex flex-col justify-between select-none`}
      style={{
        background: 'linear-gradient(180deg, #FAF4EB 0%, #F9F2E7 50%, #F3E7D7 100%)',
      }}
    >
      {/* Top Bar Navigation (hidden in single page mode) */}
      {!isSinglePage && (
        <div className="relative z-40 w-full pt-1">
          <ScreenIndicator
            activeScreen={9}
            onNavigate={onNavigate}
            onOpenMenu={onOpenMenu}
            darkMode={false}
          />
        </div>
      )}

      {/* Corner Floral Arrangements */}
      <img
        alt="Floral Corner Top Left"
        className="absolute -top-1 -left-2 w-36 pointer-events-none z-10 select-none object-contain drop-shadow-sm opacity-95"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoc49hXHYTCwxNgGjUjkGs-9rW3kKrF4cio1N8SBxIzhTEXaHJg6KIJH2DgkuP72dOAihAJirO_kgerjfDY-QnE0F4cedaWJ7Q3ymB1gzk7-DnEHXYSHZMevMkzZ6yYuKjLLlAO0drxbg15S0TNn3ipgmRYIGbB-l2zaCkf6a6DxWx85HpES1pTxK8nJYdFFXUB5nw93lvQ-L27toV_p8f3AgwGeml5uplP0LmJdAHjOVTPMsipcySDiJ9XZRDjR4JcQ"
      />
      <img
        alt="Floral Corner Top Right"
        className="absolute -top-1 -right-2 w-36 pointer-events-none z-10 select-none object-contain drop-shadow-sm opacity-95"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxuodgNXD7AypAFocpiDniuzK0fBavBPT8qmKnIKzGEg818AHMomdEBsT_zdtPTUhZT9jMSYl9cn0CvlqGnWLX8vzXNfISNQYu7xqn3Avc7Igukoo9wPnx6o_5kbbEWY91NJT1rBx6F_iCZzFcaNCYEqdS6glI71KbAXBOeidYWVeuW0tqhcPS2ROrC-IjgZreHFZf8O7f3FeG7O7yF9q9lhRuEENceKajNpvguE0k-1kMtuPe_eOY7xLa2Strm-esFw"
      />
      <img
        alt="Floral Corner Bottom Left"
        className="absolute -bottom-4 -left-3 w-40 pointer-events-none z-10 select-none object-contain drop-shadow-sm opacity-95"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgzR2kYlEzoFEzDBkcOHeRkYL_NooIyoe_qQxms8_S_6pUlIyDtZwxmEGtsSEkfMqDOAj8zL665ilxkCwaZ5OX_7x-gRKFMOy8v3MYKY0X4gcOjCfKDcqeqedYfhyFBM_QSUefS3ENsYOLFH3MYmJxAwkwS6HY_NXh-oe6lqnwjuBXu_dEN-rqXxhTJIMFG3zndvMX_8kKXbVbCytwd7QJ6fGAqXGG16_jjdQA-pzxBlGKlfHEcX_a_tfYu3wR-RWczA"
      />
      <img
        alt="Floral Corner Bottom Right"
        className="absolute -bottom-4 -right-3 w-40 pointer-events-none z-10 select-none object-contain drop-shadow-sm opacity-95"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTy2nJjhrsqBpOqC5umNRIPOe68WstqQ5ZRLNw2yQPsFxZxkVdkgqptAAZkEk7Tk3H8k2asaNaCJECBhjQxFcHvDiwokc5QEX93_zZsXceVOYMoZ3vHF9vQN32vgzUKihriNVaI0MWZgdTYzUuGK1EVXev0YNCvlMsFzMR-Qh97ZVoqSvJ_3h0m0_YD5K9QvUEW8PTZzLASEZcb0leDIePGmUloXVAQfjHL7oANwNG4twd_MO7ZqbOp0zHM54tE30HoA"
      />

      {/* Content Body */}
      <div className="relative z-20 px-5 flex-1 flex flex-col justify-start pb-2">
        {/* Title Section */}
        <section className="text-center pt-1 pb-2">
          <h1 className="text-[34px] sm:text-[38px] leading-tight font-bold text-[#6A1527] tracking-normal font-cormorant">
            Leave a Wish
          </h1>
          <p className="text-[17px] text-[#6D4C49] font-normal italic mt-0.5 tracking-wide font-cormorant">
            Your words mean a lot to us
          </p>

          {/* Golden Filigree Crest */}
          <div className="flex items-center justify-center gap-2 mt-2 select-none opacity-85">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#D3AB72] to-[#B88746]" />
            <svg className="w-10 h-4 text-[#B88746]" viewBox="0 0 46 16" fill="none">
              <path d="M23 1C24.5 4 27.5 7 31 7C27.5 7 25 10 23 15C21 10 18.5 7 15 7C18.5 7 21.5 4 23 1Z" fill="#C59A5A" />
              <circle cx="23" cy="8" r="1.5" fill="#C59A5A" />
            </svg>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent via-[#D3AB72] to-[#B88746]" />
          </div>
        </section>

        {/* Wish Form Card */}
        <section className="mt-1 bg-[#FCFAF6]/95 backdrop-blur-sm border border-[#EDE2D3] rounded-[22px] p-3.5 shadow-md max-w-[390px] mx-auto w-full">
          <form onSubmit={handleSendWish} className="space-y-2.5">
            {/* Textarea */}
            <div className="w-full bg-[#FAF6EE]/90 border border-[#E7D6C1] rounded-[14px] p-3 shadow-inner">
              <textarea
                aria-label="Your Wish Message"
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full bg-transparent border-0 p-0 text-[#2B1D1D] font-cormorant text-[17px] leading-relaxed placeholder-[#8C766F] outline-none resize-none font-medium"
                placeholder="Write your loving blessings..."
              />
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-[#4B302F] font-cormorant text-[16px] font-semibold mb-0.5 tracking-wide">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#FAF6EE]/90 border border-[#E7D6C1] rounded-[12px] px-3.5 py-2 text-[#2B1D1D] font-cormorant text-[16.5px] font-medium outline-none shadow-inner"
                placeholder="Enter your name"
              />
            </div>

            {/* Send Wish Button */}
            <button
              type="submit"
              className={`w-full py-2.5 px-6 rounded-[14px] text-white font-cormorant text-[19px] font-medium tracking-wide shadow-md transition duration-200 flex items-center justify-center cursor-pointer active:scale-98 ${
                sentNotice
                  ? 'bg-emerald-600'
                  : 'bg-gradient-to-r from-[#DF3265] to-[#D12558] hover:from-[#CD2253] hover:to-[#BD1B48]'
              }`}
            >
              {sentNotice ? '✓ Wish Sent with Love!' : 'Send Wish'}
            </button>
          </form>

          {/* Guestbook Feed Toggle */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setShowFeed(!showFeed)}
              className="text-[12.5px] font-sans-clean font-medium text-[#8C2744] hover:underline"
            >
              {showFeed ? 'Hide Guest Wishes' : `View All Wishes (${wishes.length})`}
            </button>
          </div>

          {/* Interactive Live Wishes Feed */}
          {showFeed && (
            <div className="mt-2 pt-2 border-t border-[#E8DAC7] max-h-36 overflow-y-auto space-y-2 text-left">
              {wishes.map((w) => (
                <div key={w.id} className="p-2 rounded-xl bg-white/70 border border-[#ECDDCB] text-xs">
                  <div className="flex items-center justify-between font-semibold text-[#6A1527]">
                    <span>{w.name}</span>
                    <span className="text-gray-400 font-normal">{w.timestamp}</span>
                  </div>
                  <p className="font-cormorant text-sm text-gray-700 mt-0.5">{w.message}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Center Leaf Divider */}
        <div className="flex items-center justify-center my-2 relative">
          <div className="h-[1px] w-full max-w-[260px] bg-gradient-to-r from-transparent via-[#DEC5A8] to-transparent" />
          <div className="absolute bg-[#FAF4EB] px-2.5 flex items-center gap-1">
            <svg className="w-8 h-4 text-[#6E7A53]" viewBox="0 0 44 20" fill="currentColor">
              <path d="M22 10C17 4 10 7 7 11C11 12 16 11 20 10C21.5 14 20 18 17 20C21 19 23 15 22 10Z" opacity="0.9" />
              <path d="M22 10C27 4 34 7 37 11C33 12 28 11 24 10C22.5 14 24 18 27 20C23 19 21 15 22 10Z" opacity="0.9" />
            </svg>
          </div>
        </div>

        {/* Blessings Card Section */}
        <section className="relative bg-[#FAF5EC]/90 border border-[#E8DAC7] rounded-[22px] p-3 text-center shadow-sm max-w-[390px] mx-auto w-full">
          <h2 className="text-[20px] sm:text-[22px] font-cormorant font-bold text-[#341B1E] leading-snug tracking-tight">
            Your Blessings
            <br />
            Are Our Greatest Gift
          </h2>
          <p className="text-[14px] font-cormorant text-[#785E5A] italic mt-0.5">
            (Optional)
          </p>
        </section>

        {/* 3 Gift Action Buttons: UPI Gift, View QR, Gift Info */}
        <section className="grid grid-cols-3 gap-2.5 mt-2.5 max-w-[390px] mx-auto w-full">
          {/* UPI Gift */}
          <button
            type="button"
            onClick={() => setModalType('upi')}
            className="group flex flex-col items-center justify-center bg-[#FAF6EE] hover:bg-white border border-[#EADECE] hover:border-[#DDBB97] rounded-[16px] py-2.5 px-1 shadow-sm active:scale-95 transition cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg border border-[#ECD9C5] bg-[#FDFBF7] flex items-center justify-center mb-1">
              <Play className="w-4 h-4 text-[#C23030] fill-current" />
            </div>
            <span className="font-cormorant text-[15px] font-semibold text-[#3E2125]">
              UPI Gift
            </span>
          </button>

          {/* View QR */}
          <button
            type="button"
            onClick={() => setModalType('qr')}
            className="group flex flex-col items-center justify-center bg-[#FAF6EE] hover:bg-white border border-[#EADECE] hover:border-[#DDBB97] rounded-[16px] py-2.5 px-1 shadow-sm active:scale-95 transition cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg border border-[#ECD9C5] bg-[#FDFBF7] flex items-center justify-center mb-1">
              <QrCode className="w-4 h-4 text-[#541620]" />
            </div>
            <span className="font-cormorant text-[15px] font-semibold text-[#3E2125]">
              View QR
            </span>
          </button>

          {/* Gift Info */}
          <button
            type="button"
            onClick={() => setModalType('info')}
            className="group flex flex-col items-center justify-center bg-[#FAF6EE] hover:bg-white border border-[#EADECE] hover:border-[#DDBB97] rounded-[16px] py-2.5 px-1 shadow-sm active:scale-95 transition cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg border border-[#ECD9C5] bg-[#FDFBF7] flex items-center justify-center mb-1">
              <Gift className="w-4 h-4 text-[#631825]" />
            </div>
            <span className="font-cormorant text-[15px] font-semibold text-[#3E2125]">
              Gift Info
            </span>
          </button>
        </section>
      </div>

      {/* Footer Sign-off */}
      <footer
        onClick={onNext}
        className="relative z-30 pb-5 pt-1 text-center cursor-pointer active:scale-95 transition"
      >
        <div className="flex items-center justify-center gap-2 mb-1 opacity-90">
          <span className="h-[0.75px] w-12 bg-[#CDAC7C]" />
          <span className="text-[#D82B61] text-xs">♥</span>
          <span className="h-[0.75px] w-12 bg-[#CDAC7C]" />
        </div>
        <p className="font-script text-[24px] text-[#C2335E] tracking-wide px-1 select-none">
          Share Love, Spread Happiness
        </p>
      </footer>

      {/* Gift Modal */}
      <GiftModal type={modalType} onClose={() => setModalType(null)} />
    </div>
  );
};
