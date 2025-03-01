import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finance - CakeryCan Admin",
  description: "Finance management for CAPEX, loans, interest, and expansion",
};

export default function FinanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
