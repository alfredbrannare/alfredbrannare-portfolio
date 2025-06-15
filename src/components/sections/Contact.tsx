import { contact } from '@/data/contact';
import Image from 'next/image';
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
      <div className="flex flex-row justify-top items-center text-center flex-shrink-0 min-w-[80px]">
        {socialContact.map((item) => (
          <div key={item.id}>
            {item.image && (
              <Link href={item.href}>
                <Image
                  src={item.image}
                  alt={`${item.title} logo`}
                  width="200"
                  height="100"
                />
              </Link>
            )}
            {item.icon && (
              <Link
                href={item.href}
                className="flex flex-col items-center justify-center"
              >
                <item.icon className="w-6 h-6" />
                <span>{item.title}</span>
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-top items-center text-center flex-shrink-0 min-w-[80px] mt-3">
        {directContact.map((item) => (
          <div key={item.id} className="mr-5">
            {item.icon && (
              <Link
                href={item.href}
                className="flex flex-col items-center justify-center"
              >
                <item.icon className="w-6 h-6" />
                <span>{item.title}</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export { Contact };
