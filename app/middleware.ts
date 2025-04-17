import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/firebase/admin";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  // Protected auth routes
  const authRoutes = ["/sign-in", "/sign-up"];

  try {
    if (session) {
      // Verify the session cookie
      await auth.verifySessionCookie(session, true);

      // If authenticated user tries to access auth routes, redirect home
      if (authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.nextUrl.origin));
      }
    } else {
      // If no session and trying to access protected routes, redirect to sign-in
      if (!authRoutes.includes(pathname)) {
        return NextResponse.redirect(
          new URL("/sign-in", request.nextUrl.origin)
        );
      }
    }
  } catch (error) {
    // If invalid session, clear cookie and redirect
    const response = NextResponse.redirect(
      new URL("/sign-in", request.nextUrl.origin)
    );
    response.cookies.delete("session");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
