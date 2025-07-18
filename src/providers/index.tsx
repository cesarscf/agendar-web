"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/query-client"

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
