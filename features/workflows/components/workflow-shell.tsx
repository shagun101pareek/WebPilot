import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function WorkflowShell({ workflowName }: { workflowName: string }) {
  return (
    <ResizablePanelGroup orientation="horizontal" className="flex-1">
      <ResizablePanel defaultSize={72} minSize={40}>
        <div className="flex h-full flex-col">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize={72} minSize={40}>
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Canvas for {workflowName}. React Flow comes in the next session.
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={28} minSize={16}>
              <div className="flex h-full items-center justify-center border-t text-sm text-muted-foreground">
                Run console
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={28} minSize={18}>
        <div className="flex h-full items-center justify-center border-l text-sm text-muted-foreground">
          Inspector
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
