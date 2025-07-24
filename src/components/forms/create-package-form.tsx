"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreatePackage } from "@/hooks/data/packages/use-create-package"
import { StorageEntity, uploadImageToFirebase } from "@/lib/firebase"
import { createPackageSchema } from "@/lib/validations/packages"
import { ImagePicker } from "../image-picker"

type Inputs = z.infer<typeof createPackageSchema>

export function CreatePackageForm() {
  const { mutateAsync, isPending } = useCreatePackage()
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(createPackageSchema),
    mode: "onBlur",
    defaultValues: {
      commission: "0",
      image: "",
      price: "",
      active: true,
      name: "",
    },
  })

  async function onSubmit(inputs: Inputs) {
    setLoading(true)
    let imageUrl = inputs.image

    if (inputs.image && !inputs.image.startsWith("http")) {
      const uploaded = await uploadImageToFirebase(
        inputs.image,
        StorageEntity.Package
      )
      if (!uploaded) {
        toast("Erro ao salvar imagem.")
        setLoading(false)
        return
      }
      imageUrl = uploaded
    }

    try {
      const packageCreated = await mutateAsync({
        ...inputs,
        image: imageUrl,
        price: inputs.price?.replace(",", "."),
      })

      toast.success("Pacote criado com sucesso.")

      router.push(`/app/packages/${packageCreated.id}`)
    } catch {
      toast.error("Erro ao criar pacote.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Criar Novo Pacote</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <div>
                  <Input id="name" placeholder="Nome do pacote" {...field} />
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
            <Label htmlFor="price">Valor do pacote</Label>
            <Controller
              control={form.control}
              name="price"
              render={({ field, fieldState }) => (
                <div>
                  <Input
                    id="price"
                    placeholder="R$ 10,00"
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
            <Label htmlFor="commission">Comissão</Label>
            <Controller
              control={form.control}
              name="commission"
              render={({ field, fieldState }) => (
                <div>
                  <Input
                    id="commission"
                    placeholder="Comissão do pacote"
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
            <ImagePicker
              value={form.watch("image")}
              onChange={uri =>
                form.setValue("image", uri, { shouldValidate: true })
              }
              label="Imagem do pacote"
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending || loading}
            className="w-full"
          >
            {isPending || loading ? "Criando..." : "Criar Pacote"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
