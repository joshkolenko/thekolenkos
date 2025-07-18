import { createRsvp } from '@db';

export async function POST({ request }: { request: Request }) {
  const { name, email, phone, guests, attending } = await request.json();

  if (!name || !email || !phone) {
    return new Response('Invalid input', { status: 400 });
  }

  try {
    await createRsvp({
      name,
      email,
      phone,
      guests,
      attending: attending !== undefined ? attending : true,
    });

    console.log('RSVP created:', { name, email, phone });

    return new Response(
      JSON.stringify({
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
