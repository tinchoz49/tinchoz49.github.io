import type { APIRoute } from 'astro'

import { readFile } from 'node:fs/promises'
import path from 'node:path'

import OG from '@/components/OG'
import { getSettings } from '@/utils/content'
import { PNG } from '@/utils/create-image'

const settings = await getSettings()

const imageData = await readFile(path.join(process.cwd(), settings.meta.ogImage), 'base64')

export const GET: APIRoute = async function get() {
  const png = await PNG(OG({
    title: settings.meta.title,
    description: settings.meta.description,
    image: `data:image/png;base64,${imageData}`,
  }), 1200, 630)

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
