import React from 'react';
import { motion } from 'motion/react';

interface TeatroPhotoFrameProps {
  customImage?: string;
  coupleNames?: string;
}

export const TeatroPhotoFrame: React.FC<TeatroPhotoFrameProps> = ({
  customImage,
  coupleNames = 'Sam & Sofía',
}) => {
  return (
    <section className="bg-white flex items-center justify-center py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="relative w-full max-w-sm sm:max-w-md flex justify-center"
      >
        {customImage ? (
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]/30">
            <img
              src={customImage}
              alt={`Portrait of ${coupleNames}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <img
            src="/assets/teatro/wedding-photo-frame.png"
            alt={`Wedding portrait in decorative vintage frame`}
            className="w-full h-auto object-contain drop-shadow-xl"
            loading="lazy"
          />
        )}
      </motion.div>
    </section>
  );
};
