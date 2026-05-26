import { useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      if (scrollProgressRef.current) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        scrollProgressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-[100dvh]">
      {/* Scroll progress bar */}
      <div
        ref={scrollProgressRef}
        className="scroll-progress"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* CRT scan line overlay */}
      <div className="crt-overlay" />

      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Vignette overlay */}
      <div className="vignette-overlay" />

      {/* Background grid */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid" />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10 pt-14">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
