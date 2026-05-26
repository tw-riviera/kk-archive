import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ScrollTimeline from '@/components/timeline/ScrollTimeline';
import TerminalLog from '@/components/timeline/TerminalLog';
import LocationCards from '@/components/timeline/LocationCards';

gsap.registerPlugin(ScrollTrigger);

export default function Incident() {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const prefaceRef = useRef<HTMLDivElement>(null);
  const summaryBarRef = useRef<HTMLDivElement>(null);

  const [activeEvent, setActiveEvent] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [, setAllExpanded] = useState(false);

  // Header entrance animations (GSAP - scroll-driven storytelling context)
  useGSAP(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Title fade in + slide up
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );

      // Red line draws
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.out', transformOrigin: 'left' },
        '-=0.2'
      );

      // Metadata bar
      tl.fromTo(
        metaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      );

      // Preface
      tl.fromTo(
        prefaceRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Summary bar visibility: appears after scrolling past Event 3
  useGSAP(() => {
    if (!summaryBarRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'bottom top',
        onEnter: () => setShowSummary(true),
        onLeaveBack: () => setShowSummary(false),
      });
    });

    return () => ctx.revert();
  }, []);

  const handleActiveEventChange = useCallback((eventId: number) => {
    setActiveEvent(eventId);
  }, []);

  const handleExpandAll = useCallback(() => {
    setAllExpanded(true);
    const buttons = document.querySelectorAll('[data-expand-btn]');
    buttons.forEach((btn) => {
      const event = new MouseEvent('click', { bubbles: true });
      btn.dispatchEvent(event);
    });
  }, []);

  const handleCollapseAll = useCallback(() => {
    setAllExpanded(false);
  }, []);

  return (
    <div className="min-h-[100dvh]" style={{ backgroundColor: '#050508' }}>
      {/* ========== SECTION 1: PAGE HEADER ========== */}
      <div
        ref={headerRef}
        className="relative w-full pt-24 pb-10 px-4 lg:px-8"
        style={{ backgroundColor: '#050508' }}
      >
        <div className="mx-auto max-w-[1280px]">
          {/* Breadcrumb */}
          <div className="mb-8">
            <span className="font-mono text-caption tracking-wider text-ghost-grey">
              PHANTOM-7 //{' '}
              <Link
                to="/"
                className="text-steel-cyan hover:text-ice-white transition-colors duration-200"
              >
                BRIEFING
              </Link>
              {' > '}INCIDENT TIMELINE
            </span>
          </div>

          {/* Page title */}
          <h1
            ref={titleRef}
            className="text-display-xl font-display text-ice-white mb-2"
            style={{ opacity: 0 }}
          >
            INCIDENT TIMELINE
          </h1>

          {/* Chinese subtitle */}
          <div
            ref={subtitleRef}
            className="text-h2 font-sans text-ice-white/80 mb-4"
            style={{ opacity: 0 }}
          >
            事件時間線
          </div>

          {/* Red line */}
          <div
            ref={lineRef}
            className="h-px w-48 mb-8"
            style={{
              backgroundColor: '#dc2626',
              transform: 'scaleX(0)',
              transformOrigin: 'left',
            }}
          />

          {/* Report metadata bar */}
          <div
            ref={metaRef}
            className="mb-12"
            style={{ opacity: 0 }}
          >
            <span className="font-mono text-caption tracking-wider text-ghost-grey">
              DOC REF: CW-TIMELINE-001{' '}
              <span className="mx-3 text-grid-blue">|</span>{' '}
              INCIDENT PERIOD: DEC 2015{' '}
              <span className="mx-3 text-grid-blue">|</span>{' '}
              EVENTS: 12{' '}
              <span className="mx-3 text-grid-blue">|</span>{' '}
              CLASSIFICATION:{` `}
              <span className="text-classified-red">TOP SECRET</span>
            </span>
          </div>

          {/* Operative's Preface */}
          <div
            ref={prefaceRef}
            className="max-w-[640px] mb-8"
            style={{ opacity: 0 }}
          >
            <p className="text-body font-sans text-ice-white whitespace-pre-line">
              The following is a reconstructed chronological account{'\n'}
              of Operation Cold War, compiled from police logs,{'\n'}
              surveillance footage, witness statements, and{'\n'}
              classified intelligence sources.{'\n\n'}
              Times are recorded in HKT (UTC+8).
            </p>
          </div>
        </div>
      </div>

      {/* ========== SECTION 2: TIMELINE ========== */}
      <div
        className="relative w-full py-8 px-4 lg:px-8"
        style={{
          backgroundColor: '#0a0f1e',
          backgroundImage:
            'linear-gradient(rgba(56, 189, 248, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        <div className="mx-auto max-w-[1280px] relative">
          <ScrollTimeline onActiveEventChange={handleActiveEventChange} />
        </div>
      </div>

      {/* ========== SECTION 3: TIMELINE SUMMARY BAR ========== */}
      <div
        ref={summaryBarRef}
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-grid-blue transition-transform duration-300"
        style={{
          backgroundColor: 'rgba(5, 5, 8, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transform: showSummary ? 'translateY(0)' : 'translateY(48px)',
        }}
      >
        <div className="mx-auto max-w-[1280px] px-4 lg:px-8 h-12 flex items-center justify-between">
          {/* Progress bar */}
          <div className="flex items-center gap-4 flex-1">
            <div
              className="h-1 flex-1 max-w-[200px] rounded-full overflow-hidden"
              style={{ backgroundColor: '#1a2744' }}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  backgroundColor: '#dc2626',
                  width: `${((activeEvent) / 12) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Event count */}
          <span className="font-mono text-caption tracking-wider text-ghost-grey mr-6">
            EVENT {Math.max(1, activeEvent)}/12
          </span>

          {/* Time */}
          <span className="font-mono text-caption tracking-wider text-ghost-grey mr-6 hidden sm:block">
            {activeEvent > 0
              ? [
                  '23:47 HKT',
                  '00:15 HKT',
                  '00:38 HKT',
                  '02:17 HKT',
                  '03:55 HKT',
                  '09:30 HKT',
                  '14:22 HKT',
                  '16:08 HKT',
                  '18:45 HKT',
                  '20:10 HKT',
                  '23:15 HKT',
                  '23:47 HKT',
                ][activeEvent - 1] || '--:-- HKT'
              : '--:-- HKT'}
          </span>

          {/* Expand/Collapse */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExpandAll}
              className="font-mono text-[10px] tracking-wider text-ghost-grey hover:text-steel-cyan transition-colors duration-200"
            >
              [ EXPAND ALL ]
            </button>
            <button
              onClick={handleCollapseAll}
              className="font-mono text-[10px] tracking-wider text-ghost-grey hover:text-steel-cyan transition-colors duration-200"
            >
              [ COLLAPSE ALL ]
            </button>
          </div>
        </div>
      </div>

      {/* ========== SECTION 4: TERMINAL LOG ========== */}
      <div style={{ backgroundColor: '#050508' }}>
        <TerminalLog />
      </div>

      {/* ========== SECTION 5: KEY LOCATIONS ========== */}
      <LocationCards />

      {/* Bottom padding to account for summary bar */}
      <div className="h-12" />
    </div>
  );
}
