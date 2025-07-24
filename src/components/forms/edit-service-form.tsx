"use client"

import { zodResolver } from "@hookform/resolvers/zod"

import React from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useUpdateService } from "@/hooks/data/service/use-update-service"
import { StorageEntity, uploadImageToFirebase } from "@/lib/firebase"
import {
  type UpdateServiceRequest,
  updateServiceSchema,
} from "@/lib/validations/service"
import { ImagePicker } from "../image-picker"

type Inputs = z.infer<typeof updateServiceSchema>

type EditServiceFormProps = {
  service: Inputs
}

export function EditServiceForm({ service }: EditServiceFormProps) {
  const { mutateAsync, isPending } = useUpdateService()
  const [loading, setLoading] = React.useState(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(updateServiceSchema),
    mode: "onBlur",
    defaultValues: {
      ...service,
      price: service.price?.replace(".", ","),
      durationInMinutes: String(service.durationInMinutes),
    },
  })

  async function onSubmit(inputs: Inputs) {
    setLoading(true)
    let image = inputs.image

    try {
      if (image?.startsWith("data:")) {
        image = await uploadImageToFirebase(image, StorageEntity.Establishment)
      }
      const payload = {
        ...inputs,
        image,
        durationInMinutes: inputs.durationInMinutes
          ? Number(inputs.durationInMinutes)
          : undefined,
        price: inputs.price ? inputs.price.replace(",", ".") : undefined,
      } as UpdateServiceRequest

      await mutateAsync(payload)

      toast.success("Serviço atualizado com sucesso.")
    } catch {
      toast("Erro ao atualizar serviço.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Editar Serviço</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 pr-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <div>
                  <Input id="name" placeholder="Nome do serviço" {...field} />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Preço</Label>
            <Controller
              control={form.control}
              name="price"
              render={({ field, fieldState }) => (
                <div>
                  <Input
                    id="price"
                    placeholder="Preço"
                    type="text"
                    {...field}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duração (min)</Label>
            <Controller
              control={form.control}
              name="durationInMinutes"
              render={({ field, fieldState }) => (
                <div>
                  <Input
                    id="duration"
                    placeholder="Duração em minutos"
                    type="number"
                    min="1"
                    {...field}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <div>
                  <Textarea
                    id="description"
                    placeholder="Descrição do serviço"
                    rows={5}
                    className="resize-none"
                    {...field}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Ativo</Label>
            <Controller
              control={form.control}
              name="active"
              render={({ field: { value, onChange } }) => (
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={value}
                    onCheckedChange={onChange}
                  />
                  <Label htmlFor="active" className="text-sm font-normal">
                    {value ? "Serviço ativo" : "Serviço inativo"}
                  </Label>
                </div>
              )}
            />
          </div>
          <ImagePicker
            value={form.watch("image")}
            onChange={uri =>
              form.setValue("image", uri, { shouldValidate: true })
            }
            label="Logo do Estabelecimento"
          />
        </div>

        <div className="mt-6 pt-6 border-t">
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending || loading}
            className="w-full"
          >
            {isPending || loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
