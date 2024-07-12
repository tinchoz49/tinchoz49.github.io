import type { Sections, Settings } from '@/types/content'

import { getEntry } from 'astro:content'

export const getSettings: () => Promise<Settings> = async () => {
  const entry = await getEntry('settings', 'data')
  return entry.data
}

export const getSections: () => Promise<Sections> = () => Promise.all([
  getEntry('main', 'data'),
  getEntry('skills', 'data'),
  getEntry('experience', 'data'),
  getEntry('projects', 'data'),
  getEntry('education', 'data'),
  getEntry('testimonials', 'data'),
  getEntry('feed', 'favorites'),
  getEntry('feed', 'personal'),
]).then((entries) => {
  return {
    main: entries[0].data,
    skills: entries[1].data,
    experience: entries[2].data,
    projects: entries[3].data,
    education: entries[4].data,
    testimonials: entries[5].data,
    favorites: entries[6].data,
    personal: entries[7].data,
  }
})
