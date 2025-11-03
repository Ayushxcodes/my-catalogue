import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

type BlogPost = {
  _id: string;
  title: string;
  mainImage?: any;
  body?: any;
  author?: string;
  readTime?: string;
};

// Fetch the post from Sanity
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      _id,
      title,
      mainImage,
      body,
      author,
      readTime
    }`,
    { slug }
  );
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params; // ✅ FIXED — await params here

  const post = await getBlogPost(slug);

  if (!post) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center text-gray-800 text-xl">
        Blog post not found.
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-20 px-6 xl:px-0">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        {/* Meta */}
        <p className="text-gray-600 mb-8">
          {post.author && `By ${post.author}`}{" "}
          {post.readTime && `• ${post.readTime}`}
        </p>

        {/* Image */}
        {post.mainImage && (
          <div className="relative w-full aspect-video mb-8">
            <Image
              src={urlFor(post.mainImage).width(1000).url()}
              alt={post.title}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          {Array.isArray(post.body) ? (
            <PortableText value={post.body} />
          ) : (
            <p>{post.body}</p>
          )}
        </article>
      </div>
    </div>
  );
}
