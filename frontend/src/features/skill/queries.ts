import { createSkill, getSkills } from '@/features/skill/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
