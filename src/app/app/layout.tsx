import { redirect } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { getSession } from "@/lib/session"
import { AppSidebar } from "./_components/app-sidebar"

export default async function Layout({ children }: React.PropsWithChildren) {
  const session = await getSession()

  if (!session?.partner) {
    throw redirect("/login")
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      {children}
    </SidebarProvider>
  )
}
