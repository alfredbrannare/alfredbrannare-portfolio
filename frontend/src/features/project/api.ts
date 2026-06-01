import {ProjectResponse} from "@/features/project/types";
import {apiGet} from "@/shared/lib/apiClient";

export function getProjects(): Promise<ProjectResponse[]> {
    return apiGet<ProjectResponse[]>("/api/projects");
}