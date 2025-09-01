export const revalidate = 3600;

import {
  Hero,
  Skills,
  Projects,
  Contact,
} from '@/components/sections';

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
