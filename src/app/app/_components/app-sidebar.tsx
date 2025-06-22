"use client"

import {
  Calendar,
  Command,
  ContactRound,
  HammerIcon,
  Handshake,
  Headphones,
  LayoutDashboard,
  Package,
  Search,
  Settings,
  Store,
  Users,
} from "lucide-react"
import { useSelectedLayoutSegments } from "next/navigation"
import type * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./main-nav"
import { NavSecondary } from "./nav-secondary"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const segments = useSelectedLayoutSegments()

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Command className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={[
            {
              title: "Dashboard",
              url: "/app",
              icon: LayoutDashboard,
              isActive: segments.length === 0,
            },
            {
              title: "Agenda",
              url: "/app/calendar",
              icon: Calendar,
              isActive: segments.includes("calendar"),
            },
            {
              title: "Serviços",
              url: "/app/services",
              icon: HammerIcon,
              isActive: segments.includes("services"),
            },
            {
              title: "Profissionais",
              url: "/app/employees",
              icon: ContactRound,
              isActive: segments.includes("employees"),
            },
            {
              title: "Clientes",
              url: "/app/customers",
              icon: Users,
              isActive: segments.includes("customers"),
            },
            {
              title: "Fidelidade",
              url: "/app/loyalties",
              icon: Handshake,
              isActive: segments.includes("loyalties"),
            },
            {
              title: "Pacotes",
              url: "/app/packages",
              icon: Package,
              isActive: segments.includes("packages"),
            },
            {
              title: "Loja",
              url: "/app/store",
              icon: Store,
              isActive: segments.includes("store"),
            },
          ]}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary
          items={[
            {
              title: "Settings",
              url: "#",
              icon: Settings,
            },
            {
              title: "Get Help",
              url: "#",
              icon: Headphones,
            },
            {
              title: "Search",
              url: "#",
              icon: Search,
            },
          ]}
          className="mt-auto"
        />
      </SidebarFooter>
    </Sidebar>
  )
}
