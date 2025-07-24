"use client"

import { Calendar, Clock, Plus, Repeat, Trash2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { AppHeader } from "@/components/app-header"
import { UpdateEmployeeForm } from "@/components/forms/update-employee-form"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEmployee } from "@/hooks/data/employee/use-employee"
import { useEmployeeBlocks } from "@/hooks/data/employee-blocks/use-employee-block"
import { useEmployeeRecurringBlocks } from "@/hooks/data/employee-blocks/use-employee-recurring-block"

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
]

export function EmployeePageClient() {
  const params = useParams<{ employeeId: string }>()
  const { data } = useEmployee(params.employeeId)
  const { data: blocks } = useEmployeeBlocks(params.employeeId)
  const { data: recurringBlocks } = useEmployeeRecurringBlocks(
    params.employeeId
  )

  const handleDeleteBlock = async (blockId: string) => {
    if (confirm("Tem certeza que deseja excluir este bloqueio?")) {
      // Implementar lógica de exclusão
      console.log("Deletar block:", blockId)
    }
  }

  const handleDeleteRecurringBlock = async (blockId: string) => {
    if (confirm("Tem certeza que deseja excluir este bloqueio recorrente?")) {
      // Implementar lógica de exclusão
      console.log("Deletar recurring block:", blockId)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

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
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="blocks">Bloqueios</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <UpdateEmployeeForm employee={data} />
          </TabsContent>

          <TabsContent value="blocks" className="space-y-6">
            {/* Bloqueios Pontuais */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Bloqueios Pontuais</h3>
                </div>
                <Button asChild>
                  <Link href={`/app/employees/${params.employeeId}/blocks/new`}>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Bloqueio
                  </Link>
                </Button>
              </div>

              {blocks && blocks.length > 0 ? (
                <div className="grid gap-3">
                  {blocks.map(block => (
                    <Card key={block.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                  {formatDate(block.startsAt)} -{" "}
                                  {formatDate(block.endsAt)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  {formatTime(block.startsAt)} -{" "}
                                  {formatTime(block.endsAt)}
                                </span>
                              </div>
                            </div>
                            {block.reason && (
                              <p className="text-sm text-muted-foreground">
                                Motivo: {block.reason}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteBlock(block.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Nenhum bloqueio pontual encontrado
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            <Separator />

            {/* Bloqueios Recorrentes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Repeat className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">
                    Bloqueios Recorrentes
                  </h3>
                </div>
                <Button asChild>
                  <Link
                    href={`/app/employees/${params.employeeId}/recurring-blocks/new`}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Bloqueio Recorrente
                  </Link>
                </Button>
              </div>

              {recurringBlocks && recurringBlocks.length > 0 ? (
                <div className="grid gap-3">
                  {recurringBlocks.map(block => (
                    <Card key={block.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-4">
                              <Badge variant="outline">
                                {weekdays[block.weekday]}
                              </Badge>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                  {block.startTime} - {block.endTime}
                                </span>
                              </div>
                            </div>
                            {block.reason && (
                              <p className="text-sm text-muted-foreground">
                                Motivo: {block.reason}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteRecurringBlock(block.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Repeat className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Nenhum bloqueio recorrente encontrado
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
