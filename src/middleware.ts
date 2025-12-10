import { defineMiddleware } from "astro:middleware";
import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";
import { config } from "dotenv";
import * as cookie from "cookie";

config({ quiet: true });

const isProtectedRoute = createRouteMatcher(["/responses"]);

export const onRequest = defineMiddleware(async (context, next) => {
  const ignoredPaths = ["/api/code", "/api/submit", "/.well-known", "/favicon.ico"];
  const cookies = cookie.parse(context.request.headers.get("cookie") || "");

  // Always ignore these paths from all protection
  if (
    context.url.pathname === "/code" ||
    ignoredPaths.some(path => context.url.pathname.startsWith(path))
  ) {
    return next();
  }

  // Check if code is valid
  const isCodeValid = cookies.code && cookies.code === process.env.ACCESS_CODE;

  // Handle code parameter in URL
  const codeParam = context.url.searchParams.get("code");
  if (codeParam && codeParam === process.env.ACCESS_CODE) {
    const response = await next();

    response.headers.set(
      "Set-Cookie",
      cookie.serialize("code", codeParam, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year
      })
    );

    return response;
  }

  // Run Clerk middleware first to check authentication
  let isAuthenticated = false;

  const clerk = clerkMiddleware((auth, context) => {
    const authResult = auth();
    isAuthenticated = authResult.isAuthenticated;

    // If accessing admin routes, must be authenticated via Clerk
    if (!isAuthenticated && isProtectedRoute(context.request)) {
      return authResult.redirectToSignIn({ returnBackUrl: context.request.url });
    }
  });

  const clerkResponse = await clerk(context, next);

  // If Clerk returned a response (redirect to sign-in), return it
  if (clerkResponse && clerkResponse.status !== 200) {
    return clerkResponse;
  }

  // If user is authenticated via Clerk, allow access (bypass code requirement)
  if (isAuthenticated) {
    return clerkResponse || next();
  }

  // If not authenticated via Clerk, require code cookie for all other pages
  if (!isCodeValid) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/code",
      },
    });
  }

  // Code is valid, allow access
  return clerkResponse || next();
});
