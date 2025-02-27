import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings - CakeryCan Admin",
  description: "Manage your settings",
};

export default function SettingsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">Settings management coming soon...</div>
      </div>
    </div>
  );
}
