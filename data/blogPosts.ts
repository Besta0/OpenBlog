import fs from "fs";
import path from "path";

// Blog posts metadata - content loaded from .md files at runtime (server-side)
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  readingTime: string;
  views?: number; // only set when returned from getPostBySlug
  content?: string; // only set when includeContent: true in getPostBySlug
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "getting-started-nextjs-14",
    title: "Getting Started with Next.js 14",
    description: "Learn how to build modern web applications with Next.js 14's new App Router and Server Components.",
    tags: ["Next.js", "React", "Web Development"],
    date: "2024-01-15",
    readingTime: "5 min read",
    content: "",
  },
  {
    id: "2",
    slug: "mastering-css-grid",
    title: "Mastering CSS Grid Layout",
    description: "A comprehensive guide to creating complex layouts with CSS Grid, including practical examples.",
    tags: ["CSS", "Frontend", "Tutorial"],
    date: "2024-01-10",
    readingTime: "8 min read",
    content: "",
  },
  {
    id: "3",
    slug: "typescript-best-practices",
    title: "TypeScript Best Practices",
    description: "Discover essential TypeScript patterns and tips to write cleaner, more maintainable code.",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    date: "2024-01-05",
    readingTime: "6 min read",
    content: "",
  },
  {
    id: "4",
    slug: "building-accessible-web-apps",
    title: "Building Accessible Web Apps",
    description: "Learn how to make your web applications accessible to everyone with these practical tips.",
    tags: ["Accessibility", "A11y", "Web Development"],
    date: "2023-12-28",
    readingTime: "7 min read",
    content: "",
  },
  {
    id: "5",
    slug: "state-management-react",
    title: "State Management in React",
    description: "Compare different state management solutions for React applications and when to use each.",
    tags: ["React", "State Management", "Redux"],
    date: "2023-12-20",
    readingTime: "10 min read",
    content: "",
  },
  {
    id: "6",
    slug: "optimizing-web-performance",
    title: "Optimizing Web Performance",
    description: "Practical techniques to improve your website's loading speed and runtime performance.",
    tags: ["Performance", "Optimization", "Web Vitals"],
    date: "2023-12-15",
    readingTime: "12 min read",
    content: "",
  },
  {
    id: "7",
    slug: "export-import",
    title: "Everything You Need to Know About export and export default (A Must-Read for React Beginners)）",
    description: "good habits for exporting and importing modules",
    tags: ["JavaScript", "React", "Module"],
    date: "2026-3-17",
    readingTime: "3 min read",
    content: "",
  },
  {
    id: "8",
    slug: "web-development-with-cloudflare",
    title: "How to Link Your Domain to Cloudflare and Set Up DNS Correctly",
    description: "Step-by-step guide to connect your domain to Cloudflare and configure DNS settings properly.",
    tags: ["Cloudflare", "DNS", "Web Development"],
    date: "2026-3-21",
    readingTime: "4 min read",
    content: "",
  },
];

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const VIEWS_FILE = path.join(process.cwd(), "data", "blogViews.json");

type ViewsData = Record<string, number>;

function readViews(): ViewsData {
  try {
    const data = fs.readFileSync(VIEWS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

function writeViews(views: ViewsData): void {
  try {
    fs.writeFileSync(VIEWS_FILE, JSON.stringify(views, null, 2), "utf-8");
  } catch {
    // ignore write errors (e.g., read-only filesystem)
  }
}

function incrementViews(slug: string): number {
  const views = readViews();
  const newCount = (views[slug] || 0) + 1;
  views[slug] = newCount;
  writeViews(views);
  return newCount;
}

function readMarkdownContent(slug: string): string {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return "";
  }
}

/** Get post by slug. Set includeContent: true to read markdown from content/blog/{slug}.md. Set incrementViews: true to increment view count (server-side only). */
export function getPostBySlug(
  slug: string,
  options?: { includeContent?: boolean; incrementViews?: boolean }
): BlogPost | undefined {
  const meta = blogPosts.find((post) => post.slug === slug);
  if (!meta) return undefined;

  const content =
    options?.includeContent === true ? readMarkdownContent(slug) : "";

  const views = options?.incrementViews === true
    ? incrementViews(slug)
    : readViews()[slug] || 0;

  return {
    ...meta,
    content,
    views,
  };
}

export function getAllSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}

/** Get all posts with view counts (for list page). */
export function getBlogPostsWithViews(): BlogPost[] {
  const views = readViews();
  return blogPosts.map((post) => ({
    ...post,
    views: views[post.slug] ?? 0,
  }));
}
