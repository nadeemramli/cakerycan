"use client";

import * as React from "react";
import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Nav } from "@/components/nav";
import { useMediaQuery } from "@/hooks/use-media-query";

export function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">CakeryCan</span>
        </div>
        {!isDesktop && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-8 w-8"
            onClick={() => setOpen(false)}
          >
            <PanelLeft className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        )}
      </div>
      <Nav />
    </div>
  );

  if (!isDesktop) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-40 md:hidden"
          >
            <PanelLeft className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r bg-background md:flex">
      {SidebarContent}
    </aside>
  );
}
