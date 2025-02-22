import { ProductShowcase } from "@/components/ui/product-showcase";

export default function IceCreamCakePage() {
  return (
    <ProductShowcase
      title="Chocolate Ice Cream Cake"
      tagline="MEET THE DESSERT THAT'S CAUSING A WORLDWIDE SENSATION"
      description="Experience chocolate perfection with our Chocolate Cake in a Can. Indulge in layers of rich, moist cake, featuring the essence of premium cocoa. Elevate any occasion with this irresistible delight."
      productImage="/images/products/chocolate-cake-can.png"
      ingredients={[
        { name: "Cake Mix (Flour, Cocoa Syrup)", amount: "Premium Grade" },
        { name: "Eggs" },
        { name: "Sugar Vanilla" },
        { name: "Vegetable Whipping Cream" },
        { name: "Cocoa" },
        { name: "Chocolate Syrup" },
      ]}
      backgroundColor="#FFE4E1"
    />
  );
}
