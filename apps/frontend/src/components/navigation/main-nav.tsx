"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/browse-menu", label: "Shop" },
  { href: "/wedding-corporate", label: "Wedding & Corporate" },
  { href: "/blog", label: "Read" },
  { href: "/about-us", label: "Info" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center space-x-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  isActive
                    ? "bg-black/5 text-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
