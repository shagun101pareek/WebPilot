"use client"

import { useTransition } from "react"
import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { createWorkflowAction } from "@/features/workflows/actions"

export function CreateWorkflowButton({
  children = "New workflow",
  variant = "default",
  size = "default",
  className,
}: {
  children?: React.ReactNode
  variant?: React.ComponentProps<typeof Button>["variant"]
  size?: React.ComponentProps<typeof Button>["size"]
  className?: string
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await createWorkflowAction()
        })
      }}
    >
      <PlusIcon />
      {isPending ? "Creating..." : children}
    </Button>
  )
}
