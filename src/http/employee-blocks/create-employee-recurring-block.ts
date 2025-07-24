import { handleApiError } from "@/lib/utils"
import type {
  CreateEmployeeRecurringBlock,
  EmployeeRecurringBlock,
} from "@/lib/validations/employee-blocks"

import { api } from "../api-client"

export async function createEmployeeRecurringBlock(
  inputs: CreateEmployeeRecurringBlock & {
    employeeId: string
  }
) {
  try {
    const payload = {
      startTime: inputs.startTime,
      endTime: inputs.endTime,
      reason: inputs.reason,
      weekday: inputs.weekday,
    }

    const result = await api.post<EmployeeRecurringBlock>(
      `/employees/${inputs.employeeId}/recurring-blocks`,

      payload
    )

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
