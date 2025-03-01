import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ledger - CakeryCan Admin",
  description: "Ledger overview and management",
};

export default function LedgerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
