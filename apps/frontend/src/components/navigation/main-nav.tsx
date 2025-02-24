"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MainNavProps {
  isMobile?: boolean;
}

const mainNavItems = [
  { title: "Home", href: "/" },
  { title: "Browse Menu", href: "/browse-menu" },
  { title: "Location", href: "/location" },
  { title: "About Us", href: "/about-us" },
];

export function MainNav({ isMobile = false }: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn(isMobile && "flex flex-col space-y-1")}>
      <ul
        className={cn(
          "flex items-center",
          isMobile ? "flex-col space-y-1 w-full" : "space-x-2"
        )}
      >
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className={cn(isMobile && "w-full")}>
              <Link
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors block",
                  isMobile ? "rounded-lg w-full" : "rounded-full",
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
