import { Section } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { CTACard } from "@/components/ui/cta-card";
import { Cookie, Store, Truck, Package } from "lucide-react";

const cookiesFAQ = [
  {
    title: "Are all your products muslim-friendly?",
    content:
      "Absolutely! We are in the midst of applying for the Halal Certification and we use all Halal-Certified ingredients, ensuring they're suitable for everyone to enjoy!",
    icon: <Cookie className="h-5 w-5" />,
  },
  {
    title: "Do your cookies contain milk?",
    content:
      "Only our Cereal Milk cookies contain toasted milk powder. The rest of our cookies don't have milk but has butter.",
    icon: <Cookie className="h-5 w-5" />,
  },
  {
    title: "Do you have any vegan option?",
    content:
      "Absolutely! Our Vegan Choc Pecan cookie is a dream for anyone looking for egg-free and dairy-free options.",
    icon: <Cookie className="h-5 w-5" />,
  },
  {
    title: "Do you have any gluten-free option?",
    content:
      "Yes, we do! Our Single's Life is completely gluten-free. Just keep in mind, due to the nature of the ingredients, it's best enjoyed on the day of purchase and is only available for In-Store Pickup & Klang Valley Delivery.",
    icon: <Cookie className="h-5 w-5" />,
  },
  {
    title: "How should I store the cookies, and how long do they last?",
    content:
      "Visit our Cookie Care page for all the storage tips to keep your cookies delicious.",
    icon: <Cookie className="h-5 w-5" />,
  },
];

const storeFAQ = [
  {
    title: "Where is EM'S Located?",
    content:
      "Our store is located in the heart of Bangsar. Drop by for a warm welcome and some freshly baked treats, see you there!\n\nEM'S Soft Chunky Cookies\nJln Telawi 2, Bangsar, 59100, Kuala Lumpur.\n\nTuesday - Sunday (Close on Mondays)\n10am - 6pm",
    icon: <Store className="h-5 w-5" />,
  },
  {
    title: "Can I dine in at EM'S?",
    content:
      "Absolutely! Not only can you savor our cookies fresh from the oven, but we also offer a delightful selection of drinks to accompany your treats. So come in, find a cozy spot, and enjoy the full EM'S experience. We can't wait to welcome you!",
    icon: <Store className="h-5 w-5" />,
  },
];

const deliveryFAQ = [
  {
    title: "Self Pickup",
    content: "Available during store operating hours.",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "KL & Selangor Delivery (Lalamove)",
    content: "Same-day delivery within Klang Valley.",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    title: "Nationwide Shipping (Postage via GD Express)",
    content: "Next-day delivery to most major cities.",
    icon: <Truck className="h-5 w-5" />,
  },
];

export default function FAQPage() {
  return (
    <>
      <Section padding="large" background="primary">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-semibold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about our cookies, store, and
            services.
          </p>
        </div>
      </Section>

      <Section padding="large" background="default">
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Cookies</h2>
            <Accordion items={cookiesFAQ} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Our Store</h2>
            <Accordion items={storeFAQ} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Ordering & Delivery</h2>
            <Accordion items={deliveryFAQ} />
          </div>
        </div>
      </Section>

      <Section padding="large" background="subtle">
        <div className="max-w-2xl mx-auto">
          <CTACard
            title="Still have questions?"
            description="We hope these answers help sweeten your day and make getting your favorite cookies even easier. If you need further assistance, don't hesitate to reach out!"
            buttonText="Contact Us"
            buttonHref="/help/contact"
          />
        </div>
      </Section>
    </>
  );
}
