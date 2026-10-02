import React, { useEffect, createContext, useContext, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: number | string | HTMLElement, options?: Record<string, unknown>) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with authentic luxury web smooth scrolling settings (like The Digital Yes)
    const lenis = new Lenis({
      duration: 1.25, // Silky momentum deceleration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential butter-smooth ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95, // Balanced wheel speed without sudden jumps
      touchMultiplier: 1.4, // Responsive touch scrolling
      infinite: false,
    });

    lenisRef.current = lenis;

    // Attach to window for global access if needed
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Continuous requestAnimationFrame loop
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Apply lenis class to html
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  const scrollTo = (
    target: number | string | HTMLElement,
    options?: Record<string, unknown>
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    } else {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
