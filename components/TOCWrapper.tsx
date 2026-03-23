"use client";

import dynamic from "next/dynamic";

const TableOfContents = dynamic(
  () => import("@/components/TableOfContents"),
  {
    ssr: false,
    loading: () => <div className="w-56 shrink-0" />,
  }
);

interface TOCWrapperProps {
  content: string;
}

export default function TOCWrapper({ content }: TOCWrapperProps) {
  return (
    <div className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-24">
        <TableOfContents content={content} />
      </div>
    </div>
  );
}
