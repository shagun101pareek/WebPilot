import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

/**
 * Require a signed-in user with an active Clerk organization.
 * All workflow data must be scoped to the returned `orgId` — never trust a client-supplied org id.
 */
export async function requireOrg() {
  const { isAuthenticated, userId, orgId } = await auth()

  if (!isAuthenticated || !userId) {
    redirect("/sign-in")
  }

  if (!orgId) {
    redirect("/organization")
  }

  return { userId, orgId }
}
