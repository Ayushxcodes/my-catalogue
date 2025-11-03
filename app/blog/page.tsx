import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

async function getBlogs(): Promise<BlogPost[]> {
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

  return (
    <div className="bg-white min-h-screen py-20 px-6 xl:px-0">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto flex items-end justify-between mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Blog Posts
        </h2>
        <Select defaultValue="latest">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="recommended">Recommended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <Card
            key={post._id}
            className="shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden rounded-2xl"
          >
            <CardHeader className="p-0">
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
            </CardHeader>

            <CardContent className="pb-6 px-6 pt-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-primary/5 text-primary hover:bg-primary/10 shadow-none">
                  {post.category || "Art & Expression"}
                </Badge>
                <span className="font-medium text-xs text-muted-foreground">
                  {post.readTime || "5 min read"}
                </span>
              </div>

              <h3 className="mt-4 text-[1.35rem] font-semibold tracking-tight text-gray-900">
                {post.title}
              </h3>
              <p className="mt-2 text-muted-foreground text-sm line-clamp-3">
                {post.excerpt}
              </p>

              <Link href={`/blog/${post.slug.current}`}>
                <Button size="sm" className="mt-6 shadow-none">
                  Read more <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
