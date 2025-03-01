import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Development - CakeryCan Admin",
  description: "Product development and R&D management",
};

export default function DevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
