import type { JSX } from 'astro/jsx-runtime'

import fs from 'node:fs/promises'

import satori from 'satori'
import sharp from 'sharp'

export async function SVG(component: JSX.Element, width: number, height: number) {
  return await satori(component, {
    width,
    height,
    fonts: [
      {
        name: 'Inter',
        data: await fs.readFile(
          'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff'
        ),
        weight: 400,
      },
      {
        name: 'Inter',
        data: await fs.readFile(
          'node_modules/@fontsource/inter/files/inter-latin-800-normal.woff'
        ),
        weight: 800,
      },
    ],
  })
}

export async function PNG(component: JSX.Element, width: number, height: number) {
  return await sharp(Buffer.from(await SVG(component, width, height)))
    .png()
    .toBuffer()
}
