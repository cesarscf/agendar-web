import { handleApiError } from "@/lib/utils"
import type { PackageWithItems } from "@/lib/validations/packages"
import { api } from "../api-client"

export async function getPackage(packageId: string) {
  try {
    const { data } = await api.get<PackageWithItems>(`/packages/${packageId}`)
    console.log(data)
    return {
      data: data,
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
