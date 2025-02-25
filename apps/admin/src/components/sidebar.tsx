"use client";

import * as React from "react";
import { Nav } from "@/components/nav";
import {
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarProvider,
  SidebarRoot,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function Sidebar() {
  return (
    <SidebarProvider>
      <SidebarRoot>
        <SidebarHeader>
          <SidebarHeaderTitle>CakeryCan</SidebarHeaderTitle>
          <SidebarTrigger />
        </SidebarHeader>
        <Nav />
      </SidebarRoot>
    </SidebarProvider>
  );
}
