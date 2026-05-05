"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Activity, ShieldAlert } from "lucide-react";

export default function RoleSelector() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check if role is already selected
    const savedRole = localStorage.getItem("ligtas_role");
    if (savedRole === "citizen") router.replace("/dashboard/citizen");
    else if (savedRole === "responder") router.replace("/dashboard/responder");
    else if (savedRole === "lgu") router.replace("/dashboard/lgu");
    else {
      // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
      setMounted(true);
    }
  }, [router]);

  const selectRole = (role: string) => {
    localStorage.setItem("ligtas_role", role);
    router.push(`/dashboard/${role}`);
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-6 py-12 max-w-5xl mx-auto">
      <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-4 text-glow">
          Identify Your Role
        </h1>
        <p className="text-white/50 text-sm md:text-base max-w-md mx-auto font-light">
          Select your operational mode to continue to the appropriate dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both">
        <button
          onClick={() => selectRole("citizen")}
          className="glass-panel group p-8 rounded-3xl text-left cursor-pointer flex flex-col h-full min-h-[280px]"
        >
          <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <User className="w-5 h-5 text-white/80" />
          </div>
          <h2 className="text-2xl font-medium mb-3">Citizen</h2>
          <p className="text-white/50 text-sm leading-relaxed mt-auto">
            Manage your medical ID, track family members, and download offline emergency data.
          </p>
        </button>

        <button
          onClick={() => selectRole("responder")}
          className="glass-panel group p-8 rounded-3xl text-left cursor-pointer flex flex-col h-full min-h-[280px] border-[#f59e0b]/20 hover:border-[#f59e0b]/50 hover:bg-[#f59e0b]/5"
        >
          <div className="bg-[#f59e0b]/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Activity className="w-5 h-5 text-[#f59e0b]" />
          </div>
          <h2 className="text-2xl font-medium mb-3 text-[#f59e0b]">Field Responder</h2>
          <p className="text-white/50 text-sm leading-relaxed mt-auto">
            Access offline-first active triage tools and synchronize patient records.
          </p>
        </button>

        <button
          onClick={() => selectRole("lgu")}
          className="glass-panel group p-8 rounded-3xl text-left cursor-pointer flex flex-col h-full min-h-[280px] border-[#ef4444]/20 hover:border-[#ef4444]/50 hover:bg-[#ef4444]/5"
        >
          <div className="bg-[#ef4444]/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <ShieldAlert className="w-5 h-5 text-[#ef4444]" />
          </div>
          <h2 className="text-2xl font-medium mb-3 text-[#ef4444]">LGU Admin</h2>
          <p className="text-white/50 text-sm leading-relaxed mt-auto">
            Monitor real-time casualty heatmaps and coordinate community-level disaster response.
          </p>
        </button>
      </div>
    </div>
  );
}
