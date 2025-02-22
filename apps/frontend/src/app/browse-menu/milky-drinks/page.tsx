import { ProductShowcase } from "@/components/ui/product-showcase";

export default function MilkyDrinksPage() {
  return (
    <ProductShowcase
      title="Strawberry Milky Drink"
      tagline="MEET THE DESSERT THAT'S CAUSING A WORLDWIDE SENSATION"
      description="Discover the essence of freshness with our Strawberry Cake in a Can. Each bite is a journey into the sweet, fresh layers of cake infused with the pure goodness of real strawberries. Immerse yourself in this delightful experience."
      productImage="/images/products/strawberry-drink-can.png"
      ingredients={[
        { name: "Cake Mix (Flour, Core Syrup)", amount: "Premium Grade" },
        { name: "Eggs" },
        { name: "Sugar Vanilla" },
        { name: "Vegetable Whipping Cream" },
        { name: "Sugar" },
        { name: "Fresh Strawberries" },
      ]}
      backgroundColor="#FFB6C1" // Light pink for strawberry theme
    />
  );
}
