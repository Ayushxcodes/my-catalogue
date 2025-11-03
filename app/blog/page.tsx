import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage?: any;
};

async function getBlogs(): Promise<BlogPost[]> {
  return client.fetch(
    `*[_type == "blogPost"]{_id, title, slug, excerpt, mainImage}`
  );
}

export default async function BlogPage() {
  const posts = await getBlogs();

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <div
          key={post._id}
          className="border rounded-xl shadow-md p-4 bg-white"
        >
          {post.mainImage && (
            <Image
              src={urlFor(post.mainImage).width(400).url()}
              alt={post.title}
              width={400}
              height={250}
              className="rounded-lg object-cover"
            />
          )}
          <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
          <p className="text-gray-600">{post.excerpt}</p>
          <Link
            href={`/blog/${post.slug.current}`}
            className="text-blue-500 hover:underline"
          >
            Read more →
          </Link>
        </div>
      ))}
    </div>
  );
}
