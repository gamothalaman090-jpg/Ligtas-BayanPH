"use client";

import { useState, useEffect } from "react";
import { Map, Database, RadioTower, X, AlertTriangle, Users, Clock, Activity, ShieldCheck } from "lucide-react";

interface IncidentLog {
  id: string;
  time: string;
  barangay: string;
  type: string;
  severity: "RED" | "YELLOW" | "GREEN";
}

interface Responder {
  id: string;
  name: string;
  role: string;
  barangay: string;
  scanned: number;
  status: "active" | "standby" | "offline";
}

const LOGS: IncidentLog[] = [
  { id: "1", time: "11:42", barangay: "Brgy. Poblacion", type: "Cardiac arrest reported", severity: "RED" },
  { id: "2", time: "11:38", barangay: "Brgy. San Jose", type: "Mass casualty — 12 injured", severity: "RED" },
  { id: "3", time: "11:31", barangay: "Brgy. Bagong Silang", type: "Flood surge — evacuation ongoing", severity: "YELLOW" },
  { id: "4", time: "11:20", barangay: "Brgy. Sta. Cruz", type: "Medical supplies request", severity: "YELLOW" },
  { id: "5", time: "11:05", barangay: "Brgy. Caloocan Norte", type: "Road cleared — safe passage", severity: "GREEN" },
  { id: "6", time: "10:58", barangay: "Brgy. Mapalad", type: "17 evacuees received", severity: "GREEN" },
  { id: "7", time: "10:43", barangay: "Brgy. San Miguel", type: "Downed power line reported", severity: "RED" },
];

const RESPONDERS: Responder[] = [
  { id: "1", name: "PO2 Reyes, A.", role: "Police", barangay: "Brgy. Poblacion", scanned: 18, status: "active" },
  { id: "2", name: "BHW Valdez, L.", role: "Barangay HW", barangay: "Brgy. San Jose", scanned: 24, status: "active" },
  { id: "3", name: "EMT Cruz, D.", role: "Emergency Med", barangay: "Brgy. Bagong Silang", scanned: 9, status: "active" },
  { id: "4", name: "Tanod Bautista, M.", role: "Tanod", barangay: "Brgy. Sta. Cruz", scanned: 5, status: "standby" },
  { id: "5", name: "BHW Santos, R.", role: "Barangay HW", barangay: "Brgy. Mapalad", scanned: 0, status: "offline" },
];

const SEV_STYLE: Record<string, string> = {
  RED: "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/30",
  YELLOW: "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/30",
  GREEN: "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/30",
};



// Auto-scrolling ticker
function IncidentTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % LOGS.length), 2800);
    return () => clearInterval(t);
  }, []);
  const log = LOGS[idx];
  return (
    <div className="flex items-center gap-3 text-xs font-mono overflow-hidden">
      <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border flex-shrink-0 ${SEV_STYLE[log.severity]}`}>{log.severity}</span>
      <span className="text-white/30">{log.time}</span>
      <span className="text-white/60">{log.barangay}</span>
      <span className="text-white/40">—</span>
      <span className="text-white/80 truncate">{log.type}</span>
    </div>
  );
}

export default function LguDashboard() {
  const [showBroadcast, setShowBroadcast] = useState(false);
  const [broadcastText, setBroadcastText] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleBroadcast = () => {
    if (!broadcastText.trim()) return;
    setBroadcastSent(true);
    setTimeout(() => { setBroadcastSent(false); setBroadcastText(""); setShowBroadcast(false); }, 2500);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">

        {/* Header */}
        <div className="mb-6 border-b border-white/10 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
                <p className="text-[#ef4444] text-xs font-mono uppercase tracking-widest">Command Center Active</p>
                <span className="text-white/20 text-xs font-mono">|</span>
                <Clock className="w-3 h-3 text-white/30" />
                <p className="text-white/30 text-xs font-mono" id="lgu-time">
                  {new Date().toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              <h1 className="text-3xl md:text-5xl font-medium tracking-tight">LGU Overview</h1>
              <p className="text-white/40 text-sm mt-1 font-light">Marikina City · Disaster Response Operations</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#10b981]/10 border border-[#10b981]/20 rounded-full">
                <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                <span className="text-[#10b981] text-xs font-mono uppercase tracking-wider">System Online</span>
              </div>
              <button
                onClick={() => setShowBroadcast(true)}
                className="bg-[#ef4444] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-[#dc2626] transition-colors flex items-center gap-2 min-h-[44px] cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.3)]"
              >
                <RadioTower className="w-4 h-4" /> Broadcast Alert
              </button>
            </div>
          </div>

          {/* Ticker */}
          <div className="mt-4 bg-[#ef4444]/5 border border-[#ef4444]/20 rounded-xl px-4 py-2.5 flex items-center gap-3">
            <span className="text-[9px] uppercase tracking-widest text-[#ef4444] font-mono flex-shrink-0">Live</span>
            <div className="w-px h-3 bg-white/20" />
            <IncidentTicker />
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Critical", value: "42", color: "#ef4444", icon: AlertTriangle },
            { label: "Urgent", value: "108", color: "#f59e0b", icon: Activity },
            { label: "Stable", value: "450", color: "#10b981", icon: ShieldCheck },
            { label: "Active Staff", value: "24", color: "white", icon: Users },
          ].map(({ label, value, color, icon: Icon }) => (
            <div key={label} className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono mb-1">{label}</p>
                <p className="text-3xl font-light" style={{ color }}>{value}</p>
              </div>
              <Icon className="w-5 h-5 opacity-30" style={{ color }} />
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Heatmap — col span 2 */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="glass-panel p-5 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Map className="w-4 h-4 text-white/40" />
                  <h2 className="text-base font-medium">Casualty Heatmap — Marikina City</h2>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono text-white/30 uppercase tracking-wider">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#ef4444] inline-block" />Critical</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#f59e0b] inline-block" />Urgent</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#10b981] inline-block" />Stable</span>
                </div>
              </div>

              {/* SVG Map */}
              <div className="rounded-2xl overflow-hidden border border-white/5" style={{ height: 360 }}>
                <svg width="100%" height="100%" viewBox="0 0 900 360" xmlns="http://www.w3.org/2000/svg" className="bg-[#080d18]">
                  {/* Grid */}
                  {Array.from({ length: 19 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="360" stroke="#ffffff" strokeOpacity="0.03" strokeWidth="1" />
                  ))}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 50} x2="900" y2={i * 50} stroke="#ffffff" strokeOpacity="0.03" strokeWidth="1" />
                  ))}

                  {/* Major roads */}
                  <line x1="0" y1="180" x2="900" y2="180" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="4" />
                  <line x1="450" y1="0" x2="450" y2="360" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="4" />
                  <line x1="0" y1="90" x2="900" y2="90" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="2" />
                  <line x1="0" y1="270" x2="900" y2="270" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="2" />
                  <line x1="225" y1="0" x2="225" y2="360" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="2" />
                  <line x1="675" y1="0" x2="675" y2="360" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="2" />

                  {/* River */}
                  <path d="M0,230 Q150,210 300,250 Q450,290 600,240 Q750,200 900,220" stroke="#1e40af" strokeOpacity="0.5" strokeWidth="12" fill="none" />
                  <text x="280" y="275" fill="#3b82f6" fillOpacity="0.4" fontSize="9" fontFamily="monospace">Marikina River</text>

                  {/* Barangay zones */}
                  {[
                    { label: "Brgy. Poblacion", x: 112, y: 80 },
                    { label: "Brgy. San Jose", x: 337, y: 80 },
                    { label: "Brgy. Bagong Silang", x: 562, y: 80 },
                    { label: "Brgy. Sta. Cruz", x: 787, y: 80 },
                    { label: "Brgy. Mapalad", x: 112, y: 310 },
                    { label: "Brgy. Caloocan Norte", x: 337, y: 310 },
                    { label: "Brgy. San Miguel", x: 562, y: 310 },
                    { label: "Brgy. Bagumbayan", x: 787, y: 310 },
                  ].map(({ label, x, y }) => (
                    <text key={label} x={x} y={y} textAnchor="middle" fill="white" fillOpacity="0.18" fontSize="9" fontFamily="monospace">{label}</text>
                  ))}

                  {/* Heatmap blobs — RED */}
                  <ellipse cx="220" cy="150" rx="80" ry="55" fill="#ef4444" fillOpacity="0.25" />
                  <ellipse cx="220" cy="150" rx="45" ry="30" fill="#ef4444" fillOpacity="0.35" />
                  <ellipse cx="560" cy="310" rx="65" ry="40" fill="#ef4444" fillOpacity="0.2" />

                  {/* YELLOW */}
                  <ellipse cx="440" cy="190" rx="90" ry="60" fill="#f59e0b" fillOpacity="0.18" />
                  <ellipse cx="700" cy="130" rx="70" ry="45" fill="#f59e0b" fillOpacity="0.15" />

                  {/* GREEN */}
                  <ellipse cx="750" cy="290" rx="55" ry="35" fill="#10b981" fillOpacity="0.18" />
                  <ellipse cx="120" cy="300" rx="60" ry="35" fill="#10b981" fillOpacity="0.15" />

                  {/* Responder dots */}
                  {[
                    { x: 220, y: 148, color: "#ef4444", label: "R1" },
                    { x: 370, y: 175, color: "#f59e0b", label: "R2" },
                    { x: 555, y: 308, color: "#ef4444", label: "R3" },
                    { x: 700, y: 128, color: "#f59e0b", label: "R4" },
                    { x: 120, y: 298, color: "#10b981", label: "R5" },
                  ].map(({ x, y, color, label }) => (
                    <g key={label}>
                      <circle cx={x} cy={y} r="12" fill={color} fillOpacity="0.15" />
                      <circle cx={x} cy={y} r="6" fill={color} fillOpacity="0.9" />
                      <text x={x} y={y - 14} textAnchor="middle" fill="white" fillOpacity="0.6" fontSize="8" fontFamily="monospace">{label}</text>
                    </g>
                  ))}

                  {/* Compass */}
                  <text x="870" y="28" fill="white" fillOpacity="0.3" fontSize="13" fontFamily="monospace">N</text>
                  <text x="866" y="18" fill="white" fillOpacity="0.3" fontSize="9" fontFamily="monospace">▲</text>
                  {/* Scale */}
                  <line x1="30" y1="340" x2="130" y2="340" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
                  <line x1="30" y1="335" x2="30" y2="345" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
                  <line x1="130" y1="335" x2="130" y2="345" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
                  <text x="80" y="355" textAnchor="middle" fill="white" fillOpacity="0.3" fontSize="8" fontFamily="monospace">1 km</text>
                </svg>
              </div>
            </div>

            {/* Incident Log */}
            <div className="glass-panel p-5 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-medium">Incident Log</h2>
                <span className="text-[10px] text-white/30 font-mono uppercase tracking-wider">Live Feed</span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {LOGS.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
                    <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border flex-shrink-0 font-mono ${SEV_STYLE[log.severity]}`}>
                      {log.severity}
                    </span>
                    <span className="text-white/30 text-xs font-mono flex-shrink-0">{log.time}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/70 font-medium">{log.type}</p>
                      <p className="text-[10px] text-white/30 font-mono">{log.barangay}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Sync Status */}
            <div className="glass-panel p-6 rounded-3xl border-[#10b981]/20 bg-[#10b981]/5">
              <div className="flex justify-between items-start mb-4">
                <Database className="w-6 h-6 text-[#10b981]" />
                <span className="text-[9px] text-[#10b981] uppercase tracking-widest border border-[#10b981]/30 px-2 py-1 rounded-full font-mono">System Online</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono mb-1">Total Synced Records</p>
              <p className="text-4xl font-light text-[#10b981] mb-1">1,248</p>
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Across {RESPONDERS.filter((r) => r.status !== "offline").length} Responders</p>
            </div>

            {/* Active Responders */}
            <div className="glass-panel p-5 rounded-3xl flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium uppercase tracking-wider text-white/70">Active Responders</h2>
                <Users className="w-4 h-4 text-white/30" />
              </div>
              <div className="space-y-3">
                {RESPONDERS.map((r) => (
                  <div key={r.id} className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${r.status === "active" ? "bg-[#10b981] shadow-[0_0_6px_#10b981]" : r.status === "standby" ? "bg-[#f59e0b]" : "bg-white/20"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">{r.name}</p>
                      <p className="text-[10px] text-white/30 font-mono">{r.barangay}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-light text-white">{r.scanned}</p>
                      <p className="text-[9px] text-white/30 font-mono">scanned</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Broadcast Modal */}
      {showBroadcast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#0a0a0a] border border-[#ef4444]/30 rounded-2xl overflow-hidden shadow-2xl shadow-[#ef4444]/10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <RadioTower className="w-5 h-5 text-[#ef4444]" />
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-[#ef4444] font-mono mb-0.5">Emergency Broadcast</p>
                  <h2 className="text-lg font-semibold">Issue Alert to All Responders</h2>
                </div>
              </div>
              <button onClick={() => setShowBroadcast(false)} className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer border border-white/10">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono block mb-2">Alert Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "ADVISORY", color: "#10b981", bg: "bg-[#10b981]/10", border: "border-[#10b981]/30" },
                    { label: "WARNING", color: "#f59e0b", bg: "bg-[#f59e0b]/10", border: "border-[#f59e0b]/30" },
                    { label: "CRITICAL", color: "#ef4444", bg: "bg-[#ef4444]/10", border: "border-[#ef4444]/30" },
                  ].map(({ label, color, bg, border }) => (
                    <button key={label} className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border ${bg} ${border} cursor-pointer hover:opacity-80 transition-opacity`} style={{ color }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono block mb-2">Message</label>
                <textarea
                  value={broadcastText}
                  onChange={(e) => setBroadcastText(e.target.value)}
                  placeholder="Enter emergency message to broadcast to all active responders…"
                  rows={4}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>
              <button
                onClick={handleBroadcast}
                className={`w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                  broadcastSent
                    ? "bg-[#10b981] text-white"
                    : "bg-[#ef4444] text-white hover:bg-[#dc2626] shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                }`}
              >
                {broadcastSent ? "✓ Broadcast Sent to 24 Responders" : <><RadioTower className="w-4 h-4" /> Send Broadcast</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
