"use client"

import { Package } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { AppHeader } from "@/components/app-header"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePackages } from "@/hooks/data/packages/use-packages"

export function PackagesPageClient() {
  const { data } = usePackages()
  const router = useRouter()

  return (
    <>
      <AppHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Pacotes de serviços</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </AppHeader>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map(pkg => (
            <Card
              key={pkg.id}
              className="cursor-pointer hover:bg-accent/60 transition-shadow duration-200"
              onClick={() => {
                router.push(`/app/packages/${pkg.id}`)
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {pkg.image ? (
                      <div className="relative size-14 overflow-hidden rounded">
                        <Image
                          src={pkg.image || "/placeholder.svg"}
                          alt={pkg.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <Package className="h-5 w-5 text-primary" />
                    )}
                    <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  </div>
                  <Badge variant={pkg.active ? "default" : "secondary"}>
                    {pkg.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-muted-foreground">
                    Preço:{" "}
                    <span className="font-medium text-foreground">
                      {pkg.price}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Comissão:{" "}
                    <span className="font-medium text-foreground">
                      {pkg.commission}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {(!data || data.length === 0) && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">
              Nenhum pacote encontrado
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Não há pacotes de serviços disponíveis no momento.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
