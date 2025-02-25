"use client";

import { useRouter } from "next/navigation";
import { Section } from "@/components/ui/section";
import { useUserStore } from "@/lib/store/user-store";
import { useCartStore } from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";
import { PricingTable } from "@/components/ui/pricing-table";
import { OrderFlow } from "@/components/ui/order-flow";
import { SocialPresence } from "@/components/ui/social-presence";
import { Heart, Cake, Sparkles, ChevronDown } from "lucide-react";
import Image from "next/image";
import { RevealFX } from "@/components/ui/reveal-fx";

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
    clearCart();
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
    <>
      {/* Hero Section - Mobile optimized */}
      <Section
        padding="none"
        background="none"
        noReveal
        className="min-h-[80vh] md:min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 text-center max-w-4xl mx-auto">
          <p className="font-serif text-base md:text-lg mb-3 md:mb-4 tracking-wide uppercase text-white">
            Handmade with love
          </p>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 md:mb-4 text-white">
            CakeryCan
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-white/90">
            Fresh baked goods delivered to your door, bringing sweetness to your
            everyday moments
          </p>
        </div>
      </Section>

      {/* Action Buttons Section - Mobile optimized */}
      <Section padding="large" background="default">
        <div className="container max-w-md mx-auto px-4 sm:px-6">
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 animate-pulse-scale">
              How can we help you?
              <span className="inline-block animate-bounce-subtle ml-2">
                ✨
              </span>
            </h2>
            {actionButtons.map((button, index) => (
              <RevealFX key={index} width="100%" delay={index * 0.1}>
                <button
                  onClick={button.action}
                  className={cn(
                    "w-full p-4 md:p-6 rounded-xl text-left transition-all duration-300 transform hover:scale-105 hover:shadow-lg group",
                    button.className
                  )}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="group-hover:animate-wiggle">
                      {button.icon}
                    </div>
                    <div className="flex-1">
                      <span className="block text-base md:text-lg font-semibold">
                        {button.title}
                      </span>
                      {button.description && (
                        <span className="block text-xs md:text-sm opacity-90 mt-1">
                          {button.description}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </RevealFX>
            ))}
          </div>
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
    </>
  );
}
