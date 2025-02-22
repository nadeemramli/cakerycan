import { PolicyLayout } from "@/components/layout/policy-layout";

const privacyPolicySections = [
  {
    title: "Information We Collect",
    content: [
      "Personal Information: Name, email address, phone number, and delivery address when you place an order or create an account.",
      "Order Information: Details about the products you purchase, payment information, and delivery preferences.",
      "Usage Data: Information about how you interact with our website, including browsing history and device information.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "To process and fulfill your orders",
      "To communicate with you about your orders and provide customer support",
      "To send you marketing communications (with your consent)",
      "To improve our products and services",
      "To maintain the security of our website and prevent fraud",
    ],
  },
  {
    title: "Information Sharing",
    content:
      "We do not sell your personal information to third parties. We may share your information with delivery partners, payment processors, and other service providers who assist us in operating our business. These partners are bound by confidentiality agreements and are not permitted to use your information for their own purposes.",
  },
  {
    title: "Data Security",
    content:
      "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "Your Rights",
    content: [
      "Access your personal information",
      "Correct inaccurate information",
      "Request deletion of your information",
      "Opt-out of marketing communications",
      "Request a copy of your data",
    ],
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions about our privacy policy or how we handle your personal information, please contact us at privacy@cakerycan.com.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      description="At CakeryCan, we value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data when you use our services."
      sections={privacyPolicySections}
    />
  );
}
