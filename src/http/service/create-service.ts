import { handleApiError } from "@/lib/utils"
import type { CreateServiceRequest } from "@/lib/validations/service"
import { api } from "../api-client"

export async function createService(inputs: CreateServiceRequest) {
  try {
    await api.post("/services", {
      ...inputs,
      durationInMinutes: Number(inputs.durationInMinutes),
      price: inputs.price.replace(",", "."),
    })

    return {
      data: true,
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
