"use client";

import { useRouter } from "next/navigation";
import { Section } from "@/components/ui/section";
import { useUserStore } from "@/lib/store/user-store";
import { useCartStore } from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";
import { PricingTable } from "@/components/ui/pricing-table";
import { OrderFlow } from "@/components/ui/order-flow";
import { SocialPresence } from "@/components/ui/social-presence";
import { Heart, Cake, Sparkles } from "lucide-react";

interface ActionButton {
  title: string;
  description?: string;
  action: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();
  const { clearCart } = useCartStore();

  const handleFirstTimeOrder = () => {
    clearCart(); // Clear any existing cart items
    router.push("/location");
  };

  const handleOrderAgain = () => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/order");
    }
  };

  const actionButtons: ActionButton[] = [
    {
      title: "First Time Order? Order Here!",
      description: "Start your delicious journey with us",
      action: handleFirstTimeOrder,
      className: "bg-pink-600 hover:bg-pink-700 text-white",
      icon: <Heart className="h-5 w-5" />,
    },
    {
      title: "Order Again? Click Here!",
      description: "Welcome back! Quick reorder for our returning customers",
      action: handleOrderAgain,
      className: "bg-green-600 hover:bg-green-700 text-white",
      icon: <Cake className="h-5 w-5" />,
    },
    {
      title: "Browse Our Menu",
      description: "Explore our full range of delicious treats",
      action: () => router.push("/browse-menu"),
      className: "bg-amber-600 hover:bg-amber-700 text-white",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      title: "WhatsApp Us!",
      description: "Got questions? We're here to help!",
      action: () => window.open("https://wa.me/your_number_here", "_blank"),
      className: "bg-emerald-600 hover:bg-emerald-700 text-white",
      icon: <Heart className="h-5 w-5 animate-bounce-subtle" />,
    },
  ];

  return (
    <main className="animate-slide-up-fade">
      {/* Hero Section */}
      <Section padding="large" background="primary">
        <div className="text-center">
          <div className="inline-block animate-float mb-6">
            <Cake className="h-16 w-16 text-pink-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4 animate-pulse-scale">
            Welcome to CakeryCan
          </h1>
          <p className="text-xl mb-8 animate-bounce-subtle">
            Fresh baked goods delivered to your door
            <span className="inline-block animate-wiggle ml-2">🧁</span>
          </p>
        </div>
      </Section>

      {/* Action Buttons Section */}
      <Section padding="large" background="default">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-center mb-8 animate-pulse-scale">
            How can we help you?
            <span className="inline-block animate-bounce-subtle ml-2">✨</span>
          </h2>
          {actionButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.action}
              className={cn(
                "w-full p-6 rounded-xl text-left transition-all duration-300 transform hover:scale-105 hover:shadow-lg group",
                button.className
              )}
            >
              <div className="flex items-center gap-4">
                <div className="group-hover:animate-wiggle">{button.icon}</div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">{button.title}</span>
                  {button.description && (
                    <span className="text-sm opacity-90 mt-1">
                      {button.description}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* Pricing Table Section */}
      <Section padding="large" background="subtle">
        <PricingTable />
      </Section>

      {/* Order Flow Section */}
      <Section padding="large" background="default">
        <OrderFlow />
      </Section>

      {/* Social Presence Section */}
      <Section padding="large" background="subtle">
        <SocialPresence />
      </Section>
    </main>
  );
}
