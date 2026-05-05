"use client";

import { useState, useEffect } from "react";
import { Activity, WifiOff, Users, Map, X, Wifi, CheckCircle } from "lucide-react";

type TriageStep = "idle" | "scanning" | "patient_found" | "triage_complete";
type TriageTag = "RED" | "YELLOW" | "GREEN" | "BLACK";

const TAG_CONFIG: Record<TriageTag, { label: string; desc: string; color: string; bg: string; border: string }> = {
  RED:    { label: "Immediate", desc: "Life-threatening — treat first", color: "#ef4444", bg: "bg-[#ef4444]", border: "border-[#ef4444]" },
  YELLOW: { label: "Delayed",   desc: "Serious but stable", color: "#f59e0b", bg: "bg-[#f59e0b]", border: "border-[#f59e0b]" },
  GREEN:  { label: "Minor",     desc: "Walking wounded — treat last", color: "#10b981", bg: "bg-[#10b981]", border: "border-[#10b981]" },
  BLACK:  { label: "Deceased",  desc: "No pulse — do not resuscitate", color: "#6b7280", bg: "bg-gray-600", border: "border-gray-600" },
};

const MOCK_PATIENT = {
  name: "Ricardo Santos",
  age: 54,
  bloodType: "B+",
  allergies: ["Penicillin"],
  conditions: ["Hypertension", "Diabetes"],
  emergencyContact: "Ana Santos — +63 917 555 0123",
  nfcId: "NFC-0042-PH-MANILA",
};

export default function ResponderDashboard() {
  const [step, setStep] = useState<TriageStep>("idle");
  const [selectedTag, setSelectedTag] = useState<TriageTag | null>(null);
  const [scanPulse, setScanPulse] = useState(0);

  // Simulate NFC scan progress
  useEffect(() => {
    if (step !== "scanning") return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScanPulse(0);
    const interval = setInterval(() => {
      setScanPulse((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep("patient_found"), 400);
          return 100;
        }
        return p + 4;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [step]);

  const reset = () => { setStep("idle"); setSelectedTag(null); setScanPulse(0); };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 md:py-12">
      {/* Header */}
      <div className="mb-10 border-b border-white/10 pb-6 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
            <p className="text-[#f59e0b] text-xs font-mono uppercase tracking-widest">Responder Active</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight">Field Operations</h1>
        </div>
        {step !== "idle" && (
          <button onClick={reset} className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors cursor-pointer border border-white/10 rounded-full px-4 py-2">
            <X className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      {/* ─── IDLE: Primary Action ─── */}
      {step === "idle" && (
        <>
          <div className="mb-10">
            <button
              onClick={() => setStep("scanning")}
              className="w-full bg-[#ef4444] text-white p-12 rounded-[2rem] shadow-[0_0_40px_rgba(239,68,68,0.3)] hover:shadow-[0_0_60px_rgba(239,68,68,0.5)] hover:scale-[1.02] transition-all duration-300 flex flex-col items-center justify-center group border border-[#ef4444]/50 cursor-pointer"
            >
              <Activity className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest">Start Triage Session</h2>
              <p className="text-white/70 mt-2 font-mono text-sm">Initiate NFC Scanner &amp; Offline AI</p>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-3xl flex items-start justify-between border-[#f59e0b]/20 bg-[#f59e0b]/5">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Sync Queue</p>
                <h3 className="text-4xl font-light text-[#f59e0b]">14</h3>
                <p className="text-[10px] text-white/40 uppercase tracking-widest mt-2">Waiting for connection</p>
              </div>
              <div className="bg-[#f59e0b]/20 p-3 rounded-full">
                <WifiOff className="w-6 h-6 text-[#f59e0b]" />
              </div>
            </div>
            <div className="glass-panel p-6 rounded-3xl flex items-start justify-between">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Scanned Today</p>
                <h3 className="text-4xl font-light">42</h3>
                <p className="text-[10px] text-white/40 uppercase tracking-widest mt-2">Shift: 08:00 – 20:00</p>
              </div>
              <div className="bg-white/5 p-3 rounded-full">
                <Users className="w-6 h-6 text-white/60" />
              </div>
            </div>
            <button
              onClick={() => {}}
              className="glass-panel p-6 rounded-3xl flex flex-col justify-between hover:bg-white/5 transition-colors group text-left min-h-[140px] cursor-pointer"
            >
              <div className="flex justify-between items-start w-full">
                <p className="text-white/50 text-xs uppercase tracking-widest">Quick Access</p>
                <Map className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-medium group-hover:translate-x-1 transition-transform">Casualty Heatmap</h3>
            </button>
          </div>
        </>
      )}

      {/* ─── SCANNING ─── */}
      {step === "scanning" && (
        <div className="flex flex-col items-center justify-center py-20 gap-10">
          <div className="relative flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute rounded-full border border-[#ef4444]/40 animate-ping"
                style={{ width: 80 + i * 60, height: 80 + i * 60, animationDelay: `${i * 0.3}s`, animationDuration: "1.5s" }}
              />
            ))}
            <div className="w-20 h-20 rounded-full bg-[#ef4444]/20 border border-[#ef4444]/50 flex items-center justify-center z-10">
              <Wifi className="w-8 h-8 text-[#ef4444]" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-xl font-medium tracking-tight mb-1">Scanning NFC…</p>
            <p className="text-white/40 font-mono text-sm">Hold device near patient wristband</p>
          </div>
          <div className="w-full max-w-sm">
            <div className="flex justify-between text-xs text-white/40 font-mono mb-2">
              <span>Reading signal</span><span>{scanPulse}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5">
              <div className="h-full bg-[#ef4444] rounded-full transition-all duration-100" style={{ width: `${scanPulse}%` }} />
            </div>
          </div>
          <button onClick={reset} className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer uppercase tracking-widest">
            Cancel
          </button>
        </div>
      )}

      {/* ─── PATIENT FOUND ─── */}
      {step === "patient_found" && !selectedTag && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <p className="text-[#10b981] text-xs font-mono uppercase tracking-widest">NFC Read Successful — {MOCK_PATIENT.nfcId}</p>
          </div>

          {/* Patient Card */}
          <div className="glass-panel rounded-3xl p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono mb-1">Patient</p>
                <h2 className="text-3xl font-medium tracking-tight">{MOCK_PATIENT.name}</h2>
                <p className="text-white/50 text-sm mt-1">Age {MOCK_PATIENT.age} · Blood Type <span className="text-white font-medium">{MOCK_PATIENT.bloodType}</span></p>
              </div>
              <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <p className="text-xs font-mono text-white/60">ID: {MOCK_PATIENT.nfcId.split("-")[1]}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-2xl p-4">
                <p className="text-[10px] uppercase tracking-widest text-[#ef4444] font-mono mb-2">Allergies</p>
                <p className="text-sm text-white">{MOCK_PATIENT.allergies.join(", ")}</p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono mb-2">Conditions</p>
                <p className="text-sm text-white">{MOCK_PATIENT.conditions.join(", ")}</p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono mb-2">Emergency Contact</p>
                <p className="text-sm text-white">{MOCK_PATIENT.emergencyContact}</p>
              </div>
            </div>
          </div>

          {/* Triage Tag Selector */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono mb-4">Assign Triage Tag</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(Object.keys(TAG_CONFIG) as TriageTag[]).map((tag) => {
                const cfg = TAG_CONFIG[tag];
                return (
                  <button
                    key={tag}
                    onClick={() => { setSelectedTag(tag); setStep("triage_complete"); }}
                    className={`p-5 rounded-2xl border-2 ${cfg.border} bg-transparent hover:opacity-90 transition-all duration-200 text-center cursor-pointer group`}
                    style={{ background: `${cfg.color}15` }}
                  >
                    <div className="w-8 h-8 rounded-full mx-auto mb-3 group-hover:scale-110 transition-transform" style={{ background: cfg.color }} />
                    <p className="font-bold text-sm uppercase tracking-wider" style={{ color: cfg.color }}>{tag}</p>
                    <p className="text-[10px] text-white/40 mt-1">{cfg.label}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─── TRIAGE COMPLETE ─── */}
      {step === "triage_complete" && selectedTag && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="glass-panel rounded-3xl p-6 md:p-8 border-2" style={{ borderColor: TAG_CONFIG[selectedTag].color }}>
            <div className="flex items-center gap-4 mb-6">
              <CheckCircle className="w-8 h-8" style={{ color: TAG_CONFIG[selectedTag].color }} />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Triage Complete</p>
                <h2 className="text-2xl font-medium">{MOCK_PATIENT.name}</h2>
              </div>
              <div className="ml-auto px-6 py-3 rounded-xl text-base font-bold uppercase tracking-widest" style={{ background: `${TAG_CONFIG[selectedTag].color}25`, color: TAG_CONFIG[selectedTag].color, border: `1px solid ${TAG_CONFIG[selectedTag].color}50` }}>
                {selectedTag} — {TAG_CONFIG[selectedTag].label}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-2xl overflow-hidden border border-white/10 mb-6" style={{ height: 260 }}>
              <svg width="100%" height="100%" viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg" className="bg-[#0c1020]">
                {/* Grid */}
                {Array.from({ length: 16 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 53} y1="0" x2={i * 53} y2="260" stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1" />
                ))}
                {Array.from({ length: 6 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 52} x2="800" y2={i * 52} stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1" />
                ))}
                {/* Roads */}
                <line x1="0" y1="130" x2="800" y2="130" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="3" />
                <line x1="400" y1="0" x2="400" y2="260" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="3" />
                <line x1="0" y1="65" x2="800" y2="65" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1.5" />
                <line x1="0" y1="195" x2="800" y2="195" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1.5" />
                <line x1="200" y1="0" x2="200" y2="260" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1.5" />
                <line x1="600" y1="0" x2="600" y2="260" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1.5" />
                {/* Zone labels */}
                {[["Barangay 1", 100, 40], ["Barangay 2", 300, 40], ["Barangay 3", 500, 40], ["Barangay 4", 700, 40]].map(([label, x, y]) => (
                  <text key={label as string} x={x} y={y} textAnchor="middle" fill="white" fillOpacity="0.2" fontSize="10" fontFamily="monospace">{label}</text>
                ))}
                {/* Heatmap zones */}
                <ellipse cx="220" cy="110" rx="70" ry="50" fill="#ef4444" fillOpacity="0.2" />
                <ellipse cx="440" cy="160" rx="90" ry="60" fill="#f59e0b" fillOpacity="0.15" />
                <ellipse cx="650" cy="90" rx="60" ry="40" fill="#10b981" fillOpacity="0.15" />
                {/* Patient PIN */}
                <circle cx="220" cy="108" r="10" fill={TAG_CONFIG[selectedTag].color} fillOpacity="0.9" />
                <circle cx="220" cy="108" r="16" fill={TAG_CONFIG[selectedTag].color} fillOpacity="0.2" />
                <circle cx="220" cy="108" r="22" fill={TAG_CONFIG[selectedTag].color} fillOpacity="0.1" />
                <text x="220" y="136" textAnchor="middle" fill="white" fillOpacity="0.7" fontSize="9" fontFamily="monospace">PATIENT</text>
                {/* Responder Indicator */}
                <circle cx="350" cy="150" r="6" fill="#3b82f6" />
                <circle cx="350" cy="150" r="12" fill="#3b82f6" fillOpacity="0.2" />
                <text x="350" y="170" textAnchor="middle" fill="white" fillOpacity="0.5" fontSize="9" fontFamily="monospace">YOU</text>
                {/* Compass */}
                <text x="760" y="25" fill="white" fillOpacity="0.3" fontSize="12" fontFamily="monospace">N</text>
                <text x="753" y="16" fill="white" fillOpacity="0.3" fontSize="8" fontFamily="monospace">▲</text>
                {/* Scale bar */}
                <line x1="30" y1="240" x2="130" y2="240" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
                <text x="80" y="255" textAnchor="middle" fill="white" fillOpacity="0.3" fontSize="8" fontFamily="monospace">500m</text>
              </svg>
            </div>

            <p className="text-xs text-white/40 font-mono text-center">
              Record saved offline · Sync queue: 15 records pending
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => { setSelectedTag(null); setStep("scanning"); }}
              className="py-4 rounded-2xl bg-[#ef4444] text-white font-semibold text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform cursor-pointer"
            >
              Scan Next Patient
            </button>
            <button onClick={reset} className="py-4 rounded-2xl border border-white/10 text-white/60 font-semibold text-sm uppercase tracking-widest hover:bg-white/5 transition-colors cursor-pointer">
              End Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
