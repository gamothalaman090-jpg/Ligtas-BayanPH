"use client";

import { useEffect } from "react";
import { X, User, Activity, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const roles = [
  {
    id: "citizen",
    label: "Citizen",
    description: "Manage your family's medical ID and emergency readiness.",
    tag: "Personal",
    icon: User,
    accent: "border-white/10 hover:border-white/30 hover:bg-white/[0.04]",
    iconBg: "bg-white/5",
    iconColor: "text-white/80",
  },
  {
    id: "responder",
    label: "Field Responder",
    description: "Access offline triage tools and sync patient records in the field.",
    tag: "Operational",
    icon: Activity,
    accent: "border-[#f59e0b]/20 hover:border-[#f59e0b]/50 hover:bg-[#f59e0b]/5",
    iconBg: "bg-[#f59e0b]/10",
    iconColor: "text-[#f59e0b]",
  },
  {
    id: "lgu",
    label: "LGU Admin",
    description: "Monitor casualty heatmaps and coordinate community response.",
    tag: "Command",
    icon: ShieldAlert,
    accent: "border-[#ef4444]/20 hover:border-[#ef4444]/50 hover:bg-[#ef4444]/5",
    iconBg: "bg-[#ef4444]/10",
    iconColor: "text-[#ef4444]",
  },
];

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRoleSelect = (roleId: string) => {
    localStorage.setItem("ligtas_role", roleId);
    onClose();
    router.push(`/dashboard/${roleId}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col my-8 overflow-hidden">

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-white/10 cursor-pointer z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="px-8 pt-10 pb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border border-white/20 rounded-md flex items-center justify-center bg-white/5">
                <div className="w-3 h-3 bg-white rounded-sm rotate-45" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-tighter">LIGTAS-BAYAN</p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono">Select your role to continue</p>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter leading-[1] mb-2">
              WHO ARE<br />YOU TODAY?
            </h2>
            <p className="text-white/50 text-sm font-light leading-relaxed max-w-sm">
              Choose your operational role. You can always switch from within the dashboard.
            </p>
          </div>

          {/* Role Cards */}
          <div className="px-8 pb-8 space-y-3">
            {roles.map(({ id, label, description, tag, icon: Icon, accent, iconBg, iconColor }) => (
              <button
                key={id}
                onClick={() => handleRoleSelect(id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer group text-left ${accent}`}
              >
                <div className={`w-11 h-11 flex-shrink-0 rounded-full flex items-center justify-center ${iconBg}`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-sm text-white">{label}</p>
                    <span className="text-[9px] uppercase tracking-[0.15em] text-white/30 font-mono">{tag}</span>
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed">{description}</p>
                </div>
                <div className="text-white/20 group-hover:text-white/60 transition-colors flex-shrink-0 text-lg">
                  →
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-white/[0.06] bg-[#050505]/60 text-center">
            <p className="text-[11px] text-white/30 font-light">
              For authorized users only. Data protected under{" "}
              <a href="#" className="text-white/50 hover:text-white transition-colors">Republic Act 10173</a>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
