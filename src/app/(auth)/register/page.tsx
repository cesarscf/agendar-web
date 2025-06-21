import { GalleryVerticalEnd } from "lucide-react"
import { RegisterForm } from "../_components/register-form"

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <a href="/" className="flex flex-col items-center gap-2 font-medium">
          <div className="flex size-8 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-6" />
          </div>
          <span className="sr-only">Acme Inc.</span>
        </a>
        <h1 className="text-xl font-bold">Bem-vindo à Acme Inc.</h1>
        <div className="text-center text-sm">
          Já possue conta?{" "}
          <a href="/login" className="underline underline-offset-4">
            Entrar
          </a>
        </div>
      </div>
      <RegisterForm />
    </div>
  )
}
