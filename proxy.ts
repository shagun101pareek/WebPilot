import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"])

const isOrgSelectionRoute = createRouteMatcher([
  "/organization(.*)",
  "/session-tasks(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    return
  }

  await auth.protect()

  if (isOrgSelectionRoute(req)) {
    return
  }

  const { orgId } = await auth()
  if (!orgId) {
    const url = new URL("/organization", req.url)
    return NextResponse.redirect(url)
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk(.*)",
  ],
}
