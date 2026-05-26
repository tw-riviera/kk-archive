import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TimelineEvent } from './timelineData';
import { eventTypeColors, eventTypeLabels } from './timelineData';
import RedactedText from './RedactedText';

interface TimelineEventCardProps {
  event: TimelineEvent;
}

export default function TimelineEventCard({ event }: TimelineEventCardProps) {
  const [expanded, setExpanded] = useState(false);
  const color = eventTypeColors[event.type];
  const isLeft = event.position === 'left';
  const special = event.specialVisual;

  const cardBg = special === 'dimmed' ? 'rgba(20, 30, 51, 0.5)' : '#141e33';

  return (
    <div
      className={`timeline-card-wrapper relative w-full md:w-[480px] ${isLeft ? 'md:ml-auto md:mr-[52%]' : 'md:mr-auto md:ml-[52%]'}`}
      data-event-id={event.id}
    >
      {/* Horizontal connector line (desktop only) */}
      <div
        className="hidden md:block absolute top-6 w-8 h-px"
        style={{
          backgroundColor: color,
          opacity: 0.4,
          ...(isLeft ? { right: '-2rem' } : { left: '-2rem' }),
        }}
      />

      <motion.div
        className="relative overflow-hidden rounded-sm p-6"
        style={{
          backgroundColor: cardBg,
          border: `1px solid #1a2744`,
          borderTop: `2px solid ${color}`,
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: special === 'climax' || special === 'dimmed' ? 0.8 : 0.6,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          delay: 0.1,
        }}
      >
        {/* Pulsing border for dramatic cards */}
        {special === 'dramatic' && (
          <motion.div
            className="absolute inset-0 rounded-sm pointer-events-none"
            style={{
              border: `1px solid ${color}`,
              opacity: 0.3,
            }}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Climactic glow */}
        {special === 'climax' && (
          <motion.div
            className="absolute inset-0 rounded-sm pointer-events-none"
            style={{
              boxShadow: `inset 0 0 20px rgba(220, 38, 38, 0.1)`,
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Time + Type Badge */}
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
            {eventTypeLabels[event.type]}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-h3 font-sans text-ice-white mb-1">
          {event.titleCn}
        </h3>
        <p className="font-mono text-caption tracking-wider text-ghost-grey mb-4">
          {event.titleEn}
        </p>

        {/* Divider */}
        <div className="h-px w-full bg-grid-blue mb-4" />

        {/* Content */}
        <AnimatePresence initial={false}>
          <motion.div
            initial={false}
            animate={{ height: expanded ? 'auto' : 120 }}
            className="overflow-hidden"
          >
            <div className="text-body font-sans text-ice-white whitespace-pre-line">
              {event.content.split('\n').map((line, i) => (
                <p key={i} className={line.trim() === '' ? 'h-2' : 'mb-2'}>
                  {line}
                </p>
              ))}
            </div>

            {/* Redacted items */}
            {event.redactedItems && event.redactedItems.length > 0 && (
              <div className="mt-4 space-y-2">
                {event.redactedItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="font-mono text-[10px] tracking-wider text-ghost-grey mt-1">›</span>
                    <div className="font-mono text-caption tracking-wider text-ghost-grey">
                      <RedactedText
                        label={item.label}
                        reveal={item.reveal}
                      />
                    </div>
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
          </motion.div>
        </AnimatePresence>

        {/* Expand/Collapse button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 font-mono text-[10px] tracking-wider text-ghost-grey hover:text-steel-cyan transition-colors duration-200"
        >
          {expanded ? '[ COLLAPSE ]' : '[ EXPAND ]'}
        </button>

        {/* File Ref */}
        <div className="mt-4 pt-3 border-t border-grid-blue flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="text-ghost-grey">
              <path d="M5.5 0H0v12h10V3.5L5.5 0z" fill="currentColor" fillOpacity="0.3" />
              <path d="M5.5 0v3.5H10" stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.5" />
            </svg>
            <span className="font-mono text-[10px] tracking-wider text-ghost-grey">
              {event.fileRef}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
