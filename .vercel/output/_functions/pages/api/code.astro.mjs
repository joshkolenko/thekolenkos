import * as cookie from 'cookie';
export { renderers } from '../../renderers.mjs';

async function POST({ request }) {
  const { code } = await request.json();
  if (code !== process.env.ACCESS_CODE) {
    return new Response(
      JSON.stringify({
        error: "Invalid access code"
      }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookie.serialize("code", code, {
        path: "/",
        httpOnly: true,
        // secure: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 365)
        // 1 year
      })
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
