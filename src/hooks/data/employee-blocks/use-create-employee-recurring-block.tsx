import { useMutation } from "@tanstack/react-query"

import { createEmployeeRecurringBlock } from "@/http/employee-blocks/create-employee-recurring-block"
import { queryClient } from "@/lib/query-client"
import type {
  CreateEmployeeRecurringBlock,
  EmployeeRecurringBlock,
} from "@/lib/validations/employee-blocks"

export function useCreateEmployeeRecurringBlock() {
  return useMutation<
    EmployeeRecurringBlock,
    string,
    CreateEmployeeRecurringBlock & {
      employeeId: string
    }
  >({
    mutationFn: async inputs => {
      const { data, error } = await createEmployeeRecurringBlock(inputs)

      if (error) {
        throw error
      }

      return data!
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blocks"],
      })
    },
  })
}
