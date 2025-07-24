import { useMutation } from "@tanstack/react-query"
import { createEmployee } from "@/http/employee/create-employee"
import { queryClient } from "@/lib/query-client"
import type { CreateEmployeeRequest } from "@/lib/validations/employee"

export function useCreateEmployee() {
  return useMutation<boolean, string, CreateEmployeeRequest>({
    mutationFn: async inputs => {
      const { data, error } = await createEmployee(inputs)

      if (error) {
        throw error
      }

      return data!
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      })
    },
  })
}
