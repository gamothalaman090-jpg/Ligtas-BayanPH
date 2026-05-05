"use client";

import { useState, useEffect } from "react";
import { X, ChevronRight, Tag, Check } from "lucide-react";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const CONDITIONS = ["Diabetes", "Hypertension", "Heart Disease", "Asthma", "Epilepsy", "Kidney Disease", "Cancer", "Stroke"];

interface MedicalIdData {
  fullName: string;
  dob: string;
  bloodType: string;
  allergies: string[];
  medications: string;
  emergencyName: string;
  emergencyPhone: string;
  conditions: string[];
  organDonor: boolean;
  isPWD: boolean;
}

const STORAGE_KEY = "ligtas_medical_id";
const EMPTY: MedicalIdData = {
  fullName: "", dob: "", bloodType: "", allergies: [],
  medications: "", emergencyName: "", emergencyPhone: "",
  conditions: [], organDonor: false, isPWD: false,
};

function computeProgress(d: MedicalIdData): number {
  let filled = 0;
  const total = 8;
  if (d.fullName.trim()) filled++;
  if (d.dob) filled++;
  if (d.bloodType) filled++;
  if (d.allergies.length > 0) filled++;
  if (d.medications.trim()) filled++;
  if (d.emergencyName.trim()) filled++;
  if (d.emergencyPhone.trim()) filled++;
  if (d.conditions.length > 0) filled++;
  return Math.round((filled / total) * 100);
}

interface Props { onClose: () => void; onSave: (pct: number) => void; }

export default function MedicalIdPanel({ onClose, onSave }: Props) {
  const [data, setData] = useState<MedicalIdData>(EMPTY);
  const [allergyInput, setAllergyInput] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setData(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const update = (partial: Partial<MedicalIdData>) =>
    setData((prev) => ({ ...prev, ...partial }));

  const addAllergy = () => {
    const val = allergyInput.trim();
    if (val && !data.allergies.includes(val)) {
      update({ allergies: [...data.allergies, val] });
    }
    setAllergyInput("");
  };

  const toggleCondition = (c: string) => {
    update({
      conditions: data.conditions.includes(c)
        ? data.conditions.filter((x) => x !== c)
        : [...data.conditions, c],
    });
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    const pct = computeProgress(data);
    onSave(pct);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const pct = computeProgress(data);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-xl bg-[#0a0a0a] border-l border-white/10 flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/40 font-mono mb-1">Medical ID</p>
            <h2 className="text-lg font-semibold tracking-tight">Edit Your Profile</h2>
          </div>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-white/10 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Completeness</span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-white">{pct}%</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${pct}%`,
                background: pct >= 80 ? "#10b981" : pct >= 50 ? "#f59e0b" : "#ef4444"
              }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Basic Info */}
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-mono mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={data.fullName}
                  onChange={(e) => update({ fullName: e.target.value })}
                  placeholder="Juan dela Cruz"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Date of Birth</label>
                  <input
                    type="date"
                    value={data.dob}
                    onChange={(e) => update({ dob: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">Blood Type</label>
                  <select
                    value={data.bloodType}
                    onChange={(e) => update({ bloodType: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
                  >
                    <option value="" className="bg-[#0a0a0a]">Select…</option>
                    {BLOOD_TYPES.map((b) => (
                      <option key={b} value={b} className="bg-[#0a0a0a]">{b}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Allergies */}
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-mono mb-4">Known Allergies</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={allergyInput}
                onChange={(e) => setAllergyInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addAllergy()}
                placeholder="e.g. Penicillin, Shellfish…"
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
              />
              <button onClick={addAllergy} className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
                <Tag className="w-4 h-4" />
              </button>
            </div>
            {data.allergies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.allergies.map((a) => (
                  <button
                    key={a}
                    onClick={() => update({ allergies: data.allergies.filter((x) => x !== a) })}
                    className="px-3 py-1.5 bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] text-xs rounded-full flex items-center gap-1.5 hover:bg-[#ef4444]/20 transition-colors cursor-pointer"
                  >
                    {a} <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Medications */}
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-mono mb-4">Current Medications</h3>
            <textarea
              value={data.medications}
              onChange={(e) => update({ medications: e.target.value })}
              placeholder="List medications, dosages, and frequency…"
              rows={3}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
            />
          </section>

          {/* Conditions */}
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-mono mb-4">Pre-existing Conditions</h3>
            <div className="grid grid-cols-2 gap-2">
              {CONDITIONS.map((c) => {
                const active = data.conditions.includes(c);
                return (
                  <button
                    key={c}
                    onClick={() => toggleCondition(c)}
                    className={`px-4 py-3 rounded-xl text-xs font-medium text-left flex items-center gap-2 transition-all cursor-pointer border ${
                      active
                        ? "bg-white/10 border-white/30 text-white"
                        : "bg-white/[0.02] border-white/5 text-white/40 hover:border-white/20 hover:text-white/70"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-colors ${active ? "bg-white border-white" : "border-white/20"}`}>
                      {active && <Check className="w-2.5 h-2.5 text-black" />}
                    </div>
                    {c}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Emergency Contact */}
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-mono mb-4">Emergency Contact</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={data.emergencyName}
                onChange={(e) => update({ emergencyName: e.target.value })}
                placeholder="Contact full name"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
              />
              <input
                type="tel"
                value={data.emergencyPhone}
                onChange={(e) => update({ emergencyPhone: e.target.value })}
                placeholder="+63 9XX XXX XXXX"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </section>

          {/* Toggles */}
          <section>
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-mono mb-4">Special Flags</h3>
            <div className="space-y-3">
              {[
                { key: "organDonor", label: "Organ Donor", desc: "Consent for organ donation in case of brain death" },
                { key: "isPWD", label: "Person with Disability (PWD)", desc: "Flag for priority evacuation and assistance" },
              ].map(({ key, label, desc }) => {
                const val = data[key as keyof MedicalIdData] as boolean;
                return (
                  <button
                    key={key}
                    onClick={() => update({ [key]: !val })}
                    className="w-full flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/15 transition-colors cursor-pointer text-left"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{label}</p>
                      <p className="text-xs text-white/40 mt-0.5">{desc}</p>
                    </div>
                    <div className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${val ? "bg-white" : "bg-white/10"}`}>
                      <div className={`w-5 h-5 bg-black rounded-full mt-0.5 transition-transform shadow ${val ? "translate-x-5.5 ml-0.5" : "translate-x-0.5 ml-0.5"}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Spacer */}
          <div className="h-4" />
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-white/10 bg-[#050505]/50">
          <button
            onClick={handleSave}
            className={`w-full py-4 rounded-xl text-sm font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
              saved
                ? "bg-[#10b981] text-white"
                : "bg-white text-black hover:scale-[1.02]"
            }`}
          >
            {saved ? (
              <><Check className="w-4 h-4" /> Saved Successfully</>
            ) : (
              <><ChevronRight className="w-4 h-4" /> Save Medical ID</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
