import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overhead - CakeryCan Admin",
  description: "Operational cost management",
};

export default function OverheadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
