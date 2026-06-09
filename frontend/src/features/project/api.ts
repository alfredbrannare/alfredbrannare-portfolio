import {
  CreateProjectRequest,
  ProjectResponse,
  UpdateProjectRequest,
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

export function updateProject(
  id: number,
  input: UpdateProjectRequest,
): Promise<ProjectResponse> {
  return apiSend<ProjectResponse>('PUT', `/api/projects/${id}`, input);
}

export function deleteProject(id: number): Promise<void> {
  return apiSend<void>('DELETE', `/api/projects/${id}`);
}
