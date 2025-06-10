import Link from 'next/link';
import {
  Button,
  Sheet,
  SheetContent,
  SheetTrigger,
  DialogTitle,
} from '../ui';
import { HomeIcon, MenuIcon } from 'lucide-react';
import NavBar from './NavBar';

const Header = () => {
  return (
    <header className="flex flex-col px-4 py-4 bg-primary">
      <section className="flex flex-row justify-between items-center px-4 py-4 bg-primary">
        <Link
          href="/"
          className="text-stone-100 hover:text-amber-400 transition duration-200"
        >
          <HomeIcon />
        </Link>
        <h1 className="text-amber-500 font-semibold text-3xl">
          Alfred Brännare
        </h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="text-stone-100 hover:text-amber-400 bg-primary hover:bg-black transition duration-200 cursor-pointer hover:border-amber-400"
              aria-label="Open navigation menu"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="py-4 px-4">
            <DialogTitle className="text-center">
              Side Menu
            </DialogTitle>
            <h2>Test</h2>
          </SheetContent>
        </Sheet>
      </section>
      <section className="flex flex-row justify-center items-center px-1 py-1 bg-primary">
        <NavBar />
      </section>
    </header>
  );
};

export default Header;
