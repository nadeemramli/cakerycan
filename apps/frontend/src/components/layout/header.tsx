"use client";

import { useState } from "react";
import Link from "next/link";
import { MainNav } from "../navigation/main-nav";
import { ShoppingCart, User } from "lucide-react";
import { Logo } from "../brand/logo";
import { Banner } from "../ui/banner";

export function Header() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

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
            <Link href="/" className="flex items-center">
              <Logo size="sm" />
            </Link>

            {/* Main Navigation - 3D Container */}
            <div className="flex-1 flex justify-center px-6">
              <div className="bg-white/80 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-full px-6 py-2.5 border border-white/20">
                <MainNav />
              </div>
            </div>

            {/* Right side icons with 3D effect */}
            <div className="flex items-center space-x-4">
              <button className="bg-white/80 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] p-2.5 rounded-full border border-white/20 hover:bg-white/90 transition-colors">
                <User className="h-5 w-5 text-gray-700" />
              </button>
              <button className="bg-white/80 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] p-2.5 rounded-full border border-white/20 hover:bg-white/90 transition-colors relative">
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
