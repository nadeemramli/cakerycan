"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ClipboardList,
  Truck,
  Route,
  Users,
  Tag,
  ChefHat,
  Package2,
  BarChart3,
  Settings,
} from "lucide-react";

const navigationItems = [
  {
    category: "Operations",
    items: [
      {
        title: "Orders",
        href: "/dashboard/orders",
        icon: <ClipboardList className="h-5 w-5" />,
        description: "Manage and track customer orders",
      },
      {
        title: "Delivery",
        href: "/dashboard/delivery",
        icon: <Truck className="h-5 w-5" />,
        description: "Track deliveries and drivers",
      },
      {
        title: "Route Planning",
        href: "/dashboard/routes",
        icon: <Route className="h-5 w-5" />,
        description: "Plan and optimize delivery routes",
      },
    ],
  },
  {
    category: "Customer",
    items: [
      {
        title: "Database",
        href: "/dashboard/customers",
        icon: <Users className="h-5 w-5" />,
        description: "Customer information and history",
      },
      {
        title: "Promotions",
        href: "/dashboard/promotions",
        icon: <Tag className="h-5 w-5" />,
        description: "Manage discounts and offers",
      },
    ],
  },
  {
    category: "Products",
    items: [
      {
        title: "Menu & Recipes",
        href: "/dashboard/products",
        icon: <ChefHat className="h-5 w-5" />,
        description: "Manage products and recipes",
      },
      {
        title: "Inventory",
        href: "/dashboard/inventory",
        icon: <Package2 className="h-5 w-5" />,
        description: "Track ingredients and stock",
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-72 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <span className="text-xl">CakeryCan</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start gap-2 px-4 text-sm font-medium">
          {navigationItems.map((section, index) => (
            <div
              key={section.category}
              className={cn("pb-4", index !== 0 && "pt-4")}
            >
              <h4 className="mb-1 px-2 text-sm font-semibold tracking-tight text-muted-foreground">
                {section.category}
              </h4>
              <div className="grid gap-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "transparent"
                    )}
                  >
                    {item.icon}
                    <div className="flex flex-col gap-1">
                      <span>{item.title}</span>
                      <span className="line-clamp-1 text-xs font-normal text-muted-foreground group-hover:text-accent-foreground/70">
                        {item.description}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t">
        <div className="flex items-center gap-3 p-4">
          <Link
            href="/dashboard/settings"
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
              pathname === "/dashboard/settings"
                ? "bg-accent text-accent-foreground"
                : "transparent"
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
