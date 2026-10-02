import React from 'react';
import { motion } from 'motion/react';
import { TRADITIONAL_ASSETS, WEDDING_COUPLE } from '../../data/weddingData';
import { Video, Radio, ExternalLink, Sparkles } from 'lucide-react';

export const LiveStreamVideo: React.FC = () => {
  return (
    <section id="video" className="relative w-full py-16 px-4 sm:px-6 bg-transparent overflow-hidden">
      
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 flex flex-col items-center"
        >
          <div className="flex items-center gap-1.5 text-xs font-cinzel font-semibold tracking-[0.25em] text-[#D4A843] uppercase mb-1">
            <Radio className="w-4 h-4 text-[#8B1A1A] animate-pulse" />
            <span>Virtual Attendance</span>
          </div>
          
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#8B1A1A] tracking-wide">
            Live Stream &amp; Teaser
          </h2>
          <span className="font-telugu text-sm text-[#8B1A1A]/90 mt-0.5">
            (ప్రత్యక్ష ప్రసార దర్శనం)
          </span>
          <div className="w-44 h-4 my-2 opacity-85">
            <img src={TRADITIONAL_ASSETS.goldDivider} alt="" className="w-full h-full object-contain" />
          </div>
          <p className="font-cormorant italic text-sm sm:text-base text-[#5C4033] max-w-md">
            For our beloved family members and well-wishers celebrating with us across oceans and distant cities.
          </p>
        </motion.div>

        {/* Video Card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-3xl rounded-2xl bg-[#FFF5DE] border-2 border-[#D4A843] shadow-[0_12px_28px_rgba(139,26,26,0.15)] overflow-hidden"
        >
          
          {/* YouTube Teaser Player */}
          <div className="relative w-full aspect-video bg-black">
            <iframe
              title="Wedding Journey Teaser"
              src="https://www.youtube-nocookie.com/embed/VouPYyg0z2U?rel=0"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Live Stream Call to Action */}
          <div className="p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#FFF5DE] via-[#FCECC7] to-[#F8E1B5] border-t border-[#D4A843]/40">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                <span className="text-xs font-cinzel font-bold text-[#8B1A1A] uppercase tracking-wider">
                  Live Telecast on 12 December 2026
                </span>
              </div>
              <h3 className="font-playfair text-xl font-bold text-[#3D1C00] mt-0.5">
                Muhurtham &amp; Talambralu Live Broadcast
              </h3>
              <p className="text-xs text-[#5C4033] font-sans-clean mt-1">
                The stream goes live at 10:15 AM IST. HD multi-camera telecast with live Vedic commentary.
              </p>
            </div>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#8B1A1A] hover:bg-[#680E0E] text-[#FFFDF9] font-cinzel font-semibold text-xs tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0 cursor-pointer border border-[#D4A843]"
            >
              <Video className="w-4 h-4 text-[#F3DC9B]" />
              <span>Watch Live Stream</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#F3DC9B]" />
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
