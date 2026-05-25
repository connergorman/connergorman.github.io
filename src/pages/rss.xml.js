import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { byDateDesc } from '../lib/content'

export async function GET(context) {
  const posts = (await getCollection('writing', ({ data }) => !data.draft)).sort(byDateDesc)

  return rss({
    title: 'Conner Gorman',
    description: 'Technical posts on Kubernetes, distributed systems, and eBPF. Occasional notes on philosophy.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/writing/${post.id}/`,
      categories: [post.data.category],
    })),
    customData: `<language>en-us</language>`,
  })
}
