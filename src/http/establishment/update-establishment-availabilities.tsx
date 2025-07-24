import { AxiosError } from "axios"
import type { Availability } from "@/lib/validations/establishment"
import { api } from "../api-client"

export async function updateEstablishmentAvailabilities(
  inputs: Availability[]
) {
  try {
    console.log({ availability: inputs })
    const _response = await api.post(`/establishments/availability`, {
      availability: inputs,
    })

    return {
      data: true,
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
