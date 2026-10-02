import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Menu } from 'lucide-react';
import { RuvvaLogo } from './RuvvaLogo';

interface Screen04Props {
  onSelectEvent?: (eventId: string) => void;
  onOpenMenu?: () => void;
}

export const NeoBloomScreen04Events: React.FC<Screen04Props> = ({
  onSelectEvent,
  onOpenMenu,
}) => {
  const events = [
    {
      id: 'haldi',
      title: 'Haldi',
      time: '10 Dec 2026 | 11:00 AM',
      venue: 'Our Residence',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'mehendi',
      title: 'Mehendi',
      time: '11 Dec 2026 | 6:00 PM',
      venue: 'The Park Resort',
      image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'wedding',
      title: 'Wedding',
      time: '12 Dec 2026 | 9:30 AM',
      venue: 'Sri Convention Hall',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'reception',
      title: 'Reception',
      time: '13 Dec 2026 | 7:00 PM',
      venue: 'The Gateway Hotel',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <div className="relative w-full h-full min-h-[640px] sm:min-h-[700px] flex flex-col justify-between overflow-hidden bg-[#0A2324] text-white select-none">
      {/* Background Starry & Lantern Lighting Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#144243_0%,#0A2324_70%)] pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

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

      {/* Header Headline */}
      <div className="relative z-10 px-6 pt-1 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block"
        >
          <span className="font-serif italic text-amber-300 text-2xl sm:text-3xl block -mb-2">
            Let&apos;s
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Celebrate
          </h2>
        </motion.div>
        
        <p className="text-[11px] sm:text-xs text-emerald-200/80 mt-1 font-medium">
          Different functions, Different vibes,
          <br />
          Same happiness!
        </p>
      </div>

      {/* Event Cards List */}
      <div className="relative z-10 px-5 sm:px-6 py-2 my-auto space-y-2.5 max-w-[340px] mx-auto w-full">
        {events.map((ev, index) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectEvent?.(ev.id)}
            className="group w-full bg-[#123637]/90 hover:bg-[#164344] border border-emerald-500/20 hover:border-emerald-400/40 rounded-2xl p-2.5 flex items-center justify-between shadow-lg transition-all duration-200 cursor-pointer"
          >
            {/* Left Thumbnail Photo */}
            <div className="w-13 h-13 rounded-xl overflow-hidden shrink-0 border border-white/20 shadow-xs">
              <img
                src={ev.image}
                alt={ev.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Center Info */}
            <div className="flex-1 px-3 text-left min-w-0">
              <h3 className="font-bold text-sm text-white leading-tight">
                {ev.title}
              </h3>
              <p className="text-[11px] text-amber-200/90 font-medium leading-tight mt-0.5">
                {ev.time}
              </p>
              <p className="text-[10px] text-emerald-300/80 truncate">
                {ev.venue}
              </p>
            </div>

            {/* Right Round Chevron Button */}
            <div className="w-7 h-7 rounded-full bg-blue-600 group-hover:bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md group-hover:translate-x-0.5 transition-all">
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Cursive Note */}
      <div className="relative z-10 pb-5 pt-1 px-6 text-center">
        <p className="font-serif italic text-xs sm:text-[13px] text-emerald-200/90">
          Four Occasions,
          <br />
          A Lifetime of Happiness <span className="text-rose-400 not-italic">♡</span>
        </p>
      </div>
    </div>
  );
};
