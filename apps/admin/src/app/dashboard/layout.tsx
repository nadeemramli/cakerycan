import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Sidebar />
      <main className="flex-1 md:pl-64">
        <div className="container mx-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
