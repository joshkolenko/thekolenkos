import { d as defineMiddleware, s as sequence } from './chunks/index_s0uI0qjm.mjs';
import * as cookie from 'cookie';
import { config } from 'dotenv';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_BfVVGDyn.mjs';
import 'kleur/colors';
import './chunks/astro/server_BMAaEPJG.mjs';
import 'clsx';

config();
const onRequest$1 = defineMiddleware(async (context, next) => {
  const ignoredPaths = ["/api/code", "/api/submit", "/.well-known", "/favicon.ico"];
  const cookies = cookie.parse(context.request.headers.get("cookie") || "");
  console.log(cookies.code);
  if (context.url.pathname === "/code" || ignoredPaths.some((path) => context.url.pathname.startsWith(path)) || cookies.code && cookies.code === process.env.ACCESS_CODE) {
    return next();
  }
  const codeParam = context.url.searchParams.get("code");
  if (codeParam && codeParam === process.env.ACCESS_CODE) {
    const response = await next();
    response.headers.set(
      "Set-Cookie",
      cookie.serialize("code", codeParam, {
        path: "/",
        httpOnly: true,
        // secure: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 365)
        // 1 year
      })
    );
    return response;
  }
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/code"
    }
  });
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
