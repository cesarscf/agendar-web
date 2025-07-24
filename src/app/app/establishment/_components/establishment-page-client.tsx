"use client"

import { AppHeader } from "@/components/app-header"
import { UpdateEstablishmentForm } from "@/components/forms/update-establishment-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { useEstablishment } from "@/hooks/data/establishment/use-establishment"

export function EstablishmentPageClient() {
  const { data } = useEstablishment()

  if (!data) return null

  return (
    <div>
      <AppHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Loja</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </AppHeader>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <UpdateEstablishmentForm data={data} />
      </div>
    </div>
  )
}
