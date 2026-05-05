"use client";

import { useState, useEffect } from "react";
import { Users, Download, Home, BriefcaseMedical, Pill, MapPin } from "lucide-react";
import MedicalIdPanel from "./MedicalIdPanel";
import FamilyMembersPanel from "./FamilyMembersPanel";

const STORAGE_KEY = "ligtas_medical_id";

function computeProgress(data: Record<string, unknown>): number {
  if (!data) return 0;
  let filled = 0;
  const total = 8;
  if ((data.fullName as string)?.trim()) filled++;
  if (data.dob) filled++;
  if (data.bloodType) filled++;
  if ((data.allergies as unknown[])?.length > 0) filled++;
  if ((data.medications as string)?.trim()) filled++;
  if ((data.emergencyName as string)?.trim()) filled++;
  if ((data.emergencyPhone as string)?.trim()) filled++;
  if ((data.conditions as unknown[])?.length > 0) filled++;
  return Math.round((filled / total) * 100);
}

type Panel = "medicalId" | "family" | null;

export default function CitizenDashboard() {
  const [panel, setPanel] = useState<Panel>(null);
  const [progress, setProgress] = useState(60);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setProgress(computeProgress(JSON.parse(raw)));
    } catch { /* ignore */ }
  }, []);

  const progressColor = progress >= 80 ? "#10b981" : progress >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 py-8 md:py-12 pb-24 md:pb-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-2">Citizen Portal</h1>
          <p className="text-white/50 text-sm font-light">Manage your family&apos;s readiness and offline data.</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Medical ID Completeness */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl col-span-1 md:col-span-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1 w-full">
              <h2 className="text-xl font-medium mb-2">Medical ID Completeness</h2>
              <p className="text-white/50 text-sm mb-4">Complete your profile to ensure responders have accurate data during emergencies.</p>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${progress}%`, background: progressColor }}
                />
              </div>
              <p className="text-xs mt-2 tracking-widest uppercase font-mono" style={{ color: progressColor }}>
                {progress}% Complete
              </p>
            </div>
            <button
              onClick={() => setPanel("medicalId")}
              className="bg-white text-black px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest hover:scale-105 transition-transform whitespace-nowrap w-full md:w-auto min-h-[48px] cursor-pointer"
            >
              Edit Medical ID
            </button>
          </div>

          {/* Family Members */}
          <button
            onClick={() => setPanel("family")}
            className="glass-panel group p-6 rounded-3xl text-left hover:bg-white/5 transition-colors flex items-start gap-4 cursor-pointer"
          >
            <div className="bg-white/10 p-3 rounded-full group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">Family Members</h3>
              <p className="text-white/50 text-sm">Manage linked accounts and dependents.</p>
            </div>
          </button>

          {/* Offline Sync */}
          <button className="glass-panel group p-6 rounded-3xl text-left hover:bg-white/5 transition-colors flex items-start gap-4 cursor-pointer">
            <div className="bg-white/10 p-3 rounded-full group-hover:scale-110 transition-transform">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">Offline Data Sync</h3>
              <p className="text-white/50 text-sm">Download your NFC/QR payload for offline access.</p>
            </div>
          </button>
        </div>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed bottom-6 left-6 right-6 glass-panel rounded-full px-6 py-3 flex justify-between items-center z-40 shadow-2xl">
          <button className="flex flex-col items-center gap-1 text-white cursor-pointer">
            <Home className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-wider font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white/40 hover:text-white transition-colors cursor-pointer">
            <BriefcaseMedical className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-wider font-medium">First Aid</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white/40 hover:text-white transition-colors cursor-pointer">
            <Pill className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-wider font-medium">Meds</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white/40 hover:text-white transition-colors cursor-pointer">
            <MapPin className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-wider font-medium">Facilities</span>
          </button>
        </div>
      </div>

      {/* Panels */}
      {panel === "medicalId" && (
        <MedicalIdPanel
          onClose={() => setPanel(null)}
          onSave={(pct) => setProgress(pct)}
        />
      )}
      {panel === "family" && (
        <FamilyMembersPanel onClose={() => setPanel(null)} />
      )}
    </>
  );
}
