import { handleApiError } from "@/lib/utils"
import type { Employee } from "@/lib/validations/employee"
import { api } from "../api-client"

export async function getEmployees() {
  try {
    const response = await api.get<Employee[]>("/employees")

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
