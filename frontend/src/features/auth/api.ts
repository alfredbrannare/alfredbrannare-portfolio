import { MeResponse } from '@/features/auth/types';
import { apiGet } from '@/shared/lib/apiClient';

export function getMe(): Promise<MeResponse> {
  return apiGet<MeResponse>('/api/me');
}
