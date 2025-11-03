import { client } from "@/sanity/lib/client";
import BlogList from "@/components/BlogList/BlogList";

async function getBlogs() {
  return client.fetch(`
    *[_type == "blogPost"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      category,
      readTime
    }
  `);
}

export default async function BlogPage() {
  const posts = await getBlogs();
  return <BlogList posts={posts} />;
}
