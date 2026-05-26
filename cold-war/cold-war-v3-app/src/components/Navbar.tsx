import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'BRIEFING', path: '/' },
  { label: 'INCIDENT', path: '/incident' },
  { label: 'PERSONNEL', path: '/personnel' },
  { label: 'ANALYSIS', path: '/analysis' },
  { label: 'EVIDENCE', path: '/evidence' },
  { label: 'ASSESSMENT', path: '/assessment' },
];

export default function Navbar() {
  const location = useLocation();
  const [timestamp, setTimestamp] = useState('');
  const [visible, setVisible] = useState(false);
  const [flash, setFlash] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateTimestamp = useCallback(() => {
    const now = new Date();
    const hkTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' }));
    const yyyy = hkTime.getFullYear();
    const mm = String(hkTime.getMonth() + 1).padStart(2, '0');
    const dd = String(hkTime.getDate()).padStart(2, '0');
    const hh = String(hkTime.getHours()).padStart(2, '0');
    const min = String(hkTime.getMinutes()).padStart(2, '0');
    const ss = String(hkTime.getSeconds()).padStart(2, '0');
    setTimestamp(`${yyyy}-${mm}-${dd} ${hh}:${min}:${ss} UTC+8`);
    setFlash(true);
    setTimeout(() => setFlash(false), 100);
  }, []);

  useEffect(() => {
    updateTimestamp();
    const interval = setInterval(updateTimestamp, 1000);
    return () => clearInterval(interval);
  }, [updateTimestamp]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-grid-blue transition-transform duration-600"
      style={{
        backgroundColor: 'rgba(5, 5, 8, 0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transform: visible ? 'translateY(0)' : 'translateY(-56px)',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-4 lg:px-8">
        {/* Left: Codename + Clearance */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-wider text-ice-white hidden sm:inline">
            OPERATIVE: PHANTOM-7
          </span>
          <span className="font-mono text-xs tracking-wider text-ice-white sm:hidden">
            PHANTOM-7
          </span>
          <span className="flex items-center gap-1.5 rounded-sm border border-surveillance-green/30 px-2 py-0.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-surveillance-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-surveillance-green" />
            </span>
            <span className="font-mono text-[10px] font-medium tracking-wider text-surveillance-green">
              ALPHA CLEARANCE
            </span>
          </span>
        </div>

        {/* Center: Nav Links (desktop) */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="group relative font-mono text-xs tracking-wider transition-colors duration-200"
                style={{ color: isActive ? '#dc2626' : '#94a3b8' }}
              >
                <span className="group-hover:text-ice-white transition-colors duration-200">
                  {link.label}
                </span>
                {isActive && (
                  <span className="absolute -bottom-[17px] left-0 right-0 h-px bg-classified-red" />
                )}
                <span className="absolute -bottom-[17px] left-1/2 h-px w-0 bg-ice-white/50 transition-all duration-200 group-hover:w-full group-hover:left-0" />
              </Link>
            );
          })}
        </nav>

        {/* Right: Timestamp + Eyes Only */}
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[10px] tracking-wider text-ghost-grey hidden md:block transition-opacity duration-100"
            style={{ opacity: flash ? 0.5 : 1 }}
          >
            {timestamp}
          </span>
          <span className="rounded-sm border border-classified-red/50 px-2 py-0.5 font-mono text-[10px] tracking-wider text-classified-red hidden sm:block">
            COMMAND EYES ONLY
          </span>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1 p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-px w-5 bg-ice-white transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-[2.5px]' : ''}`} />
            <span className={`block h-px w-5 bg-ice-white transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-5 bg-ice-white transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-[2.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-grid-blue px-4 py-4" style={{ backgroundColor: 'rgba(5, 5, 8, 0.95)' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="block py-2 font-mono text-sm tracking-wider transition-colors duration-200"
                style={{ color: isActive ? '#dc2626' : '#94a3b8' }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
