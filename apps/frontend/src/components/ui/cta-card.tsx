"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface CTACardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  className?: string;
}

export function CTACard({
  title,
  description,
  buttonText,
  buttonHref,
  className,
}: CTACardProps) {
  return (
    <div
      className={cn(
        "bg-background-subtle rounded-lg p-8 text-center shadow-sm",
        className
      )}
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link
        href={buttonHref}
        className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-black/80 transition-colors"
      >
        {buttonText}
      </Link>
    </div>
  );
}
