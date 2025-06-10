import { Hero } from '@/components/sections';

export default function Home() {
  return (
    <main>
      <Hero
        title="Hello,"
        description={
          <div>
            <p>
              My name is <strong>Alfred</strong>, and I am
              studying{' '}
              <strong>
                Software Development in Java and JavaScript
              </strong>{' '}
              at Lernia.
            </p>
          </div>
        }
        content={
          <div>
            <p>
              As a student of Software Development in Java
              and JavaScript, I&apos;m building a strong
              foundation in both frontend and backend
              technologies.
            </p>
            <br />
            <p>
              My studies have covered full-stack
              development, MongoDB, Docker, SQL, TypeScript
              and more.
            </p>
            <br />
            <p>
              I&apos;m eager to continue expanding my
              expertise.
            </p>
          </div>
        }
        linkText="Learn More About Me"
        linkHref="/about"
        imageUrl="/images/portrait.webp"
        imageAlt="Portrait of Alfred Brännare"
      />
    </main>
  );
}
