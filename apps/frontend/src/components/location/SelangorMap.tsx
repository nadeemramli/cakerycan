import React, { useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { feature } from "topojson-client";
import { malaysiaTopoJson } from "./selangorTopo";
import { DeliveryInfo } from "./DeliveryInfo";
import type { Region } from "./locationData";

// Define colors
const COLORS = {
  default: "#FFF5E6", // Cream pastel
  selected: "#FFB6A3", // Soft coral when selected
  hover: "#FFE0D4", // Light peach on hover
  stroke: "#7C6E5D", // Warm brown stroke
  disabled: "#E5E5E5", // Gray for non-Selangor regions
};

interface SelangorMapProps {
  onRegionSelect: (region: Region) => void;
}

const DISTRICTS = [
  {
    id: "sabak-bernam",
    name: "Sabak Bernam",
    coordinates: [101.09, 3.65] as [number, number],
    deliveryDay: "Friday",
  },
  {
    id: "hulu-selangor",
    name: "Hulu Selangor",
    coordinates: [101.65, 3.8] as [number, number],
    deliveryDay: "Thursday",
  },
  {
    id: "kuala-selangor",
    name: "Kuala Selangor",
    coordinates: [101.35, 3.55] as [number, number],
    deliveryDay: "Wednesday",
  },
  {
    id: "gombak",
    name: "Gombak",
    coordinates: [101.75, 3.35] as [number, number],
    deliveryDay: "Tuesday",
  },
  {
    id: "petaling",
    name: "Petaling",
    coordinates: [101.5, 3.15] as [number, number],
    deliveryDay: "Monday",
  },
  {
    id: "klang",
    name: "Klang",
    coordinates: [101.35, 3.15] as [number, number],
    deliveryDay: "Wednesday",
  },
  {
    id: "kuala-langat",
    name: "Kuala Langat",
    coordinates: [101.4, 2.9] as [number, number],
    deliveryDay: "Thursday",
  },
  {
    id: "sepang",
    name: "Sepang",
    coordinates: [101.6, 2.75] as [number, number],
    deliveryDay: "Tuesday",
  },
  {
    id: "hulu-langat",
    name: "Hulu Langat",
    coordinates: [101.85, 3.15] as [number, number],
    deliveryDay: "Monday",
  },
  {
    id: "kuala-lumpur",
    name: "Kuala Lumpur",
    coordinates: [101.55, 3.25] as [number, number],
    deliveryDay: "Monday to Friday",
  },
] as const;

export function SelangorMap({ onRegionSelect }: SelangorMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Convert TopoJSON to GeoJSON
  const geojson = useMemo(() => {
    const states = malaysiaTopoJson.objects.states;
    return feature(malaysiaTopoJson, states);
  }, []);

  const handleRegionClick = (district: (typeof DISTRICTS)[number]) => {
    const region: Region = {
      id: district.id,
      name: district.name,
      coordinates: district.coordinates,
      deliveryDay: district.deliveryDay,
      deliveryInfo: getDeliveryInfo(district.name),
    };
    // Clear hover state if clicking the same region again
    if (selectedRegion === district.id) {
      setSelectedRegion(null);
      setHoveredRegion(null);
    } else {
      setSelectedRegion(district.id);
      setHoveredRegion(district.id);
      onRegionSelect(region);
    }
  };

  const handleHover = (districtId: string | null) => {
    // Only update hover state if no region is selected
    if (!selectedRegion) {
      setHoveredRegion(districtId);
    }
  };

  const getDeliveryInfo = (regionName: string): string => {
    const district = DISTRICTS.find((d) => d.name === regionName);
    const day = district?.deliveryDay || "Monday to Friday";
    return `We deliver to ${regionName} every ${day}. Place your order now to receive it this ${day}!`;
  };

  return (
    <div className="relative w-full h-[600px] bg-white rounded-lg overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [101.5, 3.3], // Adjusted center point
          scale: 22500,
        }}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#F0F4F8",
        }}
      >
        {/* Render state boundaries */}
        <Geographies geography={geojson}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isSelangorOrKL =
                geo.properties.Name === "Selangor" ||
                geo.properties.Name === "Kuala Lumpur";

              if (!isSelangorOrKL) {
                return (
                  <Geography
                    key={geo.id}
                    geography={geo}
                    style={{
                      default: {
                        fill: COLORS.disabled,
                        stroke: COLORS.stroke,
                        strokeWidth: 0.5,
                        outline: "none",
                        opacity: 0.5,
                      },
                      hover: {
                        fill: COLORS.disabled,
                        stroke: COLORS.stroke,
                        strokeWidth: 0.5,
                        outline: "none",
                        opacity: 0.5,
                      },
                      pressed: {
                        fill: COLORS.disabled,
                        stroke: COLORS.stroke,
                        strokeWidth: 0.5,
                        outline: "none",
                        opacity: 0.5,
                      },
                    }}
                  />
                );
              }

              return (
                <Geography
                  key={geo.id}
                  geography={geo}
                  style={{
                    default: {
                      fill: COLORS.default,
                      stroke: COLORS.stroke,
                      strokeWidth: 1,
                      outline: "none",
                    },
                    hover: {
                      fill: COLORS.default,
                      stroke: COLORS.stroke,
                      strokeWidth: 1,
                      outline: "none",
                    },
                    pressed: {
                      fill: COLORS.default,
                      stroke: COLORS.stroke,
                      strokeWidth: 1,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* Render district markers */}
        {DISTRICTS.map((district) => (
          <DeliveryInfo
            key={district.id}
            region={{
              id: district.id,
              name: district.name,
              coordinates: district.coordinates,
              deliveryDay: district.deliveryDay,
              deliveryInfo: getDeliveryInfo(district.name),
            }}
          >
            <Marker coordinates={district.coordinates}>
              <circle
                r={5} // Slightly smaller radius
                fill={
                  selectedRegion === district.id ||
                  hoveredRegion === district.id
                    ? COLORS.selected
                    : COLORS.default
                }
                stroke={COLORS.stroke}
                strokeWidth={1}
                style={{ cursor: "pointer" }}
                onClick={() => handleRegionClick(district)}
                onMouseEnter={() => handleHover(district.id)}
                onMouseLeave={() => handleHover(null)}
              />
              <text
                textAnchor="middle"
                y={-8} // Slightly closer to the marker
                style={{
                  fontFamily: "system-ui",
                  fontSize: "8px", // Smaller font size
                  fill: COLORS.stroke,
                  cursor: "pointer",
                }}
                onClick={() => handleRegionClick(district)}
              >
                {district.name}
              </text>
            </Marker>
          </DeliveryInfo>
        ))}
      </ComposableMap>
    </div>
  );
}
