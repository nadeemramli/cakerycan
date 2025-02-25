"use client";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <main className="container relative flex items-center justify-center min-h-screen py-8">
        {children}
      </main>
    </div>
  );
}
