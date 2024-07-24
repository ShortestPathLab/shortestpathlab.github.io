import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["untagged"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
    }),
});

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      url: z.string().optional(),
      image: z.string().optional(),
      featured: z.boolean().optional(),
      order: z.number().optional().default(Number.MAX_SAFE_INTEGER),
      dark: z.boolean().optional().default(true),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      tags: z.array(z.string()).default(["untagged"]),
    }),
});
const team = defineCollection({
  type: "data",
  schema: () =>
    z.object({
      title: z.string(),
      affiliation: z.string().optional(),
      qualification: z.string().optional(),
      role: z.string().optional(),
      url: z.string().optional(),
      image: z.string().optional(),
      alumni: z.boolean().optional(),
      tags: z.array(z.string()).default(["untagged"]),
    }),
});

export const collections = { blog, projects, team };
