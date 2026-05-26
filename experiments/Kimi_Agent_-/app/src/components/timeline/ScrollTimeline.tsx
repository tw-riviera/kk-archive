import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { timelineEvents, eventTypeColors } from './timelineData';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTimelineProps {
  onActiveEventChange?: (eventId: number) => void;
}

export default function ScrollTimeline({ onActiveEventChange }: ScrollTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [activeEvent, setActiveEvent] = useState(0);

  useGSAP(() => {
    if (!containerRef.current || !lineRef.current || !lineFillRef.current) return;

    const ctx = gsap.context(() => {
      // Line fill animation tied to scroll
      gsap.to(lineFillRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.5,
          onUpdate: (self) => {
            progressRef.current = self.progress;
            // Determine active event based on scroll progress
            const eventIndex = Math.min(
              Math.floor(self.progress * timelineEvents.length),
              timelineEvents.length - 1
            );
            setActiveEvent(eventIndex);
            onActiveEventChange?.(eventIndex + 1);
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onActiveEventChange]);

  return (
    <div ref={containerRef} className="relative py-16 md:py-24">
      {/* Timeline line container */}
      <div
        ref={lineRef}
        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-px"
        style={{ backgroundColor: '#1a2744' }}
      >
        {/* Filled portion of the line */}
        <div
          ref={lineFillRef}
          className="absolute top-0 left-0 w-full origin-top"
          style={{
            backgroundColor: '#dc2626',
            height: '100%',
            transform: 'scaleY(0)',
            boxShadow: '0 0 8px rgba(220, 38, 38, 0.4)',
          }}
        />
      </div>

      {/* Event nodes on the timeline */}
      {timelineEvents.map((event, index) => {
        const color = eventTypeColors[event.type];
        const isActive = index <= activeEvent;
        const isCurrent = index === activeEvent;

        return (
          <div
            key={`node-${event.id}`}
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10"
            style={{ top: `${((index) / (timelineEvents.length - 1)) * 100}%` }}
          >
            {/* Node glow effect */}
            {isCurrent && (
              <div
                className="absolute -inset-2 rounded-full animate-pulse-warning"
                style={{
                  backgroundColor: `${color}30`,
                }}
              />
            )}
            {/* Node circle */}
            <div
              className="relative w-4 h-4 rounded-full border-2 transition-all duration-300"
              style={{
                backgroundColor: isActive ? color : '#0a0f1e',
                borderColor: color,
                boxShadow: isActive ? `0 0 12px ${color}60` : 'none',
                transform: isCurrent ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          </div>
        );
      })}

      {/* Event cards */}
      <div className="relative space-y-16 md:space-y-24">
        {timelineEvents.map((event) => (
          <TimelineEventNode
            key={event.id}
            event={event}
          />
        ))}
      </div>
    </div>
  );
}

// Individual node with card
interface TimelineEventNodeProps {
  event: typeof timelineEvents[number];
}

function TimelineEventNode({ event }: TimelineEventNodeProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const isLeft = event.position === 'left';
  const color = eventTypeColors[event.type];
  const special = event.specialVisual;

  useGSAP(() => {
    if (!cardRef.current || !nodeRef.current) return;

    const ctx = gsap.context(() => {
      // Card slide-in animation
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          x: isLeft ? -60 : 60,
          ...(special === 'climax' ? { scale: 0.95 } : {}),
        },
        {
          opacity: 1,
          x: 0,
          ...(special === 'climax' ? { scale: 1 } : {}),
          duration: special === 'climax' || special === 'dimmed' ? 0.8 : 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Node pulse on activation
      const nodeCircle = nodeRef.current?.querySelector('.node-circle');
      if (nodeCircle) {
        gsap.fromTo(
          nodeCircle,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, [isLeft, special]);

  const cardBg = special === 'dimmed' ? 'rgba(20, 30, 51, 0.5)' : '#141e33';

  return (
    <div className="relative">
      {/* Timeline node (visible on mobile at left, desktop centered) */}
      <div
        ref={nodeRef}
        className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10"
        style={{ top: '1.5rem' }}
      >
        <div
          className="node-circle relative w-4 h-4 rounded-full border-2"
          style={{
            backgroundColor: color,
            borderColor: color,
            boxShadow: `0 0 12px ${color}60`,
          }}
        >
          {event.type === 'CRITICAL' && (
            <span
              className="absolute -inset-1.5 rounded-full animate-pulse-warning"
              style={{ backgroundColor: `${color}20` }}
            />
          )}
        </div>
      </div>

      {/* Horizontal connector */}
      <div
        className="hidden md:block absolute top-8 h-px z-0"
        style={{
          backgroundColor: color,
          opacity: 0.3,
          width: '2rem',
          ...(isLeft
            ? { right: '50%', marginRight: '0.5rem' }
            : { left: '50%', marginLeft: '0.5rem' }),
        }}
      />

      {/* Card */}
      <div
        ref={cardRef}
        className={`relative ml-12 md:ml-0 md:w-[44%] ${
          isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
        }`}
        style={{ opacity: 0 }}
      >
        <div
          className="rounded-sm p-6 relative overflow-hidden"
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${special === 'dimmed' ? 'rgba(26, 39, 68, 0.5)' : '#1a2744'}`,
            borderTop: `2px solid ${color}`,
            boxShadow: special === 'climax'
              ? '0 4px 32px rgba(220, 38, 38, 0.15)'
              : '0 4px 24px rgba(0,0,0,0.3)',
          }}
        >
          {/* Pulsing border for dramatic */}
          {special === 'dramatic' && (
            <div
              className="absolute inset-0 rounded-sm pointer-events-none animate-pulse-warning"
              style={{ border: `1px solid ${color}`, opacity: 0.2 }}
            />
          )}

          {/* Climax glow */}
          {special === 'climax' && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 30px rgba(220, 38, 38, 0.08)',
              }}
            />
          )}

          {/* Time + Type */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-caption tracking-wider text-ghost-grey">
              {event.time}
            </span>
            <span
              className="rounded-sm px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider"
              style={{
                color,
                border: `1px solid ${color}`,
                backgroundColor: `${color}15`,
              }}
            >
              {event.type}
            </span>
          </div>

          {/* Titles */}
          <h3 className="text-h3 font-sans text-ice-white mb-1">
            {event.titleCn}
          </h3>
          <p className="font-mono text-caption tracking-wider text-ghost-grey mb-4">
            // {event.titleEn}
          </p>

          <div className="h-px w-full bg-grid-blue mb-4" />

          {/* Content */}
          <div className="text-body font-sans text-ice-white">
            {event.content.split('\n').map((line, i) => {
              if (line.trim().startsWith('▸')) {
                // Bullet point with traitor names
                const match = line.match(/▸\s*(.+?)——/);
                const traitorName = match ? match[1] : '';
                return (
                  <p key={i} className="mb-2 flex items-start gap-2">
                    <span className="text-steel-cyan mt-1">▸</span>
                    <span>
                      {traitorName && (
                        <span className="text-traitor-red font-medium">{traitorName}</span>
                      )}
                      {line.replace(/▸\s*.+?——/, '——')}
                    </span>
                  </p>
                );
              }
              if (line.trim() === '') {
                return <div key={i} className="h-2" />;
              }
              return <p key={i} className="mb-2">{line}</p>;
            })}
          </div>

          {/* Redacted items */}
          {event.redactedItems && event.redactedItems.length > 0 && (
            <div className="mt-4 space-y-2">
              {event.redactedItems.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-2 cursor-help"
                >
                  <span className="font-mono text-[10px] tracking-wider text-ghost-grey mt-1 flex-shrink-0">›</span>
                  <RedactedInline label={item.label} reveal={item.reveal} />
                </div>
              ))}
            </div>
          )}

          {/* Quote block */}
          {event.quoteBlock && (
            <blockquote className="mt-4 border-l-2 border-alert-amber pl-4 py-1">
              <p className="text-body font-sans text-alert-amber italic">
                &ldquo;{event.quoteBlock.text}&rdquo;
              </p>
              <cite className="font-mono text-caption tracking-wider text-ghost-grey not-italic mt-1 block">
                — {event.quoteBlock.author}
              </cite>
            </blockquote>
          )}

          {/* File ref */}
          <div className="mt-4 pt-3 border-t border-grid-blue flex items-center gap-1.5">
            <FileIcon />
            <span className="font-mono text-[10px] tracking-wider text-ghost-grey">
              {event.fileRef}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline redacted text (no framer motion, pure CSS for GSAP-isolated component)
function RedactedInline({ label, reveal }: { label: string; reveal: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="relative inline-block cursor-help"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="font-mono text-caption tracking-wider transition-all duration-300"
        style={{
          color: hovered ? '#10b981' : 'transparent',
          backgroundColor: hovered ? 'transparent' : '#000',
          padding: hovered ? '0' : '0 4px',
        }}
      >
        {reveal}
      </span>
      {!hovered && (
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[0.55em] tracking-wider text-classified-red whitespace-nowrap pointer-events-none"
        >
          [REDACTED: {label}]
        </span>
      )}
    </span>
  );
}

function FileIcon() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="text-ghost-grey flex-shrink-0">
      <path d="M5.5 0H0v12h10V3.5L5.5 0z" fill="currentColor" fillOpacity="0.3" />
      <path d="M5.5 0v3.5H10" stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.5" />
    </svg>
  );
}
