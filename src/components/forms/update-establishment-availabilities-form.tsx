"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Clock, Plus, Save, Trash2 } from "lucide-react"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useUpdateAvailibilities } from "@/hooks/data/establishment/use-update-availabilities"
import {
  type Availability,
  availabilitySchema,
} from "@/lib/validations/establishment"

const formSchema = z.object({
  availabilities: z.array(availabilitySchema),
})

type FormData = z.infer<typeof formSchema>

interface UpdateAvailabilitiesFormProps {
  data?: Availability[]
}

const weekdays = [
  { value: 0, label: "Domingo", short: "Dom" },
  { value: 1, label: "Segunda-feira", short: "Seg" },
  { value: 2, label: "Terça-feira", short: "Ter" },
  { value: 3, label: "Quarta-feira", short: "Qua" },
  { value: 4, label: "Quinta-feira", short: "Qui" },
  { value: 5, label: "Sexta-feira", short: "Sex" },
  { value: 6, label: "Sábado", short: "Sáb" },
]

export function UpdateAvailabilitiesForm({
  data,
}: UpdateAvailabilitiesFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { mutateAsync } = useUpdateAvailibilities()

  function stripSeconds(time: string | undefined | null) {
    if (!time) return ""

    return time.length >= 5 ? time.slice(0, 5) : ""
  }

  const initialData =
    data?.map(it => ({
      weekday: it.weekday,
      opensAt: stripSeconds(it.opensAt),
      closesAt: stripSeconds(it.closesAt),
      breakStart: stripSeconds(it.breakStart),
      breakEnd: stripSeconds(it.breakEnd),
    })) || []

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availabilities: initialData,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "availabilities",
  })

  const onSubmit = async (values: FormData) => {
    setIsLoading(true)
    try {
      const activeAvailabilities = values.availabilities.map(({ ...item }) => ({
        weekday: item.weekday,
        opensAt: item.opensAt,
        closesAt: item.closesAt,
        breakStart: item.breakStart || undefined,
        breakEnd: item.breakEnd || undefined,
      }))

      console.log(activeAvailabilities)

      await mutateAsync(activeAvailabilities)
      toast.success("Funcionamento atualizado com sucesso.")
    } catch {
      toast.error("Erro ao atualizar horários de funcionamento")
    } finally {
      setIsLoading(false)
    }
  }

  const addNewAvailability = () => {
    const usedWeekdays = fields.map(field => field.weekday)
    const availableWeekday = weekdays.find(
      day => !usedWeekdays.includes(day.value)
    )

    if (availableWeekday) {
      append({
        weekday: availableWeekday.value,
        opensAt: "09:00",
        closesAt: "18:00",
        breakStart: "",
        breakEnd: "",
      })
    }
  }

  const getAvailableWeekdays = (currentIndex: number) => {
    const usedWeekdays = fields
      .map((field, index) => (index !== currentIndex ? field.weekday : null))
      .filter(w => w !== null)

    return weekdays.filter(day => !usedWeekdays.includes(day.value))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Horários de Funcionamento
        </CardTitle>
        <CardDescription>
          Configure os horários de funcionamento para cada dia da semana
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {fields.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">
                  Nenhum horário cadastrado
                </p>
                <p className="text-sm mb-4">
                  Adicione os horários de funcionamento do seu estabelecimento
                </p>
                <Button
                  type="button"
                  onClick={addNewAvailability}
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Horário
                </Button>
              </div>
            ) : (
              <>
                {fields.map((field, index) => {
                  const currentWeekday = weekdays.find(
                    day => day.value === field.weekday
                  )
                  const availableWeekdays = getAvailableWeekdays(index)
                  const options = [
                    currentWeekday!,
                    ...availableWeekdays,
                  ].filter(
                    (day, i, self) =>
                      self.findIndex(d => d.value === day.value) === i
                  )

                  return (
                    <div key={field.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <FormField
                          control={form.control}
                          name={`availabilities.${index}.weekday`}
                          render={({ field: weekdayField }) => (
                            <div className="flex items-center gap-3">
                              <Badge
                                variant="secondary"
                                className="text-sm font-medium"
                              >
                                {
                                  weekdays.find(
                                    d => d.value === weekdayField.value
                                  )?.short
                                }
                              </Badge>
                              <FormItem className="min-w-[180px]">
                                <Select
                                  value={weekdayField.value.toString()}
                                  onValueChange={value =>
                                    weekdayField.onChange(Number(value))
                                  }
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecione o dia" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {options
                                      .sort((a, b) => a.value - b.value)
                                      .map(day => (
                                        <SelectItem
                                          key={day.value}
                                          value={day.value.toString()}
                                        >
                                          {day.label}
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            </div>
                          )}
                        />

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pl-4 border-l-2 border-muted">
                        <FormField
                          control={form.control}
                          name={`availabilities.${index}.opensAt`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Abre às</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`availabilities.${index}.closesAt`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fecha às</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`availabilities.${index}.breakStart`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Intervalo início</FormLabel>
                              <FormControl>
                                <Input
                                  type="time"
                                  {...field}
                                  placeholder="Opcional"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`availabilities.${index}.breakEnd`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Intervalo fim</FormLabel>
                              <FormControl>
                                <Input
                                  type="time"
                                  {...field}
                                  placeholder="Opcional"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {index < fields.length - 1 && <Separator />}
                    </div>
                  )
                })}

                {fields.length < 7 && (
                  <div className="flex justify-center pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addNewAvailability}
                      className="w-full max-w-md bg-transparent"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Dia da Semana
                    </Button>
                  </div>
                )}
              </>
            )}

            {fields.length > 0 && (
              <div className="flex justify-end pt-4 border-t">
                <Button type="submit" disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Salvando..." : "Salvar Horários"}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
