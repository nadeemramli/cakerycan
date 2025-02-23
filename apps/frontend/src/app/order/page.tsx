"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductShowcase } from "@/components/ui/product-showcase";
import { Section } from "@/components/ui/section";
import { BuildYourOwnSection } from "@/components/order/build-your-own-section";
import { CookieCare } from "@/components/order/cookie-care";
import { useCartStore } from "@/lib/store/cart-store";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProgressTracker } from "@/components/ui/progress-tracker";

const CHECKOUT_STEPS = [
  {
    number: 1,
    label: "Shopping basket",
    status: "current" as const,
    path: "/order",
  },
  {
    number: 2,
    label: "Personal details",
    status: "upcoming" as const,
    path: "/checkout",
  },
  {
    number: 3,
    label: "Shipping details",
    status: "upcoming" as const,
    path: "/shipping",
  },
  {
    number: 4,
    label: "Confirmation",
    status: "upcoming" as const,
    path: "/confirmation",
  },
];

export default function OrderPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { items, getTotalAmount } = useCartStore();
  const router = useRouter();

  const handleProceedToCheckout = () => {
    if (items.length === 0) return; // Do nothing if no items selected
    router.push("/checkout");
  };

  return (
    <main>
      {/* Progress Tracker */}
      <ProgressTracker
        steps={CHECKOUT_STEPS}
        currentStep={1}
        showBackButton={false}
      />

      {/* Hero Section with Product Showcase */}
      <ProductShowcase
        title="Build Your Own Cookie Box"
        tagline="Mix & Match Your Favorites"
        description="Create your perfect cookie box by selecting from our signature flavors. Each cookie is freshly baked with premium ingredients and carefully packaged to maintain its deliciousness."
        productImage="/images/products/cookie-box-hero.jpg"
        backgroundColor="#FFF5E6"
        ingredients={[
          { name: "Premium Belgian Chocolate" },
          { name: "New Zealand Butter" },
          { name: "Farm Fresh Eggs" },
          { name: "Organic Flour" },
        ]}
      />

      {/* Build Your Own Section */}
      <Section padding="large" background="default">
        <BuildYourOwnSection
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
        />

        {/* Proceed to Checkout Button - Always visible */}
        <div className="mt-12 max-w-lg mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Total Amount:</span>
              <span className="text-xl font-semibold">
                RM {getTotalAmount().toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleProceedToCheckout}
              className={cn(
                "w-full inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg transition-colors",
                items.length > 0
                  ? "bg-pink-600 hover:bg-pink-700 text-white"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
              disabled={items.length === 0}
            >
              <ShoppingBag className="h-5 w-5" />
              <span>
                {items.length === 0
                  ? "Please select your cookies"
                  : "Proceed to Checkout"}
              </span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Section>

      {/* Cookie Care Instructions */}
      <CookieCare />
    </main>
  );
}
