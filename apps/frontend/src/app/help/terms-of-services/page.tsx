import { PolicyLayout } from "@/components/layout/policy-layout";

const termsOfServiceSections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing and using CakeryCan's website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.",
  },
  {
    title: "Use of Services",
    content: [
      "You must be at least 18 years old to use our services.",
      "You agree to provide accurate and complete information when creating an account or placing orders.",
      "You are responsible for maintaining the confidentiality of your account credentials.",
      "You agree not to use our services for any unlawful purpose.",
    ],
  },
  {
    title: "Ordering and Payment",
    content: [
      "All orders are subject to availability and confirmation of the order price.",
      "Prices are in Malaysian Ringgit (RM) and include applicable taxes.",
      "Payment must be made in full at the time of ordering.",
      "We accept major credit cards, online banking, and other payment methods as indicated during checkout.",
    ],
  },
  {
    title: "Delivery and Pickup",
    content: [
      "Delivery times are estimates and not guaranteed.",
      "You are responsible for ensuring the delivery address is correct.",
      "For pickup orders, items must be collected at the specified time and location.",
      "Uncollected orders may be disposed of and are not eligible for refund.",
    ],
  },
  {
    title: "Product Information",
    content:
      "While we strive to display our products accurately, slight variations in appearance may occur. We do not guarantee that product colors and appearances will be exact as shown on your device screen.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content on our website, including text, graphics, logos, and images, is our property and protected by copyright laws. You may not use our content without our express written permission.",
  },
  {
    title: "Limitation of Liability",
    content:
      "CakeryCan shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.",
  },
  {
    title: "Changes to Terms",
    content:
      "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes constitutes acceptance of the modified terms.",
  },
  {
    title: "Contact Information",
    content:
      "If you have any questions about these Terms of Service, please contact us at legal@cakerycan.com.",
  },
];

export default function TermsOfServicePage() {
  return (
    <PolicyLayout
      title="Terms of Service"
      description="Please read these terms carefully before using our services. These terms govern your use of CakeryCan's website and services, including our ordering and delivery systems."
      sections={termsOfServiceSections}
    />
  );
}
