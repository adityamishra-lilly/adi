import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const home = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/home' }),
  schema: z.object({}),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** Optional one-line summary shown above the note body. */
    tldr: z.string().optional(),
    /** Used for the meta description and the RSS item; falls back to the site description. */
    description: z.string().optional(),
  }),
});

export const collections = { home, notes };
