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

      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-xl"
        role="alert"
      >
        <p className="block sm:inline">
          I am currently balancing study and work, so I
          might not be able to take on every project. Please
          feel free to reach out for more details.
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center text-center gap-4">
        {socialContact.map((item) => (
          <div key={item.id}>
            {item.image && (
              <Link href={item.href}>
                <Image
                  src={item.image}
                  alt={`${item.title} logo`}
                  width="200"
                  height="100"
                  className="object-contain"
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
