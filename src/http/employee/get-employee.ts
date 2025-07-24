import { handleApiError } from "@/lib/utils"
import type { Employee } from "@/lib/validations/employee"
import { api } from "../api-client"

export async function getEmployee(employeeId: string) {
  try {
    const response = await api.get<Employee>(`/employees/${employeeId}`)

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
