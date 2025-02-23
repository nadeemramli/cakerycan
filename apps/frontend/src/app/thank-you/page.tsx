"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import { Section } from "@/components/ui/section";
import { useUserStore } from "@/lib/store/user-store";

export default function ThankYouPage() {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();

  // If user directly accesses this page without completing an order, redirect to home
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isAuthenticated) {
        router.push("/");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, router]);

  return (
    <Section padding="large" background="subtle">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-8">
          Your order has been successfully placed. We'll send you an email with
          your order details and tracking information.
        </p>

        <div className="bg-white rounded-xl p-6 mb-8">
          <h2 className="font-semibold mb-4">What's Next?</h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• You'll receive an order confirmation email shortly</li>
            <li>• We'll start preparing your cookies fresh on delivery day</li>
            <li>
              • You'll get a notification when your order is out for delivery
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/browse-menu"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Order More</span>
          </Link>
        </div>
      </div>
    </Section>
  );
}
