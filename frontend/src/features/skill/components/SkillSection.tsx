import SectionHeader from '@/components/SectionHeader';
import { getSkills } from '@/features/skill/api';
import SkillTabs from '@/features/skill/components/SkillTabs';

export default async function SkillSection() {
  const skills = await getSkills();

  return (
    <section>
      <SectionHeader
        title="Skills"
        description="A list of what I've worked with"
      />
      <SkillTabs skills={skills} />
    </section>
  );
}
