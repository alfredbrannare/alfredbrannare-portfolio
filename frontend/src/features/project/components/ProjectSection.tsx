import { getProjects } from '@/features/project/api';
import ProjectTimeline from '@/features/project/components/ProjectTimeline';
import SectionHeader from '@/components/SectionHeader';

export default async function ProjectSection() {
  const projects = await getProjects();

  return (
    <section>
      <SectionHeader
        title="Projects"
        description="A timeline of systems I've been a part of."
      />
      <ProjectTimeline projects={projects} />
    </section>
  );
}
