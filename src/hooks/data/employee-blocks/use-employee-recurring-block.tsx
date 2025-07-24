import { useQuery } from "@tanstack/react-query"

import { getEmployeeRecurringBlocks } from "@/http/employee-blocks/get-employee-recurring-blocks"
import type { EmployeeRecurringBlock } from "@/lib/validations/employee-blocks"

export function useEmployeeRecurringBlocks(id: string) {
  return useQuery<EmployeeRecurringBlock[], string>({
    queryKey: ["recurring-blocks"],
    queryFn: async () => {
      const { data, error } = await getEmployeeRecurringBlocks(id)

      if (error) {
        throw error
      }

      return data ?? []
    },
  })
}
