import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { getBlogPost, getAllBlogPosts } from "@/lib/mdx";
import { ShareButtons, ShareIcon } from "@/components/blog/share-buttons";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.slug);

    return {
      title: `${post.frontmatter.title} - CakeryCan Blog`,
      description: post.frontmatter.excerpt,
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.excerpt,
        images: [post.frontmatter.coverImage],
        type: "article",
        publishedTime: post.frontmatter.date,
        authors: [post.frontmatter.author.name],
      },
      keywords: post.frontmatter.seo?.keywords,
      alternates: {
        canonical: post.frontmatter.seo?.canonicalUrl,
      },
    };
  } catch (error) {
    return {
      title: "Article Not Found - CakeryCan Blog",
      description: "The requested article could not be found.",
    };
  }
}

export default async function ArticlePage({ params }: Props) {
  let post;
  try {
    post = await getBlogPost(params.slug);
  } catch (error) {
    notFound();
  }

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <Section padding="large" background="primary" className="relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800 capitalize">
              {post.frontmatter.category}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(post.frontmatter.date).toLocaleDateString()}
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              {post.frontmatter.readTime}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.frontmatter.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {post.frontmatter.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={post.frontmatter.author.image}
                  alt={post.frontmatter.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {post.frontmatter.author.name}
                </div>
                <div className="text-sm text-gray-500">
                  {post.frontmatter.author.role}
                </div>
              </div>
            </div>
            <ShareIcon />
          </div>
        </div>
      </Section>

      {/* Cover Image */}
      <div className="relative h-96 w-full">
        <Image
          src={post.frontmatter.coverImage}
          alt={post.frontmatter.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Article Content */}
      <Section padding="large" background="default">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-pink lg:prose-lg mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </Section>

      {/* Share Section */}
      <Section padding="large" background="subtle">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Enjoyed this article?
          </h2>
          <p className="text-gray-600 mb-6">
            Share it with your fellow baking enthusiasts!
          </p>
          <ShareButtons
            title={post.frontmatter.title}
            excerpt={post.frontmatter.excerpt}
          />
        </div>
      </Section>
    </article>
  );
}
