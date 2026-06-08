import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

const OAUTH_LOGIN_URL =
  process.env.NEXT_PUBLIC_OAUTH_LOGIN_URL ??
  'http://localhost:8080/oauth2/authorization/github';

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
        <div>
          <Button render={<a href={OAUTH_LOGIN_URL} />}>
            Login with Github
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
