import { readFile } from 'node:fs/promises'

import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import compress from 'astro-compress'
import icon from 'astro-icon'
import robotsTxt from 'astro-robots-txt'
import webmanifest from 'astro-webmanifest'

import generatePDF from './integrations/generate-pdf.js'

/** @type {import('./src/types/content').Settings} */
const settings = JSON.parse(await readFile('./src/content/settings/data.json'))

export default defineConfig({
  site: process.env.SITE,
  integrations: [
    tailwind(),
    icon(),
    generatePDF(),
    sitemap(),
    robotsTxt(),
    webmanifest({
      name: settings.meta.title,
      icon: `.${settings.meta.faviconPath}`, // source for favicon & icons
      short_name: settings.meta.title,
      description: settings.meta.description,
      start_url: '/',
      theme_color: '#4f46e5',
      background_color: '#4f46e5',
      display: 'standalone',
    }),
    compress(),
  ],
  devToolbar: {
    enabled: false,
  },
})
