import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart-store";
import { useUserStore } from "@/lib/store/user-store";
import {
  MapPin,
  Calendar,
  CreditCard,
  User,
  Phone,
  Mail,
  Loader2,
} from "lucide-react";
import { createPayment } from "@/lib/services/payment";

interface CheckoutFormProps {
  onSubmit: (data: any) => void;
}

export function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const router = useRouter();
  const { items, selectedRegion, getTotalAmount, clearCart } = useCartStore();
  const { user, isAuthenticated, updateProfile } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // If user is authenticated, update their profile
      if (isAuthenticated) {
        updateProfile(formData);
      }

      // Create order reference
      const orderRef = `ORDER-${Date.now()}`;

      // Create payment with CHIP
      const paymentResponse = await createPayment({
        amount: getTotalAmount() * 100, // Convert to cents
        currency: "MYR",
        customer: {
          email: formData.email,
          phone: formData.phone,
          full_name: formData.name,
        },
        reference: orderRef,
        products: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price * 100, // Convert to cents
        })),
      });

      // Submit order details to your backend
      await onSubmit({
        ...formData,
        items,
        region: selectedRegion,
        total: getTotalAmount(),
        orderRef,
      });

      // Redirect to CHIP payment page
      window.location.href = paymentResponse.checkout_url;
    } catch (err) {
      setError("Failed to process payment. Please try again.");
      console.error("Payment error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Order Summary */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

        {/* Delivery Location */}
        {selectedRegion && (
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="h-5 w-5 text-pink-600 mt-1" />
              <div>
                <h3 className="font-medium">Delivery Location</h3>
                <p className="text-sm text-gray-600">{selectedRegion.name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Delivery Day: {selectedRegion.deliveryDay}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Selected Items */}
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>
              <p className="font-medium">
                RM {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Total</p>
            <p className="font-semibold">RM {getTotalAmount().toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold mb-6">Your Details</h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <User className="h-4 w-4" />
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Mail className="h-4 w-4" />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Phone className="h-4 w-4" />
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Your phone number"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <MapPin className="h-4 w-4" />
              Delivery Address
            </label>
            <textarea
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Your delivery address"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <CreditCard className="h-5 w-5" />
              <span>Proceed to Payment</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
