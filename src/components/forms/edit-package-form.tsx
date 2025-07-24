"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

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
import { useUpdatePackage } from "@/hooks/data/packages/use-update-package"
import { StorageEntity, uploadImageToFirebase } from "@/lib/firebase"
import { updatePackageSchema } from "@/lib/validations/packages"
import { ImagePicker } from "../image-picker"

type Inputs = z.infer<typeof updatePackageSchema>

type Props = {
  data: Inputs
}

export function EditPackageForm({ data }: Props) {
  const form = useForm<Inputs>({
    resolver: zodResolver(updatePackageSchema),
    defaultValues: {
      ...data,
      price: data.price?.replace(".", ","),
    },
  })

  const { mutateAsync, isPending } = useUpdatePackage()
  const [loading, setLoading] = React.useState(false)

  async function onSubmit(values: Inputs) {
    setLoading(true)
    let image = values.image

    try {
      if (image?.startsWith("data:")) {
        image = await uploadImageToFirebase(image, StorageEntity.Establishment)
      }

      await mutateAsync({
        ...values,
        image,
        price: values.price?.replace(",", "."),
      })

      toast.success("Pacote atualizado com sucesso.")
    } catch {
      toast.error("Erro ao atualizar o pacote.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar Pacote</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do pacote" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="commission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comissão (%)</FormLabel>
                  <FormControl>
                    <Input placeholder="Comissão" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input placeholder="Preço" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImagePicker
                      value={field.value}
                      onChange={field.onChange}
                      label="Imagem do pacote"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading || isPending}
              className="w-full"
            >
              {loading || isPending ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
