import { useMutation } from "@tanstack/react-query"

import { deleteEmployeeRecurringBlock } from "@/http/employee-blocks/delete-employee-recurring-block"
import { queryClient } from "@/lib/query-client"

export function useDeleteEmployeeRecurringBlock() {
  return useMutation<boolean, string, string>({
    mutationFn: async id => {
      const { data, error } = await deleteEmployeeRecurringBlock(id)

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
