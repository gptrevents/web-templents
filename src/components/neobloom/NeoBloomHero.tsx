import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Heart, Sparkles, ChevronDown } from 'lucide-react';

interface NeoBloomHeroProps {
  guestName: string;
  onExplore: () => void;
  groom?: string;
  bride?: string;
  date?: string;
  venue?: string;
}

export const NeoBloomHero: React.FC<NeoBloomHeroProps> = ({
  guestName,
  onExplore,
  groom = 'Arjun',
  bride = 'Priya',
  date = 'శనివారం, 12 డిసెంబర్ 2026',
  venue = 'శ్రీ కన్వెన్షన్ హాల్, విజయవాడ',
}) => {
  return (
    <section id="hero" className="relative w-full min-h-[92vh] flex flex-col items-center justify-between text-center overflow-hidden bg-gradient-to-b from-[#FFF5F7] via-[#FFF1F2] to-[#FFF9FA] pt-12 pb-14 px-4 sm:px-6">
      
      {/* Decorative Floating Floral Blooms Background */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-12 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Top Auspicious Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 border border-rose-200 shadow-2xs text-rose-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>రెండు మనసులు కలిసిన శుభవేళ ♡ Two Hearts, One Journey</span>
        </div>

        {/* Personalized Guest Badge */}
        {guestName && (
          <div className="inline-block px-4 py-1.5 rounded-2xl bg-rose-50 border border-rose-200/80 text-xs text-rose-900 font-medium mb-4 shadow-2xs">
            గౌరవనీయులైన <span className="font-bold font-serif text-sm text-rose-700">{guestName}</span> గారికి సాదర వివాహ ఆహ్వానం
          </div>
        )}
      </motion.div>

      {/* Centerpiece Couple Card with Romantic Arch & Lights */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative z-10 max-w-xl w-full flex flex-col items-center my-4"
      >
        {/* Couple Silhouette & Archway from Image 2 */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2 bg-gradient-to-tr from-rose-400 via-pink-300 to-amber-300 shadow-2xl mb-6">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white relative bg-gradient-to-b from-[#1C050C] via-[#330818] to-[#120309] flex items-center justify-center">
            
            {/* Background glowing lanterns / stars */}
            <div className="absolute inset-0 bg-[radial-gradient(#F43F5E_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
            
            {/* Romantic Couple Silhouette */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
              <span className="text-4xl sm:text-5xl mb-1 animate-bounce">👩‍❤️‍👨</span>
              <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium tracking-widest uppercase">
                Forever &amp; Always
              </div>
            </div>

            {/* Glowing Ring Effect */}
            <div className="absolute inset-0 rounded-full border border-rose-300/30 animate-ping opacity-25" />
          </div>
        </div>

        {/* Couple Names */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-none mb-3">
          <span className="text-rose-700">{groom}</span>
          <span className="font-light italic text-amber-600 mx-3">&amp;</span>
          <span className="text-stone-900">{bride}</span>
        </h1>

        <p className="font-serif italic text-base sm:text-lg text-rose-800/90 max-w-md mx-auto mb-5 leading-relaxed">
          &ldquo;కలిసే అడుగుల్లో జీవితం మొదలైంది.. మీ ఆశీస్సులతో ఈ ప్రయాణం పరిపూర్ణమవ్వాలి.&rdquo;
        </p>

        {/* Date, Time & Venue Highlight Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-stone-700 font-medium">
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-rose-200/90 shadow-2xs">
            <Calendar className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{date}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-rose-200/90 shadow-2xs">
            <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{venue}</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 flex flex-col items-center mt-4"
      >
        <button
          onClick={onExplore}
          className="group flex flex-col items-center text-xs font-semibold text-rose-700 hover:text-rose-900 transition cursor-pointer"
        >
          <span className="mb-1">ప్రేమ కథ &amp; వేడుకల వివరాలు</span>
          <div className="w-8 h-8 rounded-full bg-white border border-rose-200 shadow-2xs flex items-center justify-center group-hover:translate-y-1 transition-transform">
            <ChevronDown className="w-4 h-4 text-rose-600" />
          </div>
        </button>
      </motion.div>

    </section>
  );
};
