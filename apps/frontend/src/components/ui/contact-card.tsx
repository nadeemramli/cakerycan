"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface ContactMethod {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: {
    text: string;
    href: string;
  };
  availability?: string;
}

interface ContactCardProps {
  title: string;
  description: string;
  methods: ContactMethod[];
  className?: string;
}

export function ContactCard({
  title,
  description,
  methods,
  className,
}: ContactCardProps) {
  return (
    <div
      className={cn(
        "bg-background-subtle rounded-xl p-6 md:p-8 shadow-sm",
        className
      )}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="space-y-6">
        {methods.map((method, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-primary-500 flex-shrink-0">{method.icon}</div>
            <div className="flex-grow">
              <h4 className="font-medium mb-1">{method.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{method.description}</p>
              {method.availability && (
                <p className="text-sm text-primary-600 mb-2">
                  {method.availability}
                </p>
              )}
              <Link
                href={method.action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-primary-500 hover:text-primary-600"
              >
                {method.action.text}
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
