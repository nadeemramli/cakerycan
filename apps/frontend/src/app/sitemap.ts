import { getAllBlogPosts } from "@/lib/mdx";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getAllBlogPosts();

  // Base URLs
  const baseUrls: MetadataRoute.Sitemap = [
    {
      url: "https://cakerycan.com",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: "https://cakerycan.com/blog",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: "https://cakerycan.com/about-us",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    // Add other static pages here
  ];

  // Blog post URLs
  const blogUrls = blogPosts.map((post) => ({
    url: `https://cakerycan.com/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...baseUrls, ...blogUrls];
} 