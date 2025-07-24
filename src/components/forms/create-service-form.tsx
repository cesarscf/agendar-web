"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"
import { ImagePicker } from "@/components/image-picker"
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
import { useCreateService } from "@/hooks/data/service/use-create-service"
import { StorageEntity, uploadImageToFirebase } from "@/lib/firebase"
import { createServiceSchema } from "@/lib/validations/service"
import { Textarea } from "../ui/textarea"

type Inputs = z.infer<typeof createServiceSchema>

export function CreateServiceForm() {
  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(createServiceSchema),
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      price: "",
      active: true,
      durationInMinutes: "",
      description: "",
      image: "",
    },
  })

  const { mutateAsync, isPending } = useCreateService()
  const [loading, setLoading] = React.useState(false)

  async function onSubmit(values: Inputs) {
    setLoading(true)
    let image = values.image

    try {
      if (image?.startsWith("data:")) {
        const uploaded = await uploadImageToFirebase(
          image,
          StorageEntity.Service
        )
        if (!uploaded) {
          toast.error("Erro ao fazer upload da imagem.")
          return
        }
        image = uploaded
      }

      await mutateAsync({
        ...values,
        image,
        price: values.price?.replace(",", "."),
      })

      toast.success("Serviço criado com sucesso.")
      router.back()
    } catch {
      toast.error("Erro ao criar o serviço.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Serviço</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-2xl"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do serviço" {...field} />
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
                    <Input type="text" placeholder="Preço" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="durationInMinutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duração (min)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Duração em minutos"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descrição do serviço" {...field} />
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
                      label="Imagem do serviço"
                      value={field.value}
                      onChange={field.onChange}
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
              {loading || isPending ? "Salvando..." : "Cadastrar Serviço"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
