import Nav from '@/components/layout/Nav';
import Image from 'next/image';
import LoginDialog from '@/features/auth/components/LoginDialog';

const primaryMeny = [
  { label: 'Home', href: '#' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
];

export default function Header() {
  return (
    <header className="w-full bg-zinc-950 sticky top-0 z-50">
      <div className="mx-auto flex w-full max-w-4xl flex-row items-center justify-between px-4 py-2">
        <div>
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
        </div>
        <div className="hidden sm:block">
          <Nav navItems={primaryMeny} variant="desktop" />
        </div>
        <div className="block sm:hidden">
          <Nav navItems={primaryMeny} variant="mobile" />
        </div>
        <LoginDialog />
      </div>
    </header>
  );
}
