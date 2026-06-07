import { getProjects } from '@/features/project/api';
import ProjectCard from '@/features/project/components/ProjectCard';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
