"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/sidebar/index";
import { ModeToggle } from "@/components/mode-toggle";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/providers/sidebar-provider";

function Header() {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={cn(
        "fixed top-0 h-14 border-b bg-background",
        "transition-all duration-300",
        isCollapsed ? "left-[70px] right-0" : "left-[240px] right-0"
      )}
    >
      <div className="flex h-full items-center justify-between px-4">
        <Breadcrumb />
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={cn(
        "min-h-screen transition-all duration-300",
        isCollapsed ? "pl-[70px]" : "pl-[240px]"
      )}
    >
      <Header />
      <main className="pt-14">{children}</main>
    </div>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="relative min-h-screen bg-background">
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  );
}
