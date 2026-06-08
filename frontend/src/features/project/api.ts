import {
  CreateProjectRequest,
  ProjectResponse,
} from '@/features/project/types';
import { apiGet, apiSend } from '@/shared/lib/apiClient';

export function getProjects(): Promise<ProjectResponse[]> {
  return apiGet<ProjectResponse[]>('/api/projects');
}

export function createProject(
  input: CreateProjectRequest,
): Promise<ProjectResponse> {
  return apiSend<ProjectResponse>('POST', '/api/projects', input);
}
