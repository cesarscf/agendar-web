import { handleApiError } from "@/lib/utils"
import type { Service } from "@/lib/validations/service"
import { api } from "../api-client"

export async function getService(serviceId: string) {
  try {
    const response = await api.get<Service>(`/services/${serviceId}`)

    return {
      data: response.data,
      error: null,
    }
  } catch (err) {
    const { error } = handleApiError(err)

    return {
      data: null,
      error,
    }
  }
}
