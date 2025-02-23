import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";

interface Cookie {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

const COOKIES: Cookie[] = [
  {
    id: "peanut-tart",
    name: "Peanut Tart Cookie",
    image: "/images/cookies/peanut-tart.jpg",
    price: 12.9,
    description: "Classic peanut butter cookie with a buttery tart texture",
  },
  {
    id: "sweet-potato",
    name: "Sweet Potato Style Pecan",
    image: "/images/cookies/sweet-potato.jpg",
    price: 12.9,
    description: "Sweet potato infused cookie topped with candied pecans",
  },
  {
    id: "milk-chocolate",
    name: "Milk Chocolate Sea Salt",
    image: "/images/cookies/milk-chocolate.jpg",
    price: 12.9,
    description: "Rich milk chocolate chunks with a sprinkle of sea salt",
  },
  {
    id: "pistachio",
    name: "Pistachio Sour",
    image: "/images/cookies/pistachio.jpg",
    price: 12.9,
    description:
      "Tangy pistachio cookie with a perfect balance of sweet and sour",
  },
  {
    id: "vegan-choc",
    name: "Vegan Choc Pecan",
    image: "/images/cookies/vegan-choc.jpg",
    price: 12.9,
    description: "Plant-based chocolate cookie loaded with pecans",
  },
  {
    id: "cereal-milk",
    name: "Cereal Milk",
    image: "/images/cookies/cereal-milk.jpg",
    price: 12.9,
    description: "Nostalgic cereal milk flavored cookie with a crunchy top",
  },
  {
    id: "classic-choc",
    name: "Classic Choc Macadamia",
    image: "/images/cookies/classic-choc.jpg",
    price: 12.9,
    description: "Traditional chocolate chip cookie with macadamia nuts",
  },
  {
    id: "red-velvet",
    name: "Signature Red Velvet",
    image: "/images/cookies/red-velvet.jpg",
    price: 12.9,
    description: "Our signature red velvet cookie with cream cheese chunks",
  },
];

interface BuildYourOwnSectionProps {
  selectedItems: string[];
  onSelectionChange: (items: string[]) => void;
}

export function BuildYourOwnSection({
  selectedItems,
  onSelectionChange,
}: BuildYourOwnSectionProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { addItem, updateQuantity } = useCartStore();

  const handleQuantityChange = (cookie: Cookie, change: number) => {
    const currentQty = quantities[cookie.id] || 0;
    const newQty = Math.max(0, currentQty + change);

    setQuantities((prev) => ({
      ...prev,
      [cookie.id]: newQty,
    }));

    // Update selected items for parent component
    const newSelectedItems = Object.entries({
      ...quantities,
      [cookie.id]: newQty,
    })
      .filter(([_, qty]) => qty > 0)
      .map(([id]) => id);

    onSelectionChange(newSelectedItems);

    // Update cart store
    if (newQty === 0) {
      updateQuantity(cookie.id, 0); // This will effectively remove the item
    } else {
      addItem({
        id: cookie.id,
        name: cookie.name,
        quantity: newQty,
        price: cookie.price,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-8 text-center">
        Choose Your Cookies
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COOKIES.map((cookie) => (
          <div
            key={cookie.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <Image
                src={cookie.image}
                alt={cookie.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2">{cookie.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{cookie.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  RM {cookie.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(cookie, -1)}
                    className={cn(
                      "p-1 rounded-full",
                      quantities[cookie.id]
                        ? "text-pink-600 hover:bg-pink-50"
                        : "text-gray-300"
                    )}
                    disabled={!quantities[cookie.id]}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center">
                    {quantities[cookie.id] || 0}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(cookie, 1)}
                    className="p-1 rounded-full text-pink-600 hover:bg-pink-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
