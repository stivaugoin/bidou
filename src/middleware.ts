import { CookieOptions, createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Get cookie from request object
        get(name: string) {
          return request.cookies.get(name)?.value;
        },

        // Set cookie on both request and response objects
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },

        // Remove cookie on both request and response objects
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    },
  );

  const { data } = await supabase.auth.getUser();
  const { user } = data;

  // Redirect to home page if user is logged in and trying to access sign in page
  if (user && request.nextUrl.pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect to sign in page if user is not logged in and trying to access a protected page
  if (!user && request.nextUrl.pathname !== "/sign-in") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
