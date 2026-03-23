import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import Navbar from "@/components/Navbar";
import Comments from "@/components/Comments";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { blogPosts, getPostBySlug } from "@/data/blogPosts";
import "highlight.js/styles/github-dark.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }
  
  return {
    title: `${post.title} | Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, { includeContent: true, incrementViews: true });

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <ReadingProgressBar />
      <div className="min-h-screen bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="xl:grid xl:grid-cols-[1fr_220px] xl:gap-12">
            {/* Back Link */}
            <div className="max-w-3xl">
              <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-green-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
                Back to Blog
              </Link>

              {/* Header */}
              <header className="mb-12">
                <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <time dateTime={post.date}>{post.date}</time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                      <path
                        fillRule="evenodd"
                        d="M.664 10.59a1.5 1.5 0 0 1 0-1.18L8.36 2.21a4.5 4.5 0 0 1 3.28 4.28v3.03a1.5 1.5 0 0 1-.44 1.06l-6.2 6.2a1.5 1.5 0 0 1-2.12-2.12l3.44-3.44a1.5 1.5 0 0 1 1.06-.44h2.89a4.5 4.5 0 0 1-4.28-3.28L.664 10.59Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {(post.views ?? 0).toLocaleString()} views
                  </span>
                </div>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </header>

              {/* Markdown Content */}
              <article>
                <div className="prose prose-lg prose-p:text-gray-700 prose-headings:text-gray-900 prose-a:text-pink-500 prose-a:no-underline hover:prose-a:underline prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:py-4 prose-pre:px-4 prose-pre:my-6 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit [&_pre_code]:rounded-none max-w-none">
                  <ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeSlug]}>
                    {post.content ?? ""}
                  </ReactMarkdown>
                </div>
              </article>

              {/* Comments */}
              <Comments />
            </div>

            {/* Table of Contents (sticky sidebar) */}
            <aside className="hidden xl:block">
              <div className="sticky top-24">
                <TableOfContents content={post.content ?? ""} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
