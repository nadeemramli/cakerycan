"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mainNavItems = [
  { title: "Home", href: "/" },
  {
    title: "Browse Menu",
    href: "/browse-menu",
  },
  { title: "Location", href: "/location" },
  { title: "About Us", href: "/about-us" },
];

const helpNavItems = [
  { title: "Pickup & Delivery", href: "/help/pickup-and-delivery" },
  { title: "Cake Care", href: "/help/cake-care" },
  { title: "FAQ", href: "/help/FAQ" },
  { title: "Privacy Policy", href: "/help/privacy-policy" },
  { title: "Terms of Services", href: "/help/terms-of-services" },
  { title: "Refund Policy", href: "/help/refund-policy" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-8">
      {mainNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm font-medium transition-colors hover:text-black/70 ${
            pathname === item.href
              ? "text-black font-semibold"
              : "text-black/60"
          }`}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
