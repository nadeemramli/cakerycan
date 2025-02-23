"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Section } from "@/components/ui/section";
import { CheckoutForm } from "@/components/order/checkout-form";
import { useCartStore } from "@/lib/store/cart-store";
import { Check } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useCartStore();

  // Redirect to order page if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/order");
    }
  }, [items.length, router]);

  const handleOrderSubmit = async (data: any) => {
    // Here you would integrate with your backend API
    // For now, we'll just simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Order submitted:", data);
  };

  return (
    <main>
      {/* Progress Tracker */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                <Check className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Shopping basket</span>
            </div>
            <div className="w-16 h-[2px] bg-green-200" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                <Check className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Personal details</span>
            </div>
            <div className="w-16 h-[2px] bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full border-2 border-gray-200 text-gray-400 flex items-center justify-center">
                3
              </div>
              <span className="text-sm text-gray-400">Shipping details</span>
            </div>
            <div className="w-16 h-[2px] bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full border-2 border-gray-200 text-gray-400 flex items-center justify-center">
                4
              </div>
              <span className="text-sm text-gray-400">Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Form */}
      <Section padding="large" background="subtle">
        <CheckoutForm onSubmit={handleOrderSubmit} />
      </Section>
    </main>
  );
}
