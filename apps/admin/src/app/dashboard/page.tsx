import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <div className="text-sm font-medium">Total Revenue</div>
          </div>
          <div className="text-2xl font-bold">$15,231.89</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <div className="text-sm font-medium">Active Orders</div>
          </div>
          <div className="text-2xl font-bold">+2350</div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <div className="text-sm font-medium">Inventory</div>
          </div>
          <div className="text-2xl font-bold">+12,234</div>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <div className="text-sm font-medium">Active Customers</div>
          </div>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
        </div>
      </div>
    </div>
  );
}
