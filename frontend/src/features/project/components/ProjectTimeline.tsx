import { ProjectResponse } from '@/features/project/types';
import ProjectCard from '@/features/project/components/ProjectCard';

interface ProjectTimelineProps {
  projects: ProjectResponse[];
}

export default function ProjectTimeline({ projects }: ProjectTimelineProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects found.</p>
      </div>
    );
  }

  const sortedProjects = [...projects].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <section className="space-y-12 max-w-4xl mx-auto px-4 py-8">
      <div className="relative border-l border-muted-foreground/20 ml-4 md:ml-36 space-y-12">
        {sortedProjects.map((project) => (
          <div
            key={project.id}
            className="relative pl-6 md:pl-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-2 md:gap-4 items-start group"
          >
            <div className="absolute left-0 top-2.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-muted-foreground/30 group-hover:bg-primary group-hover:scale-125 transition-all duration-200 z-10" />

            <div className="md:absolute md:right-full md:mr-8 md:top-1.5 whitespace-nowrap">
              <time className="text-xs font-mono font-semibold tracking-wider text-muted-foreground bg-muted/50 md:bg-transparent px-2 py-1 md:p-0 rounded">
                {project.date}
              </time>
            </div>

            <div className="max-w-xl transition-transform duration-300 group-hover:translate-x-1">
              <ProjectCard project={project} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
