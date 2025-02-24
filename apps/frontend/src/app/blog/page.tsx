import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllBlogPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "CakeryCan Blog - Delicious Insights & Baking Tips",
  description:
    "Explore our collection of baking tips, cake decorating tutorials, and delicious recipes. Stay updated with the latest trends in the world of cakes and pastries.",
  openGraph: {
    title: "CakeryCan Blog - Delicious Insights & Baking Tips",
    description:
      "Explore our collection of baking tips, cake decorating tutorials, and delicious recipes.",
    images: ["/images/blog/blog-hero.jpg"],
  },
};

interface Props {
  searchParams: { category?: string };
}

export default async function BlogPage({ searchParams }: Props) {
  const { category } = searchParams;

  const allPosts = await getAllBlogPosts();
  const filteredPosts = category
    ? allPosts.filter((post) => post.frontmatter.category === category)
    : allPosts;

  // Get unique categories for the filter
  const categories = Array.from(
    new Set(allPosts.map((post) => post.frontmatter.category))
  );

  const featuredPost = allPosts[0]; // Always show the first post as featured

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Section
        padding="large"
        background="primary"
        className="relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">CakeryCan Blog</span>
              <span className="block text-pink-600 mt-2">
                Sweet Stories & Expert Tips
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover the art of baking, learn professional tips, and stay
              updated with the latest trends in the world of cakes and pastries.
            </p>
          </div>
        </div>
      </Section>

      {/* Category Navigation */}
      <Section padding="default" background="subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/blog"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                !category
                  ? "bg-pink-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              All Posts
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${cat}`}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize",
                  category === cat
                    ? "bg-pink-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Featured Post - Only show on main blog page */}
      {!category && featuredPost && (
        <Section padding="large" background="default">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Featured Post
            </h2>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 relative h-64 lg:h-auto">
                  <Image
                    src={featuredPost.frontmatter.coverImage}
                    alt={featuredPost.frontmatter.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="lg:w-1/2 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800 capitalize">
                      {featuredPost.frontmatter.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(
                        featuredPost.frontmatter.date
                      ).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredPost.frontmatter.readTime}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredPost.frontmatter.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {featuredPost.frontmatter.excerpt}
                  </p>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Button variant="default" className="group">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Posts Grid */}
      <Section padding="large" background={category ? "default" : "subtle"}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {category
              ? `${category.charAt(0).toUpperCase() + category.slice(1)} Posts`
              : "Recent Posts"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <Image
                    src={post.frontmatter.coverImage}
                    alt={post.frontmatter.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800 capitalize">
                      {post.frontmatter.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.frontmatter.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                    {post.frontmatter.title}
                  </h3>
                  <p className="text-gray-600">{post.frontmatter.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
