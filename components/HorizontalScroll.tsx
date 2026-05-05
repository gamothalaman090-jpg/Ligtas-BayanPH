"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    index: "01", title: "NFC OFFLINE PROTOCOL",
    description: "Critical patient data retrieved from a passive NFC sticker — no app, no signal, no problem.",
    label: "ZERO-INTERNET", accent: "#10b981", accentAlpha: "rgba(16,185,129,0.15)", accentBorder: "rgba(16,185,129,0.4)",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=700&h=500&q=85&auto=format&fit=crop",
    tags: [
      { text: "OFFLINE MODE", sub: "No signal required", x: "6%", y: "10%", rotate: -4 },
      { text: "NFC TAG", sub: "ISO 14443-A", x: "52%", y: "6%", rotate: 3 },
      { text: "PATIENT ID", sub: "Hash: 0xA3F2...", x: "10%", y: "52%", rotate: -3 },
    ],
  },
  {
    index: "02", title: "AI TRIAGE ENGINE",
    description: "Decision-tree logic assigns Red, Yellow, or Green priority in seconds — removing bias from every call.",
    label: "AI-POWERED", accent: "#ef4444", accentAlpha: "rgba(239,68,68,0.15)", accentBorder: "rgba(239,68,68,0.4)",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=700&h=500&q=85&auto=format&fit=crop",
    tags: [
      { text: "● RED ZONE", sub: "Priority: CRITICAL", x: "6%", y: "10%", rotate: -5 },
      { text: "● YELLOW ZONE", sub: "Priority: URGENT", x: "50%", y: "6%", rotate: 4 },
      { text: "TRIAGE SCORE", sub: "Decision Tree v2.1", x: "10%", y: "52%", rotate: -3 },
    ],
  },
  {
    index: "03", title: "MESH NETWORK SYNC",
    description: "Peer-to-peer sync pushes every queued offline record to the LGU Command Center the moment signal returns.",
    label: "MESH-SYNC", accent: "#f59e0b", accentAlpha: "rgba(245,158,11,0.15)", accentBorder: "rgba(245,158,11,0.4)",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&h=500&q=85&auto=format&fit=crop",
    tags: [
      { text: "NODE ALPHA", sub: "Barangay 04 ● Live", x: "6%", y: "10%", rotate: -4 },
      { text: "P2P UPLINK", sub: "BT5 / WiFi Direct", x: "50%", y: "7%", rotate: 3 },
      { text: "RECORDS SYNCED", sub: "247 / 247 ✓", x: "10%", y: "52%", rotate: -5 },
    ],
  },
  {
    index: "04", title: "LGU COMMAND CENTER",
    description: "Officials see a live heatmap of casualties, resource gaps, and facility status — all synced from the field.",
    label: "COMMAND-READY", accent: "#6366f1", accentAlpha: "rgba(99,102,241,0.15)", accentBorder: "rgba(99,102,241,0.4)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=500&q=85&auto=format&fit=crop",
    tags: [
      { text: "HEATMAP ZONE 3", sub: "47 casualties", x: "6%", y: "10%", rotate: -5 },
      { text: "ACTIVE TEAMS", sub: "12 responders live", x: "50%", y: "7%", rotate: 4 },
      { text: "DISPATCH", sub: "Caloocan → MOA", x: "9%", y: "52%", rotate: -3 },
    ],
  },
  {
    index: "05", title: "FAMILY HEALTH VAULT",
    description: "Store histories, track vitals, check drug interactions, and access first aid — all offline, all in one place.",
    label: "FAMILY-FIRST", accent: "#ec4899", accentAlpha: "rgba(236,72,153,0.15)", accentBorder: "rgba(236,72,153,0.4)",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&h=500&q=85&auto=format&fit=crop",
    tags: [
      { text: "VITALS LOG", sub: "Updated: Today", x: "8%", y: "10%", rotate: -4 },
      { text: "DRUG CHECK", sub: "Amoxicillin ↔ Aspirin", x: "48%", y: "7%", rotate: 3 },
      { text: "FAMILY PROFILES", sub: "5 members secured", x: "10%", y: "52%", rotate: -5 },
    ],
  },
];

const CARD_W = 460;
const SPACER_L = 440;
const SPACER_R = 240;
const TOTAL_W = panels.length * CARD_W + SPACER_L + SPACER_R;

// ─── Desktop: GSAP horizontal scroll ────────────────────────────────────────
function DesktopScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      // Initial dim state — inside context so ctx.revert() cleans up properly
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, {
          filter: i === 0 ? "brightness(1) saturate(1)" : "brightness(0.3) saturate(0.25)",
          scale: i === 0 ? 1 : 0.94,
          opacity: i === 0 ? 1 : 0.45,
        });
      });

      gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1.4,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (progressFillRef.current) progressFillRef.current.style.width = `${p * 100}%`;
            const idx = Math.min(Math.floor(p * panels.length), panels.length - 1);
            setActiveIndex(idx);
            cardRefs.current.forEach((card, i) => {
              if (!card) return;
              const isActive = i === idx;
              gsap.to(card, {
                filter: isActive ? "brightness(1) saturate(1)" : "brightness(0.3) saturate(0.25)",
                scale: isActive ? 1 : 0.94,
                opacity: isActive ? 1 : 0.45,
                duration: 0.55,
                ease: "power2.out",
                overwrite: "auto",
              });
            });
          },
        },
      });
    });

    return () => ctx.revert();
  }, []);


  return (
    <div ref={sectionRef} className="relative bg-[#050505] overflow-hidden">
      <div className="absolute inset-y-0 left-0 z-20 flex flex-col justify-center pointer-events-none px-8 md:px-16">
        <p className="text-white/25 text-[9px] tracking-[0.35em] uppercase font-mono mb-4">Ligtas-Bayan / Core Systems</p>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white">FIVE<br />SYSTEMS.</h2>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white/20 mt-1">ONE<br />PROTOCOL.</h2>
        <p className="text-white/30 text-xs mt-6 max-w-[170px] leading-relaxed font-light">Scroll through each capability.</p>
      </div>

      <div ref={trackRef} className="flex items-stretch h-screen will-change-transform" style={{ width: `${TOTAL_W}px` }}>
        <div className="flex-shrink-0" style={{ width: `${SPACER_L}px` }} />
        {panels.map((panel, pIdx) => (
          <div key={panel.index} className="flex-shrink-0 h-full flex items-center pr-4 py-8" style={{ width: `${CARD_W}px` }}>
            <CardInner panel={panel} cardRef={(el) => { cardRefs.current[pIdx] = el; }} />
          </div>
        ))}
        <div className="flex-shrink-0" style={{ width: `${SPACER_R}px` }} />
      </div>

      <div className="absolute bottom-7 left-8 md:left-16 right-8 md:right-16 z-20 flex items-center gap-5">
        <div className="flex-1 h-[2px] bg-white/[0.07] rounded-full overflow-hidden">
          <div ref={progressFillRef} className="h-full rounded-full" style={{ width: "0%", background: `linear-gradient(to right, ${panels[activeIndex]?.accent ?? "#10b981"}, rgba(255,255,255,0.4))`, transition: "background 0.5s ease" }} />
        </div>
        <span className="text-white/25 text-[10px] font-mono tracking-[0.2em] tabular-nums flex-shrink-0">{String(activeIndex + 1).padStart(2, "0")} / 05</span>
        <div className="flex items-center gap-2 flex-shrink-0">
          {panels.map((p, i) => (
            <div key={i} className="rounded-full transition-all duration-300" style={{ width: i === activeIndex ? "18px" : "5px", height: "5px", background: i === activeIndex ? p.accent : "rgba(255,255,255,0.15)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Mobile: vertical swipe deck ─────────────────────────────────────────────
function MobileScroll() {
  return (
    <div className="bg-[#050505] px-4 py-12">
      <div className="mb-8">
        <p className="text-white/25 text-[9px] tracking-[0.35em] uppercase font-mono mb-3">Ligtas-Bayan / Core Systems</p>
        <h2 className="text-4xl font-black tracking-tighter leading-[0.9] text-white">FIVE SYSTEMS.</h2>
        <h2 className="text-4xl font-black tracking-tighter leading-[0.9] text-white/20">ONE PROTOCOL.</h2>
      </div>
      <div className="flex flex-col gap-5">
        {panels.map((panel) => (
          <CardInner key={panel.index} panel={panel} mobile />
        ))}
      </div>
    </div>
  );
}

// ─── Shared card component ───────────────────────────────────────────────────
function CardInner({
  panel,
  cardRef,
  mobile = false,
}: {
  panel: typeof panels[0];
  cardRef?: (el: HTMLDivElement | null) => void;
  mobile?: boolean;
}) {
  return (
    <div
      ref={cardRef}
      className={`relative rounded-3xl overflow-hidden flex flex-col ${mobile ? "w-full" : "w-full h-[80vh]"}`}
      style={{
        background: "#0a0a0b",
        border: `1px solid ${panel.accentBorder}`,
        boxShadow: `0 24px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)`,
        ...(mobile ? {} : { transformOrigin: "center center" }),
      }}
    >
      {/* Image area */}
      <div className="relative overflow-hidden" style={{ flex: mobile ? "0 0 240px" : "0 0 62%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={panel.image} alt={panel.title} className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.55) saturate(0.7)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to top, #0a0a0b, transparent)" }} />
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[8px] tracking-[0.3em] uppercase font-mono text-white/30">BUILT IN LIGTAS-BAYAN</span>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[11px] tracking-[0.2em] font-mono font-bold" style={{ color: panel.accent }}>{panel.index}</span>
        </div>
        {panel.tags.map((tag, tIdx) => (
          <div
            key={tIdx}
            className="absolute z-10 px-2.5 py-1.5 rounded-xl pointer-events-none"
            style={{ left: tag.x, top: tag.y, transform: `rotate(${tag.rotate}deg)`, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }}
          >
            <p className="text-[8px] font-bold uppercase tracking-widest leading-none" style={{ color: panel.accent }}>{tag.text}</p>
            {tag.sub && <p className="text-[7px] text-white/40 font-mono mt-0.5 leading-none">{tag.sub}</p>}
          </div>
        ))}
      </div>

      {/* Card body */}
      <div className="flex flex-col justify-between flex-1 px-5 pt-3 pb-5">
        <div>
          <h3 className="text-xl md:text-2xl font-black tracking-tighter leading-tight text-white mb-2">{panel.title}</h3>
          <p className="text-white/45 text-xs leading-relaxed font-light">{panel.description}</p>
        </div>
        <div className="flex items-center justify-between pt-4 mt-3 border-t border-white/[0.07]">
          <span className="text-[9px] tracking-[0.3em] uppercase font-mono font-bold" style={{ color: panel.accent }}>{panel.label}</span>
          <div className="w-8 h-8 rounded-full border flex items-center justify-center" style={{ background: panel.accentAlpha, borderColor: panel.accentBorder }}>
            <div className="w-2 h-2 rounded-full" style={{ background: panel.accent }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Responsive wrapper ───────────────────────────────────────────────────────
export default function HorizontalScroll() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Render nothing until we know the viewport (prevents SSR hydration mismatch
  // which causes GSAP's removeChild error when switching between layouts)
  if (isMobile === null) {
    return (
      <div
        id="tech-showcase"
        className="bg-[#050505]"
        style={{ minHeight: "100svh" }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div id="tech-showcase">
      {isMobile ? <MobileScroll /> : <DesktopScroll />}
    </div>
  );
}
