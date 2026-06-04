import ProjectSection from '@/features/project/components/ProjectSection';
import SkillSection from '@/features/skill/components/SkillSection';
import { Separator } from '@/components/ui/separator';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="w-full min-h-screen mx-auto max-w-4xl px-6 py-12 flex flex-col gap-6">
      <Separator />
      <SkillSection />
      <Separator />
      <ProjectSection />
    </main>
  );
}
