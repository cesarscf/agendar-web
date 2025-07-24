"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useCreateEmployeeBlock } from "@/hooks/data/employee-blocks/use-create-employee-block"
import { cn } from "@/lib/utils"
import {
  type CreateEmployeeBlock,
  createEmployeeBlockSchema,
} from "@/lib/validations/employee-blocks"

export function CreateEmployeeBlockForm({
  employeeId,
}: {
  employeeId: string
}) {
  const router = useRouter()

  const now = new Date()
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000)

  const form = useForm<CreateEmployeeBlock>({
    resolver: zodResolver(createEmployeeBlockSchema),
    defaultValues: {
      startsAt: now,
      endsAt: oneHourLater,
      reason: "",
    },
  })

  const { mutateAsync, isPending } = useCreateEmployeeBlock()

  const startDate = form.watch("startsAt")

  async function onSubmit(values: CreateEmployeeBlock) {
    if (values.endsAt <= values.startsAt) {
      toast.error(
        "A data e hora de fim deve ser depois da data e hora de início."
      )
      return
    }

    try {
      await mutateAsync({ employeeId, ...values })
      toast.success("Bloqueio cadastrado com sucesso.")
      router.back()
    } catch {
      toast.error("Erro ao cadastrar bloqueio.")
    }
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Cadastrar Bloqueio
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Data início */}
              <FormField
                control={form.control}
                name="startsAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data e Hora de Início</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(field.value, "dd/MM/yyyy 'às' HH:mm")
                              : "Selecione a data e hora"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={date => {
                            if (date) {
                              const currentTime = field.value || new Date()
                              const newDateTime = new Date(date)
                              newDateTime.setHours(currentTime.getHours())
                              newDateTime.setMinutes(currentTime.getMinutes())
                              field.onChange(newDateTime)

                              // Opcional: ajustar endsAt se ficar antes do startsAt
                              const endsAt = form.getValues("endsAt")
                              if (endsAt && endsAt <= newDateTime) {
                                const newEndsAt = new Date(
                                  newDateTime.getTime() + 60 * 60 * 1000
                                )
                                form.setValue("endsAt", newEndsAt)
                              }
                            }
                          }}
                          disabled={date =>
                            date.getTime() < new Date().setHours(0, 0, 0, 0)
                          }
                        />
                        <div className="p-3 border-t">
                          <FormLabel className="text-sm font-medium">
                            Horário
                          </FormLabel>
                          <Input
                            type="time"
                            value={
                              field.value ? format(field.value, "HH:mm") : ""
                            }
                            onChange={e => {
                              if (field.value && e.target.value) {
                                const [hours, minutes] =
                                  e.target.value.split(":")
                                const newDateTime = new Date(field.value)
                                newDateTime.setHours(
                                  Number(hours),
                                  Number(minutes)
                                )
                                field.onChange(newDateTime)
                              }
                            }}
                            className="mt-1"
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Data fim */}
              <FormField
                control={form.control}
                name="endsAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data e Hora de Fim</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(field.value, "dd/MM/yyyy 'às' HH:mm")
                              : "Selecione a data e hora"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={date => {
                            if (date) {
                              const currentTime = field.value || new Date()
                              const newDateTime = new Date(date)
                              newDateTime.setHours(currentTime.getHours())
                              newDateTime.setMinutes(currentTime.getMinutes())

                              // Garante que endsAt nunca seja antes do startsAt
                              if (startDate && newDateTime <= startDate) {
                                // ajusta para 1h depois do startDate
                                const adjustedDate = new Date(
                                  startDate.getTime() + 60 * 60 * 1000
                                )
                                field.onChange(adjustedDate)
                              } else {
                                field.onChange(newDateTime)
                              }
                            }
                          }}
                          disabled={date =>
                            date.getTime() < new Date().setHours(0, 0, 0, 0) ||
                            (startDate &&
                              date.getTime() < startDate.setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                        <div className="p-3 border-t">
                          <FormLabel className="text-sm font-medium">
                            Horário
                          </FormLabel>
                          <Input
                            type="time"
                            value={
                              field.value ? format(field.value, "HH:mm") : ""
                            }
                            onChange={e => {
                              if (field.value && e.target.value) {
                                const [hours, minutes] =
                                  e.target.value.split(":")
                                const newDateTime = new Date(field.value)
                                newDateTime.setHours(
                                  Number(hours),
                                  Number(minutes)
                                )

                                if (startDate && newDateTime <= startDate) {
                                  const adjustedDate = new Date(
                                    startDate.getTime() + 60 * 60 * 1000
                                  )
                                  field.onChange(adjustedDate)
                                } else {
                                  field.onChange(newDateTime)
                                }
                              }
                            }}
                            className="mt-1"
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Motivo */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o motivo do bloqueio..."
                      className="min-h-[80px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ações */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending} className="flex-1">
                {isPending ? "Salvando..." : "Cadastrar Bloqueio"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
