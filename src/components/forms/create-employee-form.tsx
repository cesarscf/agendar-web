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
import { Switch } from "@/components/ui/switch"
import { useCreateEmployee } from "@/hooks/data/employee/use-create-employee"
import { StorageEntity, uploadImageToFirebase } from "@/lib/firebase"
import { createEmployeeSchema } from "@/lib/validations/employee"

type Inputs = z.infer<typeof createEmployeeSchema>

export function CreateEmployeeForm() {
  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(createEmployeeSchema),
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      biography: "",
      active: true,
      avatarUrl: "",
    },
  })

  const { mutateAsync, isPending } = useCreateEmployee()
  const [loading, setLoading] = React.useState(false)

  async function onSubmit(values: Inputs) {
    setLoading(true)
    let avatarUrl = values.avatarUrl

    try {
      if (avatarUrl?.startsWith("data:")) {
        const uploaded = await uploadImageToFirebase(
          avatarUrl,
          StorageEntity.Employee
        )
        if (!uploaded) {
          toast.error("Erro ao fazer upload da imagem.")
          return
        }
        avatarUrl = uploaded
      }

      await mutateAsync({ ...values, avatarUrl })
      toast.success("Funcionário cadastrado com sucesso.")
      router.back()
    } catch {
      toast.error("Erro ao cadastrar funcionário.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Funcionário</CardTitle>
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
                    <Input placeholder="Nome do funcionário" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="E-mail" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(11) 99999-9999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Endereço completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Ativo</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avatarUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImagePicker
                      value={field.value}
                      onChange={field.onChange}
                      label="Foto do funcionário"
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
              {loading || isPending ? "Salvando..." : "Cadastrar Funcionário"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
