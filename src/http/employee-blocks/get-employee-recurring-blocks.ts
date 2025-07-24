import { handleApiError } from "@/lib/utils"
import type { EmployeeRecurringBlock } from "@/lib/validations/employee-blocks"
import { api } from "../api-client"

export async function getEmployeeRecurringBlocks(employeeId: string) {
  try {
    const response = await api.get<EmployeeRecurringBlock[]>(
      `/employees/${employeeId}/recurring-blocks`
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
