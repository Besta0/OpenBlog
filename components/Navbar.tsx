"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end gap-8 px-8 py-4">
      {links.map((link) => (
        <Link style={{ color: "pink" }}
          key={link.href}
          href={link.href}
          className={`text-sm font-medium uppercase tracking-widest transition-colors duration-300 hover:text-white ${
            pathname === link.href ? "text-white" : "text-white/60"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
