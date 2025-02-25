"use client";

import Image from "next/image";
import { tokens } from "@/styles/design-tokens";

interface LogoProps {
  variant?: "default" | "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
}

// This component will be updated when the actual logo is ready
export function Logo({ variant = "default", size = "md" }: LogoProps) {
  const sizes = {
    sm: { width: 120, height: 50 },
    md: { width: 180, height: 75 },
    lg: { width: 240, height: 100 },
    xl: { width: 380, height: 155 },
  };

  const variants = {
    default: "brightness-100",
    light: "brightness-0 invert", // This will make the logo white
    dark: "brightness-0", // This will make the logo black
  };

  return (
    <div className="flex flex-col items-start">
      <div className="relative" style={sizes[size]}>
        <Image
          src="/brand-assets/logo.png" // Make sure to put your logo.png in the public/images directory
          alt="CakeryCan Logo"
          fill
          className={`object-contain ${variants[variant]}`}
          priority
        />
      </div>
    </div>
  );
}
