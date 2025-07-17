import { defineMiddleware } from 'astro:middleware';
import * as cookie from 'cookie';
import { config } from 'dotenv';

config();

export const onRequest = defineMiddleware(async (context, next) => {
  const ignoredPaths = ['/api/code', '/api/submit', '/.well-known', '/favicon.ico'];
  const cookies = cookie.parse(context.request.headers.get('cookie') || '');

  if (
    context.url.pathname === '/code' ||
    ignoredPaths.some(path => context.url.pathname.startsWith(path)) ||
    (cookies.code && cookies.code === process.env.ACCESS_CODE)
  ) {
    return next();
  }

  const codeParam = context.url.searchParams.get('code');

  if (codeParam && codeParam === process.env.ACCESS_CODE) {
    const response = await next();

    response.headers.set(
      'Set-Cookie',
      cookie.serialize('code', codeParam, {
        path: '/',
        httpOnly: true,
        // secure: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year
      })
    );

    return response;
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/code',
    },
  });
});
