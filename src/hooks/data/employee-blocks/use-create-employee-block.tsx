import { useMutation } from "@tanstack/react-query"

import { createEmployeeBlock } from "@/http/employee-blocks/create-employee-block"
import { queryClient } from "@/lib/query-client"

import type {
  CreateEmployeeBlock,
  EmployeeBlock,
} from "@/lib/validations/employee-blocks"

export function useCreateEmployeeBlock() {
  return useMutation<
    EmployeeBlock,
    string,
    CreateEmployeeBlock & {
      employeeId: string
    }
  >({
    mutationFn: async inputs => {
      const { data, error } = await createEmployeeBlock(inputs)

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
