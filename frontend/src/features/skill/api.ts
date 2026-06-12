import {
  CreateSkillRequest,
  SkillResponse,
  UpdateSkillRequest,
} from '@/features/skill/types';
import { apiGet, apiSend } from '@/shared/lib/apiClient';

export function getSkills(): Promise<SkillResponse[]> {
  return apiGet<SkillResponse[]>('/api/skills');
}

export function createSkill(input: CreateSkillRequest): Promise<SkillResponse> {
  return apiSend<SkillResponse>('POST', '/api/skills', input);
}

export function updateSkill(
  id: number,
  input: UpdateSkillRequest,
): Promise<SkillResponse> {
  return apiSend<SkillResponse>('PUT', `/api/skills/${id}`, input);
}

export function deleteSkill(id: number): Promise<void> {
  return apiSend<void>('DELETE', `/api/skills/${id}`);
}
