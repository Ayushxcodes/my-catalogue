"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import { ChevronRight } from "lucide-react";

type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage?: any;
  category?: string;
  readTime?: string;
};

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="bg-white min-h-screen py-20 px-6 xl:px-0">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Blog Posts
        </h2>
        <select className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-black">
          <option value="latest">Latest</option>
          <option value="popular">Popular</option>
          <option value="recommended">Recommended</option>
        </select>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post, i) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="relative aspect-video w-full border-b">
              {post.mainImage ? (
                <Image
                  src={urlFor(post.mainImage).width(800).height(600).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-700 uppercase tracking-wide">
                  {post.category || "Art & Expression"}
                </span>
                <span className="text-xs text-gray-500">
                  {post.readTime || "5 min read"}
                </span>
              </div>

              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                {post.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.slug.current}`}
                className="inline-flex items-center gap-1 mt-5 text-sm font-medium text-black hover:text-gray-700 transition-colors"
              >
                Read more
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
