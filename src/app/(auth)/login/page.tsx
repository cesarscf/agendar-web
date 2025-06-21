import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "../_components/login-form"

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
          Não tem uma conta?{" "}
          <a href="/register" className="underline underline-offset-4">
            Cadastre-se
          </a>
        </div>
      </div>
      <LoginForm />
    </div>
  )
}
