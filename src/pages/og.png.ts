import type { APIRoute } from 'astro'

import { readFile } from 'node:fs/promises'

import { getEntry } from 'astro:content'

import OG from '@/components/OG'
import { getSettings } from '@/utils/content'
import { PNG } from '@/utils/create-image'

const settings = await getSettings()
const { data: main } = await getEntry('main', 'data')

const imageData = await readFile((main.image as unknown as { fsPath: string }).fsPath, 'base64')

export const GET: APIRoute = async function get() {
  const png = await PNG(OG(settings.meta.title, {
    width: main.image.width,
    height: main.image.height,
    src: `data:image/png;base64,${imageData}`,
  }), 1200, 630)

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
