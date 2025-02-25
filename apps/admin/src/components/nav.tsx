"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  CogIcon,
  CubeIcon,
  TagIcon,
  TruckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Operations",
    children: [
      {
        name: "Orders",
        href: "/orders",
        description: "Manage and track customer orders",
        icon: ClipboardDocumentListIcon,
      },
      {
        name: "Delivery",
        href: "/delivery",
        description: "Track deliveries and drivers",
        icon: TruckIcon,
      },
      {
        name: "Route Planning",
        href: "/route-planning",
        description: "Plan and optimize delivery routes",
        icon: CogIcon,
      },
    ],
  },
  {
    name: "Customer",
    children: [
      {
        name: "Database",
        href: "/customers",
        description: "Customer information and history",
        icon: UserGroupIcon,
      },
      {
        name: "Promotions",
        href: "/promotions",
        description: "Manage discounts and offers",
        icon: TagIcon,
      },
    ],
  },
  {
    name: "Products",
    children: [
      {
        name: "Menu & Recipes",
        href: "/menu",
        description: "Manage products and recipes",
        icon: CubeIcon,
      },
      {
        name: "Inventory",
        href: "/inventory",
        description: "Track ingredients and stock",
        icon: ClipboardDocumentListIcon,
      },
    ],
  },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 p-2">
      <Link
        href="/dashboard"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-colors",
          pathname === "/dashboard"
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "hover:bg-sidebar-accent/50"
        )}
      >
        <ChartBarIcon className="h-5 w-5" />
        <span>Dashboard</span>
      </Link>

      {navigation.map((group) => (
        <div key={group.name} className="space-y-2">
          <h4 className="px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
            {group.name}
          </h4>
          {group.children.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-colors",
                pathname === item.href
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
