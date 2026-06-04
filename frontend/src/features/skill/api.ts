import { SkillResponse } from '@/features/skill/types';
import { apiGet } from '@/shared/lib/apiClient';

export function getSkills(): Promise<SkillResponse[]> {
  return apiGet<SkillResponse[]>('/api/skills');
}
