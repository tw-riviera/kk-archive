import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   Home Page — Classified Terminal / Presidential Briefing
   ============================================================ */

/* ── Section 1: Terminal Boot Sequence (Hero) ── */
function TerminalBootSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setPhase] = useState<'booting' | 'done'>('booting');
  const [cursorVisible, setCursorVisible] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [clearanceVisible, setClearanceVisible] = useState(false);
  const [titleText, setTitleText] = useState('');
  const [chineseTitleVisible, setChineseTitleVisible] = useState(false);
  const [subtitleLines, setSubtitleLines] = useState<string[]>([]);
  const [stampVisible, setStampVisible] = useState(false);
  const [scrollPromptVisible, setScrollPromptVisible] = useState(false);

  const bootSequence = useCallback(() => {
    const tl = gsap.timeline();

    // Phase 2: Cursor blink (0.3-0.8s)
    tl.call(() => setCursorVisible(true), [], 0.3);

    // Phase 3: System boot lines (0.8-2.0s)
    const lines = [
      '> INITIALIZING SECURE TERMINAL v4.2.1...',
      '> AUTHENTICATING BIOMETRICS...',
      '> BIOMETRICS CONFIRMED',
      '> VERIFYING CLEARANCE LEVEL...',
    ];
    lines.forEach((line, i) => {
      tl.call(() => setBootLines(prev => [...prev, line]), [], 0.8 + i * 0.15);
    });

    // Phase 4: Clearance verified (2.0-2.5s)
    tl.call(() => setClearanceVisible(true), [], 2.2);

    // Phase 5: Title decrypt (2.5-4.0s)
    tl.call(() => {
      const finalTitle = 'COLD WAR';
      const chars = '█▓▒░ΦΛΣΩΔ';
      let iteration = 0;
      const interval = setInterval(() => {
        setTitleText(
          finalTitle
            .split('')
            .map((char, idx) => {
              if (idx < iteration) return char;
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        iteration += 1 / 3;
        if (iteration >= finalTitle.length) {
          clearInterval(interval);
          setTitleText(finalTitle);
        }
      }, 60);
    }, [], 2.6);

    // Phase 6: Chinese title (4.0-4.5s)
    tl.call(() => setChineseTitleVisible(true), [], 4.2);

    // Phase 7: Subtitle & metadata (4.5-5.5s)
    const subtitles = [
      'TOP SECRET COMMAND BRIEFING // OPERATION COLD WAR',
      'INCIDENT DATE: DECEMBER 2015, HONG KONG',
      'REPORTING OPERATIVE: PHANTOM-7',
    ];
    subtitles.forEach((line, i) => {
      tl.call(() => setSubtitleLines(prev => [...prev, line]), [], 4.7 + i * 0.2);
    });

    // Phase 8: Stamp slam (5.5-6.0s)
    tl.call(() => setStampVisible(true), [], 5.6);

    // Phase 9: Scroll prompt (6.0s+)
    tl.call(() => setScrollPromptVisible(true), [], 6.2);
    tl.call(() => setPhase('done'), [], 6.2);

    return tl;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      bootSequence();
    }, 300);
    return () => clearTimeout(timer);
  }, [bootSequence]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-void px-4"
    >
      {/* Optional subtle hero background */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'url(/hero-terminal-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-void/80" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Boot lines */}
        <div className="mb-6 min-h-[120px] text-left">
          {bootLines.map((line, i) => (
            <div
              key={i}
              className="font-mono text-sm tracking-wider text-surveillance-green"
              style={{ textShadow: '0 0 8px rgba(16, 185, 129, 0.4)' }}
            >
              {line}
              {cursorVisible && i === bootLines.length - 1 && (
                <span className="ml-0.5 inline-block w-2 bg-surveillance-green">&nbsp;</span>
              )}
            </div>
          ))}
        </div>

        {/* Clearance box */}
        {clearanceVisible && (
          <div
            className="mb-8 rounded-sm border border-surveillance-green/60 bg-void/80 px-6 py-4"
            style={{
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.2), inset 0 0 20px rgba(16, 185, 129, 0.05)',
            }}
          >
            <div className="font-mono text-sm tracking-wider text-surveillance-green">
              ╔══════════════════════════════════════════╗
            </div>
            <div className="font-mono text-sm tracking-wider text-surveillance-green">
              ║&nbsp;&nbsp; CLEARANCE: ALPHA — COMMAND LEVEL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ║
            </div>
            <div className="font-mono text-sm tracking-wider text-surveillance-green">
              ║&nbsp;&nbsp; OPERATIVE: PHANTOM-7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ║
            </div>
            <div className="flex items-center justify-center gap-2 font-mono text-sm tracking-wider text-surveillance-green">
              <span>║&nbsp;&nbsp; STATUS:</span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-surveillance-green opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-surveillance-green" />
              </span>
              <span>AUTHORIZED&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ║</span>
            </div>
            <div className="font-mono text-sm tracking-wider text-surveillance-green">
              ╚══════════════════════════════════════════╝
            </div>
          </div>
        )}

        {/* Main title */}
        {titleText && (
          <h1
            className="font-mono text-display-xxl font-bold text-ice-white"
            style={{ textShadow: '0 0 30px rgba(56, 189, 248, 0.3)' }}
          >
            {titleText}
          </h1>
        )}

        {/* Chinese title */}
        {chineseTitleVisible && (
          <div
            className="mt-4 font-display text-display-xl font-bold tracking-[0.15em] text-classified-red"
            style={{
              animation: 'fadeInUp 0.5s ease-out forwards',
            }}
          >
            寒戰
          </div>
        )}

        {/* Subtitles */}
        <div className="mt-6 flex flex-col gap-1">
          {subtitleLines.map((line, i) => (
            <div key={i} className="font-mono text-caption tracking-wider text-ghost-grey">
              {line}
            </div>
          ))}
        </div>

        {/* Stamp */}
        {stampVisible && (
          <div
            className="pointer-events-none relative my-6 font-mono text-6xl font-bold tracking-widest text-classified-red sm:text-8xl"
            style={{
              opacity: 0.12,
              transform: 'rotate(-8deg)',
              border: '3px solid #dc2626',
              padding: '0.3em 0.6em',
              borderRadius: '2px',
            }}
          >
            TOP SECRET
          </div>
        )}

        {/* Scroll prompt */}
        {scrollPromptVisible && (
          <div className="relative mt-8 flex flex-col items-center gap-3 animate-scroll-prompt">
            <div className="h-10 w-px bg-ghost-grey/50 animate-line-draw" />
            <span className="font-mono text-xs tracking-wider text-ghost-grey">
              [ SCROLL TO ACCESS BRIEFING ]
            </span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

/* ── Section 2: Operative's Letter ── */
function OperativeLetter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const [letterText, setLetterText] = useState('');

  const fullLetter = `長官鈞鑒：

本報告為吾對一起動搖香港警隊根基事件之完整分析。此事暴露了這座曾被譽為「亞洲最安全城市」的都市，其表象之下暗藏的裂痕。

2015年12月某午夜，一輛載有五名警員及高科技戰術裝備之衝鋒車，於執勤途中神秘消失。失蹤者中包括行動副處長李文彬之獨子——警隊中權力最大之制服人員之唯一血脈。

後續發展遠非單純綁架案。這是一場權力鬥爭——警隊高層內部之冷戰，足以撕裂整個體系。兩位副處長、兩種理念、一張空缺的處長席位。

吾已彙整所有情報、重建時間線、分析每一位關鍵人物。此檔案即為吾之上呈報告。

—— 特務 PHANTOM-7
    阿爾法權限，直接任命`;

  useGSAP(() => {
    if (!sectionRef.current || !letterRef.current) return;

    // Scroll-driven typing effect
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const charCount = Math.floor(progress * fullLetter.length);
        setLetterText(fullLetter.slice(0, charCount));
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative bg-midnight bg-grid py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-8">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-12">
          {/* Left column (60%) */}
          <div className="lg:w-[60%]">
            {/* Classification header */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-full border border-classified-red/40 flex items-center justify-center">
                  <span className="font-mono text-[10px] text-classified-red">&#9733;</span>
                </div>
                <span className="font-mono text-label tracking-wider text-ghost-grey">
                  COMMAND BRIEFING — OPERATION COLD WAR
                </span>
              </div>
              <span className="font-mono text-label tracking-wider text-ghost-grey/60">
                DOC REF: CW-2012-TS-001
              </span>
            </div>

            {/* Letter */}
            <div
              ref={letterRef}
              className="font-sans text-body leading-[1.75] text-ice-white whitespace-pre-wrap"
            >
              {letterText}
              <span className="inline-block w-2 animate-typing-cursor bg-ice-white">&nbsp;</span>
            </div>

            {/* Quote block */}
            <div className="mt-12 border-l-[3px] border-classified-red pl-6">
              <span className="block font-sans text-h2 italic text-ice-white leading-relaxed">
                &ldquo;This is Hong Kong. Asia&apos;s safest city.&rdquo;
              </span>
              <span className="mt-2 block font-mono text-caption tracking-wider text-ghost-grey">
                — Opening narration, Cold War (2012)
              </span>
            </div>
          </div>

          {/* Right column (40%) */}
          <div className="lg:w-[40%]">
            {/* Incident Snapshot Card */}
            <div
              className="dossier-card border-l-[3px] border-l-classified-red"
              style={{
                animation: 'slideInRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              <div className="mb-4 font-mono text-label tracking-wider text-ghost-grey">
                ┌─ INCIDENT SNAPSHOT ───────────────────┐
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <span className="font-mono text-xs tracking-wider text-ghost-grey">OPERATION:</span>
                  <span className="font-sans text-sm font-medium text-ice-white">COLD WAR (寒戰)</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-xs tracking-wider text-ghost-grey">DATE:</span>
                  <span className="font-sans text-sm text-ice-white">December 2015</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-xs tracking-wider text-ghost-grey">LOCATION:</span>
                  <span className="font-sans text-sm text-ice-white">Hong Kong SAR</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-xs tracking-wider text-ghost-grey">CLASSIFICATION:</span>
                  <span className="rounded-sm bg-classified-red/20 px-2 py-0.5 font-mono text-xs tracking-wider text-classified-red">
                    TOP SECRET
                  </span>
                </div>

                <div className="my-3 h-px bg-grid-blue" />

                <div>
                  <span className="block font-mono text-xs tracking-wider text-ghost-grey mb-1">CASUALTIES:</span>
                  <div className="space-y-1 pl-2">
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-classified-red" />
                      <span className="font-sans text-sm text-ice-white">Senior Superintendent Tsui — KIA</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-classified-red" />
                      <span className="font-sans text-sm text-ice-white">Vault Supervisor Ng — ASSASSINATED</span>
                    </div>
                  </div>
                </div>

                <div className="my-3 h-px bg-grid-blue" />

                <div>
                  <span className="block font-mono text-xs tracking-wider text-ghost-grey mb-1">STATUS:</span>
                  <div className="flex items-center gap-2 animate-pulse-warning">
                    <span className="text-alert-amber">&#9888;</span>
                    <span className="font-mono text-sm tracking-wider text-alert-amber">
                      INCOMPLETE — THREATS REMAIN
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <span
                  className="inline-block rounded-sm border-2 border-classified-red px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-classified-red"
                  style={{ transform: 'rotate(-1deg)' }}
                >
                  ONGOING INVESTIGATION
                </span>
              </div>

              <div className="mt-4 font-mono text-label tracking-wider text-ghost-grey/40">
                └───────────────────────────────────────┘
              </div>
            </div>

            {/* Operator silhouette */}
            <div className="mt-8 flex justify-center">
              <img
                src="/operator-silhouette.png"
                alt="[ OPERATIVE PRESENCE ]"
                className="h-48 w-auto opacity-60"
                style={{ filter: 'drop-shadow(0 0 16px rgba(56, 189, 248, 0.2))' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

/* ── Section 3: The Setup (Incident Overview) ── */
function IncidentOverview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const paragraphs = [
    '2015年12月。一個尋常的午夜，香港警方接到一通匿名電話。',
    '一輛載有五名警員及大量高科技裝備的衝鋒車，在執勤途中離奇失蹤。',
    '沒有目擊者。沒有監控記錄。沒有任何痕跡。',
    '五名警員中，包括現任行動副處長李文彬的獨子——李家俊。',
  ];

  const facts = [
    {
      title: '衝鋒車失蹤',
      lines: ['午夜時分，無影無蹤', '監控系統全無記錄'],
      color: 'var(--alert-amber)',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-alert-amber">
          <rect x="3" y="8" width="18" height="10" rx="2" />
          <path d="M6 8V6a2 2 0 012-2h8a2 2 0 012 2v2" />
          <circle cx="7.5" cy="16.5" r="1.5" />
          <circle cx="16.5" cy="16.5" r="1.5" />
          <path d="M3 14h18" />
        </svg>
      ),
    },
    {
      title: '人質身份特殊',
      lines: ['李家俊 — IQ 192 天才', '李文彬副處長獨子'],
      color: 'var(--classified-red)',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-classified-red">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      ),
    },
    {
      title: '全城一級戒備',
      lines: ['代號「寒戰」啟動', '香港進入緊急狀態'],
      color: 'var(--steel-cyan)',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-steel-cyan">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Paragraph reveals
      gsap.utils.toArray<HTMLElement>('.para-reveal').forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          delay: i * 0.2,
        });
      });

      // Card reveals
      gsap.utils.toArray<HTMLElement>('.fact-card').forEach((el, i) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          delay: i * 0.15,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:py-32"
    >
      {/* Background image */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/hk-skyline-night.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-void/[0.85]" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 lg:px-8">
        {/* Section label */}
        <div className="mb-16 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-classified-red/40" />
          <span className="font-mono text-label tracking-widest text-classified-red">
            [ PART I — THE INCIDENT ]
          </span>
          <div className="h-px w-16 bg-classified-red/40" />
        </div>

        {/* Main description */}
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          {paragraphs.map((p, i) => (
            <p key={i} className="para-reveal font-display text-h1 font-semibold text-ice-white leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {/* Fact cards */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact, i) => (
            <div
              key={i}
              className="fact-card rounded-sm p-6"
              style={{
                backgroundColor: 'rgba(20, 30, 51, 0.8)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderLeft: `3px solid ${fact.color}`,
              }}
            >
              <div className="mb-3 flex items-center gap-3">
                {fact.icon}
                <span className="font-sans text-h3 font-semibold text-ice-white">{fact.title}</span>
              </div>
              {fact.lines.map((line, j) => (
                <p key={j} className="font-sans text-sm text-ghost-grey leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 4: Two Forces (Conflict) ── */
function TwoForces() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const vsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Left column slides in
      if (leftColRef.current) {
        gsap.from(leftColRef.current, {
          x: -80,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        });
      }

      // Right column slides in
      if (rightColRef.current) {
        gsap.from(rightColRef.current, {
          x: 80,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        });
      }

      // Divider line draws
      if (dividerRef.current) {
        gsap.from(dividerRef.current, {
          scaleY: 0,
          duration: 1,
          ease: 'power2.inOut',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        });
      }

      // VS glitch appears
      if (vsRef.current) {
        gsap.from(vsRef.current, {
          opacity: 0,
          scale: 0.5,
          duration: 0.4,
          ease: 'bounce.out',
          delay: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative bg-void bg-grid py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-8">
        {/* Section label */}
        <div className="mb-16 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-grid-blue" />
          <span className="font-mono text-label tracking-widest text-ghost-grey">
            [ PART II — THE FORCES ]
          </span>
          <div className="h-px w-16 bg-grid-blue" />
        </div>

        <div className="relative flex flex-col gap-12 lg:flex-row lg:gap-0">
          {/* Left — Liu Kit-wing */}
          <div ref={leftColRef} className="lg:w-1/2 lg:pr-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-surveillance-green opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-surveillance-green" />
              </span>
              <div>
                <h2 className="font-display text-h1 text-ice-white">劉傑輝</h2>
                <span className="font-mono text-caption tracking-wider text-ghost-grey">
                  DEPUTY COMMISSIONER (ADMINISTRATION)
                </span>
              </div>
            </div>
            <span className="mb-6 block font-mono text-caption tracking-wider text-ghost-grey">
              郭富城 / Aaron Kwok
            </span>

            <div className="space-y-4 font-sans text-body text-ice-white leading-relaxed">
              <p>文職出身。冷靜沉著。心思縝密。</p>
              <p>
                劉傑輝主張以智取勝，堅持程序正義，即使在最危急的時刻，也不願意犧牲法治精神。
              </p>
              <p>
                他看穿了李文彬因兒子被劫持而無法客觀指揮的事實，聯合其他高層發動彈劾，奪取了「寒戰」行動的指揮權。
              </p>
            </div>

            <blockquote className="mt-8 border-l-[3px] border-steel-cyan pl-4">
              <p className="font-sans text-h3 italic text-steel-cyan">
                &ldquo;All wars are unnecessary wars.&rdquo;
              </p>
              <cite className="mt-1 block font-mono text-caption tracking-wider text-ghost-grey not-italic">
                — 邱吉爾，風雲緊急
              </cite>
            </blockquote>
          </div>

          {/* Center Divider */}
          <div className="hidden lg:flex flex-col items-center justify-center">
            <div
              ref={dividerRef}
              className="w-px bg-grid-blue"
              style={{ height: '100%' }}
            />
            <div
              ref={vsRef}
              className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-void border border-classified-red/40"
            >
              <span className="font-mono text-lg font-bold text-classified-red glitch-text">VS</span>
            </div>
          </div>

          {/* Mobile divider */}
          <div className="flex lg:hidden items-center justify-center gap-3">
            <div className="h-px flex-1 bg-grid-blue" />
            <span className="font-mono text-sm font-bold text-classified-red glitch-text">VS</span>
            <div className="h-px flex-1 bg-grid-blue" />
          </div>

          {/* Right — Lee Man-bun */}
          <div ref={rightColRef} className="lg:w-1/2 lg:pl-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-alert-amber opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-alert-amber" />
              </span>
              <div>
                <h2 className="font-display text-h1 text-ice-white">李文彬</h2>
                <span className="font-mono text-caption tracking-wider text-ghost-grey">
                  DEPUTY COMMISSIONER (OPERATIONS)
                </span>
              </div>
            </div>
            <span className="mb-6 block font-mono text-caption tracking-wider text-ghost-grey">
              梁家輝 / Tony Leung
            </span>

            <div className="space-y-4 font-sans text-body text-ice-white leading-relaxed">
              <p>鷹派武官。三十年警隊資歷。性情外放，帶有草莽氣息。</p>
              <p>
                李文彬立即自封署理處長，啟動代號「寒戰」行動，宣布香港進入一級戒備。
              </p>
              <p className="italic text-alert-amber/80">
                「非常時期，用非常方法。」
              </p>
              <p>
                他最終大義滅親——親手將兒子交由法律制裁。
              </p>
            </div>

            <blockquote className="mt-8 border-l-[3px] border-alert-amber pl-4">
              <p className="font-sans text-h3 italic text-alert-amber">
                &ldquo;邱吉爾說的是，這一場本來是可以避免的不必要戰爭，他沒說過所有戰爭都不必要。&rdquo;
              </p>
              <cite className="mt-1 block font-mono text-caption tracking-wider text-ghost-grey not-italic">
                — 李文彬反駁
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Section 5: Quick Navigation ── */
function QuickNavigation() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      num: '01',
      title: 'INCIDENT TIMELINE',
      zh: '事件時間線',
      desc: 'Reconstruct the hijacking hour by hour.',
      color: 'var(--classified-red)',
      path: '/incident',
      cta: 'ACCESS FILE',
    },
    {
      num: '02',
      title: 'PERSONNEL DOSSIERS',
      zh: '人物檔案',
      desc: 'Classified profiles of all key figures.',
      color: 'var(--steel-cyan)',
      path: '/personnel',
      cta: 'ACCESS FILE',
    },
    {
      num: '03',
      title: 'POWER ANALYSIS',
      zh: '權力分析',
      desc: 'The political chess game behind the scenes.',
      color: 'var(--alert-amber)',
      path: '/analysis',
      cta: 'ACCESS FILE',
    },
    {
      num: '04',
      title: 'EVIDENCE FILES',
      zh: '證據檔案',
      desc: 'Declassified intelligence and transcripts.',
      color: 'var(--surveillance-green)',
      path: '/evidence',
      cta: 'ACCESS FILE',
    },
    {
      num: '05',
      title: 'FINAL ASSESSMENT',
      zh: '最終評估',
      desc: "The operative's analysis and recommendations.",
      color: 'var(--classified-red)',
      path: '/assessment',
      cta: 'ACCESS FILE',
    },
    {
      num: '06',
      title: 'OPERATIVE STATUS',
      zh: '特務狀態',
      desc: 'Alpha clearance confirmed. Channel secure.',
      color: 'var(--surveillance-green)',
      path: '',
      cta: 'VERIFIED',
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.nav-card').forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          delay: i * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-midnight py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-8">
        {/* Section label */}
        <div className="mb-16 text-center">
          <span className="font-mono text-label tracking-widest text-ghost-grey">
            [ ACCESS CLASSIFIED FILES ]
          </span>
        </div>

        {/* Card grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const isLink = card.path !== '';
            const cardContent = (
              <div
                className="nav-card group relative h-full cursor-default rounded-sm border border-grid-blue bg-steel-blue p-6 transition-all duration-200"
                style={{
                  borderLeftWidth: '3px',
                  borderLeftColor: card.color,
                }}
              >
                <div className="mb-4 flex items-start justify-between">
                  <span className="font-mono text-h1 text-ghost-grey/40">{card.num}</span>
                </div>

                <h3 className="mb-1 font-mono text-h3 tracking-wider text-ice-white uppercase">
                  {card.title}
                </h3>
                <span className="mb-3 block font-sans text-caption tracking-wider text-ghost-grey">
                  {card.zh}
                </span>
                <p className="mb-6 font-sans text-sm leading-relaxed text-ghost-grey">
                  {card.desc}
                </p>

                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-[10px] tracking-widest transition-colors duration-200"
                    style={{ color: 'var(--steel-cyan)' }}
                  >
                    [ {card.cta} ]
                  </span>
                  {card.cta === 'VERIFIED' && (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-surveillance-green opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-surveillance-green" />
                    </span>
                  )}
                </div>

                {/* Hover glow effect */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${card.color}40, 0 4px 24px rgba(5, 5, 8, 0.3)`,
                  }}
                />
              </div>
            );

            return isLink ? (
              <Link
                key={i}
                to={card.path}
                className="block h-full transition-transform duration-200 hover:-translate-y-1.5"
              >
                {cardContent}
              </Link>
            ) : (
              <div key={i} className="block h-full">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Section 6: Operative Footer Note ── */
function FooterNote() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-void py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 text-center lg:px-8">
        <div className="animate-pulse-warning mb-6 text-2xl text-alert-amber">
          &#9888;
        </div>

        <h3 className="mb-6 font-mono text-label tracking-widest text-classified-red">
          警告 // WARNING
        </h3>

        <div className="mx-auto max-w-xl space-y-2">
          <p className="font-sans text-sm leading-relaxed text-ghost-grey">
            本檔案為最高機密，僅限授權人員查閱。
          </p>
          <p className="font-sans text-sm leading-relaxed text-ghost-grey">
            任何未經授權的查閱、複製或傳播均屬違反國家安全法的嚴重罪行。
          </p>
          <div className="h-2" />
          <p className="font-sans text-sm leading-relaxed text-ghost-grey">
            This document is classified at the highest level. Authorized access only.
          </p>
          <p className="font-sans text-sm leading-relaxed text-ghost-grey">
            Unauthorized access, reproduction, or distribution is a serious offense under the National Security Act.
          </p>
        </div>

        <div className="mt-12 font-mono text-caption tracking-wider text-ghost-grey/40">
          [ END OF BRIEFING OVERVIEW ]
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Home Page Export
   ============================================================ */
export default function Home() {
  return (
    <div>
      <TerminalBootSequence />
      <OperativeLetter />
      <IncidentOverview />
      <TwoForces />
      <QuickNavigation />
      <FooterNote />
    </div>
  );
}
