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
  ChevronDown,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  color?: string;
  isCollapsed?: boolean;
}

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  color,
  isCollapsed,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href === "/dashboard" && pathname === "/");

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
              "hover:bg-gray-100 dark:hover:bg-gray-800",
              "relative",
              isActive
                ? [
                    "text-black dark:text-white font-medium",
                    "border border-gray-200 dark:border-gray-700",
                    "bg-gray-50 dark:bg-gray-800",
                  ]
                : [
                    "text-gray-900 dark:text-gray-100",
                    "hover:text-black dark:hover:text-white",
                  ],
              isCollapsed && "justify-center"
            )}
          >
            <span className="relative z-10">
              <Icon
                className={cn(
                  "h-4 w-4",
                  isActive && "text-black dark:text-white"
                )}
              />
            </span>
            {!isCollapsed && (
              <span className={cn("relative z-10")}>{label}</span>
            )}
          </Link>
        </TooltipTrigger>
        {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

interface SidebarMenuSubProps {
  label: string;
  routes: {
    label: string;
    icon: React.ElementType;
    href: string;
    color?: string;
  }[];
  isCollapsed?: boolean;
  defaultOpen?: boolean;
}

const SidebarMenuSub = ({
  label,
  routes,
  isCollapsed,
  defaultOpen = true,
}: SidebarMenuSubProps) => {
  const pathname = usePathname();

  if (isCollapsed) {
    return (
      <div className="px-2 py-2">
        {routes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
            isCollapsed={true}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="px-3 py-2">
      <h4 className="mb-2 px-2 text-xs font-medium text-gray-500 dark:text-gray-400">
        {label}
      </h4>
      <div className="space-y-1">
        {routes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      </div>
    </div>
  );
};

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const { isCollapsed, toggleSidebar } = useSidebar();

  const SidebarContent = (
    <div className="flex h-full flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b px-3">
        <Link href="/dashboard" className="flex items-center gap-2">
          {!isCollapsed && (
            <span className="text-lg font-semibold text-black dark:text-white">
              CakeryCan
            </span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-500"
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
        <div className="space-y-2 py-4">
          <SidebarMenuSub
            label="Overview"
            isCollapsed={isCollapsed}
            defaultOpen={true}
            routes={[
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
            ]}
          />

          <SidebarMenuSub
            label="Operations"
            isCollapsed={isCollapsed}
            routes={[
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
            ]}
          />

          <SidebarMenuSub
            label="Products"
            isCollapsed={isCollapsed}
            routes={[
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
            ]}
          />

          <SidebarMenuSub
            label="Customer"
            isCollapsed={isCollapsed}
            routes={[
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
            ]}
          />

          <SidebarMenuSub
            label="Management"
            isCollapsed={isCollapsed}
            routes={[
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
            ]}
          />
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-3">
        <div
          className={cn(
            "flex items-center",
            isCollapsed ? "justify-center" : "justify-between gap-2"
          )}
        >
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/logout"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
                    isCollapsed && "px-2"
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

          {!isCollapsed && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center rounded-lg p-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
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
