import { Mail, Phone } from 'lucide-react';

const contact = [
  {
    id: 1,
    title: 'LinkedIn',
    image: '/images/contact/LI-Logo.webp',
    href: 'https://www.linkedin.com/in/alfred-br%C3%A4nnare-308b2a1b9/',
    type: 'social',
  },
  {
    id: 2,
    title: 'GitHub',
    image: '/images/contact/Github_Logo.webp',
    href: 'https://github.com/alfredbrannare',
    type: 'social',
  },
  {
    id: 3,
    title: '+46705484632',
    icon: Phone,
    href: 'tel:+46705484632',
    type: 'direct',
  },
  {
    id: 4,
    title: 'alfred-brannare@hotmail.com',
    icon: Mail,
    href: 'mailto:alfred-brannare@hotmail.com',
    type: 'direct',
  },
];

export { contact };
