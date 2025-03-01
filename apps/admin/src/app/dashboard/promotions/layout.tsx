import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promotions - CakeryCan Admin",
  description: "Manage promotions and discounts",
};

export default function PromotionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
