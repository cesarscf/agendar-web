import { useQuery } from "@tanstack/react-query"

import { getEmployeeBlocks } from "@/http/employee-blocks/get-employee-blocks"
import type { EmployeeBlock } from "@/lib/validations/employee-blocks"

export function useEmployeeBlocks(id: string) {
  return useQuery<EmployeeBlock[], string>({
    queryKey: ["blocks"],
    queryFn: async () => {
      const { data, error } = await getEmployeeBlocks(id)

      if (error) {
        throw error
      }

      return data ?? []
    },
  })
}
