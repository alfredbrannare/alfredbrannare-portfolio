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

export interface CreateProjectRequest {
  title: string;
  date?: string | null;
  description?: string | null;
  deployLink?: string | null;
  repoLink?: string | null;
  image?: string | null;
  skillsIds?: number[] | null;
}

// The backend UpdateProjectRequest is field-for-field identical to create.
export type UpdateProjectRequest = CreateProjectRequest;
