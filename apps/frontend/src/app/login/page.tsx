"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Section } from "@/components/ui/section";
import { useUserStore } from "@/lib/store/user-store";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Here you would integrate with your backend API
      // For now, we'll just simulate a login
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate successful login
      setUser({
        id: "123",
        name: "John Doe",
        email: formData.email,
        phone: formData.phone,
        address: "",
        orderHistory: [],
      });

      // Redirect to order page
      router.push("/order");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <Section padding="large" background="subtle">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-gray-600">
              Log in to your account to quickly reorder your favorites
            </p>
          </div>

          {/* Login Method Selector */}
          <div className="bg-white p-1 rounded-lg flex mb-6">
            <button
              onClick={() => setLoginMethod("email")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-colors",
                loginMethod === "email"
                  ? "bg-pink-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </button>
            <button
              onClick={() => setLoginMethod("phone")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-colors",
                loginMethod === "phone"
                  ? "bg-pink-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Phone className="h-4 w-4" />
              <span>Phone</span>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            )}

            {loginMethod === "email" ? (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
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
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
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
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>{isLoading ? "Logging in..." : "Log In"}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">Don't have an account?</p>
            <button
              onClick={() => router.push("/register")}
              className="mt-2 text-pink-600 hover:text-pink-700 font-medium"
            >
              Register Now
            </button>
          </div>
        </div>
      </Section>
    </main>
  );
}
