import {
  createSkill,
  deleteSkill,
  getSkills,
  updateSkill,
} from '@/features/skill/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UpdateSkillRequest } from '@/features/skill/types';

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
  });
}

export function useCreateSkill() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSkill,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['skills'] }),
  });
}

export function useUpdateSkill() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateSkillRequest }) =>
      updateSkill(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['skills'] }),
  });
}

export function useDeleteSkill() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['skills'] }),
  });
}
