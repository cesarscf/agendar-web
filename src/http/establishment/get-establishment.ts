import { AxiosError } from "axios"
import type { Establishment } from "@/lib/validations/establishment"
import { api } from "../api-client"

export async function getEstablishment() {
  try {
    const response = await api.get<Establishment>(`/establishments`)

    return {
      data: response.data,
      error: null,
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        data: null,
        error: err.message,
      }
    }
    return {
      data: null,
      error: "Erro inesperado, tente novamente em alguns minutos.",
    }
  }
}
