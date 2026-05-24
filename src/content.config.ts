import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
  external: z.boolean().default(false),
})

const datedItemSchema = z.object({
  title: z.string(),
  organization: z.string().optional(),
  date: z.string(),
  summary: z.string(),
})

const about = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/about' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lede: z.string(),
    links: z.array(linkSchema).default([]),
    experience: z.array(datedItemSchema).default([]),
    education: z.array(datedItemSchema).default([]),
    skills: z.array(z.string()).default([]),
  }),
})

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    draft: z.boolean().default(false),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    website: z.string().url().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
})

export const collections = { about, writing, projects }
