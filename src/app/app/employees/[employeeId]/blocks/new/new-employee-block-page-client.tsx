"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { AppHeader } from "@/components/app-header"
import { CreateEmployeeBlockForm } from "@/components/forms/create-employee-block-form"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useEmployee } from "@/hooks/data/employee/use-employee"

export function NewEmployeeBlockPageClient() {
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
                  {data?.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Novo bloqueio pontual</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </AppHeader>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <CreateEmployeeBlockForm employeeId={params.employeeId} />
      </div>
    </>
  )
}
