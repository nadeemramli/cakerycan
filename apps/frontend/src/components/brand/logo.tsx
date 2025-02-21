"use client";

import { tokens } from "@/styles/design-tokens";

interface LogoProps {
  variant?: "default" | "light" | "dark";
  size?: "sm" | "md" | "lg";
}

// This component will be updated when the actual logo is ready
export function Logo({ variant = "default", size = "md" }: LogoProps) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const variants = {
    default: "text-black",
    light: "text-white",
    dark: "text-black",
  };

  return (
    <div className="flex flex-col">
      <span className={`font-bold ${sizes[size]} ${variants[variant]}`}>
        CakeryCan
        <span className="text-xs align-top">™</span>
      </span>
      <p
        className={`mt-1 text-xs tracking-wider ${
          variant === "light" ? "text-white/80" : "text-gray-600"
        }`}
      >
        HANDMADE WITH LOVE
      </p>
    </div>
  );
}
