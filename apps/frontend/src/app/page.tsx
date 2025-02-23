"use client";

import { useRouter } from "next/navigation";
import { Section } from "@/components/ui/section";
import { useUserStore } from "@/lib/store/user-store";
import { useCartStore } from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";
import { PricingTable } from "@/components/ui/pricing-table";
import { OrderFlow } from "@/components/ui/order-flow";
import { SocialPresence } from "@/components/ui/social-presence";

interface ActionButton {
  title: string;
  description?: string;
  action: () => void;
  className?: string;
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
    },
    {
      title: "Order Again? Click Here!",
      description: "Welcome back! Quick reorder for our returning customers",
      action: handleOrderAgain,
      className: "bg-green-600 hover:bg-green-700 text-white",
    },
    {
      title: "Browse Our Menu",
      description: "Explore our full range of delicious treats",
      action: () => router.push("/browse-menu"),
      className: "bg-amber-600 hover:bg-amber-700 text-white",
    },
    {
      title: "WhatsApp Us!",
      description: "Got questions? We're here to help!",
      action: () => window.open("https://wa.me/your_number_here", "_blank"),
      className: "bg-emerald-600 hover:bg-emerald-700 text-white",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <Section padding="large" background="primary">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to CakeryCan</h1>
          <p className="text-xl mb-8">
            Fresh baked goods delivered to your door
          </p>
        </div>
      </Section>

      {/* Action Buttons Section */}
      <Section padding="large" background="default">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            How can we help you?
          </h2>
          {actionButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.action}
              className={cn(
                "w-full p-6 rounded-xl text-left transition-all duration-200 transform hover:scale-102 hover:shadow-lg",
                button.className
              )}
            >
              <div className="flex flex-col">
                <span className="text-lg font-semibold">{button.title}</span>
                {button.description && (
                  <span className="text-sm opacity-90 mt-1">
                    {button.description}
                  </span>
                )}
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
