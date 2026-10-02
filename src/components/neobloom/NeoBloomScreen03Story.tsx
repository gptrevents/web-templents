import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { RuvvaLogo } from './RuvvaLogo';

interface Screen03Props {
  onNext?: () => void;
}

export const NeoBloomScreen03Story: React.FC<Screen03Props> = ({ onNext }) => {
  const timeline = [
    {
      year: '2020',
      milestone: 'We Met',
      desc: 'A random conversation turned into something special.',
      tilt: '-rotate-2',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=400&q=80',
    },
    {
      year: '2022',
      milestone: 'We Grew',
      desc: 'More talks, More dreams, More us.',
      tilt: 'rotate-2',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=400&q=80',
    },
    {
      year: '2024',
      milestone: 'We Chose',
      desc: 'Each other, Every single day.',
      tilt: '-rotate-1',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80',
    },
    {
      year: '2026',
      milestone: 'Forever',
      desc: 'Now, we begin our greatest adventure together.',
      isHeart: true,
      image: '',
    },
  ];

  return (
    <div className="relative w-full h-full min-h-[640px] sm:min-h-[700px] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FFFDFB] via-[#FFF9F5] to-[#FFF1EB] text-stone-900 select-none">
      {/* Top Bar with Ruvva Logo and Sparkle */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-4 pb-2">
        <RuvvaLogo size="sm" showSubtitle={false} />
        <div className="w-7 h-7 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Title & Romantic Subtitle */}
      <div className="relative z-10 px-6 pt-1 text-center">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
          Our Story <span className="text-rose-500 font-normal">♡</span>
        </h2>
        <div className="text-[11px] sm:text-xs text-stone-500 font-serif italic mt-1 leading-snug">
          Different people
          <br />
          Same feelings
          <br />
          A beautiful journey
        </div>
      </div>

      {/* Creative Timeline Container */}
      <div className="relative z-10 px-5 sm:px-7 py-3 my-auto max-w-[340px] mx-auto w-full">
        {/* Vertical Coral Timeline Line */}
        <div className="absolute left-[31px] top-4 bottom-8 w-[2px] bg-gradient-to-b from-rose-400 via-rose-300 to-rose-400" />

        <div className="space-y-4">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative flex items-start gap-4 pl-4"
            >
              {/* Dot / Heart Pin on Line */}
              <div className="absolute -left-[5px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-rose-500 flex items-center justify-center shadow-xs z-10">
                {item.isHeart ? (
                  <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                )}
              </div>

              {/* Card / Content */}
              <div className="flex-1 flex items-center gap-3">
                {/* Polaroid Photo (if available) */}
                {item.image ? (
                  <div
                    className={`w-16 h-18 bg-white p-1 pb-3 rounded-lg shadow-md border border-stone-200 shrink-0 transform ${item.tilt} hover:rotate-0 transition-transform`}
                  >
                    <img
                      src={item.image}
                      alt={item.milestone}
                      className="w-full h-12 object-cover rounded-xs"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-12 flex items-center justify-center bg-rose-100/60 rounded-xl border border-rose-200/80 shrink-0">
                    <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
                  </div>
                )}

                {/* Milestone Text */}
                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bold text-xs text-stone-900">{item.year}</span>
                    <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider">
                      {item.milestone}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-snug mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Script Flourish */}
      <div className="relative z-10 pb-5 pt-1 px-6 text-center">
        <p className="font-serif italic text-sm sm:text-base text-stone-700">
          Same People,
          <br />
          New Adventures,
          <br />
          <span className="font-bold text-stone-900">Always Us ♡</span>
        </p>

        {/* Subtle decorative leaf branch */}
        <div className="flex justify-center mt-1 text-emerald-600/80 text-lg">
          🌿
        </div>
      </div>
    </div>
  );
};
