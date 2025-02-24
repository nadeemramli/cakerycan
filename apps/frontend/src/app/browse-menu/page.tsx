import { Section } from "@/components/ui/section";
import { ProductCategoryCard } from "@/components/ui/product-category-card";

export default function BrowseMenuPage() {
  return (
    <>
      <Section padding="large" background="primary">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-semibold mb-4">Our Menu</h1>
          <p className="text-gray-600 text-lg">
            Discover our delightful selection of treats
          </p>
        </div>
      </Section>

      <Section padding="large" background="default">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductCategoryCard
              title="Ice Cream Cakes"
              description="Indulge in our signature ice cream cakes, crafted with love and premium ingredients"
              imageSrc="/images/products/chocolate-cake-can.jpg"
              href="/browse-menu/ice-cream-cake"
            />
            <ProductCategoryCard
              title="Milky Drinks"
              description="Refresh yourself with our delicious selection of milky beverages"
              imageSrc="/images/products/milky-drinks-preview.jpg"
              href="/browse-menu/milky-drinks"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
