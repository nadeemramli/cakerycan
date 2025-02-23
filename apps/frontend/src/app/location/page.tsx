"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SelangorMap } from "@/components/location/SelangorMap";
import type { Region } from "@/components/location/locationData";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";

export default function LocationPage() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const router = useRouter();
  const { setRegion } = useCartStore();

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
  };

  const handleProceedOrder = () => {
    if (selectedRegion) {
      // Store the selected region in cart store
      setRegion(selectedRegion);
      router.push("/order");
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Select Your Delivery Location
      </h1>
      <p className="text-gray-600 mb-8">
        Click on your region to see delivery schedules and proceed with your
        order.
      </p>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <SelangorMap onRegionSelect={handleRegionSelect} />
      </div>

      {selectedRegion && (
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-pink-600 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedRegion.name}
                </h2>
                <p className="mt-2 text-gray-600">
                  {selectedRegion.deliveryInfo}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Calendar className="h-6 w-6 text-pink-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Delivery Schedule
                </h3>
                <p className="mt-2 text-gray-600">
                  Deliveries to {selectedRegion.name} are scheduled for{" "}
                  <span className="font-medium">
                    {selectedRegion.deliveryDay}
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={handleProceedOrder}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
            >
              <span>Proceed with Order</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
