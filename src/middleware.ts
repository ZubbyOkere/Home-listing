import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/bookings(.*)",
  "/checkout(.*)",
  "/favorites(.*)",
  "/rentals(.*)",
  "/reviews(.*)",
  "/profile(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (req.nextUrl.pathname === "/not-found") {
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) {
    const { userId } = auth();
    if (!userId) {
      // Redirect to sign-in instead of using protect()
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
