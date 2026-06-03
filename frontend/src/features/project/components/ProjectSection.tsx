import { getProjects } from '@/features/project/api';
import ProjectTimeline from '@/features/project/components/ProjectTimeline';

export default async function ProjectSection() {
  const projects = await getProjects();

  return (
    <section>
      <ProjectTimeline projects={projects} />
    </section>
  );
}
