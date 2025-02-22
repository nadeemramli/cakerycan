"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  title: string;
  content: string | string[];
  icon?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-200 last:border-0">
          <button
            onClick={() => toggleItem(index)}
            className="flex items-center justify-between w-full py-4 text-left"
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <h3 className="text-lg font-medium">{item.title}</h3>
            </div>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-gray-500 transition-transform duration-200",
                openIndex === index ? "transform rotate-180" : ""
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-200",
              openIndex === index ? "max-h-96 pb-6" : "max-h-0"
            )}
          >
            {Array.isArray(item.content) ? (
              <ul className="space-y-2 text-gray-600">
                {item.content.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">{item.content}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
