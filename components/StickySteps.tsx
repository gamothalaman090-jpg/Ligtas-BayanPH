"use client";

import { useState } from "react";
import { Wifi, Activity, GitBranch } from "lucide-react";


const steps = [
  {
    index: "01",
    verb: "SCAN.",
    tagline: "Pull the record. No internet.",
    description:
      "A responder taps the patient's NFC sticker with any modern phone. In under a second, the full medical ID — blood type, allergies, prior conditions — is displayed locally, with zero connectivity.",
    icon: Wifi,
    accent: "#10b981",
    accentAlpha: "rgba(16,185,129,0.12)",
    screen: {
      title: "NFC READ COMPLETE",
      subtitle: "Patient record loaded offline",
      tag: "OFFLINE MODE / NFC",
      badge: "● SIGNAL-FREE",
      badgeColor: "#10b981",
      rows: [
        { label: "Name", value: "Juan dela Cruz", highlight: false },
        { label: "Blood Type", value: "O+ Rh Positive", highlight: false },
        { label: "Allergies", value: "Penicillin, Aspirin", highlight: false },
        { label: "Conditions", value: "Hypertension, T2D", highlight: false },
        { label: "Emergency Contact", value: "+63 917 *** 4821", highlight: false },
      ],
      panels: ["NFC TAP", "LOCAL CACHE", "DISPLAY"],
      activePanel: 0,
    },
  },
  {
    index: "02",
    verb: "TRIAGE.",
    tagline: "AI sorts priority. No bias.",
    description:
      "The app's decision-tree AI evaluates vitals and medical history, then assigns a triage colour in real-time — Red for critical, Yellow for urgent, Green for stable. No manual judgement needed under pressure.",
    icon: Activity,
    accent: "#ef4444",
    accentAlpha: "rgba(239,68,68,0.12)",
    screen: {
      title: "TRIAGE ASSESSMENT",
      subtitle: "AI priority classification active",
      tag: "AI DECISION TREE / v2.1",
      badge: "● CRITICAL — RED",
      badgeColor: "#ef4444",
      rows: [
        { label: "Heart Rate", value: "128 bpm ▲ HIGH", highlight: false },
        { label: "Blood Pressure", value: "82/50 mmHg ▼ LOW", highlight: false },
        { label: "SpO₂", value: "91% ▼ LOW", highlight: false },
        { label: "GCS Score", value: "11 / 15", highlight: false },
        { label: "Priority", value: "RED — IMMEDIATE", highlight: true },
      ],
      panels: ["VITALS", "AI SCORE", "ASSIGN"],
      activePanel: 1,
    },
  },
  {
    index: "03",
    verb: "SYNC.",
    tagline: "Data flows when signal returns.",
    description:
      "Once any connection is restored — WiFi, cellular, or even a hotspot — all queued offline records push automatically to the LGU Command Center. Officials see a live casualty heatmap without a single manual upload.",
    icon: GitBranch,
    accent: "#6366f1",
    accentAlpha: "rgba(99,102,241,0.12)",
    screen: {
      title: "MESH SYNC COMPLETE",
      subtitle: "Records uploaded to LGU Command",
      tag: "P2P UPLINK / BARANGAY 04",
      badge: "● SYNCED — 247 RECORDS",
      badgeColor: "#6366f1",
      rows: [
        { label: "Records Synced", value: "247 / 247 ✓", highlight: true },
        { label: "Destination", value: "LGU Command Center", highlight: true },
        { label: "Uplink Mode", value: "WiFi Direct / BT5", highlight: false },
        { label: "Casualties Mapped", value: "47 (Zone 3)", highlight: false },
        { label: "Facility Alert", value: "PGH — 92% Capacity", highlight: false },
      ],
      panels: ["QUEUE", "UPLINK", "HEATMAP"],
      activePanel: 2,
    },
  },
];

type Step = typeof steps[0];

function MockScreen({ step }: { step: Step }) {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: "rgba(14,14,16,0.9)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: `1px solid ${step.accent}45`,
        boxShadow: `0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 60px ${step.accentAlpha}`,
      }}
    >
      {/* Browser bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]/50" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-md px-3 py-1 text-[10px] text-white/25 font-mono text-center">
            ligtas-bayan.app / field-responder
          </div>
        </div>
        <span className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded" style={{ background: step.accentAlpha, color: step.accent }}>LIVE</span>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/20 font-mono">{step.screen.tag}</span>
          <span className="text-[9px] font-bold tracking-wider" style={{ color: step.screen.badgeColor }}>{step.screen.badge}</span>
        </div>
        <h4 className="text-xl md:text-2xl font-black tracking-tighter text-white leading-tight mb-1">{step.screen.title}</h4>
        <p className="text-white/30 text-xs mb-4">{step.screen.subtitle}</p>

        {/* Pipeline */}
        <div className="flex items-center gap-2 mb-4">
          {step.screen.panels.map((p, pi) => (
            <div key={pi} className="flex items-center gap-2 flex-1">
              <div className="flex-1 rounded-lg px-2 py-1.5 text-center text-[8px] font-bold uppercase tracking-widest"
                style={{
                  background: pi === step.screen.activePanel ? step.accentAlpha : "rgba(255,255,255,0.03)",
                  border: `1px solid ${pi === step.screen.activePanel ? step.accent + "55" : "rgba(255,255,255,0.06)"}`,
                  color: pi === step.screen.activePanel ? step.accent : "rgba(255,255,255,0.2)",
                }}>
                {p}
              </div>
              {pi < step.screen.panels.length - 1 && <span className="text-white/10 text-xs">›</span>}
            </div>
          ))}
        </div>

        {/* Data rows */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          {step.screen.rows.map((row, ri) => (
            <div key={ri} className="flex items-center justify-between px-3 py-2.5 border-b border-white/[0.03] last:border-b-0"
              style={{ background: ri % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent" }}>
              <span className="text-[9px] text-white/30 font-mono uppercase tracking-wider">{row.label}</span>
              <span className="text-[10px] font-semibold" style={{ color: row.highlight ? step.accent : "rgba(255,255,255,0.65)" }}>{row.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 h-[2px] rounded-full" style={{ background: `linear-gradient(to right, ${step.accent}, transparent)` }} />
      </div>
    </div>
  );
}

// ─── Desktop: hover-driven two-column layout ─────────────────────────────────
function DesktopLayout() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-2 gap-16 items-start">
      {/* LEFT: Step cards */}
      <div className="flex flex-col gap-5">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === active;
          return (
            <div
              key={i}
              onMouseEnter={() => setActive(i)}
              className="glass-panel rounded-2xl p-7 cursor-pointer select-none"
              style={{
                border: `1px solid ${isActive ? step.accent + "55" : "rgba(255,255,255,0.07)"}`,
                opacity: isActive ? 1 : 0.4,
                transition: "opacity 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
                boxShadow: isActive ? `0 0 40px ${step.accentAlpha}` : "none",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[9px] tracking-[0.35em] uppercase font-mono text-white/25">STEP {step.index}</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
                <Icon className="w-4 h-4" style={{ color: step.accent }} />
              </div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-2">{step.verb}</h3>
              <p className="text-sm font-semibold mb-3" style={{ color: step.accent }}>{step.tagline}</p>
              <p className="text-white/40 text-sm leading-relaxed font-light">{step.description}</p>
            </div>
          );
        })}
      </div>

      {/* RIGHT: Sticky mockup — swaps on hover */}
      <div className="sticky top-28 h-fit">
        <div className="relative">
          {/* Invisible spacer keeps column height stable */}
          <div className="invisible pointer-events-none" aria-hidden="true"><MockScreen step={steps[0]} /></div>
          {steps.map((step, i) => {
            const isActive = i === active;
            return (
              <div
                key={i}
                className="absolute inset-0 w-full"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0px) scale(1)" : "translateY(14px) scale(0.97)",
                  transition: "opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <MockScreen step={step} />
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}

// ─── Mobile: clean numbered step list ────────────────────────────────────────
function MobileLayout() {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <div key={i} className="flex gap-4 pb-10 last:pb-0 relative">
            {/* Vertical connector line */}
            {i < steps.length - 1 && (
              <div
                className="absolute left-[22px] top-12 w-px"
                style={{
                  height: "calc(100% - 28px)",
                  background: `linear-gradient(to bottom, ${step.accent}50, transparent)`,
                }}
              />
            )}

            {/* Step number circle */}
            <div
              className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-black text-xs tracking-widest z-10"
              style={{
                background: step.accentAlpha,
                border: `1px solid ${step.accent}60`,
                color: step.accent,
              }}
            >
              {step.index}
            </div>

            {/* Step content */}
            <div className="flex-1 pt-1.5">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: step.accent }} />
                <span className="text-[9px] tracking-[0.3em] uppercase font-mono text-white/30">
                  {step.tagline}
                </span>
              </div>
              <h3
                className="text-3xl font-black tracking-tighter text-white leading-none mb-3"
              >
                {step.verb}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed font-light">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}


// ─── Root component ───────────────────────────────────────────────────────────
export default function StickySteps() {
  return (
    <section id="how-it-works" className="relative bg-[#050505] border-t border-white/[0.05] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="mb-12 md:mb-20">
          <p className="text-white/25 text-[9px] tracking-[0.35em] uppercase font-mono mb-4">Ligtas-Bayan / Workflow</p>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.88] text-white mb-5">
            RESPOND<br />
            <span className="text-white/20">LIKE YOU</span><br />
            TRAINED.
          </h2>
          <p className="text-white/40 text-sm md:text-base max-w-sm font-light leading-relaxed">
            Three steps. Every scenario. The system guides responders without a single moment of hesitation.
          </p>
        </div>

        {/* Responsive layout split */}
        <div className="md:hidden"><MobileLayout /></div>
        <div className="hidden md:block"><DesktopLayout /></div>
      </div>
    </section>
  );
}
