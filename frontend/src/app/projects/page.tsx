import { getProjects } from '@/features/project/api';
import ProjectCard from '@/features/project/components/ProjectCard';
import SectionHeader from '@/components/SectionHeader';
import { Separator } from '@base-ui/react';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="pb-4">
        <SectionHeader
          title="All Projects"
          description="A list of all my projects."
        />
        <Separator />
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
        {projects.map((project) => (
          <div
            key={project.id}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
