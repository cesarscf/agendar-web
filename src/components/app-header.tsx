import { Separator } from "./ui/separator"
import { SidebarTrigger } from "./ui/sidebar"

export function AppHeader({ children }: React.PropsWithChildren) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 ">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        {children}
      </div>
    </header>
  )
}
