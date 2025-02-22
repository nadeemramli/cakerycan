"use client";

import { Section } from "@/components/ui/section";

interface PolicySection {
  title: string;
  content: string | string[];
}

interface PolicyLayoutProps {
  title: string;
  description: string;
  sections: PolicySection[];
}

export function PolicyLayout({
  title,
  description,
  sections,
}: PolicyLayoutProps) {
  return (
    <>
      {/* Header Section */}
      <Section padding="large" background="primary">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-4">{title}</h1>
          <p className="text-gray-600 text-lg">{description}</p>
        </div>
      </Section>

      {/* Content Section */}
      <Section padding="large" background="default">
        <div className="max-w-3xl mx-auto">
          {sections.map((section, index) => (
            <div key={index} className="mb-12 last:mb-0">
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              {Array.isArray(section.content) ? (
                <ul className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">{section.content}</p>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
