"use client"

import { AppHeader } from "@/components/app-header"
import { UpdateAvailabilitiesForm } from "@/components/forms/update-establishment-availabilities-form"
import { UpdateEstablishmentForm } from "@/components/forms/update-establishment-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEstablishment } from "@/hooks/data/establishment/use-establishment"
import { useEstablishmentAvailabilities } from "@/hooks/data/establishment/use-establishment-availabilities"

export function EstablishmentPageClient() {
  const { data } = useEstablishment()
  const { data: availabilities } = useEstablishmentAvailabilities()
  console.log(availabilities)
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
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="availabilities">Funcionamento</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <UpdateEstablishmentForm data={data} />
          </TabsContent>

          <TabsContent value="availabilities" className="space-y-4">
            <UpdateAvailabilitiesForm data={availabilities} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
