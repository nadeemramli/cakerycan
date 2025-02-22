"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface InstructionStep {
  icon: string;
  title: string;
  description: string;
}

interface CakeInstructionsProps {
  className?: string;
}

const storageSteps: InstructionStep[] = [
  {
    icon: "/images/cake-care/storage-1.svg",
    title: "4 Days",
    description:
      "Store at room temperature away from sunlight in airtight container for up to 4 days.",
  },
  {
    icon: "/images/cake-care/storage-2.svg",
    title: "1 Mth",
    description:
      "Store in the freezer for up to 1 month. Cookies may be reheated if desired.",
  },
];

const servingSteps: InstructionStep[] = [
  {
    icon: "/images/cake-care/serve-1.svg",
    title: "2-4 Mins",
    description:
      "Preheat oven to 170°C. Heat cookies for 2-4 mins. Serve warm & enjoy!",
  },
  {
    icon: "/images/cake-care/serve-2.svg",
    title: "10 Secs",
    description:
      "Heat cookies for 10 seconds or until desired temperature. Do not overheat. Serve warm & enjoy!",
  },
];

export function CakeInstructions({ className }: CakeInstructionsProps) {
  return (
    <div
      className={cn("bg-background-subtle rounded-3xl p-8 md:p-12", className)}
    >
      <div className="space-y-12">
        {/* Storage Instructions */}
        <div>
          <div className="inline-block bg-white/80 backdrop-blur-sm px-8 py-2 rounded-full mb-8">
            <h3 className="text-lg font-medium tracking-wider">TO STORE</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {storageSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={step.icon}
                    alt={step.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Serving Instructions */}
        <div>
          <div className="inline-block bg-white/80 backdrop-blur-sm px-8 py-2 rounded-full mb-8">
            <h3 className="text-lg font-medium tracking-wider">TO SERVE</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servingSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={step.icon}
                    alt={step.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
