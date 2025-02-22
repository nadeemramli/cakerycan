"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-blue-200 z-0" />

      <div className="relative z-10">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center gap-8 mb-16 last:mb-0",
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            )}
          >
            {/* Content */}
            <div
              className={cn(
                "w-1/2 p-6",
                index % 2 === 0 ? "text-right" : "text-left"
              )}
            >
              <div className="text-sm text-blue-600 font-semibold mb-2">
                {item.year}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>

            {/* Timeline point */}
            <div className="relative flex-shrink-0">
              <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-white" />
            </div>

            {/* Image */}
            <div className="w-1/2 p-6">
              {item.imageSrc && (
                <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt || item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
