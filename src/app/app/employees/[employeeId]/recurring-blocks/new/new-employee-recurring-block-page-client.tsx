"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { AppHeader } from "@/components/app-header"
import { CreateEmployeeRecurringBlockForm } from "@/components/forms/create-employee-recurring-block-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton"
import { useEmployee } from "@/hooks/data/employee/use-employee"

export function NewEmployeeRecurringBlockPageClient() {
  const params = useParams<{ employeeId: string }>()
  const { data } = useEmployee(params.employeeId)

  return (
    <>
      <AppHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={"/app/employees"}>Profissionais</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/app/employees/${params.employeeId}`}>
                  {data?.name ?? <Skeleton className="w-22" />}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Novo bloqueio recorrente</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </AppHeader>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <CreateEmployeeRecurringBlockForm employeeId={params.employeeId} />
      </div>
    </>
  )
}
