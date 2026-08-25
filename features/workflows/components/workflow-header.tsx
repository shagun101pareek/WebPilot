"use client"

import { useRef, useState, useTransition } from "react"
import { Trash2Icon } from "lucide-react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  deleteWorkflowAction,
  renameWorkflowAction,
} from "@/features/workflows/actions"
import type { Workflow } from "@/lib/db/schema"

export function WorkflowHeader({ workflow }: { workflow: Workflow }) {
  const [name, setName] = useState(workflow.name)
  const [isRenaming, startRename] = useTransition()
  const [isDeleting, startDelete] = useTransition()
  const lastSavedName = useRef(workflow.name)

  function saveName() {
    const nextName = name.trim()
    if (!nextName || nextName === lastSavedName.current) {
      setName(lastSavedName.current)
      return
    }

    startRename(async () => {
      try {
        const updated = await renameWorkflowAction(workflow.id, nextName)
        lastSavedName.current = updated.name
        setName(updated.name)
      } catch (error) {
        setName(lastSavedName.current)
        toast.error(
          error instanceof Error ? error.message : "Could not rename workflow"
        )
      }
    })
  }

  return (
    <div className="flex items-center justify-between gap-3 border-b px-4 py-2">
      <Input
        value={name}
        disabled={isRenaming}
        aria-label="Workflow name"
        className="h-8 max-w-sm border-transparent bg-transparent px-2 font-medium shadow-none focus-visible:border-input"
        onChange={(event) => setName(event.target.value)}
        onBlur={saveName}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur()
          }
          if (event.key === "Escape") {
            setName(lastSavedName.current)
            event.currentTarget.blur()
          }
        }}
      />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="sm" disabled={isDeleting}>
            <Trash2Icon />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this workflow?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes {workflow.name} from the current organization. This
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                startDelete(async () => {
                  await deleteWorkflowAction(workflow.id)
                })
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
