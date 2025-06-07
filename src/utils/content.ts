import type { Sections, Settings } from '@/types/content'

import { getEntry } from 'astro:content'

export const getSettings: () => Promise<Settings> = async () => {
  const entry = await getEntry('settings', 'data')
  if (!entry) {
    throw new Error('Settings entry not found')
  }
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
  if (!entries[0] || !entries[1] || !entries[2] || !entries[3] || !entries[4] || !entries[5] || !entries[6] || !entries[7]) {
    throw new Error('Entries not found')
  }

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
