import React, { useState } from 'react';
import { Check, Cloud, Heart } from 'lucide-react';
import { ScreenIndicator } from '../components/ScreenIndicator';
import { ScreenId, RSVPRecord } from '../types';

interface Screen8RSVPProps {
  onNext: () => void;
  onNavigate?: (id: ScreenId) => void;
  onOpenMenu?: () => void;
  isSinglePage?: boolean;
}

export const Screen8RSVP: React.FC<Screen8RSVPProps> = ({
  onNext,
  onNavigate = () => {},
  onOpenMenu = () => {},
  isSinglePage = false,
}) => {
  const [attending, setAttending] = useState(true);
  const [guestsCount, setGuestsCount] = useState(2);
  const [name, setName] = useState('Rohit Kumar');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [dietary, setDietary] = useState('Vegetarian');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rsvp: RSVPRecord = {
      attending,
      guestsCount: attending ? guestsCount : 0,
      name,
      phone,
      events: ['Muhurtham', 'Reception'],
      dietaryOrNote: dietary,
      submittedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem('arjun_priya_rsvp', JSON.stringify(rsvp));
    } catch {
      // ignore
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 3500);
  };

  return (
    <div
      className={`relative w-full ${isSinglePage ? 'min-h-[100vh] py-12' : 'h-full min-h-[100dvh] max-h-[932px] overflow-y-auto'} shadow-2xl flex flex-col justify-between select-none`}
      style={{
        background: 'linear-gradient(180deg, #FAF2EB 0%, #FFF8F3 45%, #FBF3EC 100%)',
      }}
    >
      {/* Top Bar Navigation (hidden in single page mode) */}
      {!isSinglePage && (
        <div className="relative z-40 w-full pt-1">
          <ScreenIndicator
            activeScreen={8}
            onNavigate={onNavigate}
            onOpenMenu={onOpenMenu}
            darkMode={false}
          />
        </div>
      )}

      {/* Corner Floral Decorations */}
      <img
        alt="Floral top left"
        className="absolute -top-4 -left-3 w-40 sm:w-44 pointer-events-none z-10 select-none object-contain opacity-95"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRuNo2rqRrfltknar9vp6mqkWzVRUdtjibLUL9vxpwhF0x21SPOrmmboOzCWHHpDnA7EKMVjH12IRS8ki7HGClsQ4dGvaoSPwjxof8BeC0agBWhBjObh5UN8aLUlwuPqfrW2cfnPlFpadzXKPvX7mBxMT_SjxkEEskZ1-0eixJFBpZPRNJFnr9KkvBtvvZs2QZYs62yKLlez878-s5s-I3uoJjqalpXGG86lvZNGC-efZw22T8pcaJGbV8JVWJO7TPyw"
      />
      <img
        alt="Floral top right"
        className="absolute -top-3 -right-2 w-40 sm:w-44 pointer-events-none z-10 select-none object-contain opacity-95"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQC8iXF_1skGr2-hzXUzOVvEzzshCTRZO33ahgCrgJN8MggBD-E-8XpkgcLuyCBo3GX-uziZ0OxAu9_nKAmw073phTyh55hrZAQKftXzGEv8wQQCvMpJWXYio-xaG2FZE4rO0slsrdPDGWIp1fLAd6en8DDnVKv4VrvwPVdGGV1a6QDsBemVGcjevhVqABfosozqVlml0ubVEycPXTse0IV0ihAh9hywq8r10zFVgmV-a7M8W6M-CPfuhQOJmbaJwjyA"
      />
      <img
        alt="Floral bottom left"
        className="absolute -bottom-6 -left-3 w-44 sm:w-48 pointer-events-none z-10 select-none object-contain opacity-95"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI-H1Ccd_pm7WbDM-0fQyGK1WfTP_m8rnfNfC6qhaEyTWHOnGPGR5peOf7-Gw5TOiSN7jlPEc1ycVJaF4yhSWFLSvq-TAdpFZbWagBjipbg84JIxA-oPnTniJQQIRMI-91JjwWNxVErFPIbG0NiCBgsJEFxlFH8XB3Qqd7KU5padcQjnkYhkdch2peWG55C2Sl9MjCD1HVMGFx8Qd_-ug5lztkilzmCbNzpx0lHBvbY2DD64wFi-R0oNa-kQRU7jdfJg"
      />
      <img
        alt="Floral bottom right"
        className="absolute -bottom-6 -right-3 w-44 sm:w-48 pointer-events-none z-10 select-none object-contain opacity-95"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBObbZvypvuUNqvrGHVPLpOT-SZ4PWbB-DXoI1YRIbgwoTCXV26sGH6WPAme4XenKvY1I-mRSI2HU0G_nTnB8bXoH9s_EuAgq8zrCHEruy92W2AN0ODRKkjv-E8Kr5ite6p86f7FMPHFKz-9nooHq20Hd6QGVCkjs_AnV0Km5B74IrSRv3BC1XigdO109zc3Qx1ItrFTg5V8K3ZBwHkkgYL6g4ybZ0D9adVlwgqgZSbzGEHbT1wADPz6oE3wa_mLwzhDQ"
      />

      {/* Content Body */}
      <div className="relative z-20 flex-1 px-8 pb-6 flex flex-col justify-start">
        {/* Hero RSVP Heading */}
        <section className="text-center pt-1 pb-3">
          <h1 className="font-cormorant text-[38px] sm:text-[42px] leading-[1.12] text-[#6B1626] font-semibold tracking-normal">
            Will You
            <br />
            Join Us?
          </h1>

          {/* Ornate Gold Filigree */}
          <div className="flex justify-center items-center my-2 opacity-80">
            <svg className="text-[#c69a58]" height="20" viewBox="0 0 170 20" width="170" fill="none">
              <path d="M5 10H70M100 10H165" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <path
                d="M72 10C76 5 80 5 85 8C90 5 94 5 98 10C94 15 90 15 85 12C80 15 76 15 72 10Z"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
              />
              <circle cx="85" cy="10" r="2.2" fill="currentColor" />
              <circle cx="68" cy="10" r="1.5" fill="currentColor" />
              <circle cx="102" cy="10" r="1.5" fill="currentColor" />
            </svg>
          </div>

          <p className="font-cormorant text-[18px] sm:text-[19px] italic text-[#6B1626]/90 font-normal">
            Your presence means the world to us
          </p>
        </section>

        {/* RSVP Interactive Form */}
        <form onSubmit={handleSubmit} className="space-y-3 max-w-[360px] mx-auto w-full">
          {/* Attendance Toggle Buttons */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setAttending(true)}
              className={`w-full py-3 px-6 rounded-2xl flex items-center justify-center space-x-3 transition-all transform active:scale-[0.98] cursor-pointer ${
                attending
                  ? 'bg-gradient-to-r from-[#D92B60] to-[#E32D68] text-white shadow-[0_8px_20px_-3px_rgba(217,45,98,0.35)]'
                  : 'bg-white/80 hover:bg-white text-[#6B1626] border border-[#EADBCC]'
              }`}
            >
              <Check className="w-5 h-5 stroke-[2.8]" />
              <span className="font-cormorant text-[19px] sm:text-[20px] tracking-wide font-medium">
                Yes, I’ll be there
              </span>
            </button>

            <button
              type="button"
              onClick={() => setAttending(false)}
              className={`w-full py-3 px-6 rounded-2xl flex items-center justify-center space-x-3 transition-all transform active:scale-[0.98] cursor-pointer ${
                !attending
                  ? 'bg-gradient-to-r from-[#D92B60] to-[#E32D68] text-white shadow-[0_8px_20px_-3px_rgba(217,45,98,0.35)]'
                  : 'bg-white/80 hover:bg-white text-gray-800 border border-[#EADBCC]'
              }`}
            >
              <Cloud className="w-5 h-5 text-[#D92D62] stroke-[1.8]" />
              <span className="font-cormorant text-[19px] sm:text-[20px] tracking-wide font-normal">
                Sorry, can’t make it
              </span>
            </button>
          </div>

          {/* Guest Count Stepper (if attending) */}
          {attending && (
            <div className="pt-2 text-center">
              <label className="block font-cormorant text-[20px] sm:text-[22px] text-[#6B1626] mb-1.5 font-medium">
                How many people?
              </label>
              <div className="flex justify-center items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setGuestsCount((prev) => Math.max(1, prev - 1))}
                  className="w-11 h-10 bg-white/90 border border-[#E9DACB] rounded-xl flex items-center justify-center text-[#6B1626] text-xl font-normal shadow-sm active:bg-[#F3E7DC] transition cursor-pointer"
                >
                  –
                </button>
                <div className="w-14 h-10 bg-white/95 border border-[#E9DACB] rounded-xl flex items-center justify-center text-[#6B1626] text-lg font-sans-clean font-medium shadow-sm">
                  {guestsCount}
                </div>
                <button
                  type="button"
                  onClick={() => setGuestsCount((prev) => Math.min(10, prev + 1))}
                  className="w-11 h-10 bg-white/90 border border-[#E9DACB] rounded-xl flex items-center justify-center text-[#6B1626] text-xl font-normal shadow-sm active:bg-[#F3E7DC] transition cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Name & Phone Inputs */}
          <div className="space-y-2.5 pt-1">
            <div>
              <label className="block font-cormorant text-[16px] text-[#524345] font-medium mb-1 tracking-wide">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-11 px-4 rounded-xl border border-[#EBDCCF] bg-white/90 text-[#2C2023] font-sans-clean text-sm focus:border-[#D92D62] focus:ring-1 focus:ring-[#D92D62] outline-none shadow-sm transition"
              />
            </div>

            <div>
              <label className="block font-cormorant text-[16px] text-[#524345] font-medium mb-1 tracking-wide">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full h-11 px-4 rounded-xl border border-[#EBDCCF] bg-white/90 text-[#2C2023] font-sans-clean text-sm focus:border-[#D92D62] focus:ring-1 focus:ring-[#D92D62] outline-none shadow-sm transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className={`w-full py-3 rounded-2xl text-white font-cormorant text-[20px] sm:text-[21px] tracking-wide font-medium shadow-[0_8px_20px_-3px_rgba(217,45,98,0.32)] active:scale-[0.98] transition cursor-pointer ${
                submitted
                  ? 'bg-emerald-600'
                  : 'bg-gradient-to-r from-[#D92B60] to-[#E32D68] hover:from-[#CD2458] hover:to-[#D7235C]'
              }`}
            >
              {submitted ? '✓ Saved With Love!' : 'Submit RSVP'}
            </button>
          </div>
        </form>

        {/* Thank You Note */}
        <footer
          onClick={onNext}
          className="text-center pt-5 pb-2 cursor-pointer active:scale-95 transition"
        >
          <h2 className="font-cormorant text-[28px] sm:text-[30px] font-semibold text-[#6B1626] tracking-tight leading-tight">
            Thank you!
          </h2>
          <p className="font-cormorant italic text-[16px] sm:text-[17px] text-[#524345] mt-0.5">
            We can't wait to celebrate with you!
          </p>
          <div className="mt-2 flex justify-center items-center">
            <Heart className="w-5 h-5 text-[#E02B65] fill-current animate-heartbeat drop-shadow-sm" />
          </div>
        </footer>
      </div>
    </div>
  );
};
