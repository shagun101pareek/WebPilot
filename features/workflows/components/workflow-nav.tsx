"use client"

import { useTransition } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PlusIcon, WorkflowIcon } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { createWorkflowAction } from "@/features/workflows/actions"
import type { Workflow } from "@/lib/db/schema"

export function WorkflowNav({ workflows }: { workflows: Workflow[] }) {
  const pathname = usePathname()
  const { state } = useSidebar()
  const [isPending, startTransition] = useTransition()

  function handleCreate() {
    startTransition(async () => {
      await createWorkflowAction()
    })
  }

  const items = workflows.map((workflow) => {
    const href = `/workflows/${workflow.id}`

    return (
      <SidebarMenuItem key={workflow.id}>
        <SidebarMenuButton
          asChild
          isActive={pathname === href}
          tooltip={workflow.name}
        >
          <Link href={href}>
            <WorkflowIcon />
            <span>{workflow.name}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  })

  if (state === "collapsed") {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Popover>
                <PopoverTrigger asChild>
                  <SidebarMenuButton tooltip="Workflows">
                    <WorkflowIcon />
                    <span>Workflows</span>
                  </SidebarMenuButton>
                </PopoverTrigger>
                <PopoverContent side="right" align="start" className="w-56 p-1">
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={handleCreate}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                  >
                    <PlusIcon className="size-4" />
                    {isPending ? "Creating..." : "New workflow"}
                  </button>
                  {workflows.length > 0 ? (
                    <div className="mt-1 border-t pt-1">
                      {workflows.map((workflow) => {
                        const href = `/workflows/${workflow.id}`
                        return (
                          <Link
                            key={workflow.id}
                            href={href}
                            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                          >
                            <WorkflowIcon className="size-4" />
                            <span className="truncate">{workflow.name}</span>
                          </Link>
                        )
                      })}
                    </div>
                  ) : null}
                </PopoverContent>
              </Popover>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workflows</SidebarGroupLabel>
      <SidebarGroupAction
        title="New workflow"
        disabled={isPending}
        onClick={handleCreate}
      >
        <PlusIcon />
        <span className="sr-only">New workflow</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.length > 0 ? (
            items
          ) : (
            <SidebarMenuItem>
              <SidebarMenuButton disabled>
                <WorkflowIcon />
                <span>No workflows yet</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
