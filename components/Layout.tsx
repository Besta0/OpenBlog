"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RightContent from "./RightContent";
import Navbar from "./Navbar";

gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 初始：黑色全屏。用 fromTo 明确从 100vw 到 40%，这样 scrub 时从滚动 0 就是全屏
      gsap.set(rightContentRef.current, { opacity: 0, x: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacerRef.current,
          start: "top top",   // 滚动 0：spacer 顶部贴 viewport 顶部
          end: "bottom top",  // 滚动 100vh：spacer 底部贴 viewport 顶部 → 完整缩放动画
          scrub: 1,
        },
      });

      // 1. 从全屏缩放到左侧面板：100vw → 40%，圆角 + 阴影
      tl.fromTo(
        heroRef.current,
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          boxShadow: "none",
        },
        {
          width: "40%",
          left:"5%",
          height: "50vh",
          top:"40%",
          yPercent: -50,
          borderRadius: "24px",
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.35)",
          ease: "power2.inOut",
        },
        0
      );

      // 2. 右侧内容淡入
      tl.fromTo(
        rightContentRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration:1,
          ease: "power2.out",
        },
        -0.3
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="layout-wrapper">
      <Navbar  />

      {/* Black left panel - fixed, transforms from full screen to left 40% */}
      <div ref={heroRef} className="hero-container">
        <div className="hero-content">
          <HeroInner />
        </div>
      </div>

      {/* Spacer: scroll distance for the animation */}
      <div ref={spacerRef} className="h-screen w-full shrink-0" aria-hidden />

      {/* Right content - About Me, Skills, Get in Touch */}
      <div ref={rightContentRef} className="right-content-wrapper">
        <RightContent />
      </div>
    </div>
  );
}

// Seeded RNG so server and client generate the same particle data (avoids hydration mismatch)
function createSeededRandom(seed: number) {
  return function () {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
}

// Inner Hero component for the letter animation
function HeroInner() {
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const name = "Caleb";
  const letters = name.split("");

  // Generate particles with seeded RNG so server and client match
  const random = createSeededRandom(12345);
  const particles = Array.from({ length: 200 }, (_, i) => ({
    id: i,
    x: random() * 100,
    y: random() * 100,
    size: random() * 4 + 2,
    duration: random() * 3 + 2,
    opacity: random() * 0.4 + 0.1,
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D rotation animation for letters
      gsap.fromTo(
        lettersRef.current,
        {
          rotationY: -180,
          opacity: 0,
          scale: 0.5,
          z: -200,
        },
        {
          rotationY: 0,
          opacity: 1,
          scale: 1,
          z: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.1,
        }
      );

      // Particle floating animation
      particles.forEach((particle) => {
        gsap.to(`.particle-${particle.id}`, {
          x: `+=${Math.random() * 80 - 40}`,
          y: `+=${Math.random() * 80 - 40}`,
          duration: particle.duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center bg-black" style={{ perspective: "1000px" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_transparent_70%)]" />
      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`particle-${particle.id} absolute rounded-full bg-white`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
        />
      ))}
      <h1 className="caleb-text relative z-10 flex select-none text-8xl font-bold tracking-[0.2em] text-white md:text-9xl lg:text-[10rem]" style={{ transformStyle: "preserve-3d" }}>
        {letters.map((letter, index) => (
          <span
            key={index}
            ref={(el) => {
              if (el) lettersRef.current[index] = el;
            }}
            className="metallic-letter inline-block"
          >
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
}
