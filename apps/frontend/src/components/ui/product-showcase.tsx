"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface Ingredient {
  name: string;
  amount?: string;
}

interface ProductShowcaseProps {
  title: string;
  tagline: string;
  description: string;
  productImage: string;
  ingredients: Ingredient[];
  className?: string;
  backgroundColor?: string;
}

export function ProductShowcase({
  title,
  tagline,
  description,
  productImage,
  ingredients,
  className,
  backgroundColor = "#FFE4E1", // Default pink background
}: ProductShowcaseProps) {
  return (
    <div
      className={cn("min-h-screen relative overflow-hidden", className)}
      style={{ backgroundColor }}
    >
      {/* Wavy top border */}
      <div className="absolute top-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill={backgroundColor}
          preserveAspectRatio="none"
          className="w-full h-[120px] transform rotate-180"
        >
          <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl md:text-2xl text-gray-700 uppercase tracking-wider">
            {tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="relative h-[500px] md:h-[600px]">
            <Image
              src={productImage}
              alt={title}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">
                INDULGE IN THE RICHNESS OF EACH LAYER
              </h2>
              <p className="text-gray-700 mb-8">{description}</p>

              <div>
                <h3 className="text-lg font-medium mb-4">Contains</h3>
                <ul className="space-y-2">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3" />
                      {ingredient.name}
                      {ingredient.amount && (
                        <span className="text-gray-500 ml-2">
                          ({ingredient.amount})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wavy bottom border */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill={backgroundColor}
          preserveAspectRatio="none"
          className="w-full h-[120px]"
        >
          <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>
    </div>
  );
}
