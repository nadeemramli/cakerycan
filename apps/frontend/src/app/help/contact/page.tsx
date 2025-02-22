import { Section } from "@/components/ui/section";
import { ContactCard } from "@/components/ui/contact-card";
import { CorporateInquiryForm } from "@/components/ui/corporate-inquiry-form";
import { TikTokIcon } from "@/components/icons/tiktok";
import {
  MessageCircle,
  Clock,
  Phone,
  MessageSquare,
  Facebook,
  Building2,
} from "lucide-react";

export default function ContactPage() {
  const quickContactMethods = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "WhatsApp",
      description:
        "Get quick responses about orders, availability, and general inquiries",
      availability: "Available: 10am - 6pm (Tuesday - Sunday)",
      action: {
        text: "Chat on WhatsApp",
        href: "https://wa.me/60118085375",
      },
    },
    {
      icon: <TikTokIcon className="h-6 w-6" />,
      title: "TikTok Live",
      description:
        "Join our daily live sessions for real-time interaction and behind-the-scenes looks",
      availability: "Daily Live: 2pm - 4pm",
      action: {
        text: "Follow us on TikTok",
        href: "https://tiktok.com/@cakerycan",
      },
    },
    {
      icon: <Facebook className="h-6 w-6" />,
      title: "Facebook Messenger",
      description: "Chat with us on Facebook for inquiries and updates",
      action: {
        text: "Message on Facebook",
        href: "https://m.me/cakerycan",
      },
    },
  ];

  const supportMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      description: "For urgent matters and immediate assistance",
      availability: "Available: 10am - 6pm (Tuesday - Sunday)",
      action: {
        text: "Call +60 11-808 5375",
        href: "tel:+60118085375",
      },
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Email Support",
      description: "For detailed inquiries and formal communications",
      action: {
        text: "Email us",
        href: "mailto:support@cakerycan.com",
      },
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Store Visit",
      description: "Visit our store in Bangsar for in-person assistance",
      availability: "Open: 10am - 6pm (Tuesday - Sunday)",
      action: {
        text: "Get directions",
        href: "/location",
      },
    },
  ];

  return (
    <>
      <Section padding="large" background="primary">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
          <p className="text-gray-600 text-lg">
            We're here to help! Choose the best way to reach us.
          </p>
        </div>
      </Section>

      <Section padding="large" background="default">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quick Contact Methods */}
            <ContactCard
              title="Quick Contact"
              description="Get fast responses through these channels"
              methods={quickContactMethods}
            />

            {/* Support Options */}
            <ContactCard
              title="Additional Support"
              description="More ways to get in touch"
              methods={supportMethods}
            />
          </div>

          {/* Corporate & Bulk Orders Section */}
          <div className="mt-12 bg-background-subtle rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold">
                    Corporate & Bulk Orders
                  </h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Planning a corporate event, wedding, or need a large order? We
                  offer special arrangements for bulk orders and corporate
                  clients. Fill out the form, and our team will get back to you
                  with a customized solution.
                </p>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-medium mb-4">What we offer:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Custom branding options</li>
                    <li>• Bulk order discounts</li>
                    <li>• Corporate gift packages</li>
                    <li>• Event catering services</li>
                    <li>• Flexible delivery options</li>
                  </ul>
                </div>
              </div>

              <CorporateInquiryForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
