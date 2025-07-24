import { useMutation } from "@tanstack/react-query"

import { deleteEmployeeBlock } from "@/http/employee-blocks/delete-employee-block"
import { queryClient } from "@/lib/query-client"

export function useDeleteEmployeeBlock() {
  return useMutation<boolean, string, string>({
    mutationFn: async id => {
      const { data, error } = await deleteEmployeeBlock(id)

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
