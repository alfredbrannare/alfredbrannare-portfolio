import { getSkill } from '@/utils/getSkill';
import { projects } from '@/data/projects';
import { ProjectsContent } from './ProjectsContent';

const Projects = async () => {
  const processedProjects = projects.map((project) => ({
    ...project,
    stack: project.stack.map(getSkill),
  }));

  return (
    <ProjectsContent
      processedProjects={processedProjects}
    />
  );
};

export { Projects };
