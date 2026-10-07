import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  size: number;
  alpha: number;
  decay: number;
  type: 'rice' | 'pearl' | 'rose' | 'marigold';
  color: string;
}

interface KmTalambraluProps {
  triggerKey?: number;
}

export const KmTalambralu: React.FC<KmTalambraluProps> = ({ triggerKey = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const spawnTalambraluShower = (centerX?: number, centerY?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const count = 90;

    for (let i = 0; i < count; i++) {
      // Spawn either near click origin or across the top of screen
      const startX =
        centerX !== undefined
          ? centerX + (Math.random() - 0.5) * 200
          : Math.random() * width;
      const startY =
        centerY !== undefined
          ? centerY + (Math.random() - 0.5) * 100
          : -20 - Math.random() * 80;

      const rand = Math.random();
      let type: Particle['type'] = 'rice';
      let color = '#FFD700'; // Turmeric gold rice
      let size = 3 + Math.random() * 4;

      if (rand < 0.55) {
        // Yellow Turmeric Rice (అక్షతలు)
        type = 'rice';
        color = Math.random() > 0.4 ? '#EAB308' : '#F59E0B';
        size = 3.5 + Math.random() * 3.5;
      } else if (rand < 0.72) {
        // White Pearl (ముత్యాలు)
        type = 'pearl';
        color = '#FFFFFF';
        size = 4 + Math.random() * 3;
      } else if (rand < 0.88) {
        // Rose Petal (గులాబీ రేకులు)
        type = 'rose';
        color = '#E11D48';
        size = 7 + Math.random() * 6;
      } else {
        // Marigold Petal (బంతి పూల రేకులు)
        type = 'marigold';
        color = '#F97316';
        size = 6 + Math.random() * 5;
      }

      particlesRef.current.push({
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 4,
        vy: 2.2 + Math.random() * 4.5,
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 8,
        size,
        alpha: 1,
        decay: 0.004 + Math.random() * 0.006,
        type,
        color,
      });
    }
  };

  // Trigger when prop changes
  useEffect(() => {
    if (triggerKey > 0) {
      spawnTalambraluShower();
    }
  }, [triggerKey]);

  // Click listener anywhere on page
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Don't spawn if clicking input, button or link to keep form interactions clean
      const target = e.target as HTMLElement;
      if (
        target.closest('input') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('textarea')
      ) {
        return;
      }
      spawnTalambraluShower(e.clientX, e.clientY);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // Gravity
        p.vx *= 0.99; // Air drag
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > canvas.height + 40) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.type === 'pearl') {
          // Shiny circular pearl
          const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, p.size);
          grad.addColorStop(0, '#FFFFFF');
          grad.addColorStop(0.7, '#F3E8FF');
          grad.addColorStop(1, '#D8B4FE');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'rice') {
          // Oblong rice grain shape
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.45, p.size * 1.1, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Petal curved tear drop shape
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.5, p.size * 0.8, p.size * 0.5, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.5, -p.size * 0.8, -p.size * 0.5, 0, -p.size);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      aria-hidden="true"
    />
  );
};
