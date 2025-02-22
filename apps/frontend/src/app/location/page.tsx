"use client";

import { useState } from "react";
import { SelangorMap } from "@/components/location/SelangorMap";
import type { Region } from "@/components/location/locationData";

export default function LocationPage() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    // Here you can add logic to save the region to form state
    // or navigate to the order form with the region pre-selected
    console.log("Selected region:", region);
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
        <div className="mt-8 p-4 bg-pink-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900">
            Selected Region: {selectedRegion.name}
          </h2>
          <p className="mt-2 text-gray-600">{selectedRegion.deliveryInfo}</p>
        </div>
      )}
    </main>
  );
}
