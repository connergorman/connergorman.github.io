// astro.config.mjs
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://yourname.dev',
  integrations: [mdx()],

  vite: {
    plugins: [tailwindcss()],
  },
})
