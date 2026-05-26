import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Headphones,
  Lock,
  Unlock,
  AlertTriangle,
  X,
  Minus,
  Square,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────
interface EvidenceFile {
  id: string;
  filename: string;
  type: 'TEXT' | 'AUDIO' | 'LOG' | 'PDF' | 'DATA';
  size: string;
  status: 'declassified' | 'redacted' | 'active-threat';
  content: React.ReactNode;
}

// ─── Framer Motion Variants ──────────────────────────────────────────
const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: easeOut } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeOut } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

// ─── Redacted Text Component ─────────────────────────────────────────
function RedactedText({ label, reveal }: { label: string; reveal: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="relative inline-block cursor-help"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered((p) => !p)}
    >
      <span
        className="relative inline-block overflow-hidden rounded-sm transition-all duration-300"
        style={{
          backgroundColor: hovered ? 'transparent' : '#000',
          color: hovered ? 'var(--ghost-grey)' : 'transparent',
        }}
      >
        {!hovered && (
          <span
            className="font-mono text-[0.65em] tracking-wider"
            style={{ color: 'var(--classified-red)' }}
          >
            [REDACTED: {label}]
          </span>
        )}
        {hovered && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="font-mono text-sm tracking-wide"
            style={{ color: 'var(--ghost-grey)' }}
          >
            {reveal}
          </motion.span>
        )}
      </span>
    </span>
  );
}

// ─── Document Header Component ───────────────────────────────────────
function DocHeader({ lines }: { lines: string[] }) {
  return (
    <div className="mb-6 border-b border-grid-blue pb-4">
      <pre
        className="font-mono text-xs leading-relaxed tracking-wider"
        style={{ color: 'var(--ghost-grey)' }}
      >
        {lines.map((line, i) => (
          <div key={i}>{line || ' '}</div>
        ))}
      </pre>
    </div>
  );
}

// ─── Operative Note Component ────────────────────────────────────────
function OperativeNote({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-6 rounded-sm border-l-2 border-surveillance-green p-4"
      style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}
    >
      <div
        className="mb-2 font-mono text-xs tracking-wider"
        style={{ color: 'var(--surveillance-green)' }}
      >
        [OPERATIVE NOTE]
      </div>
      <div className="font-sans text-sm leading-relaxed" style={{ color: 'var(--ghost-grey)' }}>
        {children}
      </div>
    </div>
  );
}

// ─── Timestamp Component ─────────────────────────────────────────────
function TS({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs tracking-wider" style={{ color: 'var(--ghost-grey)' }}>
      {children}
    </span>
  );
}

// ─── Speaker Label ───────────────────────────────────────────────────
function Speaker({ name, color = 'ice-white' }: { name: string; color?: string }) {
  const colorMap: Record<string, string> = {
    'ice-white': 'var(--ice-white)',
    'steel-cyan': 'var(--steel-cyan)',
    'alert-amber': 'var(--alert-amber)',
    'classified-red': 'var(--classified-red)',
    'ghost-grey': 'var(--ghost-grey)',
  };
  return (
    <span className="font-mono text-sm font-bold" style={{ color: colorMap[color] || color }}>
      {name}
    </span>
  );
}

// ─── Transcript Block ────────────────────────────────────────────────
function Transcript({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 space-y-1 font-mono text-sm leading-relaxed" style={{ color: 'var(--ice-white)' }}>
      {children}
    </div>
  );
}

// ─── File 1: Ransom Demand ───────────────────────────────────────────
function RansomDemandContent() {
  return (
    <div>
      <DocHeader
        lines={[
          '═══════════════════════════════════════════════════════════════',
          'POLICE COMMUNICATIONS DIVISION — TRANSCRIPT LOG',
          'FILE REF: COMMS-2015-1215-RD',
          'STATUS: DECLASSIFIED BY PHANTOM-7',
          '═══════════════════════════════════════════════════════════════',
        ]}
      />
      <div className="mb-2">
        <img
          src="/ransom-letter-scan.jpg"
          alt="Ransom letter scan"
          className="mb-4 h-auto w-full max-w-md rounded-sm border border-grid-blue object-cover opacity-80"
        />
      </div>
      <Transcript>
        <div>
          <TS>[2015-12-15 09:30:17 HKT]</TS>
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>INCOMING CALL — UNTRACEABLE NUMBER</div>
        <div style={{ color: 'var(--ghost-grey)' }}>RECIPIENT: HKPF COMMUNICATIONS CENTER</div>
        <div style={{ color: 'var(--ghost-grey)' }}>DURATION: 0:02:34</div>
        <div className="mt-3" style={{ color: 'var(--alert-amber)' }}>--- BEGIN TRANSCRIPT ---</div>
        <div className="mt-3">
          <Speaker name="VOICE [DISTORTED]" color="alert-amber" />:
        </div>
        <div className="font-sans">「你們的衝鋒車，在我們手上。」</div>
        <div style={{ color: 'var(--ghost-grey)' }}>(Your police van is in our hands.)</div>
        <div className="mt-3">
          <Speaker name="DISPATCHER" color="steel-cyan" />:
        </div>
        <div className="font-sans">「你是誰？你想要什麼？」</div>
        <div style={{ color: 'var(--ghost-grey)' }}>(Who are you? What do you want?)</div>
        <div className="mt-3">
          <Speaker name="VOICE [DISTORTED]" color="alert-amber" />:
        </div>
        <div className="font-sans">「九千三百萬。現金。不連號。」</div>
        <div style={{ color: 'var(--ghost-grey)' }}>(Ninety-three million. Cash. Non-sequential.)</div>
        <div className="mt-3">
          <Speaker name="DISPATCHER" color="steel-cyan" />:
        </div>
        <div className="font-sans">「我需要時間確認——」</div>
        <div style={{ color: 'var(--ghost-grey)' }}>(I need time to confirm—)</div>
        <div className="mt-3">
          <Speaker name="VOICE [DISTORTED]" color="alert-amber" />:
        </div>
        <div className="font-sans">「你們有六小時。六小時後，</div>
        <div className="font-sans">每超過一小時，我就殺一個警察。」</div>
        <div style={{ color: 'var(--ghost-grey)' }}>(You have six hours. Every hour after that, I kill a police officer.)</div>
        <div className="mt-3 italic" style={{ color: 'var(--ghost-grey)' }}>[STATIC — LINE DISCONNECTED]</div>
        <div className="mt-3" style={{ color: 'var(--alert-amber)' }}>--- END TRANSCRIPT ---</div>
        <div className="mt-4">
          <TS>═══════════════════════════════════════════════════════════════</TS>
        </div>
        <div className="mt-2" style={{ color: 'var(--ghost-grey)' }}>
          UPDATE [2015-12-15 09:45:22 HKT]:
        </div>
        <div className="mt-1" style={{ color: 'var(--ghost-grey)' }}>SECOND CALL RECEIVED. REVISED DEMAND:</div>
        <div className="mt-2 font-sans text-base font-semibold" style={{ color: 'var(--classified-red)' }}>
          「三三三三萬。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(Thirty-three million three hundred thirty thousand.)</div>
        <div className="mt-2" style={{ color: 'var(--ghost-grey)' }}>
          CONDITION: Assistant Commissioner LIU Kit-wing must deliver the ransom personally.
        </div>
        <div className="mt-2">
          <TS>═══════════════════════════════════════════════════════════════</TS>
        </div>
      </Transcript>

      <OperativeNote>
        <p>
          The revised ransom amount — 33,330,000 — is suspicious. Not a round number. Not easily
          divisible. The digits (3-3-3-3) suggest symbolic significance or a coded message. Possible
          references:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>33 is a significant number in certain organizations</li>
          <li>The repetition (3333) may be a signal or identifier</li>
          <li>Could represent a date, code, or faction marker</li>
        </ul>
        <p className="mt-3">
          RECOMMENDATION: Cross-reference with known criminal organization numeric codes.
        </p>
      </OperativeNote>
    </div>
  );
}

// ─── File 2: Bridge Shootout ─────────────────────────────────────────
function BridgeShootoutContent() {
  return (
    <div>
      <DocHeader
        lines={[
          '═══════════════════════════════════════════════════════════════',
          'TACTICAL OPERATIONS DIVISION — AUDIO EVIDENCE',
          'FILE REF: TAC-2015-1215-BS',
          'STATUS: DECLASSIFIED BY PHANTOM-7',
          'CAUTION: AUDIO CONTAINS GUNFIRE AND CASUALTY REPORTS',
          '═══════════════════════════════════════════════════════════════',
        ]}
      />

      {/* Waveform Display */}
      <div className="mb-6 rounded-sm border border-grid-blue bg-steel-blue/30 p-4">
        <div className="mb-2 font-mono text-xs tracking-wider" style={{ color: 'var(--ghost-grey)' }}>
          AMPLITUDE
        </div>
        <div className="mb-2 flex items-end gap-px">
          {Array.from({ length: 80 }).map((_, i) => {
            const phase = i / 80;
            let height: number;
            let color: string;
            if (phase < 0.25) {
              height = 20 + Math.sin(i * 0.5) * 15;
              color = 'rgba(16, 185, 129, 0.4)';
            } else if (phase < 0.5) {
              height = 30 + Math.sin(i * 0.8) * 25;
              color = 'rgba(245, 158, 11, 0.5)';
            } else if (phase < 0.75) {
              height = 50 + Math.random() * 30;
              color = 'rgba(220, 38, 38, 0.7)';
            } else {
              height = 5 + Math.sin(i * 0.3) * 3;
              color = 'rgba(148, 163, 184, 0.3)';
            }
            return (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{ height: `${height}%`, minHeight: `${height * 0.5}px`, backgroundColor: color }}
              />
            );
          })}
        </div>
        <div
          className="flex justify-between font-mono text-[10px] tracking-wider"
          style={{ color: 'var(--ghost-grey)' }}
        >
          <span>14:21:00</span>
          <span>14:22:00</span>
          <span>14:23:00</span>
          <span>14:24:00</span>
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px]">
          <span style={{ color: 'var(--surveillance-green)' }}>[CALM]</span>
          <span style={{ color: 'var(--alert-amber)' }}>[TENSION]</span>
          <span style={{ color: 'var(--classified-red)' }}>[GUNFIRE]</span>
          <span style={{ color: 'var(--ghost-grey)' }}>[SILENCE]</span>
        </div>
      </div>

      <Transcript>
        <div className="mb-2 text-xs tracking-wider" style={{ color: 'var(--alert-amber)' }}>
          --- BRIDGE EXCHANGE — AUDIO TRANSCRIPT ---
        </div>
        <div className="mt-3">
          <TS>[14:22:01]</TS>{' '}
          <Speaker name="LIU" color="ice-white" />: "錢在這裡。人在哪裡？」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(The money is here. Where are the people?)</div>
        <div className="mt-3">
          <TS>[14:22:04]</TS>{' '}
          <Speaker name="UNKNOWN" color="alert-amber" />: "把錢放在地上。後退十步。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(Put the money on the ground. Step back ten steps.)</div>
        <div className="mt-3">
          <TS>[14:22:08]</TS>{' '}
          <Speaker name="LIU" color="ice-white" />: [Footsteps — placing bag]
        </div>
        <div className="mt-3">
          <TS>[14:22:12]</TS>{' '}
          <Speaker name="UNKNOWN" color="alert-amber" />: "劉傑輝，你真的很勇敢。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(Liu Kit-wing, you really are brave.)</div>
        <div className="mt-3">
          <TS>[14:22:15]</TS>{' '}
          <Speaker name="TSUI" color="steel-cyan" />: 「劉SIR——小心！」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(Sir Liu — watch out!)</div>
        <div className="mt-2 font-bold" style={{ color: 'var(--classified-red)' }}>
          <TS>[14:22:16]</TS> [GUNSHOT — AUTOMATIC WEAPON FIRE]
        </div>
        <div className="font-bold" style={{ color: 'var(--classified-red)' }}>
          <TS>[14:22:16]</TS> [GUNSHOT — RETURN FIRE]
        </div>
        <div className="font-bold" style={{ color: 'var(--classified-red)' }}>
          <TS>[14:22:17]</TS> [MULTIPLE GUNSHOTS]
        </div>
        <div className="font-bold" style={{ color: 'var(--classified-red)' }}>
          <TS>[14:22:17]</TS> [GUNSHOT — CLOSE RANGE]
        </div>
        <div className="mt-3">
          <TS>[14:22:18]</TS>{' '}
          <Speaker name="TSUI" color="steel-cyan" />: [GROAN] "劉SIR... 快走..."
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(Sir... run...)</div>
        <div className="mt-3">
          <TS>[14:22:19]</TS>{' '}
          <Speaker name="LIU" color="ice-white" />: 「永基！永基！」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(Wing-kei! Wing-kei!)</div>
        <div className="mt-2" style={{ color: 'var(--ghost-grey)' }}>
          <TS>[14:22:20]</TS> [FOOTSTEPS — RUNNING]
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          <TS>[14:22:21]</TS> [VEHICLE ENGINE — ACCELERATING]
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          <TS>[14:22:22]</TS> [SILENCE]
        </div>
        <div className="mt-3">
          <TS>[14:22:25]</TS>{' '}
          <Speaker name="LIU" color="ice-white" />: 「這裡是劉傑輝... 我需要救護車... 天橋... 徐永基中槍... 重複... 徐永基中槍... 」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          (This is Liu Kit-wing... I need an ambulance... The bridge... Tsui Wing-kei is shot...
          repeat... Tsui Wing-kei is shot...)
        </div>
        <div className="mt-2" style={{ color: 'var(--ghost-grey)' }}>
          <TS>[14:22:45]</TS> [RADIO STATIC]
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          <TS>[14:22:46]</TS> [RADIO SILENCE]
        </div>
        <div className="mt-3 text-xs tracking-wider" style={{ color: 'var(--alert-amber)' }}>
          --- END TRANSCRIPT ---
        </div>
      </Transcript>

      {/* Casualty Report */}
      <div
        className="mt-6 rounded-sm border border-classified-red p-4"
        style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)' }}
      >
        <pre
          className="font-mono text-sm leading-relaxed"
          style={{ color: 'var(--ice-white)' }}
        >
          <div className="mb-2 border-b border-classified-red pb-2 font-bold" style={{ color: 'var(--classified-red)' }}>
            CASUALTY REPORT
          </div>
          <div>NAME: TSUI Wing-kei (徐永基)</div>
          <div>RANK: Senior Superintendent</div>
          <div>
            STATUS:{' '}
            <span className="font-bold" style={{ color: 'var(--classified-red)' }}>
              KILLED IN ACTION
            </span>
          </div>
          <div>CAUSE: Multiple gunshot wounds</div>
          <div>LOCATION: Exchange bridge</div>
          <div>TIME: 14:22:18 HKT</div>
          <div className="mt-2 text-xs" style={{ color: 'var(--ghost-grey)' }}>
            NOTE: Posthumously identified as internal conspirator.
          </div>
          <div className="text-xs" style={{ color: 'var(--ghost-grey)' }}>
            Circumstances of death suggest possible elimination by co-conspirators.
          </div>
        </pre>
      </div>
    </div>
  );
}

// ─── File 3: ICAC Interrogation ──────────────────────────────────────
function ICACInterrogationContent() {
  return (
    <div>
      <DocHeader
        lines={[
          '═══════════════════════════════════════════════════════════════',
          'INDEPENDENT COMMISSION AGAINST CORRUPTION — INTERROGATION LOG',
          'FILE REF: ICAC-2015-1215-INT-LIU',
          'SUBJECT: LIU Kit-wing (劉傑輝)',
          'INTERVIEWER: CHEUNG Kwok-biu (張國標), Principal Investigator',
          'LOCATION: ICAC HQ INTERVIEW ROOM 7',
          'STATUS: DECLASSIFIED BY PHANTOM-7',
          '═══════════════════════════════════════════════════════════════',
        ]}
      />

      <div className="mb-4">
        <img
          src="/interrogation-room.jpg"
          alt="ICAC interrogation room"
          className="mb-4 h-auto w-full max-w-lg rounded-sm border border-grid-blue object-cover opacity-70"
        />
      </div>

      <Transcript>
        <div className="mb-3 text-xs tracking-wider" style={{ color: 'var(--alert-amber)' }}>
          --- EXCERPT 1: OPENING EXCHANGE ---
        </div>
        <div className="mt-3">
          <TS>[10:15:33]</TS>{' '}
          <Speaker name="CHEUNG" color="steel-cyan" />: "劉SIR，歡迎來到廉政公署。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(Sir Liu, welcome to the ICAC.)</div>
        <div className="mt-3">
          <TS>[10:15:36]</TS>{' '}
          <Speaker name="LIU" color="ice-white" />: "我不是來做客的，張主任。說吧，你想知道什麼？」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          (I&apos;m not here as a guest, Director Cheung. Say what you want to know.)
        </div>
        <div className="mt-3">
          <TS>[10:15:40]</TS>{' '}
          <Speaker name="CHEUNG" color="steel-cyan" />: "有人舉報你，劉SIR。說你與綁匪有聯繫。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          (Someone reported you, Sir Liu. Said you have connections with the kidnappers.)
        </div>
        <div className="mt-2 italic" style={{ color: 'var(--ghost-grey)' }}>
          <TS>[10:15:43]</TS> [SILENCE — 0:04]
        </div>
        <div className="mt-2">
          <TS>[10:15:47]</TS> <Speaker name="LIU" color="ice-white" />: "然後呢？」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(And then?)</div>
        <div className="mt-3">
          <TS>[10:15:49]</TS>{' '}
          <Speaker name="CHEUNG" color="steel-cyan" />: "然後你需要解釋，為什麼綁匪指定要你親自交收贖金。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          (Then you need to explain why the kidnappers specified that you deliver the ransom
          personally.)
        </div>
        <div className="mt-3">
          <TS>[10:15:54]</TS>{' '}
          <Speaker name="LIU" color="ice-white" />: "因為他們想我死，張主任。因為李文彬是行動副處長，他們知道李文彬一定會派人去救他兒子。但他們要我親自去——因為他們知道我一定會去。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          (Because they want me dead, Director Cheung. Because Lee Man-bun is the Operations DCP,
          they knew Lee would send someone to save his son. But they wanted me personally — because
          they knew I would go.)
        </div>
        <div className="mt-2 italic" style={{ color: 'var(--ghost-grey)' }}>
          <TS>[10:16:08]</TS> [SILENCE — 0:03]
        </div>
        <div className="mt-2">
          <TS>[10:16:11]</TS>{' '}
          <Speaker name="CHEUNG" color="steel-cyan" />: "你是說，你是目標？」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(You&apos;re saying you&apos;re the target?)</div>
        <div className="mt-3">
          <TS>[10:16:13]</TS>{' '}
          <Speaker name="LIU" color="ice-white" />: "我是說，這不是綁架案。這是政治。有人在利用這個案子來控制整個警隊。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          (I&apos;m saying this is not a kidnapping case. This is politics. Someone is using this case
          to control the entire police force.)
        </div>
        <div className="mt-3 text-xs tracking-wider" style={{ color: 'var(--alert-amber)' }}>
          --- END EXCERPT 1 ---
        </div>

        <div className="mb-3 mt-6 text-xs tracking-wider" style={{ color: 'var(--alert-amber)' }}>
          --- EXCERPT 2: THE ADMISSION ---
        </div>
        <div className="mt-3">
          <TS>[11:42:17]</TS>{' '}
          <Speaker name="CHEUNG" color="steel-cyan" />: "劉SIR，我查過了。那個匿名舉報電話... 是從你的辦公室打出來的。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          (Sir Liu, I checked. That anonymous report call... came from your office.)
        </div>
        <div className="mt-2 italic" style={{ color: 'var(--ghost-grey)' }}>
          <TS>[11:42:23]</TS> [SILENCE — 0:06]
        </div>
        <div className="mt-2">
          <TS>[11:42:29]</TS>{' '}
          <Speaker name="LIU" color="ice-white" />: "你查得很仔細，張主任。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          (You investigated very thoroughly, Director Cheung.)
        </div>
        <div className="mt-3">
          <TS>[11:42:32]</TS>{' '}
          <Speaker name="CHEUNG" color="steel-cyan" />: "為什麼？為什麼你要舉報自己？」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(Why? Why did you report yourself?)</div>
        <div className="mt-3">
          <TS>[11:42:36]</TS>{' '}
          <Speaker name="LIU" color="ice-white" />: "因為我需要你們幫我查案，張主任。警隊裡有內鬼——而且不止一個。我不能信任何人。但我相信你們會依法辦事。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          (Because I needed you to help investigate, Director Cheung. There are moles in the police
          force — and more than one. I can&apos;t trust anyone. But I believe you will follow the law.)
        </div>
        <div className="mt-2 italic" style={{ color: 'var(--ghost-grey)' }}>
          <TS>[11:42:48]</TS> [SILENCE — 0:08]
        </div>
        <div className="mt-2">
          <TS>[11:42:56]</TS>{' '}
          <Speaker name="CHEUNG" color="steel-cyan" />: "你在利用我們，劉SIR。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(You&apos;re using us, Sir Liu.)</div>
        <div className="mt-3">
          <TS>[11:42:59]</TS>{' '}
          <Speaker name="LIU" color="ice-white" />: "我在請你們幫忙，張主任。而且你看——你們已經查到東西了，對吧？」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          (I&apos;m asking for your help, Director Cheung. And look — you&apos;ve already found something,
          right?)
        </div>
        <div className="mt-2" style={{ color: 'var(--ghost-grey)' }}>
          <TS>[11:43:05]</TS> [DOCUMENTS SHUFFLING]
        </div>
        <div className="mt-2">
          <TS>[11:43:07]</TS>{' '}
          <Speaker name="CHEUNG" color="steel-cyan" />: "...我會繼續查。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(...I&apos;ll continue the investigation.)</div>
        <div className="mt-2">
          <TS>[11:43:09]</TS>{' '}
          <Speaker name="LIU" color="ice-white" />: "我知道。這就是為什麼我選擇了你們。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(I know. That&apos;s why I chose you.)</div>
        <div className="mt-3 text-xs tracking-wider" style={{ color: 'var(--alert-amber)' }}>
          --- END EXCERPT 2 ---
        </div>
      </Transcript>

      {/* Operative's Annotation */}
      <div
        className="mt-6 rounded-sm border-l-2 border-surveillance-green p-4"
        style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}
      >
        <div
          className="mb-2 font-mono text-xs tracking-wider"
          style={{ color: 'var(--surveillance-green)' }}
        >
          [OPERATIVE PHANTOM-7 — ANALYSIS]
        </div>
        <div className="space-y-2 font-sans text-sm leading-relaxed" style={{ color: 'var(--ghost-grey)' }}>
          <p>
            Liu&apos;s interrogation of himself is one of the most remarkable pieces of evidence in this
            case. He transformed the ICAC — an oversight body designed to investigate police
            corruption — into his own investigative tool.
          </p>
          <p>
            The key moment: when Cheung discovered the anonymous call came from Liu&apos;s office. Most
            suspects would panic. Liu simply acknowledged it — and reframed it as a strategic choice.
          </p>
          <p className="italic" style={{ color: 'var(--ice-white)' }}>
            &ldquo;I&apos;m asking for your help.&rdquo;
          </p>
          <p>
            This is how Liu operates. He doesn&apos;t fight his enemies directly. He creates situations
            where his enemies&apos; own actions serve his purposes.
          </p>
          <p className="mt-2 text-xs tracking-wider" style={{ color: 'var(--surveillance-green)' }}>
            RATING: This interrogation is more valuable as evidence of Liu&apos;s strategic thinking than
            as evidence of his innocence.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── File 4: Surveillance Transcript ─────────────────────────────────
function SurveillanceContent() {
  return (
    <div>
      <DocHeader
        lines={[
          '═══════════════════════════════════════════════════════════════',
          'SURVEILLANCE DIVISION — MONITORED COMMUNICATIONS',
          'FILE REF: SURV-2015-1215-MON-001',
          'STATUS: DECLASSIFIED BY PHANTOM-7',
          'WARNING: PARTIAL AUDIO RECOVERY — SOME SECTIONS INCOMPLETE',
          '═══════════════════════════════════════════════════════════════',
        ]}
      />

      <Transcript>
        <div className="mb-2 text-xs tracking-wider" style={{ color: 'var(--alert-amber)' }}>
          --- SURVEILLANCE TARGET: LEE Man-bun ---
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>LOCATION: Police HQ — Deputy Commissioner&apos;s Office</div>
        <div className="mb-3" style={{ color: 'var(--ghost-grey)' }}>
          DATE/TIME: 2015-12-15 01:22:15 HKT
        </div>
        <div className="mb-2 text-xs tracking-wider" style={{ color: 'var(--surveillance-green)' }}>
          [BEGIN PARTIAL TRANSCRIPT]
        </div>
        <div className="mt-3">
          <Speaker name="LEE" color="ice-white" />: [VOICE ELEVATED] "我需要更多時間！飛虎隊已經準備好了，情報只是——"
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          (I need more time! The SDU is ready, the intelligence just needs—)
        </div>
        <div className="mt-2 italic" style={{ color: 'var(--ghost-grey)' }}>
          UNKNOWN [PHONE]: [INCOMPREHENSIBLE — audio degraded]
        </div>
        <div className="mt-3">
          <Speaker name="LEE" color="ice-white" />: "我知道！我知道俊兒在他們手上！但我是警察，我不能因為我兒子——"
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          (I know! I know Ka-chun is in their hands! But I&apos;m a policeman, I can&apos;t because of my
          son—)
        </div>
        <div className="mt-2 italic" style={{ color: 'var(--ghost-grey)' }}>[PAUSE — 0:12]</div>
        <div className="mt-3">
          <Speaker name="LEE" color="ice-white" />: [VOICE LOWERED] "你聽著。如果我因為俊兒而做錯決定，我會親自把槍交出來。但在那之前，讓我做我的工作。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          (Listen. If I make wrong decisions because of Ka-chun, I&apos;ll hand in my gun myself. But
          until then, let me do my job.)
        </div>
        <div className="mt-3 text-xs tracking-wider" style={{ color: 'var(--surveillance-green)' }}>
          [END PARTIAL TRANSCRIPT]
        </div>

        <div className="mt-4">
          <TS>═══════════════════════════════════════════════════════════════</TS>
        </div>

        <div className="mb-2 mt-6 text-xs tracking-wider" style={{ color: 'var(--alert-amber)' }}>
          --- SURVEILLANCE TARGET: LEE Ka-chun ---
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>LOCATION: UNKNOWN (Intercepted radio transmission)</div>
        <div className="mb-3" style={{ color: 'var(--ghost-grey)' }}>
          DATE/TIME: 2015-12-15 22:45:33 HKT
        </div>
        <div className="mb-2 text-xs tracking-wider" style={{ color: 'var(--surveillance-green)' }}>
          [BEGIN PARTIAL TRANSCRIPT]
        </div>
        <div className="mt-3">
          <Speaker name="LEE K.C." color="classified-red" />: [RADIO STATIC] &quot;...計劃進行順利。劉傑輝已經中計了。&quot;
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(...plan proceeding smoothly. Liu Kit-wing has taken the bait.)</div>
        <div className="mt-2 italic" style={{ color: 'var(--ghost-grey)' }}>
          UNKNOWN: [STATIC] &quot;...father... knows...?&quot;
        </div>
        <div className="mt-3">
          <Speaker name="LEE K.C." color="classified-red" />: [CHUCKLE] &quot;他永遠不會知道。他太相信自己是對的。&quot;
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          (He&apos;ll never know. He believes too much that he&apos;s right.)
        </div>
        <div className="mt-2 italic" style={{ color: 'var(--ghost-grey)' }}>[TRANSMISSION CUTS OUT]</div>
        <div className="mt-3 text-xs tracking-wider" style={{ color: 'var(--surveillance-green)' }}>
          [END PARTIAL TRANSCRIPT]
        </div>
      </Transcript>

      <OperativeNote>
        <p>Two intercepted conversations. Two fathers and sons. Two different kinds of tragedy.</p>
        <p>
          Lee Man-bun, trying to be a good officer while being a father. Knowing his judgment is
          compromised. Still trying to do the right thing.
        </p>
        <p>
          Lee Ka-chun, mocking his father&apos;s integrity. Using his father&apos;s position as a weapon
          against the very system that raised him.
        </p>
        <p>
          The radio intercept of Lee Ka-chun is the smoking gun — proof that he was an active
          conspirator, not a victim. But the audio quality means it wouldn&apos;t hold up in court without
          corroboration.
        </p>
      </OperativeNote>
    </div>
  );
}

// ─── File 5: Vault Audit Report ──────────────────────────────────────
function VaultAuditContent() {
  return (
    <div>
      <DocHeader
        lines={[
          '═══════════════════════════════════════════════════════════════',
          'HKPF FINANCE DIVISION — VAULT AUDIT REPORT',
          'FILE REF: FIN-2015-1215-VA',
          'STATUS: PARTIALLY REDACTED',
          'REDACTION AUTHORITY: PHANTOM-7 — OPERATIONAL SECURITY',
          '═══════════════════════════════════════════════════════════════',
        ]}
      />

      <Transcript>
        <div className="text-lg font-bold" style={{ color: 'var(--ice-white)' }}>
          VAULT INVENTORY AUDIT
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>Date: December 15, 2015</div>
        <div className="mb-4">
          Auditor: <RedactedText label="審計員姓名" reveal="WONG Siu-ming (黃少明)" />
        </div>

        <div className="mb-2">
          <TS>═══════════════════════════════════════════════════════════════</TS>
        </div>
        <div className="mb-2 text-xs tracking-wider" style={{ color: 'var(--alert-amber)' }}>
          SECTION 1: TACTICAL EQUIPMENT INVENTORY
        </div>
        <div className="mt-2">
          Item: <RedactedText label="裝備型號" reveal="MP5 Submachine Guns" /> — Qty:{" "}
          <RedactedText label="數量" reveal="24" />
        </div>
        <div>Status: MISSING — Last seen: <RedactedText label="日期" reveal="Dec 14, 2015" /></div>
        <div className="mt-2">
          Item: <RedactedText label="裝備型號" reveal="Ballistic Vests (Level III)" /> — Qty:{" "}
          <RedactedText label="數量" reveal="48" />
        </div>
        <div>Status: MISSING — Last seen: <RedactedText label="日期" reveal="Dec 14, 2015" /></div>
        <div className="mt-2">
          Item: Flashbang grenades — Qty: 12
        </div>
        <div>Status: MISSING — Last seen: December 14, 2015</div>

        <div className="mb-2 mt-4">
          <TS>═══════════════════════════════════════════════════════════════</TS>
        </div>
        <div className="mb-2 text-xs tracking-wider" style={{ color: 'var(--alert-amber)' }}>
          SECTION 2: CASH ASSETS — SPECIAL OPERATIONS FUND
        </div>
        <div className="mt-2">
          Opening Balance (Dec 14): HK${" "}
          <RedactedText label="金額" reveal="93,450,000" />
        </div>
        <div className="mt-3">
          Authorized Withdrawal (Dec 15, 09:00):
          <div className="ml-4">
            <div>
              Amount: <span style={{ color: 'var(--classified-red)' }}>HK$33,330,000</span>
            </div>
            <div>Authorized by: DCP LIU Kit-wing</div>
            <div>Purpose: Ransom negotiation</div>
            <div>Status: COMPLETED</div>
          </div>
        </div>
        <div className="mt-2">
          <RedactedText label="運輸詳情" reveal="Dog Team transport vehicle, Route 7, dispatched 16:00" />
        </div>

        <div className="mb-2 mt-4">
          <TS>═══════════════════════════════════════════════════════════════</TS>
        </div>
        <div className="mb-2 text-xs tracking-wider" style={{ color: 'var(--alert-amber)' }}>
          SECTION 3: INCIDENT — CASH TRANSPORT INTERCEPTION
        </div>
        <div className="mt-2">
          <RedactedText label="大部份內容已加密" reveal="[ENCRYPTED — SEE APPENDIX C]" />
        </div>
        <div className="mt-3" style={{ color: 'var(--ice-white)' }}>
          Known facts:
        </div>
        <div className="ml-4 space-y-1">
          <div>
            • Transport vehicle intercepted at{' '}
            <RedactedText label="地點" reveal="Kwun Tong Bypass" />
          </div>
          <div>
            • Time of interception: <RedactedText label="時間" reveal="16:42 HKT" />
          </div>
          <div>
            • Amount stolen: <span style={{ color: 'var(--classified-red)' }}>HK$50,000,000+</span>
          </div>
          <div>
            • Guard casualties: <RedactedText label="傷亡數字" reveal="2 KIA, 1 WIA" />
          </div>
          <div>
            • Perpetrators:{' '}
            <RedactedText label="疑犯描述" reveal="5+ armed, tactical gear, professional operation" />
          </div>
        </div>

        <div className="mb-2 mt-4">
          <TS>═══════════════════════════════════════════════════════════════</TS>
        </div>
        <div className="mb-2 text-xs tracking-wider" style={{ color: 'var(--alert-amber)' }}>
          SECTION 4: PERSONNEL OF INTEREST
        </div>
        <div className="mt-2">Name: NG Wai-lun (魏威廉)</div>
        <div>Position: Vault Supervisor</div>
        <div>
          Status:{' '}
          <span className="font-bold" style={{ color: 'var(--classified-red)' }}>
            [REDACTED — CLASSIFIED]
          </span>
        </div>
        <div className="mt-2">
          <RedactedText label="詳細調查結果" reveal="Subject terminated. Investigation ongoing." />
        </div>
        <div className="mt-4">
          <TS>═══════════════════════════════════════════════════════════════</TS>
        </div>
      </Transcript>
    </div>
  );
}

// ─── File 6: Mystery Phone Call ──────────────────────────────────────
function MysteryPhoneCallContent() {
  return (
    <div>
      <DocHeader
        lines={[
          '═══════════════════════════════════════════════════════════════',
          'INTELLIGENCE DIVISION — PRIORITY COMMUNICATION INTERCEPT',
          'FILE REF: INTEL-2015-1215-MPC',
          'STATUS: PARTIALLY REDACTED',
          'CLASSIFICATION: EYES ONLY — COMMAND LEVEL',
          'THREAT LEVEL: CRITICAL',
          '═══════════════════════════════════════════════════════════════',
        ]}
      />

      {/* Warning Banner */}
      <div
        className="mb-6 animate-pulse-warning rounded-sm border-2 border-classified-red p-4"
        style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)' }}
      >
        <pre
          className="text-center font-mono text-sm font-bold leading-relaxed"
          style={{ color: 'var(--classified-red)' }}
        >
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            WARNING
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div className="mt-2 text-xs">
            <div>THIS FILE CONTAINS ACTIVE THREAT INTELLIGENCE</div>
            <div>THE CALLER REMAINS UNIDENTIFIED</div>
            <div>THREAT STATUS: ONGOING</div>
          </div>
        </pre>
      </div>

      <Transcript>
        <div className="mb-2 text-xs tracking-wider" style={{ color: 'var(--classified-red)' }}>
          --- INTERCEPT: INCOMING CALL TO DCP LIU Kit-wing ---
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>DATE/TIME: 2015-12-15 23:47:00 HKT</div>
        <div style={{ color: 'var(--ghost-grey)' }}>CALLER: UNKNOWN — UNTRACEABLE</div>
        <div className="mb-3" style={{ color: 'var(--ghost-grey)' }}>DURATION: 1:23</div>
        <div className="mb-2 text-xs tracking-wider" style={{ color: 'var(--classified-red)' }}>
          [BEGIN TRANSCRIPT — PARTIAL]
        </div>
        <div className="mt-2 italic" style={{ color: 'var(--ghost-grey)' }}>
          <TS>[23:47:01]</TS> [PHONE RINGING]
        </div>
        <div className="mt-3">
          <TS>[23:47:03]</TS> <Speaker name="LIU" color="ice-white" />: &quot;喂。&quot;
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(Hello.)</div>
        <div className="mt-3">
          <TS>[23:47:04]</TS>{' '}
          <Speaker name="CALLER [DISTORTED/MASKED]" color="classified-red" />: 「劉處長，恭喜你。案子破了。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(Commissioner Liu, congratulations. Case closed.)</div>
        <div className="mt-2 italic" style={{ color: 'var(--ghost-grey)' }}>
          <TS>[23:47:07]</TS> [SILENCE — 0:03]
        </div>
        <div className="mt-2">
          <TS>[23:47:07]</TS> <Speaker name="LIU" color="ice-white" />: 「你是誰？」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(Who are you?)</div>
        <div className="mt-3">
          <TS>[23:47:10]</TS>{' '}
          <Speaker name="CALLER" color="classified-red" />: 「這不重要。重要的是——李家俊不能留在監獄裡。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          (That doesn&apos;t matter. What&apos;s important — Lee Ka-chun cannot stay in prison.)
        </div>
        <div className="mt-3">
          <TS>[23:47:15]</TS> <Speaker name="LIU" color="ice-white" />: "你是綁匪的同夥。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(You&apos;re an accomplice of the kidnappers.)</div>
        <div className="mt-3">
          <TS>[23:47:17]</TS>{' '}
          <Speaker name="CALLER [CHUCKLE]" color="classified-red" />: 「同夥？劉處長，你的眼界太小了。釋放李家俊。這不是建議，這是通知。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          (Accomplice? Commissioner Liu, your vision is too narrow. Release Lee Ka-chun. This is not
          a suggestion, this is a notice.)
        </div>
        <div className="mt-3">
          <TS>[23:47:24]</TS> <Speaker name="LIU" color="ice-white" />: "否則呢？」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(Or else?)</div>
        <div className="mt-3">
          <TS>[23:47:26]</TS>{' '}
          <Speaker name="CALLER" color="classified-red" />: 「你有一個妻子。一個女兒。
          <RedactedText label="家人詳細資料" reveal="Wife: HO Lai-ping. Daughter: LIU Yee, age 14. Address: [REDACTED]" />
          」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(You have a wife. A daughter. [REDACTED])</div>
        <div className="mt-3">
          <TS>[23:47:32]</TS>{' '}
          <Speaker name="LIU [VOICE CHANGES — COLD]" color="ice-white" />: 「你敢動她們一根頭髮——」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>(If you touch a single hair on their heads—)</div>
        <div className="mt-3">
          <TS>[23:47:35]</TS>{' '}
          <Speaker name="CALLER" color="classified-red" />: 「我不是在威脅你，劉處長。我是在告訴你規則。釋放李家俊。24小時。」
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>
          (I&apos;m not threatening you, Commissioner Liu. I&apos;m telling you the rules. Release Lee
          Ka-chun. 24 hours.)
        </div>
        <div className="mt-2 italic" style={{ color: 'var(--ghost-grey)' }}>
          <TS>[23:47:42]</TS> [LINE DISCONNECTED]
        </div>
        <div className="mt-3 text-xs tracking-wider" style={{ color: 'var(--classified-red)' }}>
          [END TRANSCRIPT]
        </div>
      </Transcript>

      {/* Critical Intelligence Assessment */}
      <div
        className="mt-6 rounded-sm border border-classified-red p-4"
        style={{ backgroundColor: 'rgba(220, 38, 38, 0.03)' }}
      >
        <div
          className="mb-4 border-b border-classified-red pb-2 font-mono text-xs font-bold tracking-wider"
          style={{ color: 'var(--classified-red)' }}
        >
          CRITICAL INTELLIGENCE ASSESSMENT — PHANTOM-7
        </div>
        <div className="font-mono text-sm leading-relaxed" style={{ color: 'var(--ice-white)' }}>
          <div className="mb-3 font-bold" style={{ color: 'var(--classified-red)' }}>
            THREAT ANALYSIS:
          </div>
          <div className="mb-4 space-y-2">
            <div>
              <span style={{ color: 'var(--alert-amber)' }}>1.</span> CALLER KNOWLEDGE LEVEL:{" "}
              <span className="font-bold" style={{ color: 'var(--classified-red)' }}>EXTREMELY HIGH</span>
              <div className="ml-4 mt-1 text-xs" style={{ color: 'var(--ghost-grey)' }}>
                <div>• Knew Liu was promoted to Commissioner (not yet public)</div>
                <div>• Knew Liu&apos;s family details</div>
                <div>• Knew Lee Ka-chun had been arrested</div>
                <div>• Timing: called immediately after arrest</div>
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--alert-amber)' }}>2.</span> CALLER CAPABILITIES:
              <div className="ml-4 mt-1 text-xs" style={{ color: 'var(--ghost-grey)' }}>
                <div>• Untraceable call (7-layer VPN, burner phone cascade)</div>
                <div>• Access to real-time police intelligence</div>
                <div>• Demonstrated capability for violence</div>
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--alert-amber)' }}>3.</span> IMPLICATIONS:
              <div className="ml-4 mt-1 text-xs" style={{ color: 'var(--ghost-grey)' }}>
                <div>• Lee Ka-chun is NOT the mastermind</div>
                <div>• A higher authority exists behind the conspiracy</div>
                <div>• This organization has penetrated senior police ranks</div>
                <div>• The operation was a test — or a first phase</div>
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--alert-amber)' }}>4.</span> ASSESSMENT:
            </div>
          </div>
          <div className="mb-3 text-xs leading-relaxed" style={{ color: 'var(--ice-white)' }}>
            The Cold War case is{' '}
            <span
              className="animate-pulse-warning font-bold"
              style={{ color: 'var(--classified-red)' }}
            >
              NOT CLOSED.
            </span>
          </div>
          <div className="text-xs" style={{ color: 'var(--ghost-grey)' }}>
            It has only revealed the surface of a much larger threat to Hong Kong&apos;s security
            infrastructure.
          </div>
          <div
            className="mt-3 font-bold"
            style={{ color: 'var(--classified-red)' }}
          >
            RECOMMENDATION: Immediate escalation to Command-level threat assessment.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── File 7: Force Hierarchy Analysis ────────────────────────────────
function ForceHierarchyContent() {
  return (
    <div>
      <DocHeader
        lines={[
          '═══════════════════════════════════════════════════════════════',
          'STRATEGIC ANALYSIS DIVISION — ORGANIZATIONAL VULNERABILITY REPORT',
          'FILE REF: STRAT-2015-1215-OVA',
          'STATUS: PARTIALLY REDACTED',
          '═══════════════════════════════════════════════════════════════',
        ]}
      />

      {/* Table 1: Command Chain Vulnerabilities */}
      <div className="mb-2 text-xs tracking-wider" style={{ color: 'var(--alert-amber)' }}>
        Table 1 — Command Chain Vulnerabilities:
      </div>
      <div className="mb-6 overflow-x-auto">
        <table className="w-full border-collapse font-mono text-xs">
          <thead>
            <tr style={{ backgroundColor: 'var(--steel-blue)' }}>
              <th className="border border-grid-blue px-2 py-1 text-left tracking-wider" style={{ color: 'var(--ice-white)' }}>
                POSITION
              </th>
              <th className="border border-grid-blue px-2 py-1 text-left tracking-wider" style={{ color: 'var(--ice-white)' }}>
                HOLDER
              </th>
              <th className="border border-grid-blue px-2 py-1 text-left tracking-wider" style={{ color: 'var(--ice-white)' }}>
                RISK LEVEL
              </th>
              <th className="border border-grid-blue px-2 py-1 text-left tracking-wider" style={{ color: 'var(--ice-white)' }}>
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>Commissioner</td>
              <td className="border border-grid-blue px-2 py-1 font-bold" style={{ color: 'var(--alert-amber)' }}>[VACANT]</td>
              <td className="border border-grid-blue px-2 py-1 font-bold" style={{ color: 'var(--classified-red)' }}>CRITICAL</td>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ghost-grey)' }}>Absent</td>
            </tr>
            <tr>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>DCP (Operations)</td>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>LEE Man-bun</td>
              <td className="border border-grid-blue px-2 py-1 font-bold" style={{ color: 'var(--alert-amber)' }}>HIGH</td>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--alert-amber)' }}>Compromised</td>
            </tr>
            <tr>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>DCP (Administration)</td>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>LIU Kit-wing</td>
              <td className="border border-grid-blue px-2 py-1 font-bold" style={{ color: 'var(--alert-amber)', opacity: 0.7 }}>MEDIUM</td>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--alert-amber)' }}>Targeted</td>
            </tr>
            <tr>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>SAC (Corporate Comm)</td>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>LEUNG Chi-mei</td>
              <td className="border border-grid-blue px-2 py-1 font-bold" style={{ color: 'var(--surveillance-green)' }}>LOW</td>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--surveillance-green)' }}>Secure</td>
            </tr>
            <tr>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>SSP (Operations)</td>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>KWONG Chi-lap</td>
              <td className="border border-grid-blue px-2 py-1 font-bold" style={{ color: 'var(--surveillance-green)' }}>LOW</td>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--alert-amber)' }}>Defected</td>
            </tr>
            <tr>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>SSP (Admin)</td>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>TSUI Wing-kei</td>
              <td className="border border-grid-blue px-2 py-1 font-bold" style={{ color: 'var(--alert-amber)' }}>HIGH</td>
              <td className="border border-grid-blue px-2 py-1 font-bold" style={{ color: 'var(--classified-red)' }}>[DECEASED/TRAITOR]</td>
            </tr>
            <tr>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>SDU Commander</td>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>SHEK Mai-go</td>
              <td className="border border-grid-blue px-2 py-1 font-bold" style={{ color: 'var(--alert-amber)' }}>HIGH</td>
              <td className="border border-grid-blue px-2 py-1 font-bold" style={{ color: 'var(--classified-red)' }}>[TRAITOR]</td>
            </tr>
            <tr>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>Vault Supervisor</td>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>NG Wai-lun</td>
              <td className="border border-grid-blue px-2 py-1 font-bold" style={{ color: 'var(--alert-amber)' }}>HIGH</td>
              <td className="border border-grid-blue px-2 py-1 font-bold" style={{ color: 'var(--classified-red)' }}>[DECEASED/TRAITOR]</td>
            </tr>
            <tr>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>ICAC Principal Inv.</td>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>CHEUNG Kwok</td>
              <td className="border border-grid-blue px-2 py-1 font-bold" style={{ color: 'var(--surveillance-green)' }}>LOW</td>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--surveillance-green)' }}>Independent</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table 2: Information Flow Map */}
      <div className="mb-2 text-xs tracking-wider" style={{ color: 'var(--alert-amber)' }}>
        Table 2 — Information Flow Map:
      </div>
      <div className="overflow-x-auto">
        <div className="mb-1 font-mono text-xs font-bold" style={{ color: 'var(--ice-white)' }}>
          LEAK VECTOR ANALYSIS
        </div>
        <table className="w-full border-collapse font-mono text-xs">
          <thead>
            <tr style={{ backgroundColor: 'var(--steel-blue)' }}>
              <th className="border border-grid-blue px-2 py-1 text-left tracking-wider" style={{ color: 'var(--ice-white)' }}>
                SOURCE → DESTINATION
              </th>
              <th className="border border-grid-blue px-2 py-1 text-left tracking-wider" style={{ color: 'var(--ice-white)' }}>
                CHANNEL
              </th>
              <th className="border border-grid-blue px-2 py-1 text-left tracking-wider" style={{ color: 'var(--ice-white)' }}>
                CONFIDENCE
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-grid-blue px-2 py-1">
                <RedactedText label="來源" reveal="SDU Command" /> → Kidnappers
              </td>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>Radio</td>
              <td className="border border-grid-blue px-2 py-1 font-bold" style={{ color: 'var(--surveillance-green)' }}>85%</td>
            </tr>
            <tr>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>
                Vault → Criminal Network
              </td>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>Physical</td>
              <td className="border border-grid-blue px-2 py-1 font-bold" style={{ color: 'var(--surveillance-green)' }}>90%</td>
            </tr>
            <tr>
              <td className="border border-grid-blue px-2 py-1">
                SDU → <RedactedText label="接收方" reveal="External Contractor" />
              </td>
              <td className="border border-grid-blue px-2 py-1" style={{ color: 'var(--ice-white)' }}>Digital</td>
              <td className="border border-grid-blue px-2 py-1 font-bold" style={{ color: 'var(--alert-amber)' }}>75%</td>
            </tr>
            <tr>
              <td className="border border-grid-blue px-2 py-1">
                <RedactedText label="來源" reveal="Police HQ" /> →{' '}
                <RedactedText label="接收方" reveal="Unknown Entity" />
              </td>
              <td className="border border-grid-blue px-2 py-1">
                <RedactedText label="渠道" reveal="Encrypted Satellite" />
              </td>
              <td className="border border-grid-blue px-2 py-1">
                <RedactedText label="置信度" reveal="60%" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── File 8: Phantom-7 Field Notes ───────────────────────────────────
function FieldNotesContent() {
  return (
    <div>
      <DocHeader
        lines={[
          '═══════════════════════════════════════════════════════════════',
          '[CLASSIFIED] FIELD NOTES — OPERATIVE PHANTOM-7',
          'FILE REF: PH7-FN-2015-CW',
          'STATUS: CONTAINS ACTIVE OPERATIONAL INTELLIGENCE',
          'THIS FILE IS NOT PART OF OFFICIAL RECORD',
          '═══════════════════════════════════════════════════════════════',
        ]}
      />

      <Transcript>
        <div className="mb-2 text-xs tracking-wider" style={{ color: 'var(--alert-amber)' }}>
          --- FIELD NOTE #001 ---
        </div>
        <div style={{ color: 'var(--ghost-grey)' }}>Date: December 16, 2015</div>
        <div className="mb-3" style={{ color: 'var(--ghost-grey)' }}>Location: Undisclosed</div>
        <div className="space-y-3" style={{ color: 'var(--ice-white)' }}>
          <p>
            I&apos;ve been observing this case from the shadows for 72 hours. The official reports tell
            one story. The truth is more complex.
          </p>
          <p>
            Liu Kit-wing is being promoted to Commissioner. The public narrative: hero who saved the
            force. The real narrative: survivor of an institutional coup that nearly destroyed
            everything.
          </p>
          <p>But the phone call changes everything.</p>
          <p>
            Whoever called Liu has power — real power. Not street-level criminal power. The kind of
            power that knows police promotions before they&apos;re announced. The kind of power that can
            threaten a Commissioner&apos;s family and make it sound routine.
          </p>
          <p>This is bigger than Hong Kong. I can feel it.</p>
        </div>

        <div className="mb-2 mt-6 text-xs tracking-wider" style={{ color: 'var(--alert-amber)' }}>
          --- FIELD NOTE #007 ---
        </div>
        <div className="mb-3" style={{ color: 'var(--ghost-grey)' }}>Date: December 18, 2015</div>
        <div className="space-y-3" style={{ color: 'var(--ice-white)' }}>
          <p>
            I&apos;ve accessed the national classified database. Cross-referencing the numeric pattern
            3333 with known criminal organization codes.
          </p>
          <p>
            Results:{" "}
            <RedactedText
              label="HIGHER CLEARANCE REQUIRED"
              reveal="[MATCH FOUND — SEE SUPPLEMENTARY FILE PH7-SUP-001]"
            />
          </p>
          <p>
            I need more time. And I need Command to know: this is not the end. This is the
            beginning.
          </p>
          <p>
            The safest city in Asia just had its security apparatus penetrated at every level. If it
            can happen here, it can happen anywhere.
          </p>
        </div>

        <div className="mb-2 mt-6 text-xs tracking-wider" style={{ color: 'var(--classified-red)' }}>
          --- FINAL NOTE ---
        </div>
        <div className="mb-3" style={{ color: 'var(--ghost-grey)' }}>Date: [CLASSIFIED]</div>
        <div className="space-y-3 font-sans" style={{ color: 'var(--ice-white)' }}>
          <p className="text-h3 font-semibold">長官，</p>
          <p>
            This dossier is my complete report. Every fact verified. Every angle examined. Every
            piece of evidence authenticated.
          </p>
          <p>
            But I leave you with one question that I cannot answer:
          </p>
          <p className="italic">
            In a war where you cannot see the enemy, where the battlefield is bureaucracy and the
            weapons are information — how do you fight?
          </p>
          <p>
            How do you defend an institution when the threat comes from within?
          </p>
          <p>
            I will continue my observation. I will continue my investigation. I am invisible, and
            that is my greatest weapon.
          </p>
          <p className="mt-4 italic">Your operative,</p>
          <p className="text-h2 font-mono font-bold" style={{ color: 'var(--steel-cyan)' }}>
            PHANTOM-7
          </p>
        </div>

        <div className="mt-4">
          <TS>═══════════════════════════════════════════════════════════════</TS>
        </div>
        <div className="mt-2 text-center text-xs tracking-wider" style={{ color: 'var(--surveillance-green)' }}>
          [END OF FIELD NOTES]
        </div>
        <div className="text-center text-xs tracking-wider" style={{ color: 'var(--surveillance-green)' }}>
          [TRANSMISSION COMPLETE]
        </div>
        <div className="text-center text-xs tracking-wider" style={{ color: 'var(--surveillance-green)' }}>
          [CHANNEL SECURE — NO BREACH DETECTED]
        </div>
        <div className="mt-2">
          <TS>═══════════════════════════════════════════════════════════════</TS>
        </div>
      </Transcript>
    </div>
  );
}

// ─── Status Icon Helper ──────────────────────────────────────────────
function StatusIcon({ status }: { status: EvidenceFile['status'] }) {
  if (status === 'declassified')
    return <Unlock className="h-3.5 w-3.5" style={{ color: 'var(--surveillance-green)' }} />;
  if (status === 'active-threat')
    return (
      <AlertTriangle className="h-3.5 w-3.5" style={{ color: 'var(--classified-red)' }} />
    );
  return <Lock className="h-3.5 w-3.5" style={{ color: 'var(--alert-amber)' }} />;
}

function StatusLabel({ status }: { status: EvidenceFile['status'] }) {
  if (status === 'declassified') return 'DECLASSIFIED';
  if (status === 'active-threat') return 'ACTIVE THREAT';
  return 'PARTIALLY REDACTED';
}

function StatusBadge({ status }: { status: EvidenceFile['status'] }) {
  const colors = {
    declassified: 'var(--surveillance-green)',
    redacted: 'var(--alert-amber)',
    'active-threat': 'var(--classified-red)',
  };
  return (
    <span
      className="inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 font-mono text-[10px] tracking-wider"
      style={{
        color: colors[status],
        border: `1px solid ${colors[status]}40`,
        backgroundColor: `${colors[status]}10`,
      }}
    >
      <StatusIcon status={status} />
      {StatusLabel({ status })}
    </span>
  );
}

// ─── Main Evidence Page Component ────────────────────────────────────
export default function Evidence() {
  const [activeFileId, setActiveFileId] = useState('ransom-demand');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const evidenceFiles: EvidenceFile[] = [
    {
      id: 'ransom-demand',
      filename: 'ransom-demand.txt',
      type: 'TEXT',
      size: '4KB',
      status: 'declassified',
      content: <RansomDemandContent />,
    },
    {
      id: 'bridge-shootout',
      filename: 'bridge-shootout.wav',
      type: 'AUDIO',
      size: '12MB',
      status: 'declassified',
      content: <BridgeShootoutContent />,
    },
    {
      id: 'icac-interrogation',
      filename: 'icac-interrogation.log',
      type: 'LOG',
      size: '156KB',
      status: 'declassified',
      content: <ICACInterrogationContent />,
    },
    {
      id: 'surveillance-transcript',
      filename: 'surveillance-transcript.txt',
      type: 'TEXT',
      size: '23KB',
      status: 'declassified',
      content: <SurveillanceContent />,
    },
    {
      id: 'vault-audit',
      filename: 'vault-audit-report.pdf',
      type: 'PDF',
      size: '1.2MB',
      status: 'redacted',
      content: <VaultAuditContent />,
    },
    {
      id: 'mystery-phone',
      filename: 'mystery-phone-call.wav',
      type: 'AUDIO',
      size: '8MB',
      status: 'redacted',
      content: <MysteryPhoneCallContent />,
    },
    {
      id: 'force-hierarchy',
      filename: 'force-hierarchy-analysis.xlsx',
      type: 'DATA',
      size: '450KB',
      status: 'redacted',
      content: <ForceHierarchyContent />,
    },
    {
      id: 'phantom7-notes',
      filename: 'phantom7-field-notes.txt',
      type: 'TEXT',
      size: '67KB',
      status: 'active-threat',
      content: <FieldNotesContent />,
    },
  ];

  const activeFile = evidenceFiles.find((f) => f.id === activeFileId) || evidenceFiles[0];

  const handleFileSelect = useCallback(
    (id: string) => {
      setActiveFileId(id);
      setMobileDrawerOpen(false);
    },
    []
  );

  // File type icon helper
  const FileTypeIcon = ({ type }: { type: EvidenceFile['type'] }) => {
    if (type === 'AUDIO') return <Headphones className="h-4 w-4 shrink-0" style={{ color: 'var(--steel-cyan)' }} />;
    return <FileText className="h-4 w-4 shrink-0" style={{ color: 'var(--ghost-grey)' }} />;
  };

  return (
    <div className="min-h-[100dvh]" style={{ backgroundColor: 'var(--void)' }}>
      {/* ── Section 1: Page Header ── */}
      <div className="px-4 pb-10 pt-24 lg:px-8" style={{ backgroundColor: 'var(--void)' }}>
        <div className="mx-auto max-w-[1280px]">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="mb-4 font-mono text-xs tracking-wider"
            style={{ color: 'var(--ghost-grey)' }}
          >
            PHANTOM-7 // BRIEFING &gt; EVIDENCE FILES
          </motion.div>

          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <h1 className="text-display-xl font-display" style={{ color: 'var(--ice-white)' }}>
              EVIDENCE FILES
            </h1>
            <div
              className="mt-1 font-sans text-lg font-medium tracking-wide"
              style={{ color: 'var(--ghost-grey)' }}
            >
              證據檔案
            </div>
            {/* Animated green underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
              className="mt-3 h-px w-64 origin-left"
              style={{ backgroundColor: 'var(--surveillance-green)' }}
            />
          </motion.div>

          {/* Report Metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-4 font-mono text-xs tracking-wider"
            style={{ color: 'var(--ghost-grey)' }}
          >
            DOC REF: CW-EVIDENCE-001 | FILES: 8 | TOTAL SIZE: 2.4GB | CLASSIFICATION: TOP SECRET
          </motion.div>

          {/* Page Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: easeOut }}
            className="mt-4 max-w-[640px] font-sans text-body"
            style={{ color: 'var(--ice-white)' }}
          >
            The following evidence files have been extracted from classified police databases, ICAC
            records, surveillance systems, and field intelligence. All files have been authenticated
            and verified.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6, ease: easeOut }}
            className="mt-2 max-w-[640px] font-sans text-sm"
            style={{ color: 'var(--ghost-grey)' }}
          >
            Redacted sections marked with [REDACTED] require Alpha clearance to declassify. Hover or
            scroll to reveal.
          </motion.p>

          {/* File Status Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="mt-6 flex flex-wrap items-center gap-4 font-mono text-xs tracking-wider"
          >
            <span className="flex items-center gap-1.5" style={{ color: 'var(--ice-white)' }}>
              <FileText className="h-3.5 w-3.5" />
              8 FILES
            </span>
            <span style={{ color: 'var(--grid-blue)' }}>|</span>
            <span className="flex items-center gap-1.5" style={{ color: 'var(--surveillance-green)' }}>
              <Unlock className="h-3.5 w-3.5" />4 DECLASSIFIED
            </span>
            <span style={{ color: 'var(--grid-blue)' }}>|</span>
            <span className="flex items-center gap-1.5" style={{ color: 'var(--alert-amber)' }}>
              <Lock className="h-3.5 w-3.5" />4 PARTIALLY REDACTED
            </span>
            <span style={{ color: 'var(--grid-blue)' }}>|</span>
            <span className="flex items-center gap-1.5" style={{ color: 'var(--classified-red)' }}>
              <AlertTriangle className="h-3.5 w-3.5" />1 ACTIVE THREAT
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Section 2: File Browser ── */}
      <div
        className="border-t border-grid-blue px-4 py-6 lg:px-8"
        style={{ backgroundColor: 'var(--midnight)' }}
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="flex gap-0 overflow-hidden rounded-sm border border-grid-blue">
            {/* ── Left Sidebar ── */}
            <div
              className="hidden w-[30%] shrink-0 border-r border-grid-blue md:block"
              style={{
                backgroundColor: 'var(--steel-blue)',
                maxHeight: '70vh',
                overflowY: 'auto',
              }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-2"
              >
                {evidenceFiles.map((file) => (
                  <motion.button
                    key={file.id}
                    variants={itemVariants}
                    onClick={() => handleFileSelect(file.id)}
                    className="flex w-full items-center gap-3 border-b border-grid-blue px-3 py-2.5 text-left transition-colors duration-200"
                    style={{
                      backgroundColor:
                        activeFileId === file.id ? 'var(--midnight)' : 'transparent',
                      borderLeft:
                        activeFileId === file.id
                          ? '3px solid var(--steel-cyan)'
                          : '3px solid transparent',
                    }}
                    whileHover={{ backgroundColor: 'rgba(10, 15, 30, 0.5)' }}
                  >
                    <FileTypeIcon type={file.type} />
                    <div className="min-w-0 flex-1">
                      <div
                        className="truncate font-mono text-xs"
                        style={{ color: 'var(--ice-white)' }}
                      >
                        {file.filename}
                      </div>
                      <div className="truncate font-mono text-[10px]" style={{ color: 'var(--ghost-grey)' }}>
                        {file.type} // {file.size}
                      </div>
                    </div>
                    <StatusIcon status={file.status} />
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* ── Mobile File Selector ── */}
            <div className="w-full border-b border-grid-blue p-3 md:hidden" style={{ backgroundColor: 'var(--steel-blue)' }}>
              <button
                onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
                className="flex w-full items-center justify-between rounded-sm border border-grid-blue px-3 py-2"
                style={{ backgroundColor: 'var(--midnight)' }}
              >
                <div className="flex items-center gap-2">
                  <FileTypeIcon type={activeFile.type} />
                  <span className="font-mono text-xs" style={{ color: 'var(--ice-white)' }}>
                    {activeFile.filename}
                  </span>
                </div>
                <span className="font-mono text-lg" style={{ color: 'var(--ghost-grey)' }}>
                  {mobileDrawerOpen ? '−' : '+'}
                </span>
              </button>
              <AnimatePresence>
                {mobileDrawerOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-1 overflow-hidden"
                  >
                    {evidenceFiles.map((file) => (
                      <button
                        key={file.id}
                        onClick={() => handleFileSelect(file.id)}
                        className="flex w-full items-center gap-3 border-b border-grid-blue px-3 py-2.5 text-left"
                        style={{
                          backgroundColor:
                            activeFileId === file.id ? 'var(--midnight)' : 'transparent',
                        }}
                      >
                        <FileTypeIcon type={file.type} />
                        <span className="font-mono text-xs" style={{ color: 'var(--ice-white)' }}>
                          {file.filename}
                        </span>
                        <StatusIcon status={file.status} />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Right Panel ── */}
            <div
              className="min-w-0 flex-1"
              style={{ backgroundColor: 'var(--void)' }}
            >
              {/* Window Chrome */}
              <div
                className="flex items-center justify-between border-b border-grid-blue px-3 py-2"
                style={{ backgroundColor: 'var(--steel-blue)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'var(--classified-red)' }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'var(--alert-amber)' }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'var(--surveillance-green)' }} />
                  <span
                    className="ml-2 hidden font-mono text-[10px] tracking-wider sm:inline"
                    style={{ color: 'var(--ghost-grey)' }}
                  >
                    PHANTOM-7 SECURE VIEWER
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="font-mono text-[10px] tracking-wider" style={{ color: 'var(--ghost-grey)' }}>
                    FILE: <span style={{ color: 'var(--ice-white)' }}>{activeFile.filename}</span>
                  </div>
                  <div className="hidden font-mono text-[10px] tracking-wider sm:block" style={{ color: 'var(--ghost-grey)' }}>
                    STATUS: <StatusBadge status={activeFile.status} />
                  </div>
                  <div className="hidden font-mono text-[10px] tracking-wider lg:block" style={{ color: 'var(--ghost-grey)' }}>
                    SIZE: <span style={{ color: 'var(--ice-white)' }}>{activeFile.size}</span>
                  </div>
                  <div className="hidden items-center gap-1 sm:flex">
                    <Minus className="h-3 w-3 cursor-default" style={{ color: 'var(--ghost-grey)' }} />
                    <Square className="h-3 w-3 cursor-default" style={{ color: 'var(--ghost-grey)' }} />
                    <X className="h-3 w-3 cursor-default" style={{ color: 'var(--ghost-grey)' }} />
                  </div>
                </div>
              </div>

              {/* File Content */}
              <div
                ref={headerRef}
                className="max-h-[70vh] overflow-y-auto p-4 sm:p-6 lg:p-8"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFileId}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {activeFile.content}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom padding for scroll */}
      <div className="h-16" style={{ backgroundColor: 'var(--midnight)' }} />
    </div>
  );
}
