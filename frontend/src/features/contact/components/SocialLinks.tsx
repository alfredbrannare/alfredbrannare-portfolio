import Link from 'next/link';
import Image from 'next/image';

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/alfredbrannare',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alfred-br%C3%A4nnare-308b2a1b9/',
  },
];

export default function SocialLinks() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full">
      <p className="text-sm text-muted-foreground font-medium">
        Psst, you can also find me here...
      </p>

      <div className="flex items-center gap-4">
        {socialLinks.map((link) => {
          return (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              className="hover:scale-110 transition-transform"
            >
              <Image
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${link.label.toLowerCase()}/${link.label.toLowerCase()}-original.svg`}
                alt={link.label}
                width={30}
                height={30}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
