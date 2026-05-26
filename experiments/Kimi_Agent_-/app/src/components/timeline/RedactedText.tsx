import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface RedactedTextProps {
  label: string;
  reveal: string;
  className?: string;
}

export default function RedactedText({ label, reveal, className = '' }: RedactedTextProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      <span
        className="relative inline-block cursor-help"
        onMouseEnter={() => setIsRevealed(true)}
        onMouseLeave={() => setIsRevealed(false)}
      >
        {/* Black highlight overlay */}
        <motion.span
          className="absolute inset-0 z-10 inline-flex items-center justify-center overflow-hidden"
          style={{
            backgroundColor: '#000',
          }}
          animate={{
            width: isRevealed ? '0%' : '100%',
            opacity: isRevealed ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <span
            className="font-mono text-[0.6em] tracking-wider text-classified-red whitespace-nowrap"
            style={{ letterSpacing: '0.1em' }}
          >
            [REDACTED]
          </span>
        </motion.span>

        {/* The revealed text underneath */}
        <span
          className="font-mono text-caption tracking-wider text-surveillance-green"
        >
          {reveal}
        </span>

        {/* Label shown when not revealed */}
        {!isRevealed && (
          <span className="sr-only">{label}</span>
        )}
      </span>
    </span>
  );
}
