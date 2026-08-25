import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { WorkflowNav } from "@/features/workflows/components/workflow-nav"
import { listWorkflows } from "@/features/workflows/data"
import { requireOrg } from "@/lib/auth"

export async function AppSidebar() {
  const { orgId } = await requireOrg()
  const workflows = await listWorkflows(orgId)

  return (
    <Sidebar>
      <SidebarHeader className="gap-3 p-3">
        <Link href="/" className="flex items-center gap-2 px-1">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
            W
          </span>
          <span className="text-sm font-semibold tracking-tight">WebPilot</span>
        </Link>
        <OrganizationSwitcher
          hidePersonal
          afterSelectOrganizationUrl="/"
          afterCreateOrganizationUrl="/"
          appearance={{
            elements: {
              rootBox: "w-full",
              organizationSwitcherTrigger:
                "w-full justify-between rounded-md border border-sidebar-border bg-sidebar px-2 py-1.5",
            },
          }}
        />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <WorkflowNav workflows={workflows} />
      </SidebarContent>
      <SidebarFooter className="p-3">
        <UserButton
          showName
          appearance={{
            elements: {
              rootBox: "w-full",
              userButtonTrigger: "w-full justify-start",
            },
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
