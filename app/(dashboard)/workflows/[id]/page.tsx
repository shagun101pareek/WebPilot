import { notFound } from "next/navigation"

import { WorkflowHeader } from "@/features/workflows/components/workflow-header"
import { WorkflowShell } from "@/features/workflows/components/workflow-shell"
import { getWorkflow } from "@/features/workflows/data"
import { requireOrg } from "@/lib/auth"

export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { orgId } = await requireOrg()
  const workflow = await getWorkflow(orgId, id)

  if (!workflow) {
    notFound()
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <WorkflowHeader workflow={workflow} />
      <WorkflowShell workflowName={workflow.name} />
    </div>
  )
}
