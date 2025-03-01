import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compass - CakeryCan Admin",
  description: "Business goals and direction tracking",
};

export default function CompassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
