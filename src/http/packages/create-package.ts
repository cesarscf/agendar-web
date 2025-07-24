import { handleApiError } from "@/lib/utils"
import type { CreatePackageRequest, Package } from "@/lib/validations/packages"
import { api } from "../api-client"

export async function createPackage(inputs: CreatePackageRequest) {
  try {
    const result = await api.post<Package>("/packages", {
      ...inputs,
    })

    return {
      data: result.data,
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
