import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface LocationData {
  nameCn: string;
  nameEn: string;
  description: string;
  coordinates: string;
  isRedacted: boolean;
}

const locations: LocationData[] = [
  {
    nameCn: '警務處總部',
    nameEn: 'Hong Kong Police Headquarters',
    description:
      'The command center where the power struggle unfolded. High-level meetings, impeachment vote, final confrontation.',
    coordinates: '22.2842°N, 114.1636°E',
    isRedacted: false,
  },
  {
    nameCn: '天橋交火點',
    nameEn: 'The Exchange Bridge',
    description:
      'Where Liu Kit-wing delivered the ransom and Senior Superintendent Tsui made the ultimate sacrifice.',
    coordinates: '[REDACTED]',
    isRedacted: true,
  },
  {
    nameCn: '天台對峙點',
    nameEn: 'The Rooftop',
    description:
      'Final confrontation. Lee Ka-chun arrested. But the phone call proved the nightmare continues.',
    coordinates: '[REDACTED]',
    isRedacted: true,
  },
];

export default function LocationCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('.location-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full py-24" style={{ backgroundColor: '#0a0f1e' }}>
      <div className="mx-auto max-w-[1280px] px-4 lg:px-8">
        {/* Section label */}
        <p className="text-center font-mono text-label tracking-wider text-ghost-grey mb-12">
          [ KEY LOCATIONS ]
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((loc, index) => (
            <div
              key={index}
              className="location-card rounded-sm p-6 relative overflow-hidden group"
              style={{
                backgroundColor: '#141e33',
                border: '1px solid #1a2744',
                opacity: 0,
              }}
            >
              {/* Hover border glow */}
              <div
                className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ border: '1px solid rgba(56, 189, 248, 0.3)' }}
              />

              {/* Pin icon */}
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={14} className="text-classified-red" />
                <span className="text-h3 font-sans text-ice-white">
                  {loc.nameCn}
                </span>
              </div>

              {/* English name */}
              <p className="font-mono text-caption tracking-wider text-ghost-grey mb-4">
                {loc.nameEn}
              </p>

              {/* Description */}
              <p className="text-body font-sans text-ice-white mb-6">
                {loc.description}
              </p>

              {/* Coordinates */}
              <div className="pt-4 border-t border-grid-blue">
                <span className="font-mono text-[10px] tracking-wider text-ghost-grey">
                  [ COORDINATES:{` `}
                  {loc.isRedacted ? (
                    <span className="relative inline-block cursor-help group/redact">
                      <span className="text-ghost-grey">{loc.coordinates}</span>
                      <span className="absolute left-0 top-0 w-full h-full bg-black flex items-center justify-center group-hover/redact:opacity-0 transition-opacity duration-200">
                        <span className="text-classified-red text-[0.55em] tracking-wider">[REDACTED]</span>
                      </span>
                    </span>
                  ) : (
                    <span className="text-steel-cyan">{loc.coordinates}</span>
                  )} ]
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
