"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { Logo } from "../brand/logo";
import { Wave } from "../ui/wave";

const aboutLinks = [
  { title: "Home", href: "/" },
  { title: "Browse Menu", href: "/browse-menu" },
  { title: "Location", href: "/location" },
  { title: "About Us", href: "/about-us" },
];

const helpLinks = [
  { title: "Pickup & Delivery", href: "/help/pickup-and-delivery" },
  { title: "Cake Care", href: "/help/cake-care" },
  { title: "FAQ", href: "/help/FAQ" },
  { title: "Contact Us", href: "/help/contact" },
  { title: "Privacy Policy", href: "/help/privacy-policy" },
  { title: "Terms of Service", href: "/help/terms-of-services" },
  { title: "Refund Policy", href: "/help/refund-policy" },
];

const blogLinks = [
  { title: "All Posts", href: "/blog" },
  { title: "Tutorials", href: "/blog?category=tutorials" },
  { title: "Recipes", href: "/blog?category=recipes" },
  { title: "Tips & Tricks", href: "/blog?category=tips" },
  { title: "Trends", href: "/blog?category=trends" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto">
      {/* Top wave */}
      <Wave color="#AD846C" className="transform -mb-1" />

      {/* Footer content */}
      <div className="bg-[#AD846C] relative">
        <div className="container mx-auto px-4 sm:px-6 py-8 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* Logo Section - Responsive */}
            <div className="md:col-span-3 flex flex-col items-center md:items-start">
              <Link href="/" className="inline-block mb-6 md:mb-0">
                <Logo size="sm" variant="light" className="block md:hidden" />
                <Logo size="md" variant="light" className="hidden md:block" />
              </Link>
            </div>

            {/* Links Sections - Improved mobile grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-4 md:col-span-9">
              {/* About Section */}
              <div className="flex flex-col items-center sm:items-start">
                <h3 className="font-medium text-lg mb-4 text-white">About</h3>
                <ul className="space-y-3 text-center sm:text-left">
                  {aboutLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/80 hover:text-white transition-colors text-sm"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Help Section */}
              <div className="flex flex-col items-center sm:items-start">
                <h3 className="font-medium text-lg mb-4 text-white">Help</h3>
                <ul className="space-y-3 text-center sm:text-left">
                  {helpLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/80 hover:text-white transition-colors text-sm"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Blog Section */}
              <div className="flex flex-col items-center sm:items-start">
                <h3 className="font-medium text-lg mb-4 text-white">Blog</h3>
                <ul className="space-y-3 text-center sm:text-left">
                  {blogLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/80 hover:text-white transition-colors text-sm"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Social Links & Copyright - Centered on mobile */}
          <div className="mt-8 md:mt-16 pt-8 border-t border-white/20">
            <div className="flex flex-col items-center md:flex-row md:justify-between space-y-4 md:space-y-0">
              <div className="text-sm text-white/80">
                © 2024 CakeryCan. All rights reserved.
              </div>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
