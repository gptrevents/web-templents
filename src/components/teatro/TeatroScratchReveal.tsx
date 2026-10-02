import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { TeatroLang } from './TeatroLangSwitch';

interface ScratchCircleProps {
  text: string;
  index: number;
  onReveal: () => void;
}

const ScratchCircle: React.FC<ScratchCircleProps> = ({ text, index, onReveal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = '/assets/teatro/scratch-gold.png';
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || hasTriggeredRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    const totalPixels = imgData.data.length / 4;

    for (let i = 3; i < imgData.data.length; i += 4) {
      if (imgData.data[i] === 0) {
        transparentPixels++;
      }
    }

    const percentage = (transparentPixels / totalPixels) * 100;
    if (percentage > 45) {
      setRevealed(true);
      hasTriggeredRef.current = true;
      onReveal();
    }
  }, [onReveal]);

  const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX: number;
    let clientY: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleEnd = () => {
    setIsDrawing(false);
    checkScratchPercentage();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.12 }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center"
    >
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-inner border border-[#5C2018]/20 bg-[#FAF8F5]">
        {/* Revealed Content underneath */}
        <div className="absolute inset-0 flex items-center justify-center select-none">
          <span
            className="font-display text-2xl sm:text-3xl font-semibold tracking-wide"
            style={{ color: '#5C2018' }}
          >
            {text}
          </span>
        </div>

        {/* Scratchable Gold Canvas Layer */}
        <canvas
          ref={canvasRef}
          width={150}
          height={150}
          style={{
            touchAction: 'none',
            WebkitUserSelect: 'none',
            userSelect: 'none',
          }}
          className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-700 ${
            revealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          onMouseDown={() => setIsDrawing(true)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onMouseMove={(e) => isDrawing && scratch(e)}
          onTouchStart={(e) => {
            setIsDrawing(true);
            scratch(e);
          }}
          onTouchEnd={handleEnd}
          onTouchMove={(e) => {
            scratch(e);
          }}
          onTouchCancel={handleEnd}
        />
      </div>
    </motion.div>
  );
};

interface TeatroScratchRevealProps {
  day?: string;
  month?: string;
  year?: string;
  lang?: TeatroLang;
}

export const TeatroScratchReveal: React.FC<TeatroScratchRevealProps> = ({
  day = '10',
  month = 'Sept',
  year = '2027',
  lang = 'en',
}) => {
  const [revealedCount, setRevealedCount] = useState(0);
  const [allRevealed, setAllRevealed] = useState(false);

  const translations = {
    en: {
      title: 'Reveal',
      subtitle: 'Scratch to discover the date',
      hint: 'Scratch all three circles to continue',
      celebration: "We're getting married!",
    },
    it: {
      title: 'Rivela',
      subtitle: 'Gratta per scoprire la data',
      hint: 'Gratta tutti e tre i cerchi per continuare',
      celebration: 'Ci sposiamo!',
    },
    te: {
      title: 'లగ్న పత్రిక',
      subtitle: 'శుభ ముహూర్త తేదీని తెలుసుకోవడానికి స్క్రాచ్ చేయండి',
      hint: 'మూడు వలయాలను వేలితో స్క్రాచ్ చేయండి',
      celebration: 'మా వివాహానికి సాదర స్వాగతం!',
    },
  };

  const t = translations[lang] || translations.en;
  const circles = [day, month, year];

  const handleCircleReveal = useCallback(() => {
    setRevealedCount((prev) => {
      const next = prev + 1;
      if (next === 3) {
        setAllRevealed(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#5C2018', '#D4AF37', '#FAF8F5', '#8B263E'],
        });
      }
      return next;
    });
  }, []);

  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center py-16 px-6 bg-[#FAF8F5]">
      {/* Hand Hint Animation when not all scratched */}
      {revealedCount < 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6 flex flex-col items-center justify-center"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 rounded-full border border-[#5C2018]/30 animate-ping opacity-50" />
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(92, 32, 24, 0.08)',
                border: '1px solid rgba(92, 32, 24, 0.25)',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5C2018"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-75"
              >
                <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v0" />
                <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v6" />
                <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
                <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
              </svg>
            </div>
          </div>

          <p
            className="mt-3 font-body text-xs tracking-wide text-center"
            style={{ color: 'rgba(92, 32, 24, 0.7)' }}
          >
            {t.hint}
          </p>
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2
          className="font-script text-4xl sm:text-5xl md:text-6xl mb-3"
          style={{ color: '#5C2018' }}
        >
          {t.title}
        </h2>
        <p
          className="font-body text-xs sm:text-sm tracking-[0.18em] uppercase"
          style={{ color: '#5C2018' }}
        >
          {t.subtitle}
        </p>
      </motion.div>

      {/* 3 Interactive Scratch Gold Circles */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10">
        {circles.map((item, idx) => (
          <ScratchCircle
            key={idx}
            text={item}
            index={idx}
            onReveal={handleCircleReveal}
          />
        ))}
      </div>

      {/* Wedding Announcement Banner */}
      <AnimatePresence>
        {allRevealed && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="font-script text-3xl sm:text-4xl mt-10 text-center"
            style={{ color: '#5C2018' }}
          >
            {t.celebration}
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
};
