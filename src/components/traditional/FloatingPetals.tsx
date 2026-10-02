import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  type: 'marigold' | 'rose' | 'jasmine' | 'gold-spark';
  initialRotate: number;
}

export const FloatingPetals: React.FC = () => {
  // Generate deterministic petals
  const petals: Petal[] = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.floor((i * 5.8 + 3) % 96), // spread across screen width (3% to 99%)
      size: 14 + (i % 4) * 6, // 14px to 32px
      duration: 12 + (i % 5) * 3, // 12s to 24s fall time
      delay: (i * 1.3) % 10,
      type: i % 3 === 0 ? 'marigold' : i % 3 === 1 ? 'rose' : 'jasmine',
      initialRotate: (i * 37) % 360,
    }));
  }, []);

  const getPetalStyle = (type: Petal['type']) => {
    switch (type) {
      case 'marigold':
        return 'bg-gradient-to-br from-[#FFA500] via-[#FF8C00] to-[#D4A843] rounded-tl-full rounded-br-full shadow-sm opacity-65';
      case 'rose':
        return 'bg-gradient-to-br from-[#B22222] via-[#8B1A1A] to-[#DC143C] rounded-full rounded-tr-none shadow-sm opacity-55';
      case 'jasmine':
      default:
        return 'bg-gradient-to-br from-[#FFFDF9] via-[#FAF0E6] to-[#F3DC9B] rounded-full rounded-bl-none shadow-sm opacity-70';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-0 pointer-events-none"
          style={{ left: `${petal.left}%` }}
          initial={{ y: -60, opacity: 0, rotate: petal.initialRotate }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, (petal.id % 2 === 0 ? 30 : -30), 0, (petal.id % 2 === 0 ? -25 : 25), 0],
            rotate: [petal.initialRotate, petal.initialRotate + 360],
            opacity: [0, 0.75, 0.8, 0.6, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className={`${getPetalStyle(petal.type)} transform`}
            style={{
              width: `${petal.size}px`,
              height: `${petal.size * 0.75}px`,
              filter: 'drop-shadow(0 2px 4px rgba(139,26,26,0.15))',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};
