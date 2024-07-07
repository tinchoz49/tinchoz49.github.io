import type { CollectionEntry, z } from 'astro:content'

import type { LevelledSkillSchema, SkillLevelSchema, SkillSchema, SkillSetSchema } from '../content/config.ts'

export type SkillLevel = z.infer<typeof SkillLevelSchema>
export type LevelledSkill = z.infer<typeof LevelledSkillSchema>
export type SkillSet = z.infer<typeof SkillSetSchema>
export type Skill = z.infer<typeof SkillSchema>
export type Job = CollectionEntry<'experience'>['data']['jobs'][0]
export type Project = CollectionEntry<'projects'>['data']['projects'][0]

export type MainSection = CollectionEntry<'main'>['data']
export type SkillsSection = CollectionEntry<'skills'>['data']
export type ExperienceSection = CollectionEntry<'experience'>['data']
export type Settings = CollectionEntry<'settings'>['data']
export type ProjectsSection = CollectionEntry<'projects'>['data']
