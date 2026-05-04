"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "The Protocol", id: "protocol" },
  { label: "The Tech", id: "tech-showcase" },
  { label: "The Mission", id: "mission" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={menuRef}
      className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
        scrolled
          ? "w-[88%] md:w-[52%] top-2.5"
          : "w-[94%] md:w-[70%] top-4 md:top-6"
      }`}
    >
      <nav
        className={`glass-panel rounded-full flex items-center justify-between shadow-2xl transition-all duration-500 ${
          scrolled ? "px-3 py-1.5 md:px-4 md:py-2" : "px-4 py-2.5 md:px-6 md:py-3"
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className={`font-bold tracking-tighter transition-all duration-300 cursor-pointer min-h-[44px] flex items-center ${
            scrolled ? "text-xs md:text-xs" : "text-sm md:text-base"
          }`}
          aria-label="Go to top"
        >
          LIGTAS-BAYAN
        </button>

        {/* Desktop links */}
        <div
          className={`hidden md:flex items-center transition-all duration-300 ${
            scrolled ? "gap-5 text-[10px]" : "gap-8 text-[11px]"
          } tracking-[0.2em] uppercase text-white/60`}
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="hover:text-white transition-colors min-h-[44px] cursor-pointer"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          onClick={() => scrollTo("prepare")}
          className={`hidden md:flex bg-white text-black rounded-full font-semibold uppercase tracking-widest hover:scale-105 transition-all duration-300 cursor-pointer items-center justify-center ${
            scrolled ? "px-4 py-1.5 text-[10px]" : "px-6 py-2.5 text-xs"
          }`}
        >
          Get Started
        </button>

        {/* Mobile hamburger — min 44px touch target */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden mt-2 glass-panel rounded-2xl overflow-hidden transition-all duration-300 origin-top ${
          menuOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none"
        }`}
        style={{ transformOrigin: "top center" }}
      >
        <div className="flex flex-col py-2">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-left px-5 py-3.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors uppercase tracking-[0.2em] font-medium cursor-pointer min-h-[48px]"
            >
              {l.label}
            </button>
          ))}
          <div className="mx-4 my-2 h-px bg-white/[0.06]" />
          <button
            onClick={() => scrollTo("prepare")}
            className="mx-4 mb-2 bg-white text-black px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-widest hover:scale-[1.02] transition-transform cursor-pointer min-h-[48px]"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
