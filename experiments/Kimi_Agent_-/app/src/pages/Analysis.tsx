import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Swords,
  Target,
  Shield,
  ChevronRight,
  Star,
  AlertTriangle,
  FileText,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

interface OrgNodeData {
  id: string;
  title: string;
  titleEn: string;
  name?: string;
  actor?: string;
  status?: string;
  statusColor?: string;
  borderColor?: string;
  children?: OrgNodeData[];
  vs?: boolean;
  vacant?: boolean;
  description?: string;
}

interface MoveData {
  number: number;
  faction: string;
  factionColor: string;
  move: string;
  moveEn: string;
  timing: string;
  outcome: string;
  outcomeColor?: string;
  analysis: string;
  insight: string;
  rating: number;
  ratingLabel: string;
}

interface ComparisonRow {
  dimension: string;
  liuValue: string;
  leeValue: string;
}

interface ThematicCardData {
  title: string;
  titleEn: string;
  borderColor: string;
  content: string;
}

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

const orgData: OrgNodeData = {
  id: 'root',
  title: '特首',
  titleEn: 'CHIEF EXECUTIVE',
  borderColor: '#1a2744',
  children: [
    {
      id: 'cs',
      title: '政務司司長',
      titleEn: 'CHIEF SECRETARY',
      borderColor: '#1a2744',
      children: [
        {
          id: 'sec',
          title: '保安局局長',
          titleEn: 'SECRETARY FOR SECURITY',
          name: '陸明華 / LUK Ming-wa',
          actor: '[安迪·劉 / Andy Lau]',
          status: 'GOVERNMENT ALLY',
          statusColor: '#10b981',
          borderColor: '#1a2744',
          description: 'Highest-ranking official overseeing security affairs. Maintains neutrality during the crisis but ultimately supports Liu\'s appointment.',
          children: [
            {
              id: 'comm',
              title: '香港警務處處長',
              titleEn: 'COMMISSIONER OF POLICE',
              name: '曾向榮 / TSANG Heung-wing',
              actor: '[職位空缺 / VACANT]',
              status: 'ABSENT — 因公外訪',
              statusColor: '#f59e0b',
              borderColor: '#f59e0b',
              vacant: true,
              description: 'The Commissioner is away on official business abroad. This vacancy is the catalyst for the power struggle.',
              children: [
                {
                  id: 'dcp-ops',
                  title: '副處長（行動）',
                  titleEn: 'DCP (OPERATIONS)',
                  name: '李文彬 / LEE Man-bun',
                  actor: '[梁家輝]',
                  status: '武官系統 — THREAT: AMBER',
                  statusColor: '#f59e0b',
                  borderColor: '#f59e0b',
                  vs: true,
                  description: 'Veteran of the military (武官) faction. Seizes command through fait accompli. Aggressive, decisive, emotionally compromised.',
                  children: [
                    {
                      id: 'kwong',
                      title: '高級警司',
                      titleEn: 'SSP',
                      name: '鄺智立 / KWONG Chi-lap',
                      actor: '[林家棟]',
                      status: 'ALLY',
                      statusColor: '#10b981',
                      borderColor: '#10b981',
                      description: 'Lee\'s subordinate who defects to Liu\'s faction at the critical vote. His defection is decisive.',
                    },
                    {
                      id: 'michael',
                      title: '指揮官',
                      titleEn: 'CMDR',
                      name: '石米高 / SHEK Mi-go',
                      actor: '[安志傑]',
                      status: 'ENEMY',
                      statusColor: '#ef4444',
                      borderColor: '#ef4444',
                      description: 'Undercover mole working with the kidnappers. His betrayal runs deep within Lee\'s own faction.',
                    },
                    {
                      id: 'dept-ops',
                      title: '各部門',
                      titleEn: 'DEPARTMENTS',
                      borderColor: '#1a2744',
                      description: 'Operations divisions loyal to the DCP (Operations) chain of command.',
                    },
                  ],
                },
                {
                  id: 'dcp-admin',
                  title: '副處長（管理）',
                  titleEn: 'DCP (ADMIN)',
                  name: '劉傑輝 / LIU Kit-wing',
                  actor: '[郭富城]',
                  status: '文官系統 — THREAT: LOW',
                  statusColor: '#38bdf8',
                  borderColor: '#38bdf8',
                  vs: true,
                  description: 'Administrative (文官) faction leader. Calculated, patient, strategic mastermind who plays by the rules to win.',
                  children: [
                    {
                      id: 'tsui',
                      title: '高級警司',
                      titleEn: 'SSP',
                      name: '徐永基 / TSUI Wing-gei',
                      actor: '[錢嘉樂]',
                      status: 'ENEMY',
                      statusColor: '#ef4444',
                      borderColor: '#ef4444',
                      description: 'Liu\'s trusted subordinate who is secretly working against him. His betrayal is the deepest cut.',
                    },
                    {
                      id: 'leung',
                      title: '高級助理處長',
                      titleEn: 'SAC',
                      name: '梁紫薇 / LEUNG Mei-ji',
                      actor: '[楊采妮]',
                      status: 'ALLY',
                      statusColor: '#10b981',
                      borderColor: '#10b981',
                      description: 'Police Public Relations head. Remains loyal to Liu throughout the crisis and helps coordinate his strategy.',
                    },
                    {
                      id: 'dept-admin',
                      title: '行政部',
                      titleEn: 'ADMIN DEPT',
                      borderColor: '#1a2744',
                      description: 'Administrative divisions controlling budgets, personnel, and policy — Liu\'s power base.',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const movesData: MoveData[] = [
  {
    number: 1,
    faction: 'Lee Man-bun',
    factionColor: '#f59e0b',
    move: '自封署理處長',
    moveEn: 'Self-Appointed Acting Commissioner',
    timing: '00:15 HKT — Immediate response',
    outcome: 'Temporary command secured. Operation Cold War activated.',
    analysis: "Lee's first move was swift and decisive — classic military thinking. With the Commissioner absent, he claimed the empty throne through fait accompli. By declaring himself Acting Commissioner and launching Operation Cold War before anyone could object, he established a command structure on his terms.\n\nThis was a power grab disguised as operational necessity. The urgency of the situation provided perfect cover.",
    insight: "Lee moved first because he understood that in a crisis, the first person to act sets the rules. But moving first also meant making decisions before all information was available.",
    rating: 4,
    ratingLabel: 'Strong opening, but rushed',
  },
  {
    number: 2,
    faction: 'Liu Kit-wing',
    factionColor: '#10b981',
    move: '公開彈劾',
    moveEn: 'Public Challenge',
    timing: '00:38 HKT — 23 minutes after Lee\'s declaration',
    outcome: 'Command contested. Split in high command.',
    analysis: "Liu did not challenge Lee's competence directly — he challenged his objectivity.\n\nThe argument was masterful: Lee's son is among the hostages. No father can think clearly when his child's life is at stake. This is not about ability — it's about the fundamental impossibility of objective judgment under such circumstances.\n\nLiu quoted Churchill. Lee countered with his own Churchill. The debate was as much about philosophical dominance as it was about command authority.",
    insight: "Liu chose the battlefield of principles rather than personalities. By framing the issue as procedural integrity, he appealed to the administration-minded officers who valued rules over loyalty.",
    rating: 5,
    ratingLabel: 'Brilliant framing — the right argument at the right time',
  },
  {
    number: 3,
    faction: 'Lee Man-bun',
    factionColor: '#f59e0b',
    move: '營救行動',
    moveEn: 'Rescue Operation',
    timing: '02:17 HKT',
    outcome: 'COMPLETE FAILURE. Decoy discovered. Intelligence compromised.',
    outcomeColor: '#ef4444',
    analysis: "This was the turning point — not because the rescue failed, but because it exposed the depth of the conspiracy.\n\nLee's team followed intelligence to the target location and found only a decoy mannequin and explosives. The kidnappers knew exactly where the police would look and what they would find.\n\nThe failure was not tactical — it was systemic. Someone inside the police force was feeding real-time intelligence to the enemy. The rescue operation unmasked the mole network.",
    insight: "Sometimes a failed operation reveals more than a successful one. Lee's failure gave Liu the evidence he needed to challenge Lee's judgment — and the justification to demand a new approach.",
    rating: 2,
    ratingLabel: 'Catastrophic failure that cost him everything',
  },
  {
    number: 4,
    faction: 'Liu Kit-wing',
    factionColor: '#10b981',
    move: '奪取指揮權',
    moveEn: 'Command Takeover',
    timing: '03:55 HKT',
    outcome: "Impeachment successful. Liu becomes operational commander.",
    analysis: "Liu assembled his coalition carefully. Kwong Chi-lap's defection from Lee's faction was the decisive vote — without Kwong's support, Liu would not have had the numbers to remove Lee.\n\nThe impeachment was not a coup. It followed established procedures for removing a commander who has lost the confidence of the senior leadership. Liu played within the rules — and used the rules to achieve his objective.\n\nThis is the difference between the two men: Lee bends rules for the mission. Liu uses rules as weapons.",
    insight: "Liu's coalition-building was the key. He didn't just argue for command — he secured the votes before the meeting. Politics is arithmetic, and Liu did his math.",
    rating: 5,
    ratingLabel: 'Perfectly executed institutional maneuver',
  },
  {
    number: 5,
    faction: 'Liu Kit-wing',
    factionColor: '#10b981',
    move: '親自交收贖金',
    moveEn: 'Personal Ransom Delivery',
    timing: '14:22 HKT',
    outcome: 'Bridge ambush. SSP Tsui killed. Partial intelligence gathered.',
    analysis: "Liu's decision to deliver the ransom personally was either incredibly brave or incredibly calculated. Perhaps both.\n\nBy putting himself in harm's way, Liu demonstrated leadership that Lee had failed to show. But more importantly, the ransom package contained tracking device — Liu was using the delivery as an intelligence operation, not merely a transaction.\n\nThe bridge shootout was a disaster — Tsui was killed, the money was lost, and the kidnappers escaped. But the tracking device provided crucial data about the enemy's operational patterns.",
    insight: "Liu turned a ransom payment into an intelligence operation. Even in failure, he gathered data. This is the mark of a strategist — every move serves multiple purposes.",
    rating: 3,
    ratingLabel: 'High risk, mixed results, but gained intelligence',
  },
  {
    number: 6,
    faction: 'Liu Kit-wing',
    factionColor: '#10b981',
    move: '匿名舉報自己',
    moveEn: 'Anonymous Self-Report to ICAC',
    timing: '20:10 HKT',
    outcome: 'ICAC investigates. Liu uses investigation to expose real traitors.',
    analysis: "This is the most audacious move in the entire operation.\n\nLiu reported himself anonymously to the Independent Commission Against Corruption — essentially inviting the police's own watchdog to investigate him. It was a gamble of extraordinary proportions.\n\nThe strategy: if Liu was innocent (which he was), the ICAC investigation would clear his name while uncovering evidence against the real conspirators. If Liu was guilty, he would be exposed by his own trap.\n\nIt worked. The ICAC investigation, led by the aggressive Cheung Kwok-biu, ultimately helped Liu by eliminating suspects and redirecting attention toward Tsui and the others.",
    insight: "This move separates a good strategist from a great one. Liu didn't just play the game — he changed the rules by introducing a third party (ICAC) that neither he nor Lee controlled. And he bet everything on his own innocence.",
    rating: 5,
    ratingLabel: 'The defining move of the entire operation — pure strategic genius',
  },
];

const comparisonData: ComparisonRow[] = [
  { dimension: 'BACKGROUND', liuValue: 'Civil administration', leeValue: 'Military operations' },
  { dimension: 'STYLE', liuValue: 'Calculated, patient', leeValue: 'Aggressive, decisive' },
  { dimension: 'PHILOSOPHY', liuValue: '"Win through intelligence"', leeValue: '"Action above all"' },
  { dimension: 'KEY QUOTE', liuValue: '"All wars are unnecessary"', leeValue: '"Extraordinary measures"' },
  { dimension: 'CRISIS RESPONSE', liuValue: 'Analyzed, then acted', leeValue: 'Acted immediately' },
  { dimension: 'COALITION', liuValue: 'Built carefully', leeValue: 'Assumed loyalty' },
  { dimension: 'RISK TOLERANCE', liuValue: 'High (calculated risks)', leeValue: 'High (instinctive risks)' },
  { dimension: 'KEY ADVANTAGE', liuValue: 'Objectivity, procedure', leeValue: 'Experience, charisma' },
  { dimension: 'KEY WEAKNESS', liuValue: 'No operational command experience', leeValue: 'Compromised by family ties' },
  { dimension: 'DEFINING MOVE', liuValue: 'ICAC self-report', leeValue: 'Declaring self Acting Commissioner' },
  { dimension: 'OUTCOME', liuValue: 'WON — Promoted to Commissioner', leeValue: 'LOST — Son arrested' },
];

const thematicData: ThematicCardData[] = [
  {
    title: '文官 vs 武官',
    titleEn: 'Civilian vs Military',
    borderColor: '#38bdf8',
    content: "Cold War is fundamentally about two models of leadership competing for control of the same institution.\n\nThe civilian administrator (Liu) believes in systems, procedures, and strategic thinking. The military commander (Lee) believes in decisive action, personal authority, and field experience.\n\nNeither approach is wrong. The crisis required both. But the system could only have one leader — and the institutional structure favored the administrator in the long run.",
  },
  {
    title: '法治精神',
    titleEn: 'Rule of Law',
    borderColor: '#10b981',
    content: "Lee's philosophy — \"extraordinary times call for extraordinary measures\" — is seductive in a crisis. But it is also dangerous.\n\nLiu's insistence on procedural justice, even when lives are at stake, represents the fundamental tension in democratic institutions: how do you protect the system while the system is under attack?\n\nThe film asks: if you abandon the rules to save the situation, what have you saved? And what have you lost?",
  },
  {
    title: '最安全城市的幻象',
    titleEn: 'The Safest City Illusion',
    borderColor: '#dc2626',
    content: "\"This is Hong Kong. Asia's safest city.\"\n\nThe opening narration becomes ironic as the film unfolds. The safest city has traitors in its highest ranks. The safest city has a police force at war with itself.\n\nThe illusion of safety is more dangerous than actual danger — because it prevents preparation. When the crisis came, the system was unprepared not because it lacked resources, but because it lacked the imagination to conceive of such a threat.",
  },
];

/* ──────────────────────────────────────────────
   Sub-Components
   ────────────────────────────────────────────── */

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'fill-alert-amber text-alert-amber' : 'fill-transparent text-ghost-grey/30'}
        />
      ))}
    </div>
  );
}

/* ── Org Chart Node ── */
function OrgNode({
  node,
  level,
}: {
  node: OrgNodeData;
  level: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY - 10 });
  };

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      {/* Connector line from parent */}
      {level > 0 && (
        <div
          className="org-connector-vertical w-px bg-grid-blue"
          style={{ height: 24 }}
          data-level={level}
        />
      )}

      {/* Node box */}
      <div
        className="org-node relative cursor-pointer"
        data-node-id={node.id}
        data-level={level}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <div
          className="relative rounded-sm border p-3 transition-all duration-200"
          style={{
            borderColor: hovered ? (node.borderColor || '#1a2744') : node.vacant ? '#f59e0b' : '#1a2744',
            borderWidth: node.vacant ? '2px' : '1px',
            borderStyle: node.vacant ? 'dashed' : 'solid',
            backgroundColor: hovered ? 'rgba(20, 30, 51, 0.95)' : 'rgba(20, 30, 51, 0.7)',
            boxShadow: hovered ? `0 0 20px ${node.borderColor || '#38bdf8'}20` : 'none',
            minWidth: level <= 2 ? 240 : level === 3 ? 220 : 150,
          }}
        >
          {/* Status dot */}
          {node.status && node.statusColor && (
            <span
              className="absolute -left-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full"
              style={{ backgroundColor: node.statusColor }}
            />
          )}

          <div className="text-center">
            <div className="font-mono text-[10px] tracking-wider text-ghost-grey">
              {node.titleEn}
            </div>
            <div className="mt-0.5 font-sans text-sm font-semibold text-ice-white">
              {node.title}
            </div>
            {node.name && (
              <div className="mt-1 font-sans text-xs text-steel-cyan">
                {node.name}
              </div>
            )}
            {node.actor && (
              <div className="mt-0.5 font-mono text-[10px] text-ghost-grey/70">
                {node.actor}
              </div>
            )}
            {node.status && (
              <div
                className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] tracking-wider"
                style={{ color: node.statusColor || '#94a3b8' }}
              >
                {node.status.includes('ENEMY') && <AlertTriangle size={10} />}
                {node.status.includes('ALLY') && <Shield size={10} />}
                <span>STATUS: {node.status}</span>
              </div>
            )}
          </div>

          {/* VS badge between DCPs */}
          {node.vs && (
            <div
              className="vs-badge absolute -right-8 top-1/2 z-10 hidden -translate-y-1/2 translate-x-full items-center justify-center rounded-sm border border-classified-red bg-void px-2 py-1 lg:flex"
              style={{
                animation: 'pulse-warning 2s ease-in-out infinite',
              }}
            >
              <span className="font-mono text-[10px] font-bold tracking-widest text-classified-red">
                VS
              </span>
            </div>
          )}
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {hovered && node.description && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none fixed z-[100] max-w-[280px] rounded-sm border border-grid-blue bg-midnight p-3 shadow-xl"
              style={{
                left: tooltipPos.x,
                top: tooltipPos.y,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <p className="font-sans text-xs leading-relaxed text-ice-white">
                {node.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Children */}
      {hasChildren && (
        <>
          {/* Vertical connector down */}
          <div
            className="org-connector-vertical-down w-px bg-grid-blue"
            style={{ height: 24 }}
          />

          {/* Horizontal connector */}
          <div className="relative flex items-start justify-center">
            {node.children!.length > 1 && (
              <div
                className="org-connector-horizontal absolute top-0 h-px bg-grid-blue"
                style={{
                  left: `${100 / (node.children!.length * 2)}%`,
                  right: `${100 / (node.children!.length * 2)}%`,
                }}
              />
            )}
            <div className={`flex gap-2 sm:gap-4 ${node.children!.length > 2 ? 'flex-wrap justify-center' : ''}`}>
              {node.children!.map((child) => (
                <div key={child.id} className="flex flex-col items-center">
                  {/* Small vertical stub from horizontal line */}
                  {node.children!.length > 1 && (
                    <div
                      className="org-connector-stub w-px bg-grid-blue"
                      style={{ height: 16 }}
                    />
                  )}
                  <OrgNode
                    node={child}
                    level={level + 1}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Move Card ── */
function MoveCard({ move, index }: { move: MoveData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLee = move.faction === 'Lee Man-bun';

  return (
    <div
      ref={cardRef}
      className="move-card max-w-[900px] mx-auto"
      data-move-index={index}
    >
      <div
        className="overflow-hidden rounded-sm border border-grid-blue"
        style={{ borderTopWidth: 3, borderTopColor: move.factionColor }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Left column — move info */}
          <div
            className="flex-shrink-0 p-6 md:w-[40%]"
            style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
          >
            {/* Move header */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-label text-ghost-grey">
                MOVE {move.number}
              </span>
              <span
                className="flex items-center gap-1.5 rounded-sm px-2 py-0.5 font-mono text-[10px] tracking-wider"
                style={{
                  color: move.factionColor,
                  border: `1px solid ${move.factionColor}40`,
                }}
              >
                {isLee ? <Swords size={10} /> : <Target size={10} />}
                {move.faction.toUpperCase()}
              </span>
            </div>

            {/* Move title */}
            <h3 className="mt-4 font-sans text-h3 text-ice-white">
              {move.move}
            </h3>
            <p className="mt-1 font-mono text-xs text-ghost-grey/70">
              {move.moveEn}
            </p>

            {/* Timing */}
            <div className="mt-6">
              <span className="font-mono text-label text-ghost-grey">TIMING</span>
              <p className="mt-1 font-mono text-xs text-alert-amber">{move.timing}</p>
            </div>

            {/* Outcome */}
            <div className="mt-4">
              <span className="font-mono text-label text-ghost-grey">OUTCOME</span>
              <p
                className="mt-1 font-mono text-xs leading-relaxed"
                style={{ color: move.outcomeColor || '#e2e8f0' }}
              >
                {move.outcome}
              </p>
            </div>

            {/* Faction color bar */}
            <div
              className="mt-6 h-1 w-full rounded-full"
              style={{ backgroundColor: move.factionColor }}
            />
          </div>

          {/* Right column — analysis */}
          <div className="flex-1 border-t border-grid-blue p-6 md:border-t-0 md:border-l">
            <span className="flex items-center gap-2 font-mono text-label text-ghost-grey">
              <FileText size={12} />
              TACTICAL ANALYSIS
            </span>

            <div className="mt-4 whitespace-pre-line font-sans text-sm leading-relaxed text-ice-white/90">
              {move.analysis}
            </div>

            {/* Key Insight */}
            <div className="mt-6 border-l-2 border-steel-cyan pl-4">
              <span className="font-mono text-[10px] tracking-wider text-steel-cyan">
                KEY INSIGHT
              </span>
              <p className="mt-2 font-sans text-sm italic leading-relaxed text-ice-white/80">
                &ldquo;{move.insight}&rdquo;
              </p>
            </div>

            {/* Rating */}
            <div className="mt-6 flex items-center gap-4">
              <div>
                <span className="font-mono text-[10px] tracking-wider text-ghost-grey">
                  OPERATIVE RATING
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <StarRating rating={move.rating} />
                </div>
              </div>
              <span className="font-mono text-[10px] italic text-ghost-grey/60">
                {move.ratingLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Thematic Card ── */
function ThematicCard({ card, index }: { card: ThematicCardData; index: number }) {
  return (
    <div
      className="thematic-card dossier-card relative overflow-hidden"
      data-card-index={index}
      style={{ borderTopWidth: 3, borderTopColor: card.borderColor }}
    >
      {/* Top label */}
      <span className="font-mono text-label text-ghost-grey">
        OPERATIVE&apos;S ANALYSIS
      </span>

      {/* Title */}
      <h3 className="mt-4 font-sans text-h3 text-ice-white">{card.title}</h3>
      <p className="mt-1 font-mono text-xs text-ghost-grey/70">{card.titleEn}</p>

      {/* Content */}
      <div className="mt-6 whitespace-pre-line font-sans text-sm leading-relaxed text-ice-white/85">
        {card.content}
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-30"
        style={{ backgroundColor: card.borderColor }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main Page Component
   ────────────────────────────────────────────── */

export default function Analysis() {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const orgChartRef = useRef<HTMLDivElement>(null);
  const movesRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const thematicRef = useRef<HTMLDivElement>(null);
  const assessmentRef = useRef<HTMLDivElement>(null);

  /* ── GSAP Scroll Animations ── */
  useGSAP(
    () => {
      if (!pageRef.current) return;

      /* Header: fade in + slide up */
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );

      /* Header border animation */
      const headerBorder = headerRef.current?.querySelector('.header-border');
      if (headerBorder) {
        gsap.fromTo(
          headerBorder,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power2.out', delay: 0.6 }
        );
      }

      /* Org Chart: build top-to-bottom */
      const orgNodes = orgChartRef.current?.querySelectorAll('.org-node');
      const orgConnectors = orgChartRef.current?.querySelectorAll(
        '.org-connector-vertical, .org-connector-vertical-down, .org-connector-horizontal, .org-connector-stub'
      );

      if (orgNodes && orgNodes.length > 0) {
        gsap.fromTo(
          orgNodes,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: orgChartRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      if (orgConnectors && orgConnectors.length > 0) {
        gsap.fromTo(
          orgConnectors,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: orgChartRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      /* VS badge glitch flash */
      const vsBadge = orgChartRef.current?.querySelector('.vs-badge');
      if (vsBadge) {
        gsap.fromTo(
          vsBadge,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: orgChartRef.current,
              start: 'top 60%',
            },
          }
        );
      }

      /* Move cards: alternate slide-in */
      const moveCards = movesRef.current?.querySelectorAll('.move-card');
      moveCards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
          }
        );
      });

      /* Comparison table: row-by-row stagger */
      const tableRows = tableRef.current?.querySelectorAll('.comp-row');
      if (tableRows && tableRows.length > 0) {
        gsap.fromTo(
          tableRows,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tableRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      /* Thematic cards: staggered slide-in */
      const thematicCards = thematicRef.current?.querySelectorAll('.thematic-card');
      if (thematicCards && thematicCards.length > 0) {
        gsap.fromTo(
          thematicCards,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: thematicRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      /* Final assessment: horizontal rules draw + text fade */
      const rules = assessmentRef.current?.querySelectorAll('.assess-rule');
      const assessText = assessmentRef.current?.querySelectorAll('.assess-text');
      const assessQuestions = assessmentRef.current?.querySelectorAll('.assess-question');

      if (rules && rules.length > 0) {
        gsap.fromTo(
          rules,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: assessmentRef.current,
              start: 'top 70%',
            },
          }
        );
      }

      if (assessText && assessText.length > 0) {
        gsap.fromTo(
          assessText,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: assessmentRef.current,
              start: 'top 70%',
            },
          }
        );
      }

      if (assessQuestions && assessQuestions.length > 0) {
        gsap.fromTo(
          assessQuestions,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: assessmentRef.current,
              start: 'top 60%',
            },
          }
        );
      }
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef} className="relative">
      {/* ════════════════════════════════════════════
          Section 1: Page Header
          ════════════════════════════════════════════ */}
      <section ref={headerRef} className="relative border-b border-grid-blue bg-void opacity-0">
        <div className="mx-auto max-w-[1280px] px-4 pt-24 pb-10 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-caption text-ghost-grey">
            <span>PHANTOM-7</span>
            <ChevronRight size={12} />
            <span>BRIEFING</span>
            <ChevronRight size={12} />
            <span className="text-classified-red">POWER ANALYSIS</span>
          </div>

          {/* Page Title */}
          <div className="mt-6">
            <h1 className="text-display-xl font-display text-ice-white">
              權力分析
            </h1>
            <h2 className="mt-2 text-display-xl font-display text-ice-white">
              POWER ANALYSIS
            </h2>
          </div>

          {/* Animated border */}
          <div
            className="header-border mt-6 h-px origin-left"
            style={{ backgroundColor: '#f59e0b' }}
          />

          {/* Report Metadata */}
          <div className="mt-4 font-mono text-caption text-ghost-grey">
            DOC REF: CW-POWER-001 &nbsp;&nbsp;|&nbsp;&nbsp; ANALYSIS TYPE: POLITICAL / STRATEGIC &nbsp;&nbsp;|&nbsp;&nbsp; CLASSIFICATION:{" "}
            <span className="text-classified-red">TOP SECRET</span>
          </div>

          {/* Page Description */}
          <p className="mt-6 max-w-[640px] font-sans text-body text-ice-white/90 leading-relaxed">
            The following analysis examines the power dynamics within the Hong Kong
            Police Force during Operation Cold War. This is not merely a kidnapping
            case — it is a study in institutional warfare, where the battlefield is the
            conference room and weapons are protocol, precedent, and political capital.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 2: Power Structure (Org Chart)
          ════════════════════════════════════════════ */}
      <section className="relative border-b border-grid-blue bg-midnight bg-grid">
        <div className="mx-auto max-w-[1280px] px-4 py-20 lg:px-8">
          {/* Section Label */}
          <div className="mb-12 text-center">
            <span className="font-mono text-label text-ghost-grey">
              [ HONG KONG GOVERNMENT STRUCTURE — SECURITY BRANCH ]
            </span>
          </div>

          {/* Org Chart */}
          <div
            ref={orgChartRef}
            className="flex justify-center overflow-x-auto pb-4"
          >
            <div className="min-w-[320px] sm:min-w-[600px] lg:min-w-0">
              <OrgNode node={orgData} level={0} />
            </div>
          </div>

          {/* Legend */}
          <div className="mx-auto mt-12 flex max-w-[640px] flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-surveillance-green" />
              <span className="font-mono text-[10px] tracking-wider text-ghost-grey">ALLY</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-traitor-red" />
              <span className="font-mono text-[10px] tracking-wider text-ghost-grey">ENEMY / MOLE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-alert-amber" />
              <span className="font-mono text-[10px] tracking-wider text-ghost-grey">MILITARY FACTION</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-steel-cyan" />
              <span className="font-mono text-[10px] tracking-wider text-ghost-grey">ADMIN FACTION</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full border border-dashed border-alert-amber" />
              <span className="font-mono text-[10px] tracking-wider text-ghost-grey">VACANT</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 3: Strategic Moves Timeline
          ════════════════════════════════════════════ */}
      <section ref={movesRef} className="relative border-b border-grid-blue bg-void">
        <div className="mx-auto max-w-[1280px] px-4 py-20 lg:px-8">
          {/* Section Label */}
          <div className="mb-6 text-center">
            <span className="font-mono text-label text-ghost-grey">
              [ STRATEGIC MOVES — THE CHESS GAME ]
            </span>
            <p className="mt-2 font-sans text-sm text-ghost-grey">策略對弈</p>
          </div>

          {/* Battlefield quote */}
          <div className="mx-auto mb-16 max-w-[700px] border-l-[3px] border-classified-red pl-6">
            <p className="font-sans text-h2 italic text-ice-white">
              &ldquo;This was not a kidnapping. This was a coup — disguised as a rescue operation.&rdquo;
            </p>
            <p className="mt-3 font-mono text-xs text-ghost-grey">
              — Operative PHANTOM-7, Field Assessment
            </p>
          </div>

          {/* Move cards */}
          <div className="flex flex-col gap-12">
            {movesData.map((move, i) => (
              <MoveCard key={move.number} move={move} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 4: Strategic Comparison Table
          ════════════════════════════════════════════ */}
      <section className="relative border-b border-grid-blue bg-midnight">
        <div className="mx-auto max-w-[1280px] px-4 py-20 lg:px-8">
          {/* Section Label */}
          <div className="mb-12 text-center">
            <span className="font-mono text-label text-ghost-grey">
              [ SIDE-BY-SIDE COMPARISON ]
            </span>
          </div>

          {/* Comparison Table */}
          <div ref={tableRef} className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              {/* Header */}
              <thead>
                <tr className="comp-row" style={{ backgroundColor: '#141e33' }}>
                  <th className="border border-grid-blue px-4 py-3 text-left font-mono text-caption text-ice-white uppercase tracking-wider">
                    Dimension
                  </th>
                  <th
                    className="border border-grid-blue px-4 py-3 text-left font-mono text-caption uppercase tracking-wider"
                    style={{
                      color: '#10b981',
                      borderLeftWidth: 3,
                      borderLeftColor: '#10b981',
                    }}
                  >
                    劉傑輝 LIU Kit-wing
                  </th>
                  <th
                    className="border border-grid-blue px-4 py-3 text-left font-mono text-caption uppercase tracking-wider"
                    style={{
                      color: '#f59e0b',
                      borderLeftWidth: 3,
                      borderLeftColor: '#f59e0b',
                    }}
                  >
                    李文彬 LEE Man-bun
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr
                    key={row.dimension}
                    className="comp-row transition-colors duration-200 hover:bg-steel-blue/50"
                    style={{
                      backgroundColor:
                        i % 2 === 0 ? 'rgba(10, 15, 30, 0.3)' : 'rgba(20, 30, 51, 0.3)',
                    }}
                  >
                    <td className="border border-grid-blue px-4 py-3 font-mono text-caption text-ghost-grey uppercase tracking-wider">
                      {row.dimension}
                    </td>
                    <td
                      className="border border-grid-blue px-4 py-3 font-sans text-sm text-ice-white"
                      style={{ borderLeftWidth: 3, borderLeftColor: '#10b981' }}
                    >
                      {row.dimension === 'OUTCOME' ? (
                        <span className="font-semibold text-surveillance-green">{row.liuValue}</span>
                      ) : (
                        row.liuValue
                      )}
                    </td>
                    <td
                      className="border border-grid-blue px-4 py-3 font-sans text-sm text-ice-white"
                      style={{ borderLeftWidth: 3, borderLeftColor: '#f59e0b' }}
                    >
                      {row.dimension === 'OUTCOME' ? (
                        <span className="font-semibold text-classified-red">{row.leeValue}</span>
                      ) : (
                        row.leeValue
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 5: Thematic Analysis
          ════════════════════════════════════════════ */}
      <section className="relative border-b border-grid-blue bg-void">
        <div className="mx-auto max-w-[1280px] px-4 py-20 lg:px-8">
          {/* Section Label */}
          <div className="mb-12 text-center">
            <span className="font-mono text-label text-ghost-grey">
              [ THEMATIC ANALYSIS ]
            </span>
            <p className="mt-2 font-sans text-sm text-ghost-grey">主題分析</p>
          </div>

          {/* Thematic cards grid */}
          <div
            ref={thematicRef}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {thematicData.map((card, i) => (
              <ThematicCard key={card.titleEn} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Section 6: Operative's Final Assessment
          ════════════════════════════════════════════ */}
      <section className="relative bg-steel-blue">
        {/* Scan line overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(56, 189, 248, 0.03) 2px, rgba(56, 189, 248, 0.03) 4px)',
          }}
        />

        <div className="relative mx-auto max-w-[1280px] px-4 py-20 lg:px-8">
          <div ref={assessmentRef} className="mx-auto max-w-[800px]">
            {/* Top rule */}
            <div
              className="assess-rule mx-auto h-px origin-center"
              style={{ backgroundColor: '#dc2626' }}
            />

            {/* Title */}
            <div className="assess-text my-8 text-center">
              <h2 className="font-mono text-sm font-bold tracking-widest text-classified-red">
                FINAL ASSESSMENT — THE COLD WAR WAS NEVER ABOUT THE KIDNAPPING
              </h2>
            </div>

            {/* Body text */}
            <div className="assess-text space-y-4 text-center font-mono text-sm leading-relaxed text-ice-white">
              <p>
                The hijacking was the trigger. The power struggle was the target.
              </p>
              <p>
                Someone orchestrated this entire scenario to force a confrontation
                between Liu and Lee — to make the Hong Kong Police Force tear itself
                apart from within.
              </p>
              <p>
                The kidnappers had inside information that only senior officers could
                possess. The ransom amount (33,330,000) was suspiciously specific. The
                simultaneous vault heist required operational knowledge of police logistics.
              </p>
              <p className="font-semibold">
                This was an institutional attack disguised as a crime.
              </p>
            </div>

            {/* Questions */}
            <div className="mt-10 space-y-3">
              {[
                'Question: WHO BENEFITS FROM A DIVIDED POLICE FORCE?',
                'Question: WHO HAS THE RESOURCES TO ORCHESTRATE THIS?',
                'Question: IS LEE KA-CHUN THE MASTERMIND — OR JUST ANOTHER PAWN?',
              ].map((q) => (
                <p
                  key={q}
                  className="assess-question text-center font-mono text-xs font-bold tracking-wider text-classified-red"
                >
                  {q}
                </p>
              ))}
            </div>

            {/* Bottom rule */}
            <div
              className="assess-rule mx-auto mt-8 h-px origin-center"
              style={{ backgroundColor: '#dc2626' }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
