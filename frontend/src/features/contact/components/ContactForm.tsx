import { sendContact } from '@/features/contact/actions';

export default function ContactForm() {
  return (
    <form action={sendContact} className="space-y-4 max-w-lg">
      <input name="name" required placeholder="Name" className="w-full ..." />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="w-full ..."
      />
      <textarea
        name="message"
        required
        placeholder="Message"
        rows={5}
        className="w-full ..."
      />
      <button type="submit">Send</button>
    </form>
  );
}
