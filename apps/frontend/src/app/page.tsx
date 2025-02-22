import { Section } from "@/components/ui/section";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Section padding="large" background="primary">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to CakeryCan</h1>
          <p className="text-xl mb-8">
            Fresh baked goods delivered to your door
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-black/80 transition-colors">
            Order Now
          </button>
        </div>
      </Section>

      {/* Featured Products Section */}
      <Section background="default">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Specialties</h2>
          <p className="text-gray-600 mt-4">
            Discover our handcrafted selection of cakes and drinks
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product cards would go here */}
          <div className="bg-white p-6 rounded-lg shadow-md">Product 1</div>
          <div className="bg-white p-6 rounded-lg shadow-md">Product 2</div>
          <div className="bg-white p-6 rounded-lg shadow-md">Product 3</div>
        </div>
      </Section>

      {/* How It Works Section */}
      <Section background="subtle">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-gray-600 mt-4">
            Order your favorite treats in 3 simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">1. Choose</div>
            <p>Browse our menu and select your favorites</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">2. Order</div>
            <p>Place your order and choose delivery time</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">3. Enjoy</div>
            <p>Receive your fresh baked goods</p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section padding="large" background="primary">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl mb-8">
            Experience the taste of freshly baked happiness
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-black/80 transition-colors">
            View Menu
          </button>
        </div>
      </Section>
    </>
  );
}
