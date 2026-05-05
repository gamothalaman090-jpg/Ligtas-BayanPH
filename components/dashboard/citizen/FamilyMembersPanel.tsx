"use client";

import { useState } from "react";
import { X, Plus, Heart, AlertTriangle, User } from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age: string;
  bloodType: string;
  status: "synced" | "pending" | "offline";
}

const MOCK_MEMBERS: FamilyMember[] = [
  { id: "1", name: "Maria Clara dela Cruz", relationship: "Spouse", age: "38", bloodType: "O+", status: "synced" },
  { id: "2", name: "Jose dela Cruz Jr.", relationship: "Son", age: "14", bloodType: "A+", status: "synced" },
  { id: "3", name: "Lola Inez dela Cruz", relationship: "Mother", age: "71", bloodType: "B-", status: "pending" },
];

const STATUS_STYLES: Record<FamilyMember["status"], string> = {
  synced: "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/30",
  pending: "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/30",
  offline: "text-white/40 bg-white/5 border-white/10",
};

interface Props { onClose: () => void; }

export default function FamilyMembersPanel({ onClose }: Props) {
  const [members, setMembers] = useState<FamilyMember[]>(MOCK_MEMBERS);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", relationship: "", age: "", bloodType: "" });

  const handleAdd = () => {
    if (!form.name.trim()) return;
    setMembers((prev) => [
      ...prev,
      { id: Date.now().toString(), ...form, status: "pending" as const },
    ]);
    setForm({ name: "", relationship: "", age: "", bloodType: "" });
    setShowAdd(false);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-full max-w-xl bg-[#0a0a0a] border-l border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/40 font-mono mb-1">Family Network</p>
            <h2 className="text-lg font-semibold tracking-tight">Linked Members</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="w-11 h-11 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-colors border border-white/10 cursor-pointer flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats bar */}
        <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex gap-6">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-white/30 font-mono">Members</p>
            <p className="text-2xl font-light text-white">{members.length}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-widest text-white/30 font-mono">Synced</p>
            <p className="text-2xl font-light text-[#10b981]">{members.filter((m) => m.status === "synced").length}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-widest text-white/30 font-mono">Pending</p>
            <p className="text-2xl font-light text-[#f59e0b]">{members.filter((m) => m.status === "pending").length}</p>
          </div>
        </div>

        {/* Member List */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
          {members.map((m) => (
            <div key={m.id} className="glass-panel p-5 rounded-2xl flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white/40" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="font-medium text-sm text-white truncate">{m.name}</p>
                  <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border font-mono ${STATUS_STYLES[m.status]}`}>
                    {m.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <span>{m.relationship}</span>
                  <span className="w-px h-3 bg-white/20" />
                  <span>Age {m.age}</span>
                  <span className="w-px h-3 bg-white/20" />
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-[#ef4444]" />{m.bloodType}</span>
                </div>
              </div>
              <button className="p-2 text-white/20 hover:text-[#ef4444] transition-colors cursor-pointer">
                <AlertTriangle className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Add Form */}
          {showAdd && (
            <div className="glass-panel p-5 rounded-2xl border-dashed border-white/20 space-y-3">
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono">New Member</p>
              <input
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
              />
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Relationship"
                  value={form.relationship}
                  onChange={(e) => setForm((p) => ({ ...p, relationship: e.target.value }))}
                  className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={form.age}
                  onChange={(e) => setForm((p) => ({ ...p, age: e.target.value }))}
                  className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
                <select
                  value={form.bloodType}
                  onChange={(e) => setForm((p) => ({ ...p, bloodType: e.target.value }))}
                  className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
                >
                  <option value="" className="bg-[#0a0a0a]">Blood</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((b) => (
                    <option key={b} value={b} className="bg-[#0a0a0a]">{b}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button onClick={handleAdd} className="flex-1 py-2.5 bg-white text-black rounded-xl text-xs font-semibold uppercase tracking-widest hover:scale-[1.02] transition-transform cursor-pointer">
                  Add Member
                </button>
                <button onClick={() => setShowAdd(false)} className="px-4 py-2.5 border border-white/10 rounded-xl text-xs text-white/40 hover:text-white transition-colors cursor-pointer">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-white/10 bg-[#050505]/50">
          {!showAdd && (
            <button
              onClick={() => setShowAdd(true)}
              className="w-full py-4 rounded-xl text-sm font-semibold uppercase tracking-widest border border-white/10 hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-center gap-2 text-white"
            >
              <Plus className="w-4 h-4" /> Add Family Member
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
