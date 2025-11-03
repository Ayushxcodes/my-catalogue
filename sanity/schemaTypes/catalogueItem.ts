import { defineType } from "sanity";

export default defineType({
  name: "catalogueItem",
  title: "Catalogue Item",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "description", type: "text", title: "Description" },
    {
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
    },
  ],
});
