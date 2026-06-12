import { IconResult } from '@/features/skill/types';
import { useQuery } from '@tanstack/react-query';

interface DeviconEntry {
  name: string;
  versions: { svg: string[] };
}

const devIconUrl = 'https://cdn.jsdelivr.net/gh/devicons/devicon/devicon.json';
async function fetchDevIconIndex(): Promise<IconResult[]> {
  const response = await fetch(devIconUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch DevIcon index');
  }

  const data: DeviconEntry[] = await response.json();

  return data.map((icon) => {
    const version = icon.versions.svg.includes('original')
      ? 'original'
      : icon.versions.svg[0];

    return {
      title: icon.name,
      url: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.name}/${icon.name}-${version}.svg`,
      source: 'devicon',
    };
  });
}

interface SimpleIconsEntry {
  title: string;
  slug: string;
  hex: string;
}

const simpleIconsUrl =
  'https://cdn.jsdelivr.net/npm/simple-icons@latest/data/simple-icons.json';
async function fetchSimpleIconsIndex(): Promise<IconResult[]> {
  const response = await fetch(simpleIconsUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch SimpleIcons index');
  }

  const data: SimpleIconsEntry[] = await response.json();

  return data.map((icon) => {
    return {
      title: icon.title,
      url: `https://cdn.simpleicons.org/${icon.slug}/${icon.hex}.svg`,
      source: 'simpleicons',
    };
  });
}

export function useIconIndex(enabled: boolean) {
  return useQuery({
    queryKey: ['icon-index'],
    queryFn: async () => {
      const [devIcons, simpleIcons] = await Promise.all([
        fetchDevIconIndex(),
        fetchSimpleIconsIndex(),
      ]);

      return [...devIcons, ...simpleIcons];
    },
    staleTime: Infinity,
    gcTime: Infinity,
    enabled,
  });
}

export function searchIcons(index: IconResult[], term: string): IconResult[] {
  const trimmedTerm = term.trim().toLowerCase();
  if (!trimmedTerm) return [];

  const matches = index.filter((icon) => {
    return icon.title.toLowerCase().includes(trimmedTerm);
  });

  return matches.slice(0, 24);
}
