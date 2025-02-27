"use client";

import { Sidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/providers/sidebar-provider";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/providers/sidebar-provider";
import { Breadcrumb } from "@/components/breadcrumb";

function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <main
      className={cn(
        "flex flex-col min-h-screen w-full transition-[margin] duration-300",
        isCollapsed ? "ml-16" : "ml-64"
      )}
    >
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4">
          <Breadcrumb />
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </main>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="relative flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  );
}
