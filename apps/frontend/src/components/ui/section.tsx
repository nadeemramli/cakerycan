"use client";

import { cn } from "@/lib/utils";
import { tokens } from "@/styles/design-tokens";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  background?: "default" | "subtle" | "primary" | "none";
  containerWidth?: "default" | "wide" | "narrow" | "full";
  padding?: "default" | "large" | "small" | "none";
}

export function Section({
  children,
  className,
  containerClassName,
  background = "default",
  containerWidth = "default",
  padding = "default",
}: SectionProps) {
  // Background styles
  const backgroundStyles = {
    default: "bg-background-main",
    subtle: "bg-background-subtle",
    primary: "bg-primary-100",
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

  return (
    <section
      className={cn(
        backgroundStyles[background],
        paddingStyles[padding],
        className
      )}
    >
      <div className={cn(containerWidths[containerWidth], containerClassName)}>
        {children}
      </div>
    </section>
  );
}
