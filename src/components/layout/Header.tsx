import Link from 'next/link';
import {
  Button,
  Sheet,
  SheetContent,
  SheetTrigger,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '../ui';
import { MenuIcon } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex flex col justify-between items-center px-4 py-4 border border-grey">
      <h1>Hello</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <h2>Test</h2>
        </SheetContent>
      </Sheet>
    </header>
  );
}
