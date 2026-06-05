import ProjectSection from '@/features/project/components/ProjectSection';
import SkillSection from '@/features/skill/components/SkillSection';
import { Separator } from '@/components/ui/separator';
import HeroSection from '@/features/hero/components/HeroSection';
import ContactSection from '@/features/contact/components/ContactSection';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="w-full min-h-screen mx-auto max-w-4xl px-6 py-12 flex flex-col gap-6">
      <div className="flex flex-col">
        <HeroSection />
        <Separator />
      </div>
      <SkillSection />
      <Separator />
      <ProjectSection />
      <Separator />
      <ContactSection />
    </main>
  );
}
