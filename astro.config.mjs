// astro.config.mjs
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://yourname.dev',

  vite: {
    plugins: [tailwindcss()],
  },
})
