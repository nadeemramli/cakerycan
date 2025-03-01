import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Database - CakeryCan Admin",
  description: "Manage customer database",
};

export default function DatabaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
