import { getProjects } from '@/features/project/api';
import ProjectCard from '@/features/project/components/ProjectCard';
import SectionHeader from '@/components/SectionHeader';
import { Separator } from '@base-ui/react';
import { Badge } from '@/components/ui/badge';

export default async function ProjectsPage() {
  const projects = await getProjects();
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

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
        {sortedProjects.map((project) => (
          <div
            key={project.id}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex"
          >
            <div className="relative w-full">
              <Badge
                variant="secondary"
                className="absolute top-2 left-2 z-10 backdrop-blur-sm"
              >
                {new Date(project.date).toLocaleDateString('sv-SE')}
              </Badge>
              <ProjectCard project={project} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
