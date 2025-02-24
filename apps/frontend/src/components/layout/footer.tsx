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
        <div className="container mx-auto py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Logo Section */}
            <div className="md:col-span-3">
              <Link href="/" className="inline-block">
                <Logo size="md" />
              </Link>
            </div>

            {/* About Section */}
            <div className="md:col-span-3">
              <h3 className="font-medium text-lg mb-4">About</h3>
              <ul className="space-y-3">
                {aboutLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Section */}
            <div className="md:col-span-3">
              <h3 className="font-medium text-lg mb-4">Help</h3>
              <ul className="space-y-3">
                {helpLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Blog Section */}
            <div className="md:col-span-3">
              <h3 className="font-medium text-lg mb-4">Blog</h3>
              <ul className="space-y-3">
                {blogLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="mt-16 pt-8 border-t border-border-light">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-text-secondary">
                © 2024 CakeryCan. All rights reserved.
              </div>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary transition-colors"
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
