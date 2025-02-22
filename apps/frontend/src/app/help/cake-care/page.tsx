import { Section } from "@/components/ui/section";
import { CakeInstructions } from "@/components/ui/cake-instructions";

export default function CakeCarePage() {
  return (
    <>
      <Section padding="large" background="primary">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-semibold mb-4">Cake Care</h1>
          <p className="text-gray-600 text-lg">FOR SOFT & DELICIOUS CAKES</p>
        </div>
      </Section>

      <Section padding="large" background="default">
        <div className="max-w-4xl mx-auto">
          <CakeInstructions />
        </div>
      </Section>
    </>
  );
}
