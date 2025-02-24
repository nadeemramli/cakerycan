"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { title: "Home", href: "/" },
  { title: "Browse Menu", href: "/browse-menu" },
  { title: "Location", href: "/location" },
  { title: "About Us", href: "/about-us" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center space-x-2">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  isActive
                    ? "bg-black/5 text-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                )}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
