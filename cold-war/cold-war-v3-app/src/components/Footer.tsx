export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-grid-blue bg-void">
      {/* Background stamp */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        style={{ opacity: 0.06 }}
      >
        <span
          className="font-mono text-[8rem] font-bold tracking-widest text-classified-red sm:text-[12rem]"
          style={{ transform: 'rotate(-12deg)' }}
        >
          TOP SECRET
        </span>
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 py-16 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Classification stamp */}
          <div
            className="inline-flex items-center gap-2 rounded-sm border-2 border-classified-red px-4 py-2 font-mono text-sm font-bold tracking-widest text-classified-red"
            style={{ transform: 'rotate(-3deg)' }}
          >
            TOP SECRET
          </div>

          {/* Document ID */}
          <div className="font-mono text-xs tracking-wider text-ghost-grey">
            DOC-ID: CW-2012-TS-001 // PHANTOM-7
          </div>

          {/* Distribution */}
          <div className="font-mono text-xs tracking-wider text-classified-red">
            DISTRIBUTION: POTUS ONLY // NOFORN
          </div>

          {/* Separator */}
          <div className="h-px w-48 bg-grid-blue" />

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 font-mono text-[10px] tracking-wider text-ghost-grey">
            <span className="cursor-default hover:text-ice-white transition-colors duration-200">TERMINAL LOGS</span>
            <span className="text-grid-blue">|</span>
            <span className="cursor-default hover:text-ice-white transition-colors duration-200">CLEARANCE PROTOCOLS</span>
            <span className="text-grid-blue">|</span>
            <span className="cursor-default hover:text-ice-white transition-colors duration-200">SECURE CHANNEL</span>
          </div>

          {/* Warning */}
          <p className="max-w-lg font-mono text-[10px] leading-relaxed tracking-wider text-ghost-grey/60">
            UNAUTHORIZED ACCESS IS A FEDERAL OFFENSE PUNISHABLE UNDER NATIONAL SECURITY ACT
          </p>

          {/* Copyright / version */}
          <p className="font-mono text-[10px] tracking-wider text-ghost-grey/40">
            SECURE TERMINAL v4.2.1 // OPERATION COLD WAR // ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
