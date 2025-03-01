import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery - CakeryCan Admin",
  description: "Manage delivery operations",
};

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
