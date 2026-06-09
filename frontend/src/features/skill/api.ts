import { CreateSkillRequest, SkillResponse } from '@/features/skill/types';
import { apiGet, apiSend } from '@/shared/lib/apiClient';

export function getSkills(): Promise<SkillResponse[]> {
  return apiGet<SkillResponse[]>('/api/skills');
}

export function createSkill(input: CreateSkillRequest): Promise<SkillResponse> {
  return apiSend<SkillResponse>('POST', '/api/skills', input);
}
