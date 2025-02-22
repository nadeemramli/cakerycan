import React, { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { feature } from "topojson-client";
import { selangorTopo } from "./selangorTopo";
import { DeliveryInfo } from "./DeliveryInfo";
import type { Region } from "./locationData";

// Define colors
const COLORS = {
  default: "#FFF5E6", // Cream pastel
  selected: "#FFB6A3", // Soft coral when selected
  hover: "#FFE0D4", // Light peach on hover
  stroke: "#7C6E5D", // Warm brown stroke
};

interface SelangorMapProps {
  onRegionSelect: (region: Region) => void;
}

export function SelangorMap({ onRegionSelect }: SelangorMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Convert TopoJSON to GeoJSON
  const geojson = useMemo(() => {
    const districts = selangorTopo.objects.districts;
    return feature(selangorTopo, districts);
  }, []);

  const handleRegionClick = (geo: any) => {
    const region: Region = {
      id: geo.properties.id,
      name: geo.properties.name,
      coordinates: [
        geo.geometry.coordinates[0][0][0],
        geo.geometry.coordinates[0][0][1],
      ],
      deliveryDay: getDeliveryDay(geo.properties.name),
      deliveryInfo: getDeliveryInfo(geo.properties.name),
    };
    setSelectedRegion(region.id);
    onRegionSelect(region);
  };

  const getDeliveryDay = (regionName: string): string => {
    const deliveryDays: { [key: string]: string } = {
      "Sabak Bernam": "Friday",
      "Hulu Selangor": "Thursday",
      "Kuala Selangor": "Wednesday",
      Gombak: "Tuesday",
      Petaling: "Monday",
      Klang: "Wednesday",
      "Kuala Langat": "Thursday",
      Sepang: "Tuesday",
      "Hulu Langat": "Monday",
    };
    return deliveryDays[regionName] || "Monday";
  };

  const getDeliveryInfo = (regionName: string): string => {
    const day = getDeliveryDay(regionName);
    return `We deliver to ${regionName} every ${day}. Place your order now to receive it this ${day}!`;
  };

  return (
    <div className="relative w-full h-[600px] bg-white rounded-lg overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [101.6, 3.2],
          scale: 35000,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Geographies geography={geojson}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isSelected = selectedRegion === geo.properties.id;
              const isHovered = hoveredRegion === geo.properties.id;
              const region: Region = {
                id: geo.properties.id,
                name: geo.properties.name,
                coordinates: [
                  geo.geometry.coordinates[0][0][0],
                  geo.geometry.coordinates[0][0][1],
                ],
                deliveryDay: getDeliveryDay(geo.properties.name),
                deliveryInfo: getDeliveryInfo(geo.properties.name),
              };

              return (
                <DeliveryInfo
                  key={geo.properties.id}
                  region={region}
                  onProceed={onRegionSelect}
                >
                  <Geography
                    key={geo.properties.id}
                    geography={geo}
                    onClick={() => handleRegionClick(geo)}
                    onMouseEnter={() => setHoveredRegion(geo.properties.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    style={{
                      default: {
                        fill: isSelected ? COLORS.selected : COLORS.default,
                        stroke: COLORS.stroke,
                        strokeWidth: 1,
                        outline: "none",
                      },
                      hover: {
                        fill: isSelected ? COLORS.selected : COLORS.hover,
                        stroke: COLORS.stroke,
                        strokeWidth: 1.5,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: COLORS.selected,
                        stroke: COLORS.stroke,
                        strokeWidth: 1.5,
                        outline: "none",
                      },
                    }}
                  />
                </DeliveryInfo>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
