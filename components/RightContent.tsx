"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "React", "Next.js", "TypeScript", "Node.js", "GraphQL", "AWS", "Figma", "UI/UX"
];

const socialLinks = [
  { name: "Email", value: "caleb@example.com", href: "mailto:caleb@example.com" },
  { name: "GitHub", value: "github.com/caleb", href: "https://github.com/Besta0" },
  { name: "Twitter", value: "@caleb", href: "https://twitter.com" },
  { name: "LinkedIn", value: "linkedin.com/in/caleb-tan", href: "https://www.linkedin.com/in/caleb-tan-14988a395/" },
];

export default function RightContent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in and slide up animation for all content
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Stagger animations for sections
      gsap.fromTo(
        ".content-section",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="right-content min-h-screen bg-white px-6 py-24 md:px-12 md:pl-16"
    >
      <div ref={contentRef} className="mx-auto max-w-2xl pt-20">
        {/* About Section */}
        <div className="content-section mb-12">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">About Me</h2>
          <p className="leading-relaxed text-gray-600">
            I'm a full-stack developer passionate about creating beautiful, 
            functional digital experiences. With expertise in modern web 
            technologies, I build applications that are both performant and 
            delightful to use.
          </p>
        </div>

        {/* Skills Section */}
        <div className="content-section mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="content-section">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">Get in Touch</h2>
          <div className="space-y-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300 hover:bg-gray-50"
              >
                <span className="block text-sm text-gray-500">{link.name}</span>
                <span className="font-medium text-gray-900">{link.value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
