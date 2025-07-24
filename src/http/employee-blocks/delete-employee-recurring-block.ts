import { handleApiError } from "@/lib/utils"

import { api } from "../api-client"

export async function deleteEmployeeRecurringBlock(id: string) {
  try {
    await api.delete(`/recurring-blocks/${id}`)

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
