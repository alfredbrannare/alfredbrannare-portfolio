import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import { LogIn } from 'lucide-react';

export default function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger className="text-white hover:text-brand-orange cursor-pointer transition-transform duration-300 hover:scale-110">
        <LogIn />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
