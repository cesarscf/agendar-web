"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { AppHeader } from "@/components/app-header"
import { UpdateEmployeeForm } from "@/components/forms/update-employee-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useEmployee } from "@/hooks/data/employee/use-employee"

export function EmployeePageClient() {
  const params = useParams<{ employeeId: string }>()
  const { data } = useEmployee(params.employeeId)

  if (!data) return null

  return (
    <div>
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
              <BreadcrumbPage>{data?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </AppHeader>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <UpdateEmployeeForm employee={data} />
      </div>
    </div>
  )
}
