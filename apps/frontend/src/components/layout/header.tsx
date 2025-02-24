"use client";

import { useState } from "react";
import Link from "next/link";
import { MainNav } from "../navigation/main-nav";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Logo } from "../brand/logo";
import { Banner } from "../ui/banner";
import { cn } from "@/lib/utils";

export function Header() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Banner first - not sticky */}
      <div className="relative z-40">
        <Banner
          message="🎉 Grand Opening Special! Get 20% off on your first order"
          link={{
            text: "Order Now",
            href: "/browse-menu",
          }}
          isVisible={isBannerVisible}
          onClose={() => setIsBannerVisible(false)}
        />
      </div>

      {/* Sticky header */}
      <header className="sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center relative z-10">
              <Logo size="sm" />
            </Link>

            {/* Main Navigation - 3D Container - Hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="bg-[#F9F5F0]/65 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-full px-6 py-2.5 border border-white/20">
                <MainNav />
              </div>
            </div>

            {/* Right side icons with 3D effect */}
            <div className="flex items-center space-x-4 relative z-10">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden bg-[#F9F5F0]/90 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] p-2.5 rounded-full border border-[#AD846C]/30 hover:bg-white/90 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 text-gray-700" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-700" />
                )}
              </button>

              <button className="hidden md:block bg-[#F9F5F0]/90 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] p-2.5 rounded-full border border-[#AD846C]/30 hover:bg-white/90 transition-colors">
                <User className="h-5 w-5 text-gray-700" />
              </button>
              <button className="bg-[#F9F5F0]/90 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] p-2.5 rounded-full border border-[#AD846C]/30 hover:bg-white/90 transition-colors relative">
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  0
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={cn(
              "md:hidden fixed inset-x-0 top-[5rem] p-4 bg-[#F9F5F0]/95 backdrop-blur-lg border-b border-[#AD846C]/10 transition-all duration-300 ease-in-out",
              isMobileMenuOpen
                ? "translate-y-0 opacity-100 visible"
                : "-translate-y-full opacity-0 invisible"
            )}
          >
            <MainNav isMobile />
            <div className="mt-4 pt-4 border-t border-[#AD846C]/10">
              <Link
                href="/profile"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/50 transition-colors"
              >
                <User className="h-5 w-5 text-gray-700" />
                <span className="text-gray-700">Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
