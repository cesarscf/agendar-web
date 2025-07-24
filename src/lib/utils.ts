import { AxiosError } from "axios"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

interface ApiErrorResult {
  error: string
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleApiError(err: unknown): ApiErrorResult {
  if (err instanceof AxiosError) {
    const message =
      err.response?.data?.message ?? "Erro inesperado no servidor."
    console.log(message)
    return {
      error: message,
    }
  }

  return {
    error: "Erro desconhecido. Tente novamente mais tarde.",
  }
}
