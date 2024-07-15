import type { APIRoute } from 'astro'

import { getImage } from 'astro:assets'
import { getEntry } from 'astro:content'

import OG from '@/components/OG'
import { getSettings } from '@/utils/content'
import { PNG } from '@/utils/create-image'

const settings = await getSettings()
const { data: main } = await getEntry('main', 'data')

const image = await getImage({ src: main.image, format: 'png' })

export const GET: APIRoute = async function get({ url }) {
  const png = await PNG(OG(settings.meta.title, {
    width: image.attributes.width,
    height: image.attributes.height,
    src: new URL(image.src, url).href,
  }), 1200, 630)

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
