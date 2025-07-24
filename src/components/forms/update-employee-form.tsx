"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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
import { useUpdateEmployee } from "@/hooks/data/employee/use-update-employee"
import { StorageEntity, uploadImageToFirebase } from "@/lib/firebase"
import { updateEmployeeSchema } from "@/lib/validations/employee"
import { Textarea } from "../ui/textarea"

type Inputs = z.infer<typeof updateEmployeeSchema>

type UpdateEmployeeFormProps = {
  employee: Inputs
}

export function UpdateEmployeeForm({ employee }: UpdateEmployeeFormProps) {
  const form = useForm<Inputs>({
    resolver: zodResolver(updateEmployeeSchema),
    reValidateMode: "onBlur",
    defaultValues: employee,
  })

  const { mutateAsync, isPending } = useUpdateEmployee()
  const [loading, setLoading] = React.useState(false)

  async function onSubmit(inputs: Inputs) {
    setLoading(true)
    let avatarUrl = inputs.avatarUrl

    try {
      if (avatarUrl?.startsWith("data:")) {
        const uploaded = await uploadImageToFirebase(
          avatarUrl,
          StorageEntity.Employee
        )
        if (!uploaded) {
          toast.error("Erro ao salvar imagem.")
          return
        }
        avatarUrl = uploaded
      }

      await mutateAsync({
        ...inputs,
        avatarUrl,
      })

      toast.success("Funcionário atualizado com sucesso.")
    } catch {
      toast.error("Erro ao atualizar funcionário.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar Funcionário</CardTitle>
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
                    <Input type="email" placeholder="E-mail" {...field} />
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
                    <Textarea placeholder="Endereço completo" {...field} />
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
                      label="Foto do funcionário"
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
              {loading || isPending ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
