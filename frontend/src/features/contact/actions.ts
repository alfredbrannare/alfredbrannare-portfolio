'use client';

export async function sendContact(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
        name,
        email,
        message,
        from_name: name,
        replyto: email,
        subject: `Portfolio contact from ${name}`,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Web3Forms error:', response.status, errorBody);
      return { success: false, error: 'Failed to send message' };
    }

    return { success: true };
  } catch (error) {
    console.error('Network error:', error);
    return { success: false, error: 'Network error. Please try again later.' };
  }
}
