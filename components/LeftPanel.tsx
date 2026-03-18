"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LeftPanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const name = "Caleb";
  const letters = name.split("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate in when it becomes visible
      gsap.fromTo(
        panelRef.current,
        { 
          opacity: 0,
          x: -50 
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top 80%",
          },
        }
      );

      // Animate letters
      gsap.fromTo(
        contentRef.current?.querySelectorAll(".letter") || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top 70%",
          },
        }
      );
    }, panelRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={panelRef}
      className="left-panel fixed left-8 top-1/2 z-40 hidden w-80 -translate-y-1/2 lg:block"
    >
      <div className="panel-content relative flex flex-col items-center justify-center rounded-3xl bg-black p-8 shadow-2xl">
        <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
        
        <div ref={contentRef} className="relative z-10">
          <h1 className="caleb-text flex select-none text-7xl font-bold tracking-[0.2em] text-white">
            {letters.map((letter, index) => (
              <span
                key={index}
                className="letter inline-block metallic-letter"
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </div>
  );
}
