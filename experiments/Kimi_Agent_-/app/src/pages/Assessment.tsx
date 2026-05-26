import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Command Seal SVG ─── */
function CommandSeal() {
  return (
    <svg viewBox="0 0 120 120" width="120" height="120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="58" stroke="#e2e8f0" strokeWidth="1.5" opacity="0.6" />
      <circle cx="60" cy="60" r="52" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.4" />
      <circle cx="60" cy="60" r="46" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.3" />
      {/* Eagle body */}
      <path d="M60 28c-8 0-14 6-16 13-4 1-8 4-8 9 0 3 2 6 5 7-1 2-2 4-2 6 0 5 4 9 9 9h24c5 0 9-4 9-9 0-2-1-4-2-6 3-1 5-4 5-7 0-5-4-8-8-9-2-7-8-13-16-13z" fill="#e2e8f0" opacity="0.15" stroke="#e2e8f0" strokeWidth="0.8" />
      {/* Shield */}
      <path d="M60 42c-6 0-10 4-10 9 0 7 5 13 10 17 5-4 10-10 10-17 0-5-4-9-10-9z" fill="#e2e8f0" opacity="0.2" stroke="#e2e8f0" strokeWidth="0.5" />
      {/* Wings */}
      <path d="M44 48c-5 2-9 6-10 11 3-1 6-2 8-4-1 3-2 6-1 9 3-2 5-4 7-7 0 4 1 8 3 11-1-5 0-10 2-14-2 3-5 5-8 6 2-4 5-8 9-10-1 4-1 8 1 12-1-5 1-10 4-14-3 2-5 5-7 8 1-4 3-7 6-10-2 2-3 5-3 8 2-3 5-5 9-6z" fill="#e2e8f0" opacity="0.15" />
      <path d="M76 48c5 2 9 6 10 11-3-1-6-2-8-4 1 3 2 6 1 9-3-2-5-4-7-7 0 4-1 8-3 11 1-5 0-10-2-14 2 3 5 5 8 6-2-4-5-8-9-10 1 4 1 8-1 12 1-5-1-10-4-14 3 2 5 5 7 8-1-4-3-7-6-10 2 2 3 5 3 8-2-3-5-5-9-6z" fill="#e2e8f0" opacity="0.15" />
      {/* Text ring */}
      <path id="topArc" d="M25 60c0-19 15-35 35-35s35 16 35 35" fill="none" />
      <text fill="#e2e8f0" opacity="0.5" fontSize="6.5" fontFamily="JetBrains Mono, monospace" letterSpacing="2" textAnchor="middle">
        <textPath href="#topArc" startOffset="50%">COMMAND BRIEFING</textPath>
      </text>
      <path id="botArc" d="M25 62c0 19 15 35 35 35s35-16 35-35" fill="none" />
      <text fill="#e2e8f0" opacity="0.5" fontSize="5.5" fontFamily="JetBrains Mono, monospace" letterSpacing="2.5" textAnchor="middle">
        <textPath href="#botArc" startOffset="50%">EYES ONLY</textPath>
      </text>
      {/* Stars */}
      <circle cx="28" cy="58" r="1" fill="#e2e8f0" opacity="0.4" />
      <circle cx="92" cy="58" r="1" fill="#e2e8f0" opacity="0.4" />
      <circle cx="60" cy="22" r="1" fill="#e2e8f0" opacity="0.4" />
      <circle cx="60" cy="98" r="1" fill="#e2e8f0" opacity="0.4" />
    </svg>
  );
}

/* ─── Data ─── */
const keyFindings = [
  {
    num: '1',
    title: 'MULTIPLE MOLES CONFIRMED',
    body: 'At least four serving police officers were active conspirators: SSP Tsui Wing-kei (deceased), SDU Commander Shek Mai-go, Vault Supervisor Ng Wai-lun (deceased), and EU Constable Lee Ka-chun.',
  },
  {
    num: '2',
    title: 'SYSTEMIC INTELLIGENCE COMPROMISE',
    body: 'The conspirators possessed real-time knowledge of police operations, tactical procedures, communications protocols, and vault security. This level of access suggests organizational penetration beyond individual traitors.',
  },
  {
    num: '3',
    title: 'POWER STRUGGLE SUCCESSFULLY EXPLOITED',
    body: 'The Liu-Lee conflict was not coincidental \u2014 it was strategically provoked. The timing of the kidnapping, targeting Lee\u2019s son, was designed to compromise Lee\u2019s judgment and force a leadership crisis.',
  },
  {
    num: '4',
    title: 'LARGER CONSPIRACY INDICATED',
    body: 'The post-arrest phone call to Liu Kit-wing proves the existence of a higher authority directing operations. Lee Ka-chun was a pawn, not a king.',
  },
  {
    num: '5',
    title: 'CASE STATUS: INCOMPLETE',
    body: 'The arrest of Lee Ka-chun and exposure of known traitors resolves only the visible layer of this conspiracy. The controlling organization remains unidentified and active.',
  },
];

const threatCategories = [
  { category: 'Organizational Security', level: 'CRITICAL', status: 'BREACHED', trend: '\u2191 WORSENING', levelColor: 'text-classified-red', bgColor: 'bg-classified-red/20' },
  { category: 'Personnel Integrity', level: 'HIGH', status: 'COMPROMISED', trend: '\u2192 STABLE', levelColor: 'text-alert-amber', bgColor: 'bg-alert-amber/20' },
  { category: 'Information Security', level: 'HIGH', status: 'BREACHED', trend: '\u2191 WORSENING', levelColor: 'text-alert-amber', bgColor: 'bg-alert-amber/20' },
  { category: 'Leadership Stability', level: 'MEDIUM', status: 'RESOLVED', trend: '\u2193 IMPROVING', levelColor: 'text-ghost-grey', bgColor: 'bg-ghost-grey/10' },
  { category: 'Public Confidence', level: 'MEDIUM', status: 'DAMAGED', trend: '\u2192 STABLE', levelColor: 'text-ghost-grey', bgColor: 'bg-ghost-grey/10' },
  { category: 'Unknown Actor Threat', level: 'CRITICAL', status: 'ACTIVE', trend: '\u2191 ESCALATING', levelColor: 'text-classified-red', bgColor: 'bg-classified-red/20' },
];

const unresolvedQuestions = [
  {
    priority: 'CRITICAL',
    title: 'WHO IS THE REAL MASTERMIND?',
    body: [
      'Lee Ka-chun has an IQ of 192 and demonstrated sophisticated planning capability. But the mystery phone call proves he was taking orders from someone else.',
      'Someone with the power to:',
      '\u2022 Access real-time police intelligence',
      '\u2022 Know promotions before announcement',
      '\u2022 Threaten a Commissioner\u2019s family with impunity',
      '\u2022 Operate a multi-layer criminal network inside the police force',
      'This is not a criminal. This is an institution.',
    ],
  },
  {
    priority: 'CRITICAL',
    title: 'WHAT IS THE SIGNIFICANCE OF 3333?',
    body: [
      'The ransom amount \u2014 HK$33,330,000 \u2014 was not random. The repetition of "3" suggests symbolic meaning or organizational code.',
      'Cross-reference with known subversive organization signifiers has produced [REDACTED: pending higher clearance].',
      'Is this a signature? A signal to other cells? A message to someone watching?',
    ],
  },
  {
    priority: 'HIGH',
    title: 'HOW DEEP DOES THE PENETRATION GO?',
    body: [
      'Four confirmed traitors in a single operation. All with access to sensitive information. All operating simultaneously without detection.',
      'Is this the full network? Or are there more sleepers waiting for activation?',
      'The vault heist required logistical knowledge that Ng Wai-lun alone could not provide. Someone else helped plan the transport intercept.',
    ],
  },
  {
    priority: 'HIGH',
    title: 'WHAT WAS THE ULTIMATE OBJECTIVE?',
    body: [
      'Was the goal money? The heist netted HK$50M+.',
      'Was the goal power? The police command was paralyzed for hours.',
      'Was the goal destabilization? Public confidence in "Asia\u2019s safest city" was shaken.',
      'Or was it all three \u2014 a multi-layered operation designed to achieve multiple strategic objectives simultaneously?',
    ],
  },
  {
    priority: 'CRITICAL',
    title: 'IS HONG KONG THE ONLY TARGET?',
    body: [
      'If an organization can penetrate the Hong Kong Police Force \u2014 one of Asia\u2019s most professional law enforcement agencies \u2014 what other institutions have they accessed?',
      'The methods used in Cold War are exportable. The playbook \u2014 kidnap, compromise leadership, activate sleeper agents, extract assets \u2014 can be applied to any security apparatus.',
      '[CLASSIFIED: Cross-territory threat assessment requires Level-4 authorization.]',
    ],
  },
];

const recommendations = [
  {
    num: 'REC-01',
    title: 'IMMEDIATE PROTECTION',
    body: [
      'Commissioner Liu Kit-wing\u2019s family must receive 24/7 presidential-level protection detail. The threat is credible, the caller demonstrated advanced capabilities, and the 24-hour deadline has passed without compliance.',
      'Status of Liu\u2019s family: UNKNOWN \u2014 Operative PHANTOM-7 recommends immediate intervention.',
    ],
  },
  {
    num: 'REC-02',
    title: 'COUNTER-INTELLIGENCE OPERATION',
    body: [
      'A full-scale counter-intelligence sweep of the Hong Kong Police Force must be authorized. Polygraph examination of all officers with access to:',
      '\u2022 Tactical operation plans',
      '\u2022 Vault security protocols',
      '\u2022 Senior command communications',
      '\u2022 SDU/ASU operational procedures',
      'Expected duration: 3-6 months.',
      'Expected resistance: HIGH (police culture).',
    ],
  },
  {
    num: 'REC-03',
    title: 'FINANCIAL FORENSICS',
    body: [
      'The stolen HK$50M+ must be traced through international banking networks. The ransom money (HK$33.33M) that was not recovered represents a funding source for the conspiracy.',
      'Priority: Track the 3333 pattern in financial transactions.',
    ],
  },
  {
    num: 'REC-04',
    title: 'CONTINUED SURVEILLANCE',
    body: [
      'Operative PHANTOM-7 requests authorization to continue observation of:',
      '\u2022 Commissioner Liu Kit-wing',
      '\u2022 Former DCP Lee Man-bun',
      '\u2022 ICAC investigator Cheung Kwok-biu',
      '\u2022 Security Secretary Luk Ming-wa',
      'All subjects may be targets or unwitting sources of further intelligence.',
    ],
  },
  {
    num: 'REC-05',
    title: 'ESCALATION PROTOCOL',
    body: [
      'If the unidentified organization demonstrates further activity, the following escalation chain is recommended:',
      'LEVEL 1: Enhanced surveillance (current)',
      'LEVEL 2: Joint Task Force activation',
      'LEVEL 3: Cross-border intelligence cooperation',
      'LEVEL 4: [CLASSIFIED \u2014 Level-4 authorization required]',
      'Current status: LEVEL 1 \u2014 MONITORING',
    ],
    isEscalation: true,
  },
];

/* ─── Main Component ─── */
export default function Assessment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const headerLinesRef = useRef<HTMLDivElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const authBarRef = useRef<HTMLDivElement>(null);
  const execSummaryRef = useRef<HTMLDivElement>(null);
  const findingsRef = useRef<HTMLDivElement>(null);
  const threatSectionRef = useRef<HTMLDivElement>(null);
  const threatBarRef = useRef<HTMLDivElement>(null);
  const threatArrowRef = useRef<HTMLDivElement>(null);
  const threatTableRef = useRef<HTMLDivElement>(null);
  const threadsRef = useRef<HTMLDivElement>(null);
  const threadCardsRef = useRef<HTMLDivElement>(null);
  const recsRef = useRef<HTMLDivElement>(null);
  const finalTransmissionRef = useRef<HTMLDivElement>(null);
  const finalTextRef = useRef<HTMLDivElement>(null);
  const finalFrameRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    /* ── Section 1: Report Header Animations ── */
    gsap.fromTo(
      sealRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );

    if (headerLinesRef.current) {
      const lines = headerLinesRef.current.querySelectorAll('.header-line');
      gsap.fromTo(
        lines,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, stagger: 0.2, delay: 0.3 }
      );
    }

    if (headerRef.current) {
      const rules = headerRef.current.querySelectorAll('.header-rule');
      gsap.fromTo(
        rules,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.out', stagger: 0.2 }
      );
    }

    gsap.fromTo(
      titleBlockRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: 'power2.out' }
    );

    /* Metadata table */
    gsap.fromTo(
      metadataRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: metadataRef.current,
          start: 'top 85%',
        },
      }
    );

    /* Authentication bar */
    gsap.fromTo(
      authBarRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: metadataRef.current,
          start: 'top 85%',
        },
      }
    );

    /* ── Section 2: Executive Summary ── */
    if (execSummaryRef.current) {
      const paras = execSummaryRef.current.querySelectorAll('.exec-para');
      gsap.fromTo(
        paras,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: execSummaryRef.current,
            start: 'top 75%',
          },
        }
      );
    }

    /* Key findings */
    if (findingsRef.current) {
      const items = findingsRef.current.querySelectorAll('.finding-item');
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: findingsRef.current,
            start: 'top 75%',
          },
        }
      );
    }

    /* ── Section 3: Threat Assessment ── */
    if (threatBarRef.current) {
      const bar = threatBarRef.current.querySelector('.threat-bar-fill');
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: threatSectionRef.current,
            start: 'top 60%',
            end: 'center center',
            scrub: true,
          },
        }
      );
    }

    gsap.fromTo(
      threatArrowRef.current,
      { scale: 0 },
      {
        scale: 1,
        duration: 0.5,
        ease: 'bounce.out',
        scrollTrigger: {
          trigger: threatSectionRef.current,
          start: 'top 40%',
        },
      }
    );

    if (threatTableRef.current) {
      const rows = threatTableRef.current.querySelectorAll('.threat-row');
      gsap.fromTo(
        rows,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: threatTableRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    /* ── Section 4: Unresolved Threads ── */
    if (threadCardsRef.current) {
      const cards = threadCardsRef.current.querySelectorAll('.thread-card');
      gsap.fromTo(
        cards,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: threadsRef.current,
            start: 'top 75%',
          },
        }
      );
    }

    /* ── Section 5: Recommendations ── */
    if (recsRef.current) {
      const items = recsRef.current.querySelectorAll('.rec-item');
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: recsRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    /* ── Section 6: Final Transmission ── */
    if (finalTextRef.current) {
      const paras = finalTextRef.current.querySelectorAll('.final-para');
      gsap.fromTo(
        paras,
        { opacity: 0.15, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: finalTransmissionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      );
    }

    /* Signature */
    gsap.fromTo(
      '.signature-block',
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.signature-block',
          start: 'top 85%',
        },
      }
    );

    /* Final Frame */
    if (finalFrameRef.current) {
      const items = finalFrameRef.current.querySelectorAll('.cascade-item');
      gsap.fromTo(
        items,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: finalFrameRef.current,
            start: 'top 85%',
          },
        }
      );

      const theEnd = finalFrameRef.current.querySelector('.the-end');
      gsap.fromTo(
        theEnd,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: finalFrameRef.current,
            start: 'top 85%',
          },
        }
      );
    }
  }, { scope: containerRef });

  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div ref={containerRef}>
      {/* ═══════════════════════════════════════════
          SECTION 1: Report Header
          ═══════════════════════════════════════════ */}
      <section ref={headerRef} className="relative bg-void pt-24 pb-20">
        {/* Subtle grid background */}
        <div className="bg-grid absolute inset-0 opacity-50" />

        <div className="relative mx-auto max-w-[1280px] px-4 lg:px-8">
          {/* Authentication Header */}
          <div className="header-rule mb-10 h-px origin-center bg-classified-red/60" />

          <div ref={sealRef} className="mx-auto mb-6 w-[120px] opacity-0" style={{ filter: 'drop-shadow(0 0 12px rgba(226,232,240,0.15))' }}>
            <CommandSeal />
          </div>

          <div ref={headerLinesRef} className="mb-10 text-center">
            <p className="header-line mb-2 font-mono text-h3 tracking-[0.15em] text-classified-red">
              THE PRESIDENT'S EYES ONLY
            </p>
            <p className="header-line font-mono text-caption tracking-widest text-classified-red">
              TOP SECRET // NOFORN // ALPHA
            </p>
          </div>

          <div className="header-rule mb-16 h-px origin-center bg-classified-red/60" />

          {/* Report Title Block */}
          <div ref={titleBlockRef} className="mb-16 text-center opacity-0">
            <p className="mb-4 font-mono text-h3 uppercase tracking-widest text-ghost-grey">
              COMMAND INTELLIGENCE BRIEFING
            </p>
            <h1 className="mb-4 font-mono text-display-xl font-extrabold text-ice-white">
              OPERATION COLD WAR
            </h1>
            <p className="mb-6 font-display text-display-xl font-bold tracking-[0.3em] text-classified-red">
              寒 戰
            </p>
            <p className="font-mono text-body tracking-wider text-ghost-grey">
              Comprehensive Assessment & Strategic Analysis
            </p>
          </div>

          <div className="header-rule mb-16 h-px origin-center bg-classified-red/60" />

          {/* Document Metadata Block */}
          <div
            ref={metadataRef}
            className="mx-auto w-full max-w-[560px] border border-grid-blue opacity-0"
            style={{ backgroundColor: '#141e33' }}
          >
            <div className="border-b border-grid-blue px-5 py-3">
              <span className="font-mono text-mono-code tracking-wider text-ghost-grey">
                DOCUMENT CONTROL INFORMATION
              </span>
            </div>
            <div className="px-5 py-5">
              <div className="space-y-2.5">
                {[
                  { label: 'DOCUMENT REFERENCE', value: 'CW-COMMAND-001' },
                  { label: 'DATE OF REPORT', value: today },
                  { label: 'REPORTING OPERATIVE', value: 'PHANTOM-7' },
                  { label: 'CLEARANCE LEVEL', value: 'ALPHA \u2014 DIRECT APPOINTEE' },
                  { label: 'DISTRIBUTION', value: 'COMMAND ONLY' },
                  { label: 'CLASSIFICATION', value: 'TOP SECRET / NOFORN' },
                  { label: 'PAGES', value: '6' },
                  { label: 'ATTACHMENTS', value: '8 Evidence Files' },
                  { label: 'STATUS', value: 'FINAL \u2014 SUBMITTED' },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between">
                    <span className="font-mono text-[0.8125rem] tracking-wider text-ghost-grey">
                      {row.label}
                    </span>
                    <span className="font-mono text-[0.8125rem] tracking-wider text-ice-white">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-grid-blue pt-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[0.75rem] tracking-wider text-surveillance-green">
                    AUTHENTICATION:
                  </span>
                  <div className="relative h-3 flex-1 overflow-hidden bg-void">
                    <div
                      ref={authBarRef}
                      className="absolute inset-0 origin-left bg-surveillance-green/80"
                      style={{ transform: 'scaleX(0)' }}
                    />
                  </div>
                  <span className="font-mono text-[0.75rem] tracking-wider text-surveillance-green">
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: Executive Summary
          ═══════════════════════════════════════════ */}
      <section className="relative bg-midnight py-16 lg:py-24">
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-[1280px] px-4 lg:px-8">
          {/* Section Label */}
          <div className="mb-12 text-center">
            <span className="font-mono text-label text-classified-red">
              [ EXECUTIVE SUMMARY ]
            </span>
          </div>

          {/* Summary Statement */}
          <div
            ref={execSummaryRef}
            className="mx-auto mb-16 max-w-[720px] border-l-2 border-r-2 border-grid-blue px-6 py-8 text-center"
          >
            <p className="exec-para mb-8 font-mono text-label uppercase tracking-widest text-classified-red">
              EXECUTIVE SUMMARY
            </p>
            <p className="exec-para mb-4 font-display text-h1 font-semibold leading-relaxed text-ice-white">
              The incident codenamed &ldquo;Cold War&rdquo; was not, at its core, a kidnapping operation.
            </p>
            <p className="exec-para mb-4 font-display text-h1 font-semibold leading-relaxed text-ice-white">
              It was an <span className="font-bold text-classified-red">institutional attack</span> on the Hong Kong Police Force designed to exploit internal divisions, compromise the chain of command, and create conditions for systemic penetration of the territory&rsquo;s security apparatus.
            </p>
            <p className="exec-para mb-2 font-display text-h1 font-semibold leading-relaxed text-ice-white">
              The kidnapping was the catalyst.
            </p>
            <p className="exec-para mb-2 font-display text-h1 font-semibold leading-relaxed text-ice-white">
              The power struggle was the objective.
            </p>
            <p className="exec-para font-display text-h1 font-semibold leading-relaxed text-ice-white">
              The institutional damage was the result.
            </p>
          </div>

          {/* Key Findings */}
          <div ref={findingsRef}>
            <p className="mb-8 text-center font-mono text-label tracking-widest text-ghost-grey">
              KEY FINDINGS:
            </p>
            <div className="mx-auto max-w-[800px] space-y-6">
              {keyFindings.map((f) => (
                <div
                  key={f.num}
                  className="finding-item border-l-[3px] border-classified-red bg-steel-blue/60 p-5 lg:p-6"
                  style={{ border: '1px solid #1a2744', borderLeft: '3px solid #dc2626' }}
                >
                  <div className="mb-2 flex items-baseline gap-3">
                    <span className="font-mono text-classified-red">
                      &#9654; {f.num}.
                    </span>
                    <span className="font-mono text-h3 font-bold uppercase tracking-wider text-ice-white">
                      {f.title}
                    </span>
                  </div>
                  <p className="pl-[3.25rem] font-sans text-body leading-relaxed text-ice-white/90">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: Threat Assessment Matrix
          ═══════════════════════════════════════════ */}
      <section ref={threatSectionRef} className="relative bg-void py-16 lg:py-24">
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-[1280px] px-4 lg:px-8">
          {/* Section Label */}
          <div className="mb-12 text-center">
            <span className="font-mono text-label text-alert-amber">
              [ THREAT ASSESSMENT ]
            </span>
            <p className="mt-2 font-display text-sm tracking-widest text-ghost-grey/60">
              威脅評估
            </p>
          </div>

          {/* Threat Level Indicator */}
          <div className="mx-auto mb-16 max-w-[520px] text-center">
            <p className="mb-6 font-mono text-label uppercase tracking-widest text-ghost-grey">
              THREAT LEVEL ASSESSMENT
            </p>

            <div className="mb-3 flex justify-between font-mono text-[10px] tracking-widest text-ghost-grey">
              <span>LOW</span>
              <span>MEDIUM</span>
              <span>HIGH</span>
              <span className="text-classified-red">CRITICAL</span>
            </div>

            {/* Threat bar */}
            <div
              ref={threatBarRef}
              className="relative mx-auto mb-4 h-6 w-full max-w-[480px] overflow-hidden rounded-sm"
            >
              <div className="absolute inset-0 bg-void" style={{ border: '1px solid #1a2744' }} />
              <div
                className="threat-bar-fill absolute inset-0 origin-left"
                style={{
                  background: 'linear-gradient(90deg, #10b981 0%, #f59e0b 50%, #dc2626 85%, #dc2626 100%)',
                }}
              />
            </div>

            {/* Arrow + Status */}
            <div ref={threatArrowRef} className="mx-auto w-fit opacity-0">
              <div className="text-classified-red">
                <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" className="mx-auto mb-1">
                  <polygon points="8,20 0,8 16,8" />
                </svg>
                <p className="font-mono text-[10px] tracking-widest">CURRENT STATUS</p>
              </div>
            </div>

            <div className="mt-4 rounded-sm border border-classified-red/30 bg-classified-red/5 px-4 py-3">
              <p className="animate-pulse-warning font-mono text-sm font-bold tracking-wider text-classified-red">
                CRITICAL — ELEVATED FROM HIGH
              </p>
              <p className="mt-1 font-sans text-sm leading-relaxed text-ghost-grey">
                Reason: Active threat to Commissioner Liu&rsquo;s family. Unidentified organization with demonstrated capability for institutional penetration.
              </p>
            </div>
          </div>

          {/* Threat Category Table */}
          <div
            ref={threatTableRef}
            className="mx-auto w-full max-w-[720px] overflow-hidden border border-grid-blue"
          >
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-steel-blue px-4 py-3 font-mono text-[0.75rem] font-medium tracking-wider text-ice-white">
              <span>THREAT CATEGORY</span>
              <span className="text-center">LEVEL</span>
              <span className="text-center">STATUS</span>
              <span className="text-center">TREND</span>
            </div>
            {/* Rows */}
            {threatCategories.map((cat) => (
              <div
                key={cat.category}
                className={`threat-row grid grid-cols-4 border-t border-grid-blue ${
                  cat.level === 'CRITICAL' ? 'animate-pulse-warning' : ''
                }`}
              >
                <span className="px-4 py-3 font-mono text-[0.75rem] tracking-wider text-ice-white">
                  {cat.category}
                </span>
                <span className={`px-4 py-3 text-center font-mono text-[0.75rem] font-bold tracking-wider ${cat.levelColor} ${cat.bgColor}`}>
                  {cat.level}
                </span>
                <span className="px-4 py-3 text-center font-mono text-[0.75rem] tracking-wider text-ice-white">
                  {cat.status}
                </span>
                <span className={`px-4 py-3 text-center font-mono text-[0.75rem] tracking-wider ${
                  cat.trend.includes('WORSENING') || cat.trend.includes('ESCALATING')
                    ? 'text-classified-red'
                    : cat.trend.includes('IMPROVING')
                    ? 'text-surveillance-green'
                    : 'text-ghost-grey'
                }`}>
                  {cat.trend}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: Unresolved Threads
          ═══════════════════════════════════════════ */}
      <section ref={threadsRef} className="relative bg-midnight py-16 lg:py-24">
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-[1280px] px-4 lg:px-8">
          {/* Section Label */}
          <div className="mb-12 text-center">
            <span className="font-mono text-label text-classified-red">
              [ UNRESOLVED THREADS ]
            </span>
            <p className="mt-2 font-display text-sm tracking-widest text-ghost-grey/60">
              未解決線索
            </p>
          </div>

          {/* Warning Banner */}
          <div className="mx-auto mb-12 max-w-[800px] animate-pulse-warning rounded-sm border-2 border-classified-red p-5 text-center" style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)' }}>
            <p className="mb-1 font-mono text-sm font-bold tracking-wider text-classified-red">
              &#9888; THIS SECTION CONTAINS ACTIVE INTELLIGENCE GAPS
            </p>
            <p className="font-sans text-sm leading-relaxed text-classified-red/80">
              The following questions remain unanswered. Each represents a potential vulnerability in national security assessment.
            </p>
          </div>

          {/* Question Cards */}
          <div ref={threadCardsRef} className="mx-auto max-w-[800px] space-y-6">
            {unresolvedQuestions.map((q, i) => (
              <div
                key={i}
                className="thread-card border-l-[3px] border-grid-blue p-6"
                style={{
                  backgroundColor: '#141e33',
                  border: '1px solid #1a2744',
                  borderLeft: '3px solid #dc2626',
                }}
              >
                {/* Priority badge */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-h1 text-classified-red">?</span>
                  <span
                    className="rounded-sm px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider"
                    style={{
                      backgroundColor: '#dc2626',
                      color: '#050508',
                    }}
                  >
                    QUESTION {i + 1} / PRIORITY: {q.priority}
                  </span>
                </div>
                {/* Title */}
                <h3 className="mb-4 font-display text-h2 font-semibold tracking-wide text-ice-white">
                  {q.title}
                </h3>
                {/* Body */}
                <div className="space-y-2">
                  {q.body.map((line, j) => (
                    <p
                      key={j}
                      className={`font-sans text-body leading-relaxed ${
                        line.startsWith('[CLASSIFIED') || line.startsWith('[REDACTED')
                          ? 'font-mono text-sm text-alert-amber/80 italic'
                          : line.startsWith('\u2022')
                          ? 'pl-4 text-ghost-grey'
                          : 'text-ghost-grey'
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5: Strategic Recommendations
          ═══════════════════════════════════════════ */}
      <section ref={recsRef} className="relative bg-void py-16 lg:py-24">
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-[1280px] px-4 lg:px-8">
          {/* Section Label */}
          <div className="mb-12 text-center">
            <span className="font-mono text-label text-surveillance-green">
              [ STRATEGIC RECOMMENDATIONS ]
            </span>
            <p className="mt-2 font-display text-sm tracking-widest text-ghost-grey/60">
              戰略建議
            </p>
          </div>

          <div className="mx-auto max-w-[800px] space-y-8">
            {recommendations.map((rec, i) => (
              <div key={rec.num} className="rec-item">
                <div className="mb-3 flex items-baseline gap-4">
                  <span className="font-mono text-h2 text-surveillance-green">{rec.num}:</span>
                  <h3 className="font-display text-h2 font-semibold uppercase tracking-wide text-ice-white">
                    {rec.title}
                  </h3>
                </div>
                <div className="space-y-2 pl-4">
                  {rec.body.map((line, j) => (
                    <p
                      key={j}
                      className={`font-sans text-body leading-relaxed ${
                        line.startsWith('LEVEL')
                          ? rec.isEscalation
                            ? line.startsWith('LEVEL 1')
                              ? 'border-l-2 border-surveillance-green pl-3 font-mono text-sm text-surveillance-green'
                              : line.startsWith('LEVEL 2')
                              ? 'border-l-2 border-alert-amber pl-3 font-mono text-sm text-alert-amber'
                              : line.startsWith('LEVEL 3')
                              ? 'border-l-2 border-classified-red pl-3 font-mono text-sm text-classified-red'
                              : 'border-l-2 border-void pl-3 font-mono text-sm text-ghost-grey/60 italic'
                            : 'font-mono text-sm text-ghost-grey'
                          : line.startsWith('Expected') || line.startsWith('Priority:') || line.startsWith('Current status:') || line.startsWith('Status of')
                          ? 'font-mono text-sm text-ghost-grey italic'
                          : line.startsWith('\u2022')
                          ? 'pl-4 text-ice-white'
                          : 'text-ice-white'
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
                {i < recommendations.length - 1 && (
                  <div className="mt-8 h-px bg-grid-blue" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6: Final Transmission
          ═══════════════════════════════════════════ */}
      <section
        ref={finalTransmissionRef}
        className="relative min-h-[100dvh] bg-void"
      >
        {/* Background image with heavy overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/rooftop-finale.jpg)' }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(5, 5, 8, 0.92)' }}
        />
        <div className="bg-grid absolute inset-0 opacity-30" />

        <div className="relative mx-auto flex min-h-[100dvh] max-w-[1280px] flex-col items-center justify-center px-4 py-20 lg:px-8">
          {/* Horizontal rule */}
          <div className="mx-auto mb-12 h-px w-full max-w-[680px] bg-grid-blue" />

          {/* Letter body */}
          <div
            ref={finalTextRef}
            className="mx-auto w-full max-w-[680px] space-y-6"
            style={{ lineHeight: 2.0 }}
          >
            <p className="final-para font-sans text-body leading-[2] text-ice-white">
              長官，
            </p>

            <p className="final-para font-sans text-body leading-[2] text-ice-white">
              I have told you everything I know.
            </p>
            <p className="final-para font-sans text-body leading-[2] text-ice-white">
              I have shown you everything I found.
            </p>
            <p className="final-para font-sans text-body leading-[2] text-ice-white">
              I have analyzed every angle, every motive, every player.
            </p>

            <p className="final-para font-sans text-body leading-[2] text-ice-white">
              But there is one thing I cannot put in a report.
            </p>
            <p className="final-para font-sans text-body leading-[2] text-ice-white">
              One thing that data cannot capture.
            </p>

            <p className="final-para font-sans text-body leading-[2] text-ice-white">
              The feeling of watching an institution eat itself from within.
            </p>
            <p className="final-para font-sans text-body leading-[2] text-ice-white">
              Of seeing good men make terrible choices because the system gave them no good ones.
            </p>
            <p className="final-para font-sans text-body leading-[2] text-ice-white">
              Of knowing that the safest city in Asia was never safe at all &mdash; just lucky, until its luck ran out.
            </p>

            <div className="final-para py-4">
              <p className="mb-2 font-display text-h3 italic text-alert-amber">
                李文彬 said it best:
              </p>
              <p className="mb-1 font-display text-h3 italic text-alert-amber">
                「非常時期，用非常方法。」
              </p>
              <p className="font-sans text-sm text-ghost-grey">
                (Extraordinary times call for extraordinary measures.)
              </p>
            </div>

            <p className="final-para font-sans text-body leading-[2] text-ice-white">
              But what happens when the extraordinary becomes the ordinary?
            </p>
            <p className="final-para font-sans text-body leading-[2] text-ice-white">
              What happens when the exception becomes the rule?
            </p>

            <p className="final-para font-display text-h2 font-semibold leading-relaxed text-classified-red">
              長官，這才是真正的寒戰。
            </p>

            <p className="final-para font-sans text-body leading-[2] text-ice-white">
              Not the one that happened in December 2015.
            </p>
            <p className="final-para font-sans text-body leading-[2] text-ice-white">
              The one that is still happening &mdash; in every institution, in every city, in every country where power is concentrated and accountability is diffuse.
            </p>

            <p className="final-para font-sans text-body leading-[2] text-ice-white">
              I remain your invisible observer.
            </p>
            <p className="final-para font-sans text-body leading-[2] text-ice-white">
              Your phantom in the machine.
            </p>

            <p className="final-para font-sans text-body leading-[2] text-ice-white">
              I will keep watching.
            </p>
            <p className="final-para font-sans text-body leading-[2] text-ice-white">
              I will keep reporting.
            </p>

            <p className="final-para font-sans text-body leading-[2] text-ice-white">
              Until the next briefing,
            </p>

            {/* Signature */}
            <div className="signature-block pt-6 text-center opacity-0">
              <p className="mb-1 font-mono text-h1 font-extrabold tracking-[0.1em] text-steel-cyan">
                &#9608;&#9608;&#9608; PHANTOM-7 &#9608;&#9608;&#9608;
              </p>
              <p className="font-mono text-caption tracking-widest text-ghost-grey">
                Alpha Clearance
              </p>
              <p className="font-mono text-caption tracking-widest text-ghost-grey">
                Direct Appointee
              </p>
              <p className="font-mono text-caption tracking-widest text-ghost-grey">
                Direct Report to Command
              </p>
              {/* Blinking cursor */}
              <p className="mt-4 font-mono text-steel-cyan animate-typing-cursor">
                &#9608;
              </p>
            </div>
          </div>

          <div className="mx-auto mb-12 mt-16 h-px w-full max-w-[680px] bg-grid-blue" />

          {/* ═── Final Frame ─═ */}
          <div ref={finalFrameRef} className="mx-auto max-w-[680px] text-center">
            <div className="mb-6">
              <p className="cascade-item font-mono text-caption tracking-wider text-surveillance-green">
                &gt; _
              </p>
            </div>

            <div className="mb-8 space-y-1">
              {[
                '[ CHANNEL OPEN — AWAITING NEXT BRIEFING ]',
                '[ ALL EVIDENCE SECURED ]',
                '[ NO BREACH DETECTED — TRANSMISSION CLEAN ]',
              ].map((line, i) => (
                <p key={i} className="cascade-item font-mono text-caption tracking-wider text-surveillance-green">
                  {line}
                </p>
              ))}
            </div>

            <div className="the-end mb-8 opacity-0">
              <p className="font-mono text-h2 tracking-widest text-ice-white">
                [ THE END ]
              </p>
            </div>

            <div className="mb-4 opacity-0" style={{ animation: 'fadeIn 0.6s ease-out 0.8s forwards' }}>
              <p className="font-display text-body text-ghost-grey">
                「寒戰」— Cold War (2012)
              </p>
              <p className="font-display text-body text-ghost-grey">
                A Film by Longman Leung &amp; Sunny Luk
              </p>
            </div>

            <p className="font-mono text-[10px] leading-relaxed tracking-wider text-ghost-grey/50 italic">
              This dossier was compiled by Operative PHANTOM-7 as a classified intelligence report.
              <br />
              All events based on the motion picture.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
