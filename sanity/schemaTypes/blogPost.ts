import { defineType } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "slug", type: "slug", title: "Slug", options: { source: "title" } },
    { name: "body", type: "array", title: "Body", of: [{ type: "block" }] },
    {
      name: "mainImage",
      type: "image",
      title: "Main Image",
      options: { hotspot: true },
    },
  ],
});
