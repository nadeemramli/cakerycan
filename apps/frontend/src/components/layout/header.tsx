"use client";

import Link from "next/link";
import { MainNav } from "../navigation/main-nav";
import { ShoppingCart, User } from "lucide-react";
import { Logo } from "../brand/logo";
import { tokens } from "@/styles/design-tokens";

export function Header() {
  return (
    <>
      <div className="h-16" /> {/* Spacer for the fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="absolute inset-0 bg-background-transparent backdrop-blur-md" />
        <div className="relative">
          <div className="container mx-auto">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Logo size="sm" />
              </Link>

              {/* Main Navigation */}
              <div className="flex-1 flex justify-center">
                <MainNav />
              </div>

              {/* Right side icons */}
              <div className="flex items-center space-x-6">
                <button className="hover:text-black/70 transition-colors">
                  <User className="h-5 w-5" />
                </button>
                <button className="relative hover:text-black/70 transition-colors">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
