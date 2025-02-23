import { useState } from "react";
import {
  MapPin,
  ShoppingBag,
  CheckCircle,
  CreditCard,
  CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ORDER_STEPS: OrderStep[] = [
  {
    title: "Select Location",
    description: "Choose your delivery area to see available delivery days",
    icon: <MapPin className="h-6 w-6" />,
  },
  {
    title: "Select Your Combo",
    description: "Mix and match your favorite flavors from our menu",
    icon: <ShoppingBag className="h-6 w-6" />,
  },
  {
    title: "Confirm Your Order",
    description: "Review your selection and provide delivery details",
    icon: <CheckCircle className="h-6 w-6" />,
  },
  {
    title: "Proceed Payment",
    description: "Secure payment through our trusted payment gateway",
    icon: <CreditCard className="h-6 w-6" />,
  },
  {
    title: "Delivery Schedule",
    description: "We'll contact you to confirm your delivery time",
    icon: <CalendarDays className="h-6 w-6" />,
  },
];

export function OrderFlow() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2">Order Flow</h2>
      <p className="text-center text-gray-600 mb-12">
        Simple steps to get your favorite treats delivered
      </p>

      <div className="relative">
        {/* Steps */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative">
          {ORDER_STEPS.map((step, index) => (
            <div
              key={index}
              className="flex-1 relative z-10"
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
                    "w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors",
                    activeStep === index
                      ? "bg-green-500 text-white"
                      : "bg-green-100 text-green-600"
                  )}
                >
                  {step.icon}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>

              {/* Connector Line */}
              {index < ORDER_STEPS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full w-full h-[2px] bg-gray-200 -translate-y-1/2 z-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
