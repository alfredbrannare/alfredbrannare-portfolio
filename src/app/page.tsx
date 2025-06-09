import Hero from '@/components/sections/Hero';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="my-6 mx-6">
      <Hero
        title="Who am I?"
        description={
          <p>
            My name is <strong>Alfred</strong>, and I am
            studying{' '}
            <strong>
              System Development in Java and JavaScript
            </strong>{' '}
            at <strong>Lernia</strong>.
          </p>
        }
        content="I'm a passionate software developer specializing in front-end technologies with a keen eye for user experience and clean code. I enjoy building intuitive and performant web applications."
        linkText="Learn More About Me"
        linkHref="/about"
      />
      <Image
        src="/images/portrait.webp"
        width="450"
        height="450"
        alt="Image of the Alfred Brännare"
      />
    </main>
  );
}
