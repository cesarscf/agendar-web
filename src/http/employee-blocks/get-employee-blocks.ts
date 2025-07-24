import { handleApiError } from "@/lib/utils"
import type { EmployeeBlock } from "@/lib/validations/employee-blocks"
import { api } from "../api-client"

export async function getEmployeeBlocks(employeeId: string) {
  try {
    const response = await api.get<EmployeeBlock[]>(
      `/employees/${employeeId}/blocks`
    )

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
