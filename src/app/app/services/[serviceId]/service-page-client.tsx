"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { AppHeader } from "@/components/app-header"
import { EditServiceForm } from "@/components/forms/edit-service-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useService } from "@/hooks/data/service/use-service"

export function ServicePageClient() {
  const params = useParams<{ serviceId: string }>()
  const { data } = useService(params.serviceId)

  if (!data) return null

  return (
    <>
      <AppHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={"/app/services"}>Serviços</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </AppHeader>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-3xl">
        <EditServiceForm service={data} />
      </div>
    </>
  )
}
