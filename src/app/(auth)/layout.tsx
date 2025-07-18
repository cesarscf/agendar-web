export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          {children}

          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            Ao continuar, você concorda com nossos{" "}
            <a href="#">Termos de Serviço</a> e nossa{" "}
            <a href="#">Política de Privacidade</a>.
          </div>
        </div>
      </div>
    </div>
  )
}
