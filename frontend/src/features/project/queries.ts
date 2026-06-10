import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
} from './api';
import { UpdateProjectRequest } from './types';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateProjectRequest }) =>
      updateProject(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });
}

export function useUploadProjectImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, file} : { id: number; file: File }) =>
      uploadProjectImage(id, file),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });
}