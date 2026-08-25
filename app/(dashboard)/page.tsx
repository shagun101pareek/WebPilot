import { WorkflowIcon } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { CreateWorkflowButton } from "@/features/workflows/components/create-workflow-button"

export default function WorkflowsPage() {
  return (
    <div className="flex flex-1 flex-col p-6">
      <Empty className="flex-1 border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <WorkflowIcon />
          </EmptyMedia>
          <EmptyTitle>No workflow selected</EmptyTitle>
          <EmptyDescription>
            Choose a workflow from the sidebar or create a new one to start
            automating the browser.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <CreateWorkflowButton />
        </EmptyContent>
      </Empty>
    </div>
  )
}
