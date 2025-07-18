"use client"

// import { OnboardingChecklist } from "./onboarding-checklist";
import {
  Calendar,
  Command,
  ContactRound,
  HammerIcon,
  Handshake,
  LayoutDashboard,
  Package,
  Store,
  Users,
} from "lucide-react"
import Image from "next/image"
import { useSelectedLayoutSegments } from "next/navigation"
import type * as React from "react"
import { NavMain } from "@/app/app/_components/nav-main"
import { NavUser } from "@/app/app/_components/nav-user"
import { useAuth } from "@/app/providers/auth-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const segments = useSelectedLayoutSegments()

  const auth = useAuth()
  const establishment = auth.partner?.partner.establishments[0]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a
                href={`/${establishment?.id}`}
                target="_blank"
                rel="noreferrer"
              >
                {!establishment?.name ? (
                  <div className="relative h-8 w-8 overflow-hidden rounded-md">
                    <Image
                      src={establishment?.name ?? ""}
                      alt={`${establishment?.name} logo`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                )}

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {establishment?.name}
                  </span>
                  <span className="truncate text-xs">{establishment?.id}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* {!isOnboardingComplete && (
          <>
            <OnboardingChecklist onboardingCheck={onboardingCheck} />
            <SidebarSeparator />
          </>
        )} */}
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
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
