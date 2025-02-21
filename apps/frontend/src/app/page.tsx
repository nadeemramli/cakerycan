import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to CakeryCan</h1>
      <p className="text-xl">Fresh baked goods delivered to your door</p>
    </main>
  );
}
