import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Performance - CakeryCan Admin",
  description: "Marketing and customer performance tracking",
};

export default function PerformanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
