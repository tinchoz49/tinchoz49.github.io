import type { CollectionEntry, z } from 'astro:content'

import type { LevelledSkillSchema, SectionSchema, SkillLevelSchema, SkillSchema, SkillSetSchema } from '../content/config'

export type MainSection = CollectionEntry<'main'>['data']
export type SkillsSection = CollectionEntry<'skills'>['data']
export type ExperienceSection = CollectionEntry<'experience'>['data']
export type Settings = CollectionEntry<'settings'>['data']
export type ProjectsSection = CollectionEntry<'projects'>['data']
export type EducationSection = CollectionEntry<'education'>['data']
export type TestimonialsSection = CollectionEntry<'testimonials'>['data']
export type FeedSection = CollectionEntry<'feed'>['data']

export type Section = z.infer<typeof SectionSchema>
export type SectionConfig = Section['config']
export type SkillLevel = z.infer<typeof SkillLevelSchema>
export type LevelledSkill = z.infer<typeof LevelledSkillSchema>
export type SkillSet = z.infer<typeof SkillSetSchema>
export type Skill = z.infer<typeof SkillSchema>
export type Job = ExperienceSection['jobs'][0]
export type Project = ProjectsSection['projects'][0]
export type Diploma = EducationSection['diplomas'][0]
export type Testimonial = TestimonialsSection['testimonials'][0]
export type Book = Required<FeedSection>['books']['data'][0]
export type Person = Required<FeedSection>['people']['data'][0]
export type Video = Required<FeedSection>['videos']['data'][0]
export type Media = Required<FeedSection>['medias']['data'][0]

export interface Sections {
  main: MainSection
  skills: SkillsSection
  experience: ExperienceSection
  projects: ProjectsSection
  education: EducationSection
  testimonials: TestimonialsSection
  favorites: FeedSection
  personal: FeedSection
}
