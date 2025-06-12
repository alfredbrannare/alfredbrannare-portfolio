import type {
  TechStack,
  ProcessedTechStack,
} from '@/types';
import type { SimpleIcon } from 'simple-icons';
import * as simpleIcons from 'simple-icons';

export const techStack = {
  frontend: [
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
  ],
  backend: [
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
  ],
  other: [
    'GitHub',
    'Git',
    'Render',
    'Vercel',
    'Postman',
    'Figma',
  ],
} as const;

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
  };
};

export const processedTechStack: ProcessedTechStack = {
  frontend: techStack.frontend.map(getSkill),
  backend: techStack.backend.map(getSkill),
  other: techStack.other.map(getSkill),
};
