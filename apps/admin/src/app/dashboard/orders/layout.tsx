import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders - CakeryCan Admin",
  description: "Manage your orders",
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
