import { defineType, defineField } from "sanity";

export const landingSection = defineType({
  name: "landingSection",
  title: "Landing Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Image (Right side)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
