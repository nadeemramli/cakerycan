import { Sidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/providers/sidebar-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="relative min-h-screen">
        <Sidebar />
        <main className="flex-1 transition-all duration-300 md:pl-[240px]">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
