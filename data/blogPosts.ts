import fs from "fs/promises";
import path from "path";

// ─── Constants ─────────────────────────────────────────────────────────────────
const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const VIEWS_FILE = path.join(process.cwd(), "data", "blogViews.json");

// ─── In-memory cache (survives across hot-reloads in dev) ────────────────────
declare global {
  // eslint-disable-next-line no-var
  var __blogCache: {
    markdown: Record<string, string>;
    views: Record<string, number>;
    viewsLocked: boolean;
  } | undefined;
}

function getCache() {
  if (!globalThis.__blogCache) {
    globalThis.__blogCache = {
      markdown: {},
      views: {},
      viewsLocked: false,
    };
  }
  return globalThis.__blogCache;
}

// ─── Types ─────────────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  readingTime: string;
  views?: number;
  content?: string;
}

type ViewsData = Record<string, number>;

// ─── Views helpers (async + locking) ─────────────────────────────────────────
async function readViewsFromDisk(): Promise<ViewsData> {
  try {
    const raw = await fs.readFile(VIEWS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function writeViewsToDisk(views: ViewsData): Promise<void> {
  try {
    await fs.writeFile(VIEWS_FILE, JSON.stringify(views, null, 2), "utf-8");
  } catch {
    // ignore write errors (e.g., read-only filesystem)
  }
}

async function incrementViewsAsync(slug: string): Promise<number> {
  const cache = getCache();

  while (cache.viewsLocked) {
    await new Promise((r) => setTimeout(r, 10));
  }
  cache.viewsLocked = true;

  try {
    const disk = await readViewsFromDisk();
    Object.assign(cache.views, disk);
    const newCount = (cache.views[slug] || 0) + 1;
    cache.views[slug] = newCount;
    await writeViewsToDisk(cache.views);
    return newCount;
  } finally {
    cache.viewsLocked = false;
  }
}

// ─── Markdown helpers (async + caching) ──────────────────────────────────────
async function readMarkdownContentAsync(slug: string): Promise<string> {
  const cache = getCache();
  if (cache.markdown[slug] !== undefined) return cache.markdown[slug];

  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  try {
    const content = await fs.readFile(filePath, "utf-8");
    cache.markdown[slug] = content;
    return content;
  } catch {
    cache.markdown[slug] = "";
    return "";
  }
}

// ─── Blog posts metadata ──────────────────────────────────────────────────────
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "getting-started-nextjs-14",
    title: "Getting Started with Next.js 14",
    description:
      "Learn how to build modern web applications with Next.js 14's new App Router and Server Components.",
    tags: ["Next.js", "React", "Web Development"],
    date: "2024-01-15",
    readingTime: "5 min read",
    content: "",
  },
  {
    id: "2",
    slug: "mastering-css-grid",
    title: "Mastering CSS Grid Layout",
    description:
      "A comprehensive guide to creating complex layouts with CSS Grid, including practical examples.",
    tags: ["CSS", "Frontend", "Tutorial"],
    date: "2024-01-10",
    readingTime: "8 min read",
    content: "",
  },
  {
    id: "3",
    slug: "typescript-best-practices",
    title: "TypeScript Best Practices",
    description:
      "Discover essential TypeScript patterns and tips to write cleaner, more maintainable code.",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    date: "2024-01-05",
    readingTime: "6 min read",
    content: "",
  },
  {
    id: "4",
    slug: "building-accessible-web-apps",
    title: "Building Accessible Web Apps",
    description:
      "Learn how to make your web applications accessible to everyone with these practical tips.",
    tags: ["Accessibility", "A11y", "Web Development"],
    date: "2023-12-28",
    readingTime: "7 min read",
    content: "",
  },
  {
    id: "5",
    slug: "state-management-react",
    title: "State Management in React",
    description:
      "Compare different state management solutions for React applications and when to use each.",
    tags: ["React", "State Management", "Redux"],
    date: "2023-12-20",
    readingTime: "10 min read",
    content: "",
  },
  {
    id: "6",
    slug: "optimizing-web-performance",
    title: "Optimizing Web Performance",
    description:
      "Practical techniques to improve your website's loading speed and runtime performance.",
    tags: ["Performance", "Optimization", "Web Vitals"],
    date: "2023-12-15",
    readingTime: "12 min read",
    content: "",
  },
  {
    id: "7",
    slug: "export-import",
    title: "Everything You Need to Know About export and export default (A Must-Read for React Beginners)",
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
    description:
      "Step-by-step guide to connect your domain to Cloudflare and configure DNS settings properly.",
    tags: ["Cloudflare", "DNS", "Web Development"],
    date: "2026-3-21",
    readingTime: "4 min read",
    content: "",
  },
  {
    id: "9",
    slug: "seo-starter",
    title: "How to Do SEO for Beginners in 2026: The Complete Step-by-Step Guide",
    description:
      "Learn how to rank on Google with proven SEO strategies, including keyword research, on-page SEO, technical SEO, and link building.",
    tags: ["SEO", "Marketing", "Web Development"],
    date: "2026-3-22",
    readingTime: "8 min read",
    content: "",
  },
];

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Get post by slug. Set includeContent: true to read markdown from content/blog/{slug}.md.
 * Set incrementViews: true to increment view count (server-side only, async).
 */
export async function getPostBySlug(
  slug: string,
  options?: { includeContent?: boolean; incrementViews?: boolean }
): Promise<BlogPost | undefined> {
  const meta = blogPosts.find((post) => post.slug === slug);
  if (!meta) return undefined;

  const content =
    options?.includeContent === true
      ? await readMarkdownContentAsync(slug)
      : "";

  let views = 0;
  if (options?.incrementViews === true) {
    views = await incrementViewsAsync(slug);
  } else {
    const cache = getCache();
    const disk = await readViewsFromDisk();
    Object.assign(cache.views, disk);
    views = cache.views[slug] || 0;
  }

  return {
    ...meta,
    content,
    views,
  };
}

export function getAllSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}

/** Get all posts with view counts (for list page). Reads from cache/disk. */
export async function getBlogPostsWithViews(): Promise<BlogPost[]> {
  const cache = getCache();
  const disk = await readViewsFromDisk();
  Object.assign(cache.views, disk);

  return blogPosts.map((post) => ({
    ...post,
    views: cache.views[post.slug] ?? 0,
  }));
}
