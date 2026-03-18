import { BlogPost } from "@/data/blogPosts";
import Link from "next/link";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group cursor-pointer rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Title */}
        <h2 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-pink-500">
          {post.title}
        </h2>

        {/* Description - max 2 lines */}
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {post.description}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-pink-100 hover:text-pink-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Date, Reading Time, Views */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
          <span>•</span>
          <span>{(post.views ?? 0).toLocaleString()} views</span>
        </div>
      </article>
    </Link>
  );
}
