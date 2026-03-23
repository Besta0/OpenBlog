"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

/** Extract heading items from raw markdown string (server-side utility). */
export function extractToc(markdown: string): TocItem[] {
  const headingRe = /^(#{1,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRe.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim().replace(/`[^`]+`/g, (m) => m.slice(1, -1));
    items.push({
      id: slugify(match[2]),
      text,
      level,
    });
  }

  return items;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const items = extractToc(content);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    headings.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden text-sm xl:block"
    >
      <p className="mb-3 font-semibold text-gray-700 dark:text-gray-200">
        On this page
      </p>
      <ul className="space-y-1 border-l-2 border-gray-200 dark:border-gray-700">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(item.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    window.history.pushState(null, "", `#${item.id}`);
                    setActiveId(item.id);
                  }
                }}
                className={`block py-1 transition-colors duration-150 ${
                  isActive
                    ? "border-l-2 border-green-500 pl-3 font-medium text-green-500"
                    : "pl-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
