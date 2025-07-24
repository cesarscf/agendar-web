"use client"

import { Package } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AppHeader } from "@/components/app-header"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { useEmployees } from "@/hooks/data/employee/use-employees"

export function EmployeesPageClient() {
  const { data } = useEmployees()
  const router = useRouter()

  return (
    <>
      <AppHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Profissionais</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button className="ml-auto" asChild>
          <Link href="/app/employees/new">Novo Profissional</Link>
        </Button>
      </AppHeader>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map(employee => (
            <Card
              key={employee.id}
              className="cursor-pointer hover:bg-accent/60 transition-shadow duration-200"
              onClick={() => {
                router.push(`/app/employees/${employee.id}`)
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {employee.avatarUrl ? (
                      <div className="relative size-14 overflow-hidden rounded">
                        <Image
                          src={employee.avatarUrl || "/placeholder.svg"}
                          alt={employee.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <Package className="h-5 w-5 text-primary" />
                    )}
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                  </div>
                  <Badge variant={employee.active ? "default" : "secondary"}>
                    {employee.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-muted-foreground">
                    Email:{" "}
                    <span className="font-medium text-foreground">
                      {employee.email}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Telefone:{" "}
                    <span className="font-medium text-foreground">
                      {employee.phone}
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
