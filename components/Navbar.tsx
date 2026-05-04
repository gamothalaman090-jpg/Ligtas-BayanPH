"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${scrolled ? 'w-[80%] md:w-[52%] top-3' : 'w-[95%] md:w-[70%] top-6'}`}>
      <nav className={`glass-panel rounded-full flex items-center justify-between shadow-2xl transition-all duration-500 ${scrolled ? 'px-4 py-2' : 'px-6 py-3'}`}>
        <div className={`font-bold tracking-tighter cursor-pointer transition-all duration-300 ${scrolled ? 'text-xs' : 'text-sm md:text-base'}`} onClick={() => scrollTo('hero')}>
          LIGTAS-BAYAN
        </div>
        
        <div className={`hidden md:flex items-center transition-all duration-300 ${scrolled ? 'gap-5 text-[10px]' : 'gap-8 text-[11px]'} tracking-[0.2em] uppercase text-white/60`}>
          <button onClick={() => scrollTo('protocol')} className="hover:text-white transition-colors">The Protocol</button>
          <button onClick={() => scrollTo('tech-showcase')} className="hover:text-white transition-colors">The Tech</button>
          <button onClick={() => scrollTo('mission')} className="hover:text-white transition-colors">The Mission</button>
        </div>

        <div>
          <button
            onClick={() => scrollTo('prepare')}
            className={`bg-white text-black rounded-full font-semibold uppercase tracking-widest hover:scale-105 transition-all duration-300 ${scrolled ? 'px-4 py-1.5 text-[10px]' : 'px-6 py-2.5 text-xs'}`}
          >
            Get Started
          </button>
        </div>
      </nav>
    </div>
  );
}

