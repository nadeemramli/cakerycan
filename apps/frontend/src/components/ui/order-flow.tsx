import { useState } from "react";
import {
  MapPin,
  ShoppingBag,
  CheckCircle,
  CreditCard,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  emoji?: string;
}

const ORDER_STEPS: OrderStep[] = [
  {
    title: "Select Location",
    description: "Choose your delivery area to see available delivery days",
    icon: <MapPin className="h-6 w-6" />,
    emoji: "📍",
  },
  {
    title: "Select Your Combo",
    description: "Mix and match your favorite flavors from our menu",
    icon: <ShoppingBag className="h-6 w-6" />,
    emoji: "🧁",
  },
  {
    title: "Confirm Your Order",
    description: "Review your selection and provide delivery details",
    icon: <CheckCircle className="h-6 w-6" />,
    emoji: "✨",
  },
  {
    title: "Proceed Payment",
    description: "Secure payment through our trusted payment gateway",
    icon: <CreditCard className="h-6 w-6" />,
    emoji: "💳",
  },
  {
    title: "Delivery Schedule",
    description: "We'll contact you to confirm your delivery time",
    icon: <CalendarDays className="h-6 w-6" />,
    emoji: "📅",
  },
];

export function OrderFlow() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center animate-slide-up-fade">
        <h2 className="text-3xl font-bold mb-2 group">
          Order Flow
          <Sparkles className="inline-block ml-2 h-6 w-6 group-hover:animate-wiggle" />
        </h2>
        <p className="text-center text-gray-600 mb-12 animate-bounce-subtle">
          Simple steps to get your favorite treats delivered ✨
        </p>
      </div>

      <div className="relative">
        {/* Steps */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative">
          {ORDER_STEPS.map((step, index) => (
            <div
              key={index}
              className="flex-1 relative z-10 transform transition-all duration-300 hover:-translate-y-2"
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div
                className={cn(
                  "p-6 rounded-xl transition-all duration-300",
                  activeStep === index
                    ? "bg-green-50 scale-105 shadow-lg"
                    : "bg-white hover:bg-green-50"
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group",
                    activeStep === index
                      ? "bg-green-500 text-white"
                      : "bg-green-100 text-green-600"
                  )}
                >
                  <div className="group-hover:animate-wiggle">{step.icon}</div>
                </div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  {step.title}
                  {activeStep === index && (
                    <span className="inline-block animate-bounce-subtle">
                      {step.emoji}
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>

              {/* Connector Line */}
              {index < ORDER_STEPS.length - 1 && (
                <div
                  className={cn(
                    "hidden md:block absolute top-1/2 left-full w-full h-[2px] transition-colors duration-300",
                    activeStep === index || activeStep === index + 1
                      ? "bg-green-500"
                      : "bg-gray-200"
                  )}
                  style={{
                    transform: "translateY(-50%)",
                    zIndex: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
