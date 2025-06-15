import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Alfred Brännare Portfolio',
  description:
    'Created with NextJS, Tailwindcss and Shadcn',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased scroll-smooth`}
      >
        <Header />
        <div className="max-w-[1280px] mx-auto p-6">
          {children}
        </div>
      </body>
    </html>
  );
}
