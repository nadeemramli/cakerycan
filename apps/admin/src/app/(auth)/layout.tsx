"use client";

import { AppLayout } from "@/components/layout/app-layout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
