import Nav from '@/components/layout/Nav';
import Image from 'next/image';

const primaryMeny = [
  { label: 'Home', href: '#' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
];

export default function Header() {
  return (
    <header className="w-full bg-zinc-950">
      <div className="mx-auto flex w-full max-w-4xl flex-row items-center justify-between px-4 py-2">
        <div>
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
        </div>
        <Nav navItems={primaryMeny} />
        <h1>Login</h1>
      </div>
    </header>
  );
}
