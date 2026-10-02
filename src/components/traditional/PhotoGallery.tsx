import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_PHOTOS, TRADITIONAL_ASSETS } from '../../data/weddingData';
import { GalleryImage } from '../../types';
import { X, ZoomIn, Heart } from 'lucide-react';

export const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryImage | null>(null);

  return (
    <section id="gallery" className="relative w-full py-16 px-4 sm:px-6 bg-transparent overflow-hidden">
      
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 flex flex-col items-center"
        >
          <span className="text-xs font-cinzel font-semibold tracking-[0.25em] text-[#D4A843] uppercase mb-1">
            Glimpses of Love
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#8B1A1A] tracking-wide">
            Captured Moments
          </h2>
          <span className="font-telugu text-sm text-[#8B1A1A]/90 mt-0.5">
            (మధుర స్మృతులు)
          </span>
          <div className="w-44 h-4 my-2 opacity-85">
            <img src={TRADITIONAL_ASSETS.goldDivider} alt="" className="w-full h-full object-contain" />
          </div>
          <p className="font-cormorant italic text-sm sm:text-base text-[#5C4033] max-w-md">
            Every glance, every smile, and every shared dream that brought us to this sacred threshold.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full">
          {GALLERY_PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: (index % 3) * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-[#D4A843] shadow-[0_8px_20px_rgba(139,26,26,0.12)] cursor-pointer hover:shadow-2xl hover:border-[#8B1A1A] ring-1 ring-[#D4A843]/50 transition-all duration-300 bg-[#FFF5DE]"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D1C00]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-[#FFFDF9]">
                <span className="text-[10px] font-cinzel font-bold text-[#F3DC9B] uppercase tracking-wider">
                  0{index + 1} • {photo.title}
                </span>
                <p className="text-xs font-cormorant italic text-white/90 truncate">
                  {photo.caption}
                </p>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-2xl w-full bg-[#FFFDF9] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4A843]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>

              {/* Caption */}
              <div className="p-5 text-center bg-[#FFFDF9]">
                <h3 className="font-playfair text-xl font-bold text-[#8B1A1A]">
                  {selectedPhoto.title}
                </h3>
                {selectedPhoto.caption && (
                  <p className="font-cormorant italic text-sm text-[#5C4033] mt-1">
                    "{selectedPhoto.caption}"
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
