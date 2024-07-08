import type { Sections, Settings } from '@/types/content'

import { getEntry } from 'astro:content'

const sections = [
  'main',
  'skills',
  'experience',
  'projects',
  'education',
  'testimonials',
  'favorites',
] as const

export const getSettings: () => Promise<Settings> = async () => {
  const entry = await getEntry('settings', 'data')
  return entry.data
}

export const getSections: () => Promise<Partial<Sections>> = () => Promise.all(
  sections.map(sectionName => getEntry(sectionName, 'data'))
).then(entries =>
  entries.reduce((result, curr) => {
    result[curr.collection] = curr.data
    return result
  }, {} satisfies Partial<Sections>)
)
