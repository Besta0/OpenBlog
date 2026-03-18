"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlogCard from "./BlogCard";
import { BlogPost } from "@/data/blogPosts";

gsap.registerPlugin(ScrollTrigger);

const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "typescript-best-practices",
    title: "TypeScript Best Practices",
    description: "Best practices for writing clean and maintainable TypeScript code",
    tags: ["TypeScript", "Best Practices"],
    date: "Mar 18, 2026",
    readingTime: "5 min read",
  },
  {
    id: "2",
    slug: "building-accessible-web-apps",
    title: "Building Accessible Web Apps",
    description: "A comprehensive guide to web accessibility and inclusive design",
    tags: ["Accessibility", "A11y"],
    date: "Mar 17, 2026",
    readingTime: "7 min read",
  },
  {
    id: "3",
    slug: "export-import",
    title: "📦 一文搞懂 export 和 export default（React 入门必看）",
    description: "good habits for exporting and importing modules",
    tags: ["Performance", "Optimization", "Web Vitals"],
    date: "Mar 17, 2026",
    readingTime: "3 min read",
  },
];

export default function BlogList() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        ".blog-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Animate cards with stagger
      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="blog-section relative min-h-screen bg-black px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <h2 className="blog-title text-4xl font-bold tracking-tight text-zinc-100 md:text-5xl">
            Latest Posts
          </h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-zinc-700 to-transparent" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
