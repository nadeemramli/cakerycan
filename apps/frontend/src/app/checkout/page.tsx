"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Section } from "@/components/ui/section";
import { CheckoutForm } from "@/components/order/checkout-form";
import { useCartStore } from "@/lib/store/cart-store";
import { ProgressTracker } from "@/components/ui/progress-tracker";

const CHECKOUT_STEPS = [
  {
    number: 1,
    label: "Shopping basket",
    status: "completed" as const,
    path: "/order",
  },
  {
    number: 2,
    label: "Personal details",
    status: "current" as const,
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
    router.push("/shipping");
  };

  return (
    <main>
      {/* Progress Tracker */}
      <ProgressTracker steps={CHECKOUT_STEPS} currentStep={2} />

      {/* Checkout Form */}
      <Section padding="large" background="subtle">
        <CheckoutForm onSubmit={handleOrderSubmit} />
      </Section>
    </main>
  );
}
