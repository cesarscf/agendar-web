"use client"

import { QueryClientProvider } from "@tanstack/react-query"

import { queryClient } from "@/lib/react-query"

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
