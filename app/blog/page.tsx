import Navbar from "@/components/Navbar";
import BlogCard from "@/components/BlogCard";
import { getBlogPostsWithViews } from "@/data/blogPosts";

export default async function BlogPage() {
  const posts = await getBlogPostsWithViews();
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Page Title */}
        <h1 className="mb-12 text-4xl font-bold text-gray-900">Blog</h1>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
    </>
  );
}
