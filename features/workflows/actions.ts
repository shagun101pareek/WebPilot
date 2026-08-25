"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { requireOrg } from "@/lib/auth"
import {
  createWorkflow,
  deleteWorkflow,
  updateWorkflowName,
} from "@/features/workflows/data"
import { generateSlug } from "@/features/workflows/lib/generate-slug"

function revalidateWorkflows() {
  revalidatePath("/", "layout")
}

export async function createWorkflowAction(name?: string) {
  const { orgId } = await requireOrg()
  const workflow = await createWorkflow(orgId, name?.trim() || generateSlug())

  revalidateWorkflows()
  redirect(`/workflows/${workflow.id}`)
}

export async function renameWorkflowAction(workflowId: string, name: string) {
  const { orgId } = await requireOrg()
  const trimmed = name.trim()

  if (!trimmed) {
    throw new Error("Workflow name is required")
  }

  const workflow = await updateWorkflowName(orgId, workflowId, trimmed)

  if (!workflow) {
    throw new Error("Workflow not found")
  }

  revalidateWorkflows()
  return workflow
}

export async function deleteWorkflowAction(workflowId: string) {
  const { orgId } = await requireOrg()
  const workflow = await deleteWorkflow(orgId, workflowId)

  if (!workflow) {
    throw new Error("Workflow not found")
  }

  revalidateWorkflows()
  redirect("/")
}
