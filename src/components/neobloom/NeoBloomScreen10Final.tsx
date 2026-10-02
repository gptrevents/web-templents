import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Share2, MapPin, Menu, Check } from 'lucide-react';
import { RuvvaLogo } from './RuvvaLogo';

interface Screen10Props {
  onOpenMenu?: () => void;
}

export const NeoBloomScreen10Final: React.FC<Screen10Props> = ({ onOpenMenu }) => {
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Arjun & Priya Wedding Invitation',
          text: 'Join us in celebrating our wedding on 12 DEC 2026 at Vijayawada!',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent('Arjun & Priya Wedding');
    const details = encodeURIComponent('Join us for our wedding celebration at Sri Convention Hall, Vijayawada!');
    const location = encodeURIComponent('Sri Convention Hall, MG Road, Vijayawada, Andhra Pradesh');
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261212T040000Z/20261212T160000Z&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  const handleDirections = () => {
    const address = 'Sri Convention Hall, MG Road, Vijayawada, Andhra Pradesh';
    window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <div className="relative w-full h-full min-h-[640px] sm:min-h-[700px] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#0B1E38] via-[#0E2748] to-[#081220] text-white select-none">
      {/* Background Starry Bokeh Lights */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1B3D6B_0%,transparent_70%)] pointer-events-none" />

      {/* Top Bar with Ruvva Logo and Menu */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-4 pb-2">
        <RuvvaLogo size="sm" isDark={true} showSubtitle={false} />
        
        <button
          onClick={onOpenMenu}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition cursor-pointer"
          aria-label="Menu"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Headline & Romantic Subtitle */}
      <div className="relative z-10 px-6 pt-2 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl sm:text-5xl font-serif italic text-white drop-shadow-md tracking-wide"
          style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
        >
          Thank You
        </motion.h2>

        <p className="text-[11px] sm:text-xs text-blue-200 mt-1 max-w-[260px] mx-auto leading-relaxed">
          for being a part
          <br />
          of our journey. <span className="text-rose-400 not-italic">♡</span>
          <br />
          <span className="font-semibold text-white">See you on our special day!</span>
        </p>
      </div>

      {/* Center Romantic Photo: Couple on Balcony Terrace at Night with Fairy Lights */}
      <div className="relative z-10 px-6 my-auto max-w-[300px] mx-auto w-full">
        <div className="w-full h-32 sm:h-36 rounded-2xl overflow-hidden shadow-2xl border border-white/20 relative group">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80"
            alt="Arjun & Priya Balcony Evening"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081220]/80 via-transparent to-transparent" />
        </div>
      </div>

      {/* 3 Dark Translucent Action Pill Buttons */}
      <div className="relative z-10 px-6 space-y-2.5 max-w-[300px] mx-auto w-full">
        {/* Add to Calendar */}
        <button
          onClick={handleAddToCalendar}
          className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-xs flex items-center justify-center gap-2 backdrop-blur-md shadow-md transition-all cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-amber-300" />
          <span>Add to Calendar</span>
        </button>

        {/* Share Invitation */}
        <button
          onClick={handleShare}
          className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-xs flex items-center justify-center gap-2 backdrop-blur-md shadow-md transition-all cursor-pointer"
        >
          {copiedShare ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Share2 className="w-4 h-4 text-blue-300" />
          )}
          <span>{copiedShare ? 'Link Copied!' : 'Share Invitation'}</span>
        </button>

        {/* Get Directions */}
        <button
          onClick={handleDirections}
          className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-xs flex items-center justify-center gap-2 backdrop-blur-md shadow-md transition-all cursor-pointer"
        >
          <MapPin className="w-4 h-4 text-rose-400" />
          <span>Get Directions</span>
        </button>
      </div>

      {/* Bottom Sign-off */}
      <div className="relative z-10 pb-5 pt-3 px-6 text-center">
        <p className="text-[11px] text-stone-300 font-serif italic">
          With love,
        </p>
        <p className="font-serif font-bold text-lg sm:text-xl text-white mt-0.5">
          Arjun &amp; Priya <span className="text-rose-400 not-italic">♡</span>
        </p>
      </div>
    </div>
  );
};
