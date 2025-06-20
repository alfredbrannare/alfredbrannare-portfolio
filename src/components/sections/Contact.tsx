import { contact } from '@/data/contact';
import Link from 'next/link';

const Contact = () => {
  const socialContact = contact.filter(
    (item) => item.type === 'social'
  );
  const directContact = contact.filter(
    (item) => item.type === 'direct'
  );

  return (
    <section
      className="flex flex-col justify-center items-center"
      id="contact"
    >
      <h1 className="text-5xl font-bold text-amber-500 mb-6 text-shadow-[1px_1px_0_rgba(0,0,0,0.7)]">
        Contact
      </h1>
      <div className="flex flex-wrap justify-center items-center text-center gap-4">
        {socialContact.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex flex-col items-center justify-center"
          >
            {item.icon && <item.icon className="w-6 h-6" />}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center text-center gap-6 mt-4">
        {directContact.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex flex-col items-center justify-center"
          >
            {item.icon && <item.icon className="w-6 h-6" />}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export { Contact };
