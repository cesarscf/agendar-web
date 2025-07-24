import { AxiosError } from "axios"
import type { Availability } from "@/lib/validations/establishment"
import { api } from "../api-client"

export async function getEstablishmentAvailabilities() {
  try {
    const response = await api.get<Availability[]>(
      `/establishments/availability`
    )

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
