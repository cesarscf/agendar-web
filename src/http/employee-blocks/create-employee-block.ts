import { handleApiError } from "@/lib/utils"
import type {
  CreateEmployeeBlock,
  EmployeeBlock,
} from "@/lib/validations/employee-blocks"

import { api } from "../api-client"

export async function createEmployeeBlock(
  inputs: CreateEmployeeBlock & {
    employeeId: string
  }
) {
  try {
    const payload = {
      startsAt: inputs.startsAt,
      endsAt: inputs.endsAt,
      reason: inputs.reason,
    }

    const result = await api.post<EmployeeBlock>(
      `/employees/${inputs.employeeId}/blocks`,
      {
        payload,
      }
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
