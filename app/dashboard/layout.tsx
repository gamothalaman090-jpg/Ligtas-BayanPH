"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f8fafc] font-sans selection:bg-white/20">
      <div className="mesh-bg"></div>
      <div className="bg-noise"></div>
      
      {/* Minimal Top Nav for Dashboard */}
      <nav className="relative z-10 border-b border-white/5 bg-[#050505]/50 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xs font-bold tracking-widest text-white hover:text-white/70 transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          LIGTAS-BAYAN
        </Link>
        <Link 
          href="/dashboard" 
          onClick={() => {
            if (typeof window !== 'undefined') localStorage.removeItem('ligtas_role');
          }}
          className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors"
        >
          Change Role
        </Link>
      </nav>

      <main>
        {children}
      </main>
    </div>
  );
}
