import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { terminalLogs, logTypeColors } from './timelineData';
import type { TerminalLogEntry } from './timelineData';

gsap.registerPlugin(ScrollTrigger);

export default function TerminalLog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor
  useGSAP(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  });

  useGSAP(() => {
    if (!containerRef.current || !terminalRef.current || !logContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Terminal window opens
      gsap.fromTo(
        terminalRef.current,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Log entries cascade in
      const logEntries = logContainerRef.current?.querySelectorAll('.log-entry');
      if (logEntries && logEntries.length > 0) {
        gsap.fromTo(
          logEntries,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.03,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full py-24">
      <div className="mx-auto max-w-[960px] px-4 lg:px-8">
        {/* Section label */}
        <p className="text-center font-mono text-label tracking-wider text-ghost-grey mb-8">
          [ RAW INTELLIGENCE LOGS ]
        </p>

        {/* Terminal window */}
        <div
          ref={terminalRef}
          className="rounded-sm overflow-hidden"
          style={{
            border: '1px solid #1a2744',
            backgroundColor: '#050508',
            transformOrigin: 'top',
          }}
        >
          {/* Window chrome */}
          <div
            className="flex items-center justify-between px-4 py-2 border-b border-grid-blue"
            style={{ backgroundColor: '#0a0f1e' }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-classified-red/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-alert-amber/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-surveillance-green/60" />
            </div>
            <span className="font-mono text-[10px] tracking-wider text-ghost-grey">
              PHANTOM-7 TERMINAL — RAW INTELLIGENCE FEED
            </span>
            <span className="font-mono text-[10px] tracking-wider text-surveillance-green">
              [ENCRYPTED]
            </span>
          </div>

          {/* Terminal title bar */}
          <div
            className="px-4 py-1.5 border-b border-grid-blue/50"
            style={{ backgroundColor: '#0a0f1e' }}
          >
            <span className="font-mono text-[10px] tracking-wider text-steel-cyan">
              [ENCRYPTED CHANNEL — ALPHA CLEARANCE]
            </span>
          </div>

          {/* Log entries */}
          <div
            ref={logContainerRef}
            className="p-4 md:p-6 overflow-x-auto"
          >
            <div className="min-w-[600px] md:min-w-0">
              {terminalLogs.map((log, index) => (
                <LogLine key={index} log={log} />
              ))}

              {/* Blinking cursor */}
              <div className="mt-4 flex items-center gap-1">
                <span
                  className="font-mono text-mono-code tracking-wider"
                  style={{ color: '#10b981' }}
                >
                  {'>'}
                </span>
                <span
                  className="font-mono text-mono-code"
                  style={{
                    color: '#10b981',
                    opacity: cursorVisible ? 1 : 0,
                    transition: 'opacity 0ms',
                  }}
                >
                  _
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogLine({ log }: { log: TerminalLogEntry }) {
  const color = logTypeColors[log.type];

  const typePrefix =
    log.type === 'ALERT' || log.type === 'WARNING'
      ? `${log.type}:`
      : log.type === 'CRITICAL' || log.type === 'CASUALTY'
        ? `${log.type}:`
        : log.type === 'THREAT'
          ? 'THREAT:'
          : log.type === 'SYSTEM'
            ? '⚠⚠⚠'
            : `${log.type}:`;

  return (
    <div
      className="log-entry font-mono text-mono-code tracking-wider py-0.5"
      style={{ opacity: 0 }}
    >
      <span style={{ color: '#94a3b8' }}>[{log.timestamp}]</span>
      {' '}
      <span style={{ color, fontWeight: log.type === 'CRITICAL' || log.type === 'THREAT' || log.type === 'SYSTEM' ? 600 : 400 }}>
        {typePrefix}
      </span>
      {' '}
      <span
        style={{
          color:
            log.type === 'THREAT' || log.type === 'SYSTEM'
              ? '#dc2626'
              : log.type === 'TRANSCRIPT'
                ? '#e2e8f0'
                : '#e2e8f0',
        }}
      >
        {log.message}
      </span>
    </div>
  );
}
