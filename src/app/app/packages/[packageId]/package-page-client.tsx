"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { AppHeader } from "@/components/app-header"
import { EditPackageForm } from "@/components/forms/edit-package-form"
import { EditPackageItemsForm } from "@/components/forms/edit-package-items-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePackage } from "@/hooks/data/packages/use-package"
import { useServices } from "@/hooks/data/service/use-services"

export function PackagePageClient() {
  const params = useParams<{ packageId: string }>()
  const { data } = usePackage(params.packageId)
  const { data: services } = useServices()

  if (!data) return null

  return (
    <>
      <AppHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={"/app/packages"}>Pacotes de serviços</Link>
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
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Detalhes do Pacote</TabsTrigger>
            <TabsTrigger value="items">Itens do Pacote</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <EditPackageForm data={data} />
          </TabsContent>

          <TabsContent value="items" className="space-y-4">
            <EditPackageItemsForm
              packageId={params.packageId}
              items={data?.items || []}
              services={services ?? []}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
