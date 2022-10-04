export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!api/e2e).*)"],
};
