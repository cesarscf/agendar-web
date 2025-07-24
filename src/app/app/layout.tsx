import { redirect } from "next/navigation"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { auth } from "@/lib/auth"
import { AppSidebar } from "./_components/app-sidebar"

export default async function Layout({ children }: React.PropsWithChildren) {
  const { session } = await auth()

  if (!session) {
    throw redirect("/login")
  }

  return (
    <SidebarProvider>
      <AppSidebar session={session} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
