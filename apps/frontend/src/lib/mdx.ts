import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPostFrontmatter {
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  seo: {
    keywords: string[];
    canonicalUrl?: string;
  };
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
}

export async function getBlogPost(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  
  const { content, data } = matter(source);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "append" })
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    frontmatter: data as BlogPostFrontmatter,
    content: processedContent.toString(),
  };
}

export async function getAllBlogPosts() {
  const files = fs.readdirSync(BLOG_DIR);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(".mdx", "");
        const post = await getBlogPost(slug);
        return post;
      })
  );

  // Sort posts by date
  return posts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

export async function getBlogPostsByCategory(category: string) {
  const posts = await getAllBlogPosts();
  return posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category.toLowerCase()
  );
} 