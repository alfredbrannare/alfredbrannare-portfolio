// This file does not have a 'use client' directive. It's a Server Component.
import { getProcessedTechStack } from '@/utils/getSkill';
import { SkillsContent } from './SkillsContent';

const Skills = async () => {
  const processedTechStack = await getProcessedTechStack();

  return (
    <SkillsContent
      processedTechStack={processedTechStack}
    />
  );
};

export { Skills };
