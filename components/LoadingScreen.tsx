"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll during loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "auto";
      }
    });

    // Animate the progress value and line
    tl.to({ val: 0 }, {
      val: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: function () {
        const val = Math.round(this.targets()[0].val);
        setProgress(val);
        if (progressLineRef.current) {
          progressLineRef.current.style.width = `${val}%`;
        }
      }
    });

    // Slide up the entire container
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "expo.inOut",
      delay: 0.2
    });

    return () => {
      document.body.style.overflow = "auto";
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-[#f8fafc]"
    >
      <div className="flex flex-col items-center max-w-sm w-full px-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
          LIGTAS-BAYAN.
        </h1>

        <div className="w-full h-[2px] bg-white/10 mb-4 overflow-hidden relative">
          <div ref={progressLineRef} className="absolute left-0 top-0 h-full bg-white w-0"></div>
        </div>

        <div className="flex justify-between w-full text-[10px] md:text-xs text-white/50 font-mono uppercase tracking-widest">
          <span>Initializing Offline Protocol...</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
