import { useMutation } from "@tanstack/react-query"
import { updateEmployee } from "@/http/employee/update-employee"
import { queryClient } from "@/lib/query-client"
import type { UpdateEmployeeRequest } from "@/lib/validations/employee"

export function useUpdateEmployee() {
  return useMutation<boolean, string, UpdateEmployeeRequest>({
    mutationFn: async inputs => {
      const { data, error } = await updateEmployee(inputs)

      if (error) {
        throw error
      }

      return data!
    },
    onSuccess(_, variables) {
      const employeeId = variables.id

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      })

      queryClient.invalidateQueries({
        queryKey: [employeeId],
      })
    },
  })
}
