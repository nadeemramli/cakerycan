"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { createAuthService } from "database";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const auth = createAuthService();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await auth.getCurrentUser();
        if (!user) {
          console.log("No user found in dashboard, redirecting to login");
          router.push("/login");
        } else {
          console.log("User authenticated in dashboard:", user.email);
        }
      } catch (err) {
        console.error("Auth check error:", err);
        router.push("/login");
      }
    };
    checkAuth();
  }, []);

  return (
    <div className="h-full relative">
      <div
        className={`${
          isSidebarOpen ? "md:pl-72" : "md:pl-0"
        } h-full w-full transition-all duration-300`}
      >
        <div className="h-full">
          <div
            className={`fixed inset-y-0 z-50 flex w-72 flex-col transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar />
          </div>
          <div className="relative">
            <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className="p-8">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
