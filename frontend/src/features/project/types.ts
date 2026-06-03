import { SkillResponse } from '@/features/skill/types';

export interface ProjectResponse {
  id: number;
  title: string;
  date: string;
  description: string;
  deployLink: string | null;
  repoLink: string | null;
  image: string | null;
  stack: SkillResponse[];
}
