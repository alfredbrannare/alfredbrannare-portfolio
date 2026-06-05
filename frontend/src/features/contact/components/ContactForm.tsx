'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ContactFormFields from '@/features/contact/components/ContactFormFields';
import SocialLinks from '@/features/contact/components/SocialLinks';
export default function ContactForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Me</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ContactFormFields />
        <SocialLinks />
      </CardContent>
    </Card>
  );
}
