import type { Metadata } from "next";
import { Instrument_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cakerycan.com"),
  title: {
    template: "%s | CakeryCan",
    default: "CakeryCan - Premium Cakes & Pastries",
  },
  description:
    "Discover artisanal cakes and pastries crafted with love. Order custom cakes for any occasion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.variable} ${bricolageGrotesque.variable} font-sans antialiased min-h-screen flex flex-col bg-pattern`}
      >
        {/* Global page wrapper with 3D floating effect */}
        <div className="flex flex-col min-h-screen">
          <Header />
          {/* Main content wrapper with floating effect */}
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Content container with subtle floating effect */}
            <div className="relative">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
