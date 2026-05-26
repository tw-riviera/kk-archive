import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, Search, Shield, UserX, Crosshair, HelpCircle } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

type Faction = 'all' | 'liu' | 'lee' | 'neutral' | 'criminal' | 'unknown';
type Status = 'all' | 'ally' | 'enemy' | 'target' | 'neutral' | 'unknown';
type SortMode = 'threat-desc' | 'alphabetical' | 'role';

interface Character {
  id: string;
  nameEn: string;
  nameZh: string;
  actor: string;
  role: string;
  faction: string;
  factionKey: Faction;
  threatLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  status: Status;
  fileRef: string;
  photo?: string;
  specialStamp?: string;
  summary: string[];
  keyActions: string[];
  operativeNote: string;
  quote?: string;
  related: string[];
}

const CHARACTERS: Character[] = [
  {
    id: 'liu',
    nameEn: 'LIU Kit-wing',
    nameZh: '\u5289\u5091\u8F2D',
    actor: '\u90ED\u5BCC\u57CE / Aaron Kwok',
    role: 'Deputy Commissioner (Admin) \u2192 Commissioner',
    faction: 'Liu Faction (\u6587\u5B98\u7CFB\u7D71)',
    factionKey: 'liu',
    threatLevel: 'LOW',
    status: 'ally',
    fileRef: 'CW-DOS-001',
    photo: '/dossier-liu.jpg',
    summary: [
      'Civilian administration background. Cool-headed, meticulous, strategic thinker. Liu believes in winning through intelligence rather than force. He insists on procedural justice and refuses to sacrifice the rule of law even in the most desperate moments.',
      "Liu saw through Lee Man-bun's compromised judgment \u2014 a father unable to think objectively about an operation involving his own son. He led the impeachment and seized command of Operation Cold War.",
      'His most audacious move: reporting himself anonymously to the ICAC, turning the investigation into a tool for uncovering the real traitors.',
    ],
    keyActions: [
      "Challenged Lee Man-bun's command authority",
      'Led successful impeachment vote',
      'Personally delivered ransom to kidnappers',
      'Anonymously self-reported to ICAC',
      'Arrested Lee Ka-chun on the rooftop',
      'Promoted to Commissioner',
    ],
    operativeNote:
      "Liu is the smartest player in this game. He thinks three moves ahead. But the phone call at the end \u2014 even he didn't see that coming.",
    related: ['tsui', 'luk', 'leung', 'kwong', 'cheung'],
  },
  {
    id: 'lee',
    nameEn: 'LEE Man-bun',
    nameZh: '\u674E\u6587\u5F6C',
    actor: '\u6881\u5BB6\u8F2D / Tony Leung Ka-fai',
    role: 'Deputy Commissioner (Operations)',
    faction: 'Lee Faction (\u6B66\u5B98\u7CFB\u7D71)',
    factionKey: 'lee',
    threatLevel: 'MEDIUM',
    status: 'target',
    fileRef: 'CW-DOS-002',
    photo: '/dossier-li.jpg',
    summary: [
      "Hawkish operations officer. 30 years of police service. Charismatic, forceful, with a soldier's bearing. Lee has spent his entire career in uniform \u2014 he believes in action, in command, in the chain of authority.",
      'When his son disappeared, Lee\'s judgment became clouded. He declared himself Acting Commissioner, launched Operation Cold War, and demanded absolute control. His philosophy: "Extraordinary times call for extraordinary measures."',
      "But when the truth about his son emerged, Lee chose duty over blood. He watched his only son being arrested. A father's tragedy. An officer's integrity.",
    ],
    keyActions: [
      'Declared self Acting Commissioner',
      'Launched Operation Cold War',
      'Commanded failed rescue operation',
      "Lost command to Liu Kit-wing",
      "Witnessed son's arrest without intervention",
      "Delivered Churchill quote that became the film's thematic anchor",
    ],
    operativeNote:
      "Lee is not a villain \u2014 he's a patriot who loved his son too much. His tragedy is that he followed every rule of being a good officer, but life didn't follow the rules back.",
    quote:
      '\u90B1\u5409\u723E\u8AAA\u7684\u662F\uFF0C\u9019\u4E00\u5834\u672C\u4F86\u662F\u53EF\u4EE5\u907F\u514D\u7684\u4E0D\u5FC5\u8981\u6230\u722D\uFF0C\u4ED6\u6C92\u8AAA\u904E\u6240\u6709\u6230\u722D\u90FD\u4E0D\u5FC5\u8981\u3002\u98A8\u96F2\u7DCA\u6025\uFF0CThe Gathering Storm\uFF0C\u7B2C\u4E00\u9801\uFF0C\u6700\u5F8C\u90A3\u6BB5\u3002',
    related: ['karjun', 'kwong'],
  },
  {
    id: 'karjun',
    nameEn: 'LEE Ka-chun',
    nameZh: '\u674E\u5BB6\u4FCA',
    actor: '\u5F6D\u4E8E\u664F / Eddie Peng',
    role: 'EU Constable \u2192 Mastermind',
    faction: 'Criminal Conspiracy',
    factionKey: 'criminal',
    threatLevel: 'HIGH',
    status: 'enemy',
    fileRef: 'CW-DOS-003',
    photo: '/dossier-karjun.jpg',
    specialStamp: 'SUSPECT',
    summary: [
      'IQ 192. A genius by any standard. Lee Ka-chun is Lee Man-bun\'s only son \u2014 a fact that made him the perfect weapon against the police hierarchy.',
      'He was not a victim. He was a planner.',
      "Lee Ka-chun orchestrated the van hijacking from within. He understood police protocols, communications systems, and tactical procedures better than most officers twice his age. His plan was elegant in its cruelty \u2014 use the system against itself.",
      'His motivation remains partially unclear. Money? Power? Rebellion against a father who was never there? The dossier is incomplete.',
    ],
    keyActions: [
      'Orchestrated police van hijacking',
      'Served as inside man providing police intelligence',
      'Demanded HK$33.33M ransom',
      'Arrested on rooftop by Liu Kit-wing',
      'Implied connection to larger conspiracy (unresolved)',
    ],
    operativeNote:
      "192 IQ. Think about that. He didn't just outsmart individual officers \u2014 he outsmarted the entire system. The question isn't how he did it. The question is: who else was he working for?",
    related: ['lee', 'shek'],
  },
  {
    id: 'tsui',
    nameEn: 'TSUI Wing-kei',
    nameZh: '\u5F90\u6C38\u57FA',
    actor: '\u9326\u5609\u6A02 / Chin Ka-lok',
    role: 'Senior Superintendent',
    faction: 'Liu Faction (loyal to Liu)',
    factionKey: 'liu',
    threatLevel: 'HIGH',
    status: 'enemy',
    fileRef: 'CW-DOS-004',
    summary: [
      "Liu Kit-wing's trusted right-hand man. Or so it seemed.",
      'Tsui Wing-kei was a gambling addict. He had mortgaged his property, accumulated massive debts, and was being manipulated by the criminal conspiracy. He was the mole inside Liu\'s inner circle.',
      'During the bridge exchange, Tsui was killed. Officially, he died protecting Liu. The truth is more complex \u2014 he was likely eliminated by his own co-conspirators to cover their tracks.',
      "A traitor who died a hero's death.",
    ],
    keyActions: [
      "Served as Liu Kit-wing's trusted subordinate",
      'Secretly leaked intelligence to kidnappers',
      'Killed during bridge shootout',
      'Posthumously exposed as traitor',
    ],
    operativeNote:
      "The most dangerous traitor is the one you trust. Tsui was Liu's friend \u2014 that's what made his betrayal so devastating. His death saved Liu's life, but was that redemption or just the conspirators cleaning house?",
    related: ['liu'],
  },
  {
    id: 'kwong',
    nameEn: 'KWONG Chi-lap',
    nameZh: '\u9093\u667A\u7ACB',
    actor: '\u6797\u5BB6\u68DF / Gordon Lam',
    role: 'Senior Superintendent',
    faction: 'Lee \u2192 Switched to Liu',
    factionKey: 'neutral',
    threatLevel: 'LOW',
    status: 'ally',
    fileRef: 'CW-DOS-005',
    summary: [
      "Lee Man-bun's capable lieutenant \u2014 until he wasn't.",
      "Kwong was Lee's most trusted operations officer. But when the rescue failed and Lee's judgment became increasingly erratic, Kwong made a difficult choice. He sided with Liu Kit-wing during the impeachment vote.",
      "His defection was the turning point. With Kwong's support, Liu had the numbers to remove Lee from command.",
      'A loyal soldier who chose the mission over the man.',
    ],
    keyActions: [
      "Served as Lee Man-bun's key operations officer",
      'Switched allegiance to Liu Kit-wing',
      'Provided critical support during impeachment',
      'Instrumental in command transfer',
    ],
    operativeNote:
      "Kwong represents the honest cop caught between two powerful men. His decision to switch sides wasn't betrayal \u2014 it was the right call. But in politics, the right call can still be the wrong move.",
    related: ['lee', 'liu'],
  },
  {
    id: 'shek',
    nameEn: 'SHEK Mai-go',
    nameZh: '\u77F3\u7C73\u9AD8',
    actor: '\u5B89\u5FD7\u5091 / Andy On',
    role: 'SDU Commander',
    faction: 'Criminal Conspiracy',
    factionKey: 'criminal',
    threatLevel: 'HIGH',
    status: 'enemy',
    fileRef: 'CW-DOS-006',
    photo: '/dossier-michael.jpg',
    specialStamp: 'PERSON OF INTEREST',
    summary: [
      'SDU Commander. Elite tactical officer. Professional killer.',
      "Shek Mai-go was the conspiracy's cleanup specialist. His job: eliminate anyone who could expose the network.",
      'He assassinated vault supervisor Ng Wai-lun with a car bomb. He eliminated the OCTB undercover officer. Cold, efficient, leaving no witnesses.',
      'His position in the SDU gave him access to weapons, tactical gear, and classified operational information. He was the muscle behind the brains.',
    ],
    keyActions: [
      'Assassinated vault supervisor Ng Wai-lun (car bomb)',
      'Killed OCTB undercover officer',
      'Provided tactical support to kidnappers',
      "Operated as conspiracy's enforcer",
    ],
    operativeNote:
      "Shek is the kind of traitor who scares me most \u2014 not the gambler like Tsui, but the true believer. Someone who thinks he's on the right side of something bigger. We never found out who he believed in.",
    related: ['karjun', 'william'],
  },
  {
    id: 'cheung',
    nameEn: 'CHEUNG Kwok-biu',
    nameZh: '\u5F35\u570B\u6A19',
    actor: '\u674E\u6CBB\u5EF7 / Aarif Rahman',
    role: 'ICAC Principal Investigator',
    faction: 'ICAC (Independent)',
    factionKey: 'unknown',
    threatLevel: 'LOW',
    status: 'neutral',
    fileRef: 'CW-DOS-007',
    summary: [
      "Young, ambitious, relentless. Cheung Kwok-biu is the ICAC's rising star \u2014 and Liu Kit-wing's unwitting pawn.",
      'When Liu anonymously reported himself to the ICAC, Cheung led the investigation with characteristic intensity. He interrogated Liu. He followed the evidence. And without ever realizing it, he helped Liu clear his name while redirecting suspicion toward the real traitors.',
      'Cheung represents the institutional counterbalance \u2014 the ICAC watching the police, ensuring that even those who wield power are held accountable.',
    ],
    keyActions: [
      'Led ICAC investigation into Liu Kit-wing',
      'Conducted interrogation of Liu',
      "Unknowingly assisted Liu's strategy",
      'Maintained ICAC independence throughout',
    ],
    operativeNote:
      "Cheung is good at his job. The problem is, Liu is better at playing the system. I respect Cheung's integrity \u2014 he did everything by the book. Sometimes the book isn't enough.",
    related: ['liu'],
  },
  {
    id: 'luk',
    nameEn: 'LUK Ming-wa',
    nameZh: '\u9678\u660E\u83EF',
    actor: '\u5289\u5FB7\u83EF / Andy Lau',
    role: 'Secretary for Security',
    faction: 'Government (Liu backer)',
    factionKey: 'liu',
    threatLevel: 'LOW',
    status: 'ally',
    fileRef: 'CW-DOS-008',
    summary: [
      "Secretary for Security. Liu Kit-wing's political patron. Next Chief Executive favorite.",
      "Luk Ming-wa operates above the police force \u2014 he is the government's representative overseeing security policy. His support for Liu represents the civil authority's preference for administrative competence over military bravado.",
      'His political ambitions add another dimension. As the likely next Chief Executive, Luk has a stake in how this crisis is resolved. A police force torn apart by internal conflict does not serve his interests.',
    ],
    keyActions: [
      'Provided political backing to Liu Kit-wing',
      'Represented government oversight of police',
      'Positioned as future Chief Executive candidate',
    ],
    operativeNote:
      "Luk is the man above the battlefield. He doesn't fight \u2014 he decides who gets to fight. His support for Liu wasn't personal. It was political calculus. And it worked.",
    related: ['liu'],
  },
  {
    id: 'leung',
    nameEn: 'LEUNG Chi-mei',
    nameZh: '\u6881\u7D2B\u8587',
    actor: '\u694A\u91C7\u59AE / Charlie Young',
    role: 'SAC (Corporate Communications)',
    faction: 'Liu Faction',
    factionKey: 'liu',
    threatLevel: 'LOW',
    status: 'ally',
    fileRef: 'CW-DOS-009',
    summary: [
      'Head of Public Relations. Leung Chi-mei controlled the information battlefield.',
      "In a crisis where public perception could shift the political balance, Leung managed the narrative. She supported Liu during the impeachment, understanding that Lee's emotional command was becoming a liability that the public would not tolerate.",
      "Her role in the communications strategy was critical to Liu's successful takeover of Operation Cold War.",
    ],
    keyActions: [
      'Managed police public relations during crisis',
      'Supported Liu Kit-wing in impeachment vote',
      'Controlled information flow to media and public',
    ],
    operativeNote:
      "In a cold war, information is ammunition. Leung controlled the ammo. She chose Liu's side early \u2014 a smart political read.",
    related: ['liu'],
  },
  {
    id: 'william',
    nameEn: 'NG Wai-lun',
    nameZh: '\u9B4F\u5A01\u5EC9',
    actor: '\u4F55\u83EF\u8D85 / Ho Wah-chiu',
    role: 'Police Vault Supervisor',
    faction: 'Criminal Conspiracy (traitor)',
    factionKey: 'criminal',
    threatLevel: 'MEDIUM',
    status: 'enemy',
    fileRef: 'CW-DOS-010',
    summary: [
      'Vault supervisor. The man who controlled the money.',
      "Ng Wai-lun had access to the police vault containing tactical equipment and \u2014 critically \u2014 the cash reserves used for undercover operations. He was a key logistics node in the conspiracy.",
      "He lied to Liu Kit-wing about vault procedures, attempting to cover the theft. But his lies were exposed, and before he could reveal what he knew, a car bomb ended his life.",
      'Another loose end, tied off permanently.',
    ],
    keyActions: [
      'Provided access to police vault resources',
      'Facilitated cash theft from vault',
      'Lied to Liu about vault procedures',
      'Assassinated by car bomb',
    ],
    operativeNote:
      "Ng was a small player who knew too much. His death tells us everything about the scale of this conspiracy \u2014 they have the capability and willingness to kill insiders. That's not a gang. That's an organization.",
    related: ['shek'],
  },
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

const statusConfig: Record<string, { color: string; dotColor: string; label: string; Icon: React.ElementType }> = {
  ally:    { color: 'text-surveillance-green', dotColor: 'bg-surveillance-green', label: 'ALLY', Icon: Shield },
  enemy:   { color: 'text-traitor-red',        dotColor: 'bg-traitor-red',        label: 'ENEMY', Icon: UserX },
  target:  { color: 'text-target-amber',       dotColor: 'bg-target-amber',       label: 'TARGET', Icon: Crosshair },
  neutral: { color: 'text-neutral-grey',       dotColor: 'bg-neutral-grey',       label: 'NEUTRAL', Icon: HelpCircle },
  unknown: { color: 'text-neutral-grey',       dotColor: 'bg-neutral-grey',       label: 'UNKNOWN', Icon: HelpCircle },
};

const threatBarColor = (level: string) => {
  switch (level) {
    case 'HIGH':   return 'bg-traitor-red';
    case 'MEDIUM': return 'bg-target-amber';
    case 'LOW':    return 'bg-surveillance-green';
    default:       return 'bg-neutral-grey';
  }
};

const factionTextColor = (factionKey: Faction) => {
  switch (factionKey) {
    case 'liu':      return 'text-surveillance-green';
    case 'lee':      return 'text-target-amber';
    case 'criminal': return 'text-traitor-red';
    case 'neutral':  return 'text-steel-cyan';
    default:         return 'text-ghost-grey';
  }
};

/* Faction dot colors available for future use */

/* ------------------------------------------------------------------ */
/*  FILTER BAR                                                         */
/* ------------------------------------------------------------------ */

function FilterBar({
  factionFilter,
  setFactionFilter,
  statusFilter,
  setStatusFilter,
  sortMode,
  setSortMode,
}: {
  factionFilter: Faction;
  setFactionFilter: (f: Faction) => void;
  statusFilter: Status;
  setStatusFilter: (s: Status) => void;
  sortMode: SortMode;
  setSortMode: (m: SortMode) => void;
}) {
  const factions: { key: Faction; label: string }[] = [
    { key: 'all',     label: 'ALL' },
    { key: 'liu',     label: 'LIU FACTION' },
    { key: 'lee',     label: 'LEE FACTION' },
    { key: 'neutral', label: 'NEUTRAL' },
    { key: 'criminal',label: 'UNKNOWN' },
  ];

  const statuses: { key: Status; label: string; color: string }[] = [
    { key: 'all',     label: 'ALL',    color: 'bg-ghost-grey' },
    { key: 'ally',    label: 'ALLY',   color: 'bg-surveillance-green' },
    { key: 'enemy',   label: 'ENEMY',  color: 'bg-traitor-red' },
    { key: 'target',  label: 'TARGET', color: 'bg-target-amber' },
    { key: 'neutral', label: 'NEUTRAL',color: 'bg-neutral-grey' },
  ];

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.3 }}
      className="sticky top-14 z-40 border border-grid-blue bg-steel-blue px-4 py-3 lg:px-6"
    >
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-4">
        {/* Faction */}
        <div className="flex items-center gap-2">
          <span className="text-label text-ghost-grey">FACTION</span>
          <div className="flex flex-wrap gap-1">
            {factions.map((f) => (
              <button
                key={f.key}
                onClick={() => setFactionFilter(f.key)}
                className="rounded-sm px-2 py-1 font-mono text-[10px] tracking-wider transition-all duration-200"
                style={{
                  backgroundColor: factionFilter === f.key ? '#38bdf8' : 'transparent',
                  color: factionFilter === f.key ? '#050508' : '#94a3b8',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden h-4 w-px bg-grid-blue sm:block" />

        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="text-label text-ghost-grey">STATUS</span>
          <div className="flex flex-wrap gap-1">
            {statuses.map((s) => (
              <button
                key={s.key}
                onClick={() => setStatusFilter(s.key)}
                className="flex items-center gap-1 rounded-sm px-2 py-1 font-mono text-[10px] tracking-wider transition-all duration-200"
                style={{
                  backgroundColor: statusFilter === s.key ? '#38bdf8' : 'transparent',
                  color: statusFilter === s.key ? '#050508' : '#94a3b8',
                }}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${s.color}`} />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden h-4 w-px bg-grid-blue sm:block" />

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-label text-ghost-grey">SORT</span>
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className="rounded-sm border border-grid-blue bg-midnight px-2 py-1 font-mono text-[10px] tracking-wider text-ghost-grey outline-none focus:border-steel-cyan"
          >
            <option value="threat-desc">THREAT LEVEL (HIGH&rarr;LOW)</option>
            <option value="alphabetical">ALPHABETICAL</option>
            <option value="role">ROLE</option>
          </select>
        </div>

        <div className="ml-auto flex items-center gap-1 font-mono text-[10px] tracking-wider text-ghost-grey">
          <Search className="h-3 w-3" />
          <span>{CHARACTERS.length} SUBJECTS</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  DOSSIER CARD                                                       */
/* ------------------------------------------------------------------ */

function DossierCard({
  character,
  index,
  isExpanded,
  onToggle,
  onNodeClick,
}: {
  character: Character;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onNodeClick: (id: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-80px' });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const status = statusConfig[character.status] ?? statusConfig.neutral;
  /* borderTopColor computed from status if needed */

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 6, rotateY: x * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  const borderTopColors: Record<string, string> = {
    'surveillance-green': '#10b981',
    'traitor-red': '#ef4444',
    'target-amber': '#f59e0b',
    'neutral-grey': '#6b7280',
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: index * 0.1,
      }}
      style={{
        perspective: 800,
      }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="group overflow-hidden border border-grid-blue bg-steel-blue transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        style={{
          borderRadius: 2,
          borderTopWidth: 3,
          borderTopColor: borderTopColors[status.dotColor.replace('bg-', '')] || '#6b7280',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card Header */}
        <div className="p-5 lg:p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${status.dotColor}`} />
              <div>
                <h3 className="font-sans text-h2 text-ice-white">{character.nameZh}</h3>
                <p className="font-sans text-caption text-ghost-grey">{character.nameEn}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {character.specialStamp && (
                <span
                  className="rounded-sm border border-traitor-red px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-traitor-red"
                  style={{ transform: 'rotate(-2deg)' }}
                >
                  {character.specialStamp}
                </span>
              )}
              <span
                className="font-mono text-[9px] font-bold tracking-wider text-classified-red/15 select-none"
                style={{ transform: 'rotate(3deg)' }}
              >
                TOP SECRET
              </span>
            </div>
          </div>

          {/* Photo + Metadata */}
          <div className="mt-4 flex gap-4">
            {/* Photo Area */}
            <div
              className="relative flex-shrink-0 overflow-hidden border border-grid-blue bg-midnight"
              style={{ width: 120, height: 160, borderRadius: 2 }}
            >
              {character.photo ? (
                <img
                  src={character.photo}
                  alt={character.nameEn}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-1">
                  <span className="font-mono text-[9px] tracking-wider text-ghost-grey/40">[IMAGE CLASSIFIED]</span>
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(56,189,248,0.03) 2px, rgba(56,189,248,0.03) 4px)',
                    }}
                  />
                </div>
              )}
              {/* Classified watermark */}
              <span
                className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold tracking-widest text-classified-red/10"
                style={{ transform: 'rotate(-15deg)' }}
              >
                CLASSIFIED
              </span>
            </div>

            {/* Metadata Grid */}
            <div className="flex flex-1 flex-col gap-1.5">
              <MetaRow label="ROLE" value={character.role} />
              <MetaRow label="FACTION">
                <span className={`font-mono text-caption ${factionTextColor(character.factionKey)}`}>
                  {character.faction}
                </span>
              </MetaRow>
              <MetaRow label="THREAT">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-grid-blue">
                    <div
                      className={`h-full rounded-full ${threatBarColor(character.threatLevel)}`}
                      style={{
                        width: character.threatLevel === 'HIGH' ? '100%' : character.threatLevel === 'MEDIUM' ? '60%' : '30%',
                      }}
                    />
                  </div>
                  <span className="font-mono text-[10px] tracking-wider text-ice-white">{character.threatLevel}</span>
                </div>
              </MetaRow>
              <MetaRow label="STATUS">
                <span className={`font-mono text-caption ${status.color}`}>{status.label}</span>
              </MetaRow>
              <MetaRow label="ACTOR" value={character.actor} />
            </div>
          </div>

          {/* Summary */}
          <div className="mt-4 border-t border-grid-blue pt-3">
            <p className="font-mono text-[9px] tracking-wider text-ghost-grey/60">SUMMARY</p>
            <div className="mt-1">
              <p className="font-sans text-body text-ice-white line-clamp-3">
                {character.summary[0]}
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-3 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-wider text-ghost-grey/50">
              {character.fileRef}
            </span>
            <button
              onClick={onToggle}
              className="flex items-center gap-1 font-mono text-[10px] tracking-wider text-steel-cyan transition-colors duration-200 hover:underline"
            >
              {isExpanded ? 'COLLAPSE' : 'EXPAND'}
              <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-3 w-3" />
              </motion.span>
            </button>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="overflow-hidden"
            >
              <div className="border-t border-grid-blue bg-midnight/40 px-5 py-4 lg:px-6">
                {/* Full Summary */}
                <div className="space-y-2">
                  {character.summary.map((para, i) => (
                    <p key={i} className="font-sans text-body text-ice-white/90">{para}</p>
                  ))}
                </div>

                {/* Key Actions */}
                <div className="mt-4">
                  <p className="text-label text-ghost-grey/60">KEY ACTIONS</p>
                  <ul className="mt-2 space-y-1">
                    {character.keyActions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2 font-sans text-sm text-ice-white/80">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-steel-cyan" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quote */}
                {character.quote && (
                  <div className="mt-4 border-l-2 border-alert-amber/40 pl-3">
                    <p className="font-sans text-sm italic leading-relaxed text-ice-white/70">
                      &ldquo;{character.quote}&rdquo;
                    </p>
                  </div>
                )}

                {/* Operative's Note */}
                <div className="mt-4">
                  <p className="text-label text-ghost-grey/60">OPERATIVE&apos;S NOTE</p>
                  <p className="mt-1 font-sans text-sm italic leading-relaxed text-ghost-grey">
                    &ldquo;{character.operativeNote}&rdquo;
                  </p>
                </div>

                {/* Related Dossiers */}
                {character.related.length > 0 && (
                  <div className="mt-4">
                    <p className="text-label text-ghost-grey/60">RELATED DOSSIERS</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {character.related.map((relId) => {
                        const rel = CHARACTERS.find((c) => c.id === relId);
                        if (!rel) return null;
                        return (
                          <button
                            key={relId}
                            onClick={() => onNodeClick(relId)}
                            className="rounded-sm border border-grid-blue bg-steel-blue px-2 py-1 font-mono text-[10px] tracking-wider text-steel-cyan transition-colors duration-200 hover:border-steel-cyan"
                          >
                            {rel.nameZh} ({rel.nameEn.split(' ')[0]})
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function MetaRow({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="w-14 flex-shrink-0 font-mono text-[10px] tracking-wider text-ghost-grey/60">{label}</span>
      {value ? (
        <span className="font-mono text-caption text-ice-white">{value}</span>
      ) : (
        <div className="min-w-0 flex-1">{children}</div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  RELATIONSHIP NETWORK                                               */
/* ------------------------------------------------------------------ */

interface NetworkNode {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface NetworkEdge {
  from: string;
  to: string;
  type: 'solid' | 'dashed' | 'dotted';
  color: string;
  width: number;
  label?: string;
}

const networkNodes: NetworkNode[] = [
  { id: 'center', label: 'COLD\nWAR',    x: 400, y: 250, size: 48, color: '#dc2626' },
  { id: 'liu',    label: 'LIU',         x: 400, y:  80, size: 36, color: '#10b981' },
  { id: 'lee',    label: 'LEE',         x: 200, y: 180, size: 36, color: '#f59e0b' },
  { id: 'karjun', label: 'KARJUN',      x: 600, y: 180, size: 34, color: '#ef4444' },
  { id: 'tsui',   label: 'TSUI',        x: 320, y: 160, size: 28, color: '#ef4444' },
  { id: 'kwong',  label: 'KWONG',       x: 260, y: 320, size: 28, color: '#38bdf8' },
  { id: 'shek',   label: 'SHEK',        x: 540, y: 320, size: 30, color: '#ef4444' },
  { id: 'cheung', label: 'CHEUNG',      x: 480, y: 100, size: 26, color: '#6b7280' },
  { id: 'luk',    label: 'LUK',         x: 400, y: 420, size: 30, color: '#10b981' },
  { id: 'leung',  label: 'LEUNG',       x: 550, y: 400, size: 26, color: '#10b981' },
  { id: 'william',label: 'WILLIAM',     x: 680, y: 300, size: 26, color: '#ef4444' },
];

const networkEdges: NetworkEdge[] = [
  { from: 'liu',    to: 'lee',    type: 'dashed', color: '#ef4444', width: 3, label: 'CONFLICT' },
  { from: 'lee',    to: 'karjun', type: 'dotted', color: '#f59e0b', width: 2, label: 'FAMILY' },
  { from: 'liu',    to: 'tsui',   type: 'dashed', color: '#ef4444', width: 2, label: 'BETRAYED' },
  { from: 'liu',    to: 'luk',    type: 'solid',  color: '#10b981', width: 2, label: 'POLITICAL' },
  { from: 'karjun', to: 'shek',   type: 'dashed', color: '#ef4444', width: 2, label: 'CONSPIRACY' },
  { from: 'liu',    to: 'cheung', type: 'dotted', color: '#38bdf8', width: 2, label: 'MANIPULATION' },
  { from: 'liu',    to: 'center', type: 'solid',  color: '#1a2744', width: 1 },
  { from: 'lee',    to: 'center', type: 'solid',  color: '#1a2744', width: 1 },
  { from: 'karjun', to: 'center', type: 'solid',  color: '#1a2744', width: 1 },
  { from: 'tsui',   to: 'center', type: 'solid',  color: '#1a2744', width: 1 },
  { from: 'kwong',  to: 'center', type: 'solid',  color: '#1a2744', width: 1 },
  { from: 'shek',   to: 'center', type: 'solid',  color: '#1a2744', width: 1 },
  { from: 'cheung', to: 'center', type: 'solid',  color: '#1a2744', width: 1 },
  { from: 'luk',    to: 'center', type: 'solid',  color: '#1a2744', width: 1 },
  { from: 'leung',  to: 'center', type: 'solid',  color: '#1a2744', width: 1 },
  { from: 'william',to: 'center', type: 'solid',  color: '#1a2744', width: 1 },
  { from: 'lee',    to: 'kwong',  type: 'solid',  color: '#f59e0b', width: 1 },
  { from: 'liu',    to: 'leung',  type: 'solid',  color: '#10b981', width: 1 },
  { from: 'shek',   to: 'william',type: 'dashed', color: '#ef4444', width: 2, label: 'ELIMINATED' },
];

function RelationshipNetwork({ onNodeClick }: { onNodeClick: (id: string) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-30%' });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const getConnectedNodes = (nodeId: string) => {
    const connected = new Set<string>();
    networkEdges.forEach((e) => {
      if (e.from === nodeId) connected.add(e.to);
      if (e.to === nodeId) connected.add(e.from);
    });
    return connected;
  };

  const connected = hoveredNode ? getConnectedNodes(hoveredNode) : new Set<string>();

  // Mobile: show as list
  if (isMobile) {
    return (
      <section ref={sectionRef} className="border-t border-grid-blue bg-void px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-center text-label text-ghost-grey">[ RELATIONSHIP NETWORK ]</p>
          <p className="mt-1 text-center font-sans text-sm text-ghost-grey/60">人物關係網絡</p>
          <div className="mt-8 space-y-2">
            {networkEdges
              .filter((e) => e.label)
              .map((edge, i) => {
                const fromNode = networkNodes.find((n) => n.id === edge.from);
                const toNode = networkNodes.find((n) => n.id === edge.to);
                if (!fromNode || !toNode || edge.from === 'center' || edge.to === 'center') return null;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 rounded-sm border border-grid-blue bg-steel-blue px-3 py-2"
                  >
                    <span className="font-mono text-xs" style={{ color: fromNode.color }}>{fromNode.label.replace('\n', ' ')}</span>
                    <span className="font-mono text-[9px] text-ghost-grey/40">{edge.label}</span>
                    <span className="font-mono text-xs" style={{ color: toNode.color }}>{toNode.label.replace('\n', ' ')}</span>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="border-t border-grid-blue bg-void px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <p className="text-center text-label text-ghost-grey">[ RELATIONSHIP NETWORK ]</p>
        <p className="mt-1 text-center font-sans text-sm text-ghost-grey/60">人物關係網絡</p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative mx-auto mt-10"
          style={{ maxWidth: 800, aspectRatio: '4/3' }}
        >
          <svg
            viewBox="0 0 800 500"
            className="h-full w-full"
            style={{ overflow: 'visible' }}
          >
            {/* Edges */}
            {networkEdges.map((edge, i) => {
              const from = networkNodes.find((n) => n.id === edge.from);
              const to = networkNodes.find((n) => n.id === edge.to);
              if (!from || !to) return null;

              const isHighlighted =
                hoveredNode &&
                (edge.from === hoveredNode || edge.to === hoveredNode);
              const isDimmed = hoveredNode && !isHighlighted;

              const strokeDasharray =
                edge.type === 'dashed' ? '8 4' : edge.type === 'dotted' ? '2 4' : 'none';

              return (
                <motion.line
                  key={`edge-${i}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={edge.color}
                  strokeWidth={isHighlighted ? edge.width + 1 : edge.width}
                  strokeDasharray={strokeDasharray}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    isInView
                      ? {
                          pathLength: 1,
                          opacity: isDimmed ? 0.1 : 1,
                        }
                      : {}
                  }
                  transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
                  style={{ pointerEvents: 'none' }}
                />
              );
            })}

            {/* Edge Labels */}
            {networkEdges
              .filter((e) => e.label)
              .map((edge, i) => {
                const from = networkNodes.find((n) => n.id === edge.from);
                const to = networkNodes.find((n) => n.id === edge.to);
                if (!from || !to) return null;
                const mx = (from.x + to.x) / 2;
                const my = (from.y + to.y) / 2;
                const isHighlighted =
                  hoveredNode &&
                  (edge.from === hoveredNode || edge.to === hoveredNode);
                const isDimmed = hoveredNode && !isHighlighted;
                return (
                  <motion.text
                    key={`label-${i}`}
                    x={mx}
                    y={my - 6}
                    textAnchor="middle"
                    className="font-mono"
                    fill={edge.color}
                    fontSize={8}
                    letterSpacing={1}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: isDimmed ? 0.05 : 0.7 } : {}}
                    transition={{ delay: 1.2 }}
                    style={{ pointerEvents: 'none' }}
                  >
                    {edge.label}
                  </motion.text>
                );
              })}

            {/* Nodes */}
            {networkNodes.map((node, i) => {
              const isHighlighted = hoveredNode === node.id;
              const isConnected = connected.has(node.id);
              const isDimmed = hoveredNode && !isHighlighted && !isConnected;

              return (
                <motion.g
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    isInView
                      ? {
                          scale: isHighlighted ? 1.2 : 1,
                          opacity: isDimmed ? 0.2 : 1,
                        }
                      : {}
                  }
                  transition={{
                    scale: { type: 'spring', stiffness: 300, damping: 20 },
                    opacity: { duration: 0.3 },
                    delay: node.id === 'center' ? 0 : 0.2 + i * 0.08,
                  }}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => {
                    if (node.id !== 'center' && node.id !== 'william') {
                      const charId =
                        node.id === 'karjun'
                          ? 'karjun'
                          : node.id === 'shek'
                            ? 'shek'
                            : node.id;
                      onNodeClick(charId);
                    }
                  }}
                >
                  {/* Floating animation wrapper */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size}
                    fill="var(--steel-blue)"
                    stroke={node.color}
                    strokeWidth={isHighlighted ? 3 : 2}
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      y: { duration: 3 + Math.random(), repeat: Infinity, ease: 'easeInOut' },
                    }}
                  />
                  <motion.text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="font-mono"
                    fill={node.color}
                    fontSize={node.size > 30 ? 10 : 9}
                    fontWeight={600}
                    letterSpacing={1}
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      y: { duration: 3 + Math.random(), repeat: Infinity, ease: 'easeInOut' },
                    }}
                  >
                    {node.label.split('\n').map((line, idx) => (
                      <tspan key={idx} x={node.x} dy={idx === 0 ? 0 : 12}>
                        {line}
                      </tspan>
                    ))}
                  </motion.text>
                </motion.g>
              );
            })}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  POWER STRUCTURE SIDEBAR                                            */
/* ------------------------------------------------------------------ */

function PowerStructure() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  const hierarchyLines = [
    { label: 'Chief Executive (\u7279\u9996)', indent: 0, active: false },
    { label: 'Chief Secretary (\u653F\u52D9\u53F8)', indent: 1, active: false },
    { label: 'Secretary for Security (\u4FDD\u5B89\u5C40) \u2014 \u9678\u660E\u83EF', indent: 2, active: true, color: '#10b981' },
    { label: '\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550', indent: 0, active: false, isSeparator: true },
    { label: 'COMMISSIONER (\u8655\u9577) [VACANT]', indent: 0, active: false },
    { label: 'DCP (Operations) \u2014 \u674E\u6587\u5F6C [\u6B66\u5B98]', indent: 1, active: true, color: '#f59e0b' },
    { label: '\u251C\u2500 SSP \u9093\u667A\u7ACB', indent: 2, active: true, color: '#38bdf8' },
    { label: '\u2502', indent: 2, active: false },
    { label: '\u251C\u2500 SDU Cmdr \u77F3\u7C73\u9AD8 \u26A0', indent: 2, active: true, color: '#ef4444', warning: true },
    { label: '\u2502', indent: 2, active: false },
    { label: '\u2514\u2500 ...', indent: 2, active: false },
    { label: 'DCP (Admin) \u2014 \u5289\u5091\u8F2D [\u6587\u5B98]', indent: 1, active: true, color: '#10b981' },
    { label: '\u251C\u2500 SSP \u5F90\u6C38\u57FA \u26A0', indent: 2, active: true, color: '#ef4444', warning: true },
    { label: '\u2502', indent: 2, active: false },
    { label: '\u251C\u2500 SAC \u6881\u7D2B\u8587', indent: 2, active: true, color: '#10b981' },
    { label: '\u2502', indent: 2, active: false },
    { label: '\u2514\u2500 ...', indent: 2, active: false },
  ];

  return (
    <section ref={ref} className="border-t border-grid-blue bg-midnight px-4 py-12 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-6">
          <p className="text-label text-ghost-grey">[ POWER STRUCTURE ]</p>
          <p className="mt-1 font-sans text-sm text-ghost-grey/60">HK POLICE FORCE HIERARCHY</p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto"
        >
          <div className="min-w-[320px] rounded-sm border border-grid-blue bg-void p-5">
            <p className="mb-3 font-mono text-[10px] font-bold tracking-wider text-classified-red">
              HONG KONG POLICE FORCE HIERARCHY
            </p>
            <div className="space-y-0.5">
              {hierarchyLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.04 + 0.2 }}
                  className="font-mono text-mono-code"
                  style={{
                    paddingLeft: `${line.indent * 20}px`,
                    color: line.isSeparator
                      ? '#1a2744'
                      : line.active && line.color
                        ? line.color
                        : '#94a3b8',
                    fontSize: line.isSeparator ? 10 : 13,
                    lineHeight: line.isSeparator ? 1 : 1.8,
                  }}
                >
                  {line.warning ? (
                    <>
                      {line.label.split(' \u26A0')[0]}
                      <span className="text-traitor-red"> \u26A0</span>
                    </>
                  ) : (
                    line.label
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

export default function Personnel() {
  const [factionFilter, setFactionFilter] = useState<Faction>('all');
  const [statusFilter, setStatusFilter] = useState<Status>('all');
  const [sortMode, setSortMode] = useState<SortMode>('threat-desc');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const scrollToCard = useCallback((id: string) => {
    const el = document.getElementById(`dossier-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setExpandedId(id);
    }
  }, []);

  /* ---- filtering ---- */
  const filtered = CHARACTERS.filter((c) => {
    if (factionFilter !== 'all' && c.factionKey !== factionFilter) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    return true;
  });

  /* ---- sorting ---- */
  const sorted = [...filtered].sort((a, b) => {
    switch (sortMode) {
      case 'alphabetical':
        return a.nameEn.localeCompare(b.nameEn);
      case 'role':
        return a.role.localeCompare(b.role);
      case 'threat-desc': {
        const threatOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
        return threatOrder[b.threatLevel] - threatOrder[a.threatLevel];
      }
      default:
        return 0;
    }
  });

  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC+8';

  return (
    <div className="min-h-[100dvh] bg-midnight">
      {/* ====== SECTION 1: HEADER ====== */}
      <div ref={headerRef} className="bg-void px-4 pt-28 pb-8 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          {/* Breadcrumb */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-caption font-mono text-ghost-grey"
          >
            PHANTOM-7 // BRIEFING &gt; PERSONNEL DOSSIERS
          </motion.p>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
            className="mt-4"
          >
            <h1 className="font-sans text-display-xl text-ice-white">PERSONNEL DOSSIERS</h1>
            <p className="mt-1 font-sans text-lg text-ghost-grey">人物檔案</p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isHeaderInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="mt-4 h-px origin-left bg-steel-cyan"
              style={{ maxWidth: 480 }}
            />
          </motion.div>

          {/* Report Metadata */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-4 font-mono text-caption text-ghost-grey"
          >
            DOC REF: CW-DOSSIER-001 &nbsp;&nbsp;|&nbsp;&nbsp; SUBJECTS: 10 &nbsp;&nbsp;|&nbsp;&nbsp; CLASSIFICATION: TOP SECRET &nbsp;&nbsp;|&nbsp;&nbsp; LAST UPDATED: {timestamp}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-4 max-w-[640px] font-sans text-body text-ice-white"
          >
            The following dossiers contain classified intelligence on all key personnel involved in
            Operation Cold War. Each subject has been assigned a threat assessment rating and
            operational status.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-1 max-w-[640px] font-sans text-body text-ice-white/60"
          >
            Click any dossier to expand full details. Filter by faction and status using the controls below.
          </motion.p>
        </div>
      </div>

      {/* ====== SECTION 2: FILTER BAR ====== */}
      <FilterBar
        factionFilter={factionFilter}
        setFactionFilter={setFactionFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortMode={sortMode}
        setSortMode={setSortMode}
      />

      {/* ====== SECTION 3: DOSSIER GRID ====== */}
      <div className="bg-midnight bg-grid px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <AnimatePresence mode="wait">
            {sorted.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center font-mono text-sm text-ghost-grey"
              >
                [ NO SUBJECTS MATCH CURRENT FILTERS ]
              </motion.div>
            ) : (
              <motion.div
                key={`${factionFilter}-${statusFilter}-${sortMode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6"
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                }}
              >
                {sorted.map((char, i) => (
                  <div key={char.id} id={`dossier-${char.id}`}>
                    <DossierCard
                      character={char}
                      index={i}
                      isExpanded={expandedId === char.id}
                      onToggle={() =>
                        setExpandedId(expandedId === char.id ? null : char.id)
                      }
                      onNodeClick={scrollToCard}
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ====== SECTION 4: RELATIONSHIP NETWORK ====== */}
      <RelationshipNetwork onNodeClick={scrollToCard} />

      {/* ====== SECTION 5: POWER STRUCTURE ====== */}
      <PowerStructure />
    </div>
  );
}
