import { and, desc, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { workflows } from "@/lib/db/schema"

export function listWorkflows(orgId: string) {
  return db
    .select()
    .from(workflows)
    .where(eq(workflows.orgId, orgId))
    .orderBy(desc(workflows.updatedAt))
}

export async function getWorkflow(orgId: string, workflowId: string) {
  const [workflow] = await db
    .select()
    .from(workflows)
    .where(and(eq(workflows.id, workflowId), eq(workflows.orgId, orgId)))
    .limit(1)

  return workflow ?? null
}

export async function createWorkflow(orgId: string, name: string) {
  const [workflow] = await db
    .insert(workflows)
    .values({ orgId, name })
    .returning()

  return workflow
}

export async function updateWorkflowName(
  orgId: string,
  workflowId: string,
  name: string
) {
  const [workflow] = await db
    .update(workflows)
    .set({ name })
    .where(and(eq(workflows.id, workflowId), eq(workflows.orgId, orgId)))
    .returning()

  return workflow ?? null
}

export async function deleteWorkflow(orgId: string, workflowId: string) {
  const [workflow] = await db
    .delete(workflows)
    .where(and(eq(workflows.id, workflowId), eq(workflows.orgId, orgId)))
    .returning()

  return workflow ?? null
}
