import { Section } from "@/components/ui/section";
import { Timeline } from "@/components/ui/timeline";

const historyItems = [
  {
    year: "1984",
    title: "A recipe of inspiration: the first girl into discovered baking",
    description:
      "Our journey began with a young girl's passion for baking, experimenting with recipes in her family kitchen.",
    imageSrc: "/images/history/1984.jpg",
  },
  {
    year: "1990",
    title: "From post office to production site",
    description:
      "We transformed an old post office into our first commercial bakery, marking the beginning of our professional journey.",
    imageSrc: "/images/history/1990.jpg",
  },
  {
    year: "1995",
    title: "Time to spread our wings (and recipes)",
    description:
      "Expanding our reach, we began delivering our baked goods to local cafes and restaurants.",
    imageSrc: "/images/history/1995.jpg",
  },
  {
    year: "2000",
    title: "The family grows bigger",
    description:
      "Our team expanded as we welcomed more passionate bakers and opened our second location.",
    imageSrc: "/images/history/2000.jpg",
  },
  {
    year: "2010",
    title: "The great ice cream sundae dream comes true",
    description:
      "Launched our signature ice cream cake line, combining two beloved desserts into one amazing treat.",
    imageSrc: "/images/history/2010.jpg",
  },
  {
    year: "2015",
    title: 'Made a nationwide "New Treats to Try" list',
    description:
      "Our innovative recipes gained national recognition, featuring in major food publications.",
    imageSrc: "/images/history/2015.jpg",
  },
  {
    year: "2020",
    title: "Getting green and eco-friendly",
    description:
      "Implemented sustainable practices across all our operations, from packaging to delivery.",
    imageSrc: "/images/history/2020.jpg",
  },
  {
    year: "2024",
    title: "Fresh beginnings",
    description:
      "Launching our new online ordering system and expanding our delivery service to reach more customers.",
    imageSrc: "/images/history/2024.jpg",
  },
];

export default function AboutUsPage() {
  return (
    <>
      {/* Hero Section */}
      <Section padding="large" background="primary">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Our Sweet Journey</h1>
          <p className="text-xl text-gray-700">
            From a simple kitchen to your favorite bakery, discover the story of
            how we've been bringing smiles with our handcrafted treats since
            1984.
          </p>
        </div>
      </Section>

      {/* Timeline Section */}
      <Section padding="large" background="default" className="relative">
        <div className="max-w-6xl mx-auto">
          <Timeline items={historyItems} />
        </div>
      </Section>

      {/* Values Section */}
      <Section padding="default" background="subtle">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-gray-600">
                Using only the finest ingredients and time-tested recipes to
                create perfect treats every time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">
                Constantly exploring new flavors and techniques while respecting
                traditional baking methods.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600">
                Building lasting relationships with our customers and supporting
                local communities.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Team Section */}
      <Section padding="large" background="default">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-gray-600 mb-12">
            The passionate people behind your favorite treats
          </p>
          {/* Team members grid would go here */}
        </div>
      </Section>
    </>
  );
}
