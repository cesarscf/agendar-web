"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Upload, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useUpdateEstablishment } from "@/hooks/data/establishment/update-establishment"
import {
  type UpdateEstablishmentRequest,
  updateEstablishmentSchema,
} from "@/lib/validations/establishment"

type Inputs = UpdateEstablishmentRequest

type UpdateEstablishmentFormProps = {
  data: Inputs
}

const themeOptions = [
  { label: "Verde", value: "green" },
  { label: "Azul", value: "blue" },
  { label: "Vermelho", value: "red" },
]

function ImagePicker({
  value,
  onChange,
  label,
}: {
  value?: string
  onChange: (url: string) => void
  label: string
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        const result = e.target?.result as string
        onChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    onChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        {value ? (
          <div className="relative">
            <div className="relative w-full h-32 mb-2">
              <Image
                src={value || "/placeholder.svg"}
                alt={label}
                fill
                className="object-cover rounded"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={removeImage}
              className="w-full bg-transparent"
            >
              <X className="w-4 h-4 mr-2" />
              Remover Imagem
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Selecionar Imagem
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-1">PNG, JPG até 10MB</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  )
}

export function UpdateEstablishmentForm({
  data,
}: UpdateEstablishmentFormProps) {
  const { mutateAsync, isPending } = useUpdateEstablishment()
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(updateEstablishmentSchema),
    mode: "onChange",
    defaultValues: {
      id: data.id,
      name: data.name ?? "",
      theme: data.theme ?? "green",
      about: data.about ?? "",
      phone: data.phone ?? "",
      slug: data.slug ?? "",
      servicesPerformed: data.servicesPerformed ?? "",
      activeCustomers: data.activeCustomers ?? "",
      experienceTime: data.experienceTime ?? "",
      googleMapsLink: data.googleMapsLink ?? "",
      address: data.address ?? "",
      logoUrl: data.logoUrl ?? "",
      bannerUrl: data.bannerUrl ?? "",
    },
  })

  async function onSubmit(inputs: Inputs) {
    setLoading(true)
    const logoUrl = inputs.logoUrl
    const bannerUrl = inputs.bannerUrl

    // For web implementation, you might want to handle image upload differently
    // This is a simplified version - you may need to implement actual file upload
    if (logoUrl && logoUrl.startsWith("data:")) {
      // Handle base64 image upload to your storage service
      // const uploaded = await uploadImageToFirebase(logoUrl, StorageEntity.Establishment)
      // logoUrl = uploaded
    }

    if (bannerUrl && bannerUrl.startsWith("data:")) {
      // Handle base64 image upload to your storage service
      // const uploaded = await uploadImageToFirebase(bannerUrl, StorageEntity.Establishment)
      // bannerUrl = uploaded
    }

    try {
      console.log({ ...inputs, logoUrl, bannerUrl })
      await mutateAsync({ ...inputs, logoUrl, bannerUrl })
      toast.success("Estabelecimento atualizado com sucesso!")
    } catch {
      toast.error("Erro ao atualizar estabelecimento.")
    } finally {
      setLoading(false)
    }
  }

  const isSubmitting = isPending || loading

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Atualizar Estabelecimento</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Controller
                control={form.control}
                name="name"
                render={({ field }) => (
                  <Input
                    id="name"
                    placeholder="Nome do estabelecimento"
                    {...field}
                  />
                )}
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Controller
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <Input id="phone" placeholder="Telefone" {...field} />
                )}
              />
              {form.formState.errors.phone && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Link da loja</Label>
            <Controller
              control={form.control}
              name="slug"
              render={({ field }) => (
                <Input id="slug" placeholder="Telefone" {...field} />
              )}
            />
            {form.formState.errors.slug && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.slug.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Cor do Tema</Label>
            <Controller
              control={form.control}
              name="theme"
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-row gap-6"
                >
                  {themeOptions.map(option => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {form.formState.errors.theme && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.theme.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="about">Sobre</Label>
            <Controller
              control={form.control}
              name="about"
              render={({ field }) => (
                <Textarea
                  id="about"
                  placeholder="Descrição do estabelecimento"
                  rows={5}
                  {...field}
                />
              )}
            />
            {form.formState.errors.about && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.about.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="servicesPerformed">Serviços Realizados</Label>
              <Controller
                control={form.control}
                name="servicesPerformed"
                render={({ field }) => (
                  <Input
                    id="servicesPerformed"
                    placeholder="Ex: Corte, Barba, Sobrancelha..."
                    {...field}
                  />
                )}
              />
              {form.formState.errors.servicesPerformed && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.servicesPerformed.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="activeCustomers">Clientes Ativos</Label>
              <Controller
                control={form.control}
                name="activeCustomers"
                render={({ field }) => (
                  <Input
                    id="activeCustomers"
                    placeholder="Número de clientes ativos"
                    {...field}
                  />
                )}
              />
              {form.formState.errors.activeCustomers && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.activeCustomers.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experienceTime">Tempo de Experiência</Label>
            <Controller
              control={form.control}
              name="experienceTime"
              render={({ field }) => (
                <Input
                  id="experienceTime"
                  placeholder="Ex: 3 anos"
                  {...field}
                />
              )}
            />
            {form.formState.errors.experienceTime && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.experienceTime.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="googleMapsLink">Link do Google Maps</Label>
            <Controller
              control={form.control}
              name="googleMapsLink"
              render={({ field }) => (
                <Input
                  id="googleMapsLink"
                  placeholder="https://maps.google.com/..."
                  {...field}
                />
              )}
            />
            {form.formState.errors.googleMapsLink && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.googleMapsLink.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Controller
              control={form.control}
              name="address"
              render={({ field }) => (
                <Textarea
                  id="address"
                  placeholder="Endereço completo"
                  rows={3}
                  {...field}
                />
              )}
            />
            {form.formState.errors.address && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.address.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImagePicker
              value={form.watch("bannerUrl")}
              onChange={uri =>
                form.setValue("bannerUrl", uri, { shouldValidate: true })
              }
              label="Imagem do Banner"
            />

            <ImagePicker
              value={form.watch("logoUrl")}
              onChange={uri =>
                form.setValue("logoUrl", uri, { shouldValidate: true })
              }
              label="Logo do Estabelecimento"
            />
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Salvar Alterações
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
