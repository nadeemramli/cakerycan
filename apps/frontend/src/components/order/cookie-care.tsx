import { Section } from "@/components/ui/section";
import Image from "next/image";

const CARE_INSTRUCTIONS = [
  {
    title: "Store in Airtight Container",
    description:
      "Keep your cookies fresh by storing them in an airtight container at room temperature.",
    icon: "/images/icons/container.svg",
  },
  {
    title: "Consume Within 5 Days",
    description:
      "For the best taste and texture, enjoy your cookies within 5 days of receiving them.",
    icon: "/images/icons/calendar.svg",
  },
  {
    title: "Avoid Direct Sunlight",
    description:
      "Store your cookies away from direct sunlight and heat to maintain their quality.",
    icon: "/images/icons/sun.svg",
  },
  {
    title: "Handle with Care",
    description:
      "Our cookies are delicate! Handle them gently to keep them in perfect condition.",
    icon: "/images/icons/hands.svg",
  },
];

export function CookieCare() {
  return (
    <Section padding="large" background="subtle">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-12">
          Cookie Care Instructions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CARE_INSTRUCTIONS.map((instruction, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={instruction.icon}
                  alt={instruction.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium mb-2">{instruction.title}</h3>
                <p className="text-sm text-gray-600">
                  {instruction.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
