import type { CollectionEntry } from 'astro:content'

export function byDateDesc<T extends { data: { date: Date } }>(a: T, b: T) {
  return b.data.date.valueOf() - a.data.date.valueOf()
}

export function formatMonthYear(date: Date) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export function groupWritingByYear(posts: CollectionEntry<'writing'>[]) {
  return posts.reduce<Record<string, CollectionEntry<'writing'>[]>>((groups, post) => {
    const year = String(post.data.date.getUTCFullYear())
    groups[year] ??= []
    groups[year].push(post)
    return groups
  }, {})
}

export function pillClass(category: string) {
  const normalized = category.toLowerCase()
  if (normalized.includes('phil')) return 'pill-p'
  if (normalized.includes('thesis') || normalized.includes('academic')) return 'pill-t'
  return 'pill-k'
}
