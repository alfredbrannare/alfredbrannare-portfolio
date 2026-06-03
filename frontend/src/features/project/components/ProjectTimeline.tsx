import { ProjectResponse } from '@/features/project/types';
import ProjectCard from '@/features/project/components/ProjectCard';

interface ProjectTimelineProps {
  projects: ProjectResponse[];
}

export default function ProjectTimeline({ projects }: ProjectTimelineProps) {
  if (projects.length === 0) {
    return <p>No projects yet.</p>;
  }

  const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <ol className="relative border-s border-border ml-3">
      {sorted.map((project) => (
        <li key={project.id} className="mb-10 ms-6">
          <span className="absolute -start-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-primary" />
          <ProjectCard project={project} />
        </li>
      ))}
    </ol>
  );
}
