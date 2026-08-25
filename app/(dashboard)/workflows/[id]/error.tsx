"use client"

import { RotateCwIcon, TriangleAlertIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function WorkflowError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-1 flex-col p-6">
      <Empty className="flex-1 border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <TriangleAlertIcon />
          </EmptyMedia>
          <EmptyTitle>Could not load workflow</EmptyTitle>
          <EmptyDescription>
            {error.message || "Something went wrong while opening this workflow."}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={reset}>
            <RotateCwIcon />
            Try again
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
