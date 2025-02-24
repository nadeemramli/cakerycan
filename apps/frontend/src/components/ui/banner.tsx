"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BannerProps {
  message: string;
  link?: {
    text: string;
    href: string;
  };
  isVisible?: boolean;
  onClose?: () => void;
  className?: string;
}

export function Banner({
  message,
  link,
  isVisible = true,
  onClose,
  className,
}: BannerProps) {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "bg-[#FF8D8D] text-white py-2 px-4 text-center relative",
        className
      )}
    >
      <div className="container mx-auto flex items-center justify-center gap-2">
        <span>{message}</span>
        {link && (
          <Link
            href={link.href}
            className="underline hover:text-white/90 font-medium"
          >
            {link.text}
          </Link>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-white/90"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
