"use client";

import { cn } from "@/lib/utils";
import { RevealFX } from "./reveal-fx";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  background?: "default" | "subtle" | "primary" | "none";
  containerWidth?: "default" | "wide" | "narrow" | "full";
  padding?: "default" | "large" | "small" | "none";
  floating?: boolean;
  noReveal?: boolean;
}

export function Section({
  children,
  className,
  containerClassName,
  background = "default",
  containerWidth = "default",
  padding = "default",
  floating = true,
  noReveal = false,
}: SectionProps) {
  // Background styles
  const backgroundStyles = {
    default: "bg-white/40 backdrop-blur-[2px]",
    subtle: "bg-gray-50/30 backdrop-blur-[2px]",
    primary: "bg-primary-100/40 backdrop-blur-[2px]",
    none: "",
  };

  // Container width styles
  const containerWidths = {
    default: "container mx-auto",
    wide: "container-wide mx-auto",
    narrow: "container-narrow mx-auto",
    full: "w-full",
  };

  // Padding styles
  const paddingStyles = {
    default: "py-12 px-4 sm:px-6 md:py-16",
    large: "py-16 px-4 sm:px-6 md:py-24",
    small: "py-8 px-4 sm:px-6",
    none: "",
  };

  const sectionContent = (
    <section
      className={cn(
        backgroundStyles[background],
        paddingStyles[padding],
        floating && "section-wrapper",
        className
      )}
    >
      <div className={cn(containerWidths[containerWidth], containerClassName)}>
        {children}
      </div>
    </section>
  );

  // If noReveal is true or background is none, return without animation
  if (noReveal || background === "none") {
    return sectionContent;
  }

  // Wrap with RevealFX for animated sections
  return (
    <RevealFX width="100%" className="mb-8">
      {sectionContent}
    </RevealFX>
  );
}
