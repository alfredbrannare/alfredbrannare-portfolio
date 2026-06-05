import Nav from '@/components/layout/Nav';
import Image from 'next/image';

const primaryMeny = [
  { label: 'Home', href: '#' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
];

export default function Header() {
  return (
    <header className="w-full bg-zinc-950 flex flex-row justify-between items-center px-4 py-2">
      <Image src="/logo.png" alt="Logo" width={50} height={50} />
      <Nav navItems={primaryMeny} />
      <h1>Login</h1>
    </header>
  );
}
