import { Hero } from '@/components/sections';

export default function Home() {
  return (
    <main>
      <Hero
        title="Hello,"
        description={
          <>
            My name is{' '}
            <span className="text-amber-500 font-semibold">
              Alfred
            </span>
            , a{' '}
            <span className="text-amber-500 font-semibold">
              Software Development
            </span>{' '}
            student at Lernia specializing in{' '}
            <span className="text-amber-500 font-semibold">
              Java
            </span>{' '}
            and{' '}
            <span className="text-amber-500 font-semibold">
              JavaScript
            </span>
          </>
        }
        content="I'm passionate about building a strong foundation in both frontend and backend technologies to create effective and user-friendly applications. I'm eager to continue expanding my expertise."
        imageUrl="/images/portrait.webp"
        imageAlt="Portrait of Alfred Brännare"
      />
    </main>
  );
}
