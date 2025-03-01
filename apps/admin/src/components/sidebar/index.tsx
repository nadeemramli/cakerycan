"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSidebar } from "@/components/providers/sidebar-provider";
import {
  LayoutDashboard,
  ShoppingCart,
  Truck,
  Map,
  Database,
  Tag,
  UtensilsCrossed,
  Package,
  LogOut,
  ChevronLeft,
  Menu,
  DollarSign,
  Compass,
  FlaskConical,
  BarChart3,
  Building2,
  Wallet,
  Settings,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const routes = [
  {
    label: "Overview",
    routes: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
      },
      {
        label: "Ledger",
        icon: DollarSign,
        href: "/dashboard/ledger",
        color: "text-emerald-500",
      },
      {
        label: "Compass",
        icon: Compass,
        href: "/dashboard/compass",
        color: "text-indigo-500",
      },
    ],
  },
  {
    label: "Operations",
    routes: [
      {
        label: "Orders",
        icon: ShoppingCart,
        href: "/dashboard/orders",
        color: "text-violet-500",
      },
      {
        label: "Delivery",
        icon: Truck,
        href: "/dashboard/delivery",
        color: "text-pink-700",
      },
    ],
  },
  {
    label: "Products",
    routes: [
      {
        label: "Development",
        icon: FlaskConical,
        href: "/dashboard/development",
        color: "text-amber-600",
      },
      {
        label: "Menu & Recipe",
        icon: UtensilsCrossed,
        href: "/dashboard/menu",
        color: "text-red-500",
      },
      {
        label: "Inventory",
        icon: Package,
        href: "/dashboard/inventory",
        color: "text-blue-700",
      },
    ],
  },
  {
    label: "Customer",
    routes: [
      {
        label: "Promotions",
        icon: Tag,
        href: "/dashboard/promotions",
        color: "text-green-700",
      },
      {
        label: "Performance",
        icon: BarChart3,
        href: "/dashboard/performance",
        color: "text-purple-600",
      },
      {
        label: "Database",
        icon: Database,
        href: "/dashboard/database",
        color: "text-emerald-500",
      },
    ],
  },
  {
    label: "Management",
    routes: [
      {
        label: "Overhead",
        icon: Building2,
        href: "/dashboard/overhead",
        color: "text-orange-600",
      },
      {
        label: "Finance",
        icon: Wallet,
        href: "/dashboard/finance",
        color: "text-cyan-600",
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const { isCollapsed, toggleSidebar } = useSidebar();

  const SidebarContent = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b px-3">
        <Link href="/dashboard" className="flex items-center gap-2">
          {!isCollapsed && (
            <span className="text-lg font-semibold">CakeryCan</span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleSidebar}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              isCollapsed && "rotate-180"
            )}
          />
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <div className="space-y-4 py-4">
          {routes.map((section) => (
            <div key={section.label} className="px-3 py-2">
              {!isCollapsed && (
                <h4 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                  {section.label}
                </h4>
              )}
              <div className="space-y-1">
                {section.routes.map((route) => (
                  <TooltipProvider key={route.href} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={route.href}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                            pathname === route.href
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground",
                            isCollapsed && "justify-center"
                          )}
                        >
                          <route.icon className={cn("h-4 w-4", route.color)} />
                          {!isCollapsed && <span>{route.label}</span>}
                        </Link>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">
                          {route.label}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-3">
        <div className="flex items-center justify-between">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/logout"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
                    isCollapsed && "justify-center"
                  )}
                >
                  <LogOut className="h-4 w-4" />
                  {!isCollapsed && <span>Logout</span>}
                </Link>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">Logout</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors justify-center"
                >
                  <Settings className="h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );

  // Mobile sidebar
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-4 z-40 md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="left" className="w-[240px] p-0">
            {SidebarContent}
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r bg-background transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      {SidebarContent}
    </aside>
  );
}
