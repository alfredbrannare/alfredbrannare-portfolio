import ProjectSection from '@/features/project/components/ProjectSection';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="w-full min-h-screen mx-auto max-w-4xl px-6 py-12">
      <ProjectSection />
    </main>
  );
}
