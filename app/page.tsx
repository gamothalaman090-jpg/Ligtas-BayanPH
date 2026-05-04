"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Three.js canvas MUST be dynamically imported with ssr:false.
// @react-three/fiber's Canvas directly manipulates the DOM;
// SSR + React reconciliation causes the removeChild NotFoundError.
const ScrollCanvas = dynamic(() => import("@/components/ScrollCanvas"), { ssr: false });

import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HorizontalScroll from "@/components/HorizontalScroll";
import StickySteps from "@/components/StickySteps";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Radio, Activity, Network, MessageSquareHeart, BriefcaseMedical, Pill, MapPin, BookHeart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLHeadingElement[]>([]);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Initial hero load animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRefs.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 0.5 }
      );

      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: "#features-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLHeadingElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  const addToCards = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main id="hero" ref={mainRef} className="relative min-h-screen bg-transparent text-[#f8fafc] selection:bg-white/20">
      <div className="mesh-bg"></div>
      <div className="bg-noise"></div>
      
      <ScrollCanvas />

      {/* GSAP Scroll Trigger Container for 3D Canvas */}
      <div id="core-features-container" className="relative z-10 w-full">
        
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center items-start px-6 md:px-24 pt-28 pb-16 max-w-7xl mx-auto">
          <p ref={addToRefs} className="text-white/50 tracking-[0.2em] uppercase text-xs md:text-sm mb-5 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            Zero-Internet Infrastructure
          </p>
          <h1 ref={addToRefs} className="text-5xl sm:text-7xl md:text-9xl font-semibold tracking-tighter leading-[0.9] mb-6 md:mb-8 text-glow">
            Ligtas-<br />Bayan.
          </h1>
          <h2 ref={addToRefs} className="text-base sm:text-xl md:text-3xl font-light text-white/70 max-w-2xl leading-relaxed">
            A decentralized medical ID and triage system for the golden hour.
          </h2>
          
          <div className="mt-12 flex items-center gap-4 text-white/40 animate-bounce">
            <ArrowDown className="w-5 h-5" />
            <span className="text-sm uppercase tracking-widest">Scroll to explore</span>
          </div>
        </section>

        {/* Feature 1: NFC */}
        <section id="protocol" className="relative min-h-screen flex items-center justify-start px-6 md:px-24 py-20">
          <div className="glass-panel p-7 md:p-16 rounded-2xl md:rounded-3xl w-full max-w-2xl">
            <Radio className="w-10 h-10 md:w-12 md:h-12 mb-6 md:mb-8 text-white/80" />
            <h3 className="text-4xl md:text-7xl font-medium tracking-tight mb-4 md:mb-6">
              Offline-First <br />
              <span className="text-white/40">NFC Access.</span>
            </h3>
            <p className="text-sm md:text-lg text-white/60 leading-relaxed font-light">
              Critical breakdown in communication during disasters costs lives. Ligtas-Bayan utilizes Near Field Communication to store vital health data locally on a smartphone or wearable sticker, allowing instant retrieval in complete dead zones.
            </p>
          </div>
        </section>

        {/* Feature 2: AI Triage */}
        <section id="tech" className="relative min-h-screen flex items-center justify-start md:justify-end px-6 md:px-24 py-20">
          <div className="glass-panel p-7 md:p-16 rounded-2xl md:rounded-3xl w-full max-w-2xl text-left md:text-right">
            <div className="flex justify-start md:justify-end mb-6 md:mb-8">
              <Activity className="w-10 h-10 md:w-12 md:h-12 text-white/80" />
            </div>
            <h3 className="text-4xl md:text-7xl font-medium tracking-tight mb-4 md:mb-6">
              Vitals-Driven <br />
              <span className="text-white/40">AI Triage.</span>
            </h3>
            <p className="text-sm md:text-lg text-white/60 leading-relaxed font-light">
              Integrated decision-tree logic automatically categorizes patients by urgency based on current vitals. Removing human bias during chaotic rescue operations ensures resources are allocated precisely when seconds matter most.
            </p>
            <div className="flex gap-3 justify-start md:justify-end mt-6 md:mt-8 flex-wrap">
              <span className="px-4 py-2 rounded-full bg-[#ef4444]/20 border border-[#ef4444]/40 text-[#ef4444] text-xs uppercase tracking-widest min-h-[44px] flex items-center">Critical</span>
              <span className="px-4 py-2 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[#f59e0b] text-xs uppercase tracking-widest min-h-[44px] flex items-center">Urgent</span>
              <span className="px-4 py-2 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 text-[#10b981] text-xs uppercase tracking-widest min-h-[44px] flex items-center">Stable</span>
            </div>
          </div>
        </section>

        {/* Feature 3: Mesh Sync */}
        <section className="relative min-h-screen flex items-center justify-start px-6 md:px-24 py-20">
          <div className="glass-panel p-7 md:p-16 rounded-2xl md:rounded-3xl w-full max-w-2xl">
            <Network className="w-10 h-10 md:w-12 md:h-12 mb-6 md:mb-8 text-white/80" />
            <h3 className="text-4xl md:text-7xl font-medium tracking-tight mb-4 md:mb-6">
              Peer-to-Peer <br />
              <span className="text-white/40">Mesh Sync.</span>
            </h3>
            <p className="text-sm md:text-lg text-white/60 leading-relaxed font-light">
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

      {/* Horizontal Tech Showcase */}
      <HorizontalScroll />

      {/* Sticky Steps — How It Works */}
      <StickySteps />

      {/* MediReach Expanded Features Section */}
      <div id="mission" className="relative z-10 w-full bg-[#050505]/90 backdrop-blur-md pt-16 md:pt-24 pb-20 md:pb-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <div className="mb-12 md:mb-20">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
              Your Everyday <br/>
              <span className="text-white/40">Health Companion.</span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl font-light">
              From critical disaster response to everyday medical guidance, Ligtas-Bayan integrates comprehensive tools to manage your family's health seamlessly, even offline.
            </p>
          </div>

          <div id="features-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature: Symptom Checker */}
            <div ref={addToCards} className="glass-panel group p-8 rounded-2xl cursor-default">
              <MessageSquareHeart className="w-8 h-8 mb-6 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
              <h4 className="text-2xl font-medium mb-3">AI Symptom Triage</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                Describe your symptoms naturally. Our AI evaluates urgency levels, considers risk factors, and recommends immediate next steps just like a doctor.
              </p>
            </div>

            {/* Feature: First Aid */}
            <div ref={addToCards} className="glass-panel group p-8 rounded-2xl cursor-default">
              <BriefcaseMedical className="w-8 h-8 mb-6 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
              <h4 className="text-2xl font-medium mb-3">First Aid Guides</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                Step-by-step emergency instructions and survival protocols available fully offline when you need them most.
              </p>
            </div>

            {/* Feature: Medicine Safety */}
            <div ref={addToCards} className="glass-panel group p-8 rounded-2xl cursor-default">
              <Pill className="w-8 h-8 mb-6 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
              <h4 className="text-2xl font-medium mb-3">Medicine Safety</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                Check potential drug interactions, verify child dosages, and review medication safety guidelines instantly.
              </p>
            </div>

            {/* Feature: Facility Finder */}
            <div ref={addToCards} className="glass-panel group p-8 rounded-2xl cursor-default">
              <MapPin className="w-8 h-8 mb-6 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
              <h4 className="text-2xl font-medium mb-3">Facility Finder</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                Locate operational hospitals, clinics, and pharmacies near you on an interactive map, synchronized via the peer-to-peer mesh.
              </p>
            </div>

            {/* Feature: Family Journal */}
            <div ref={addToCards} className="glass-panel group p-8 rounded-2xl cursor-default">
              <BookHeart className="w-8 h-8 mb-6 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
              <h4 className="text-2xl font-medium mb-3">Family Journal</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                Track health records, growth milestones, and long-term medical history for everyone in your household securely.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid CTA Section */}
      <section id="prepare" className="relative z-10 w-full bg-[#050505] border-t border-white/10 flex items-center justify-center py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-24 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-32 w-full">
          <div className="flex-1">
            <h2 className="text-6xl sm:text-8xl md:text-[140px] font-bold tracking-tighter leading-none text-white drop-shadow-2xl">
              PREPARE.
            </h2>
          </div>
          
          <div className="flex-1 flex flex-col gap-7 md:gap-10">
            <p className="text-base md:text-xl text-white/60 leading-relaxed font-light">
              Turn readiness into action. Equip your community with offline-first protocols so when the grid fails, your response doesn't.
            </p>
            
            <div className="flex items-center gap-4 flex-wrap">
              <button className="bg-white text-black px-7 py-3.5 rounded-full text-sm font-semibold uppercase tracking-widest hover:scale-105 transition-transform duration-300 min-h-[48px] cursor-pointer">
                Download App
              </button>
              <button className="text-white/60 hover:text-white px-4 py-3.5 text-sm font-semibold uppercase tracking-widest transition-colors duration-300 min-h-[48px] cursor-pointer">
                View Docs
              </button>
            </div>
            
            <div className="flex items-center gap-4 pt-6 border-t border-white/10 text-[9px] text-white/40 uppercase tracking-[0.2em] font-mono flex-wrap">
              <span>Offline-First</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span>AI-Triage</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span>Mesh-Sync</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#050505] py-12 text-center text-white/30 text-xs tracking-widest uppercase">
        <p>© 2026 Ligtas-Bayan. Not a substitute for professional medical advice.</p>
        <p className="mt-2">Built with care for SDG 3: Good Health and Well-being</p>
      </footer>
    </main>
    </>
  );
}
