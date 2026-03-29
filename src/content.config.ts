import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

export const collections = {
  docs: defineCollection({
    loader: glob({
      base: "./src/content/docs",
      pattern: "**/*.{md,mdx}",
    }),
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      stability: z.enum(["dev", "beta", "stable"]).optional().default("stable"),
    }),
  }),
};
