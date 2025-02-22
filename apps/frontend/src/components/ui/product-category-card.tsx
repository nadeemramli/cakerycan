"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface ProductCategoryCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  className?: string;
}

export function ProductCategoryCard({
  title,
  description,
  imageSrc,
  href,
  className,
}: ProductCategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden rounded-3xl bg-background-subtle transition-all hover:shadow-lg",
        className
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-white/90">{description}</p>
        <div className="mt-4 inline-flex items-center text-sm font-medium">
          Explore Now
          <svg
            className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
