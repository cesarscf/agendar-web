"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUpdatePackageItem } from "@/hooks/data/packages/use-update-package-item"
import type { UpdatePackageItem } from "@/lib/validations/packages"
import { updatePackageItemsSchema } from "@/lib/validations/packages"
import type { Service } from "@/lib/validations/service"

type Inputs = {
  items: UpdatePackageItem[]
}

type Props = {
  packageId: string
  items: Inputs["items"]
  services: Service[]
}

export function EditPackageItemsForm({ packageId, items, services }: Props) {
  const form = useForm<Inputs>({
    resolver: zodResolver(updatePackageItemsSchema),
    defaultValues: {
      items: items.map(item => ({
        ...item,
        quantity: item.quantity ?? 1,
      })),
    },
  })

  const { control, handleSubmit, watch } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  })

  const { mutateAsync, isPending } = useUpdatePackageItem()
  const watchedItems = watch("items")
  const selectedServiceIds = watchedItems.map(item => item.serviceId)

  async function onSubmit(values: Inputs) {
    try {
      await mutateAsync({ items: values.items, packageId })

      const msg =
        values.items.length > 0
          ? `${values.items.length} itens foram salvos.`
          : "Todos items foram removidos"

      toast.success("Itens atualizados!", {
        description: msg,
      })
    } catch {
      toast.error("Erro ao atualizar os itens.", {
        description: "Tente novamente em alguns instantes.",
      })
    }
  }

  function handleAddItem() {
    append({ serviceId: "", quantity: 1 })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Itens do Pacote</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {fields.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {fields.map((field, index) => (
                  <Card key={field.id} className="p-4 border-muted bg-muted/50">
                    <div className="flex justify-between items-start mb-2">
                      <FormLabel className="text-sm font-medium text-muted-foreground">
                        Serviço {index + 1}
                      </FormLabel>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Remover item"
                        onClick={() => {
                          remove(index)
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={control}
                        name={`items.${index}.serviceId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Serviço</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {services
                                  .filter(
                                    s =>
                                      !selectedServiceIds.includes(s.id) ||
                                      s.id === field.value
                                  )
                                  .map(service => (
                                    <SelectItem
                                      key={service.id}
                                      value={service.id}
                                    >
                                      {service.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantidade</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                value={String(field.value)}
                                onChange={e => {
                                  const parsed = parseInt(e.target.value, 10)
                                  field.onChange(
                                    Number.isNaN(parsed)
                                      ? 1
                                      : Math.max(1, parsed)
                                  )
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhum item adicionado ainda.</p>
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={handleAddItem}
              className="w-full flex items-center gap-2 bg-transparent"
            >
              <Plus size={18} />
              Adicionar serviço
            </Button>

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Salvando...
                </>
              ) : (
                "Salvar Itens"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
