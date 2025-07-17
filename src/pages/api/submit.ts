import { createRsvp } from '@db';

export async function POST({ request }: { request: Request }) {
  const { name, email, phone } = await request.json();

  if (!name || !email || !phone) {
    return new Response('Invalid input', { status: 400 });
  }

  try {
    // Assuming createRsvp is a function that inserts the RSVP into the database
    const result = await createRsvp(name, email, phone);
    console.log('RSVP created:', result);
    console.log('RSVP submitted:', { name, email, phone });
    return new Response('RSVP submitted successfully', { status: 200 });
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return new Response('Error submitting RSVP', { status: 500 });
  }
}
