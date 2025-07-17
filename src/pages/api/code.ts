import * as cookie from 'cookie';

export async function POST({ request }: { request: Request }) {
  const { code } = await request.json();

  if (code !== process.env.ACCESS_CODE) {
    return new Response(
      JSON.stringify({
        error: 'Invalid access code',
      }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': cookie.serialize('code', code, {
        path: '/',
        httpOnly: true,
        // secure: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year
      }),
    },
  });
}
