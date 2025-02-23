import { useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingItem {
  title: string;
  description: string;
  rmPrice: number;
  npPrice: number;
}

interface PricingSection {
  title: string;
  items: PricingItem[];
}

const PRICING_DATA: PricingSection[] = [
  {
    title: "2CANS",
    items: [
      {
        title: "1 FRUIT + 1 CHEESE",
        description: "Fruit Cake 330ml x1 +Cheesecake 250ml x1",
        rmPrice: 42.0,
        npPrice: 46.0,
      },
      {
        title: "2 FRUITS CAN CAKE",
        description: "Fruit Cake 330ml x2",
        rmPrice: 44.0,
        npPrice: 48.0,
      },
      {
        title: "2 CHEESECAKE",
        description: "Cheesecake 250ml x2",
        rmPrice: 40.0,
        npPrice: 44.0,
      },
    ],
  },
  {
    title: "4CANS",
    items: [
      {
        title: "2 FRUIT + 2 CHEESE",
        description: "Fruit Cake 330ml x2 +Cheesecake 250ml x2",
        rmPrice: 80.0,
        npPrice: 92.0,
      },
      {
        title: "4 FRUITS CAN CAKE",
        description: "Fruit Cake 330ml x4",
        rmPrice: 84.0,
        npPrice: 96.0,
      },
      {
        title: "4 CHEESECAKE",
        description: "Cheesecake 250ml x4",
        rmPrice: 76.0,
        npPrice: 88.0,
      },
    ],
  },
];

export function PricingTable() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center animate-slide-up-fade">
        <h2 className="text-4xl font-bold text-purple-700 mb-2 group">
          CAN SET
          <Sparkles className="inline-block ml-2 h-8 w-8 group-hover:animate-wiggle" />
        </h2>
        <p className="text-center text-purple-600 mb-8 animate-bounce-subtle">
          OFFICIAL MENU ✨
        </p>
      </div>

      <div className="space-y-8">
        {PRICING_DATA.map((section) => (
          <div
            key={section.title}
            className="bg-[#FFF5E6] rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-xl"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold animate-pulse-scale">
                  {section.title}
                </h3>
                <div className="flex gap-8 font-semibold">
                  <span className="animate-float">RM</span>
                  <span
                    className="text-red-600 animate-float"
                    style={{ animationDelay: "0.1s" }}
                  >
                    NP
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.title}
                    className={cn(
                      "flex justify-between p-4 rounded-xl transition-all duration-300",
                      hoveredItem === item.title
                        ? "bg-purple-50 transform scale-102"
                        : "hover:bg-purple-50 hover:transform hover:scale-102"
                    )}
                    onMouseEnter={() => setHoveredItem(item.title)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div>
                      <h4 className="text-purple-700 font-semibold group">
                        {item.title}
                        {hoveredItem === item.title && (
                          <span className="inline-block ml-2 animate-bounce-subtle">
                            🍰
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex gap-8">
                      <span className="font-semibold">
                        {item.rmPrice.toFixed(2)}
                      </span>
                      <span className="text-red-600 font-semibold">
                        {item.npPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
