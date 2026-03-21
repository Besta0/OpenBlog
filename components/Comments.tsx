"use client";

import Giscus from "./Giscus";

export default function Comments() {
  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Comments</h2>
      <Giscus
        repo="Besta0/OpenBlog"
        repoId="R_kgDORqLlNw"
        category="Announcements"
        categoryId="DIC_kwDORqLlN84C49zC"
        theme="preferred_color_scheme"
      />
    </div>
  );
}
