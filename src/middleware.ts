import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && req.nextUrl.pathname === "/auth/sign-in") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!user && req.nextUrl.pathname !== "/auth/sign-in") {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/auth/sign-in"],
};
