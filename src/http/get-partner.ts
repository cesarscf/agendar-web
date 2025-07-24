import { AxiosError } from "axios"
import type { Partner } from "@/lib/validations/partner"
import { api } from "./api-client"

export async function getPartner() {
  try {
    const response = await api.get<Partner>("/partner")

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
