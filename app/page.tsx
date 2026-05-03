"use client";

import { useEffect, useRef } from "react";
import ScrollCanvas from "@/components/ScrollCanvas";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Radio, Activity, Network, MessageSquareHeart, BriefcaseMedical, Pill, MapPin, BookHeart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLHeadingElement[]>([]);

  useEffect(() => {
    // Initial hero load animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRefs.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 0.5 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLHeadingElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#f8fafc] selection:bg-white/20">
      <ScrollCanvas />

      {/* GSAP Scroll Trigger Container for 3D Canvas */}
      <div id="core-features-container" className="relative z-10 w-full">
        
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen flex flex-col justify-center items-start px-8 md:px-24 max-w-7xl mx-auto">
          <p ref={addToRefs} className="text-white/50 tracking-[0.2em] uppercase text-sm mb-6 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            Zero-Internet Infrastructure
          </p>
          <h1 ref={addToRefs} className="text-7xl md:text-9xl font-semibold tracking-tighter leading-[0.9] mb-8 text-glow">
            Ligtas-<br />Bayan.
          </h1>
          <h2 ref={addToRefs} className="text-xl md:text-3xl font-light text-white/70 max-w-2xl leading-relaxed">
            A decentralized medical ID and triage system for the golden hour.
          </h2>
          
          <div className="absolute bottom-12 left-8 md:left-24 flex items-center gap-4 text-white/40 animate-bounce">
            <ArrowDown className="w-5 h-5" />
            <span className="text-sm uppercase tracking-widest">Scroll to explore</span>
          </div>
        </section>

        {/* Feature 1: NFC */}
        <section className="relative h-screen flex items-center justify-start px-8 md:px-24">
          <div className="glass-panel p-10 md:p-16 rounded-3xl max-w-2xl transform transition-transform hover:scale-[1.02] duration-500">
            <Radio className="w-12 h-12 mb-8 text-white/80" />
            <h3 className="text-5xl md:text-7xl font-medium tracking-tight mb-6">
              Offline-First <br />
              <span className="text-white/40">NFC Access.</span>
            </h3>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              Critical breakdown in communication during disasters costs lives. Ligtas-Bayan utilizes Near Field Communication to store vital health data locally on a smartphone or wearable sticker, allowing instant retrieval in complete dead zones.
            </p>
          </div>
        </section>

        {/* Feature 2: AI Triage */}
        <section className="relative h-screen flex items-center justify-end px-8 md:px-24">
          <div className="glass-panel p-10 md:p-16 rounded-3xl max-w-2xl text-right transform transition-transform hover:scale-[1.02] duration-500">
            <div className="flex justify-end mb-8">
              <Activity className="w-12 h-12 text-white/80" />
            </div>
            <h3 className="text-5xl md:text-7xl font-medium tracking-tight mb-6">
              Vitals-Driven <br />
              <span className="text-white/40">AI Triage.</span>
            </h3>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              Integrated decision-tree logic automatically categorizes patients by urgency based on current vitals. Removing human bias during chaotic rescue operations ensures resources are allocated precisely when seconds matter most.
            </p>
            <div className="flex gap-4 justify-end mt-8">
              <span className="px-4 py-1.5 rounded-full bg-[#ef4444]/20 border border-[#ef4444]/40 text-[#ef4444] text-xs uppercase tracking-widest">Critical</span>
              <span className="px-4 py-1.5 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[#f59e0b] text-xs uppercase tracking-widest">Urgent</span>
              <span className="px-4 py-1.5 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 text-[#10b981] text-xs uppercase tracking-widest">Stable</span>
            </div>
          </div>
        </section>

        {/* Feature 3: Mesh Sync */}
        <section className="relative h-screen flex items-center justify-start px-8 md:px-24">
          <div className="glass-panel p-10 md:p-16 rounded-3xl max-w-2xl transform transition-transform hover:scale-[1.02] duration-500">
            <Network className="w-12 h-12 mb-8 text-white/80" />
            <h3 className="text-5xl md:text-7xl font-medium tracking-tight mb-6">
              Peer-to-Peer <br />
              <span className="text-white/40">Mesh Sync.</span>
            </h3>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              As connectivity is restored, the mobile app performs a seamless peer-to-peer synchronization to a web-based LGU Command Center. Local officials instantly receive a real-time heatmap of casualties and medical needs across the affected area.
            </p>
          </div>
        </section>

        {/* Transition to MediReach Features */}
        <section className="h-[20vh] flex items-center justify-center">
          <p className="text-white/30 text-sm tracking-widest uppercase font-mono animate-pulse">
            Beyond the Golden Hour
          </p>
        </section>
      </div>

      {/* MediReach Expanded Features Section */}
      <div className="relative z-10 w-full bg-[#050505]/90 backdrop-blur-md pt-24 pb-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 md:px-24">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
              Your Everyday <br/>
              <span className="text-white/40">Health Companion.</span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl font-light">
              From critical disaster response to everyday medical guidance, Ligtas-Bayan integrates comprehensive tools to manage your family's health seamlessly, even offline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature: Symptom Checker */}
            <div className="glass-panel p-8 rounded-2xl hover:bg-white/[0.02] transition-colors">
              <MessageSquareHeart className="w-8 h-8 mb-6 text-white/70" />
              <h4 className="text-2xl font-medium mb-3">AI Symptom Triage</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                Describe your symptoms naturally. Our AI evaluates urgency levels, considers risk factors, and recommends immediate next steps just like a doctor.
              </p>
            </div>

            {/* Feature: First Aid */}
            <div className="glass-panel p-8 rounded-2xl hover:bg-white/[0.02] transition-colors">
              <BriefcaseMedical className="w-8 h-8 mb-6 text-white/70" />
              <h4 className="text-2xl font-medium mb-3">First Aid Guides</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                Step-by-step emergency instructions and survival protocols available fully offline when you need them most.
              </p>
            </div>

            {/* Feature: Medicine Safety */}
            <div className="glass-panel p-8 rounded-2xl hover:bg-white/[0.02] transition-colors">
              <Pill className="w-8 h-8 mb-6 text-white/70" />
              <h4 className="text-2xl font-medium mb-3">Medicine Safety</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                Check potential drug interactions, verify child dosages, and review medication safety guidelines instantly.
              </p>
            </div>

            {/* Feature: Facility Finder */}
            <div className="glass-panel p-8 rounded-2xl hover:bg-white/[0.02] transition-colors">
              <MapPin className="w-8 h-8 mb-6 text-white/70" />
              <h4 className="text-2xl font-medium mb-3">Facility Finder</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                Locate operational hospitals, clinics, and pharmacies near you on an interactive map, synchronized via the peer-to-peer mesh.
              </p>
            </div>

            {/* Feature: Family Journal */}
            <div className="glass-panel p-8 rounded-2xl hover:bg-white/[0.02] transition-colors">
              <BookHeart className="w-8 h-8 mb-6 text-white/70" />
              <h4 className="text-2xl font-medium mb-3">Family Journal</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                Track health records, growth milestones, and long-term medical history for everyone in your household securely.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#050505] py-12 text-center text-white/30 text-xs tracking-widest uppercase">
        <p>© 2026 Ligtas-Bayan. Not a substitute for professional medical advice.</p>
        <p className="mt-2">Built with care for SDG 3: Good Health and Well-being</p>
      </footer>
    </main>
  );
}
