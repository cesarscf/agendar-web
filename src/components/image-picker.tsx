import { Upload, X } from "lucide-react"
import Image from "next/image"
import React from "react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"

export function ImagePicker({
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
      <div className="border-1 border-dashed border-gray-300/20 rounded-lg p-4">
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
