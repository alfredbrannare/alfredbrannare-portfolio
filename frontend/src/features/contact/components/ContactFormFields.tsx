import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Mail, User } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { sendContact } from '@/features/contact/actions';
import { useState, SubmitEvent } from 'react';

export default function ContactFormFields() {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const result = await sendContact(formData);

    setIsPending(false);

    if (result?.success) {
      toast.success('Message sent successfully!');
      form.reset();
    } else {
      toast.error(result?.error || 'Something went wrong.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <User size={16} />
            </InputGroupAddon>
            <InputGroupInput
              id="name"
              name="name"
              placeholder="Name"
              required
            />
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <Mail size={16} />
            </InputGroupAddon>
            <InputGroupInput
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
            />
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            id="message"
            name="message"
            placeholder="Type your message here..."
            className="min-h-30"
            required
          />
        </Field>
      </FieldGroup>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
