import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <Section padding="large" background="subtle" className="min-h-[80vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative w-48 h-48 mx-auto mb-8">
          <Image
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop"
            alt="404 Cake Not Found"
            fill
            className="object-cover rounded-full"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Looks like this page has been eaten! Don't worry, we have plenty more
          delicious content for you.
        </p>
        <Link href="/">
          <Button className="group">
            <Home className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            Return Home
          </Button>
        </Link>
      </div>
    </Section>
  );
}
