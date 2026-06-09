export interface SkillResponse {
  id: number;
  name: string;
  type: string;
  iconUrl: string;
}

export interface CreateSkillRequest {
  name: string;
  type: string;
  iconUrl?: string | null;
}
