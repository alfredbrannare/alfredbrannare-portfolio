import type { TechStack } from '@/types';
import type { SimpleIcon } from 'simple-icons';
import * as simpleIcons from 'simple-icons';

export const frontendTechStack = [
  'React',
  'Next.js',
  'HTML5',
  'JavaScript',
  'TypeScript',
  'Bootstrap',
  'Sass',
  'CSS',
  'Tailwind CSS',
  'MUI',
  'Vite',
  'Jest',
] as const;

export const backendTechStack = [
  'Docker',
  'Node.js',
  'Next.js',
  'MongoDB',
  'PostgreSQL',
  'JavaScript',
  'TypeScript',
  'Mongoose',
  'Express',
  'Jest',
] as const;

export const otherTechStack = [
  'GitHub',
  'Git',
  'Render',
  'Vercel',
  'Postman',
  'Figma',
] as const;

export const getSkill = (name: string): TechStack => {
  const icon = (
    Object.values(simpleIcons) as SimpleIcon[]
  ).find(
    (icon) =>
      icon.title.toLowerCase() === name.toLowerCase()
  );

  if (!icon) throw new Error(`Icon not found for ${name}`);

  return {
    title: icon.title,
    image: `https://cdn.simpleicons.org/${icon.slug}/${icon.hex}`,
    url: icon.source,
  };
};

export const frontendSkills: TechStack[] =
  frontendTechStack.map((tech) => getSkill(tech));
export const backendSkills: TechStack[] =
  backendTechStack.map((tech) => getSkill(tech));
export const otherSkills: TechStack[] = otherTechStack.map(
  (tech) => getSkill(tech)
);
