import { getProjects } from '@/features/project/api';
import ProjectTimeline from '@/features/project/components/ProjectTimeline';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function ProjectSection() {
  const projects = await getProjects();

  return (
    <section id="projects" className="scroll-mt-25">
      <SectionHeader
        title="Projects"
        description="A timeline of systems I've been a part of."
      />
      <div className="flex flex-col justify-center items-center">
        <ProjectTimeline projects={projects} />
        <Button>
          <Link href="/projects">View All Projects</Link>
        </Button>
      </div>
    </section>
  );
}
