import { useMutation } from "@tanstack/react-query"
import { createService } from "@/http/service/create-service"
import { queryClient } from "@/lib/query-client"
import type { CreateServiceRequest } from "@/lib/validations/service"

export function useCreateService() {
  return useMutation<boolean, string, CreateServiceRequest>({
    mutationFn: async inputs => {
      const { data, error } = await createService(inputs)

      if (error) {
        throw error
      }

      return data!
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      })
    },
  })
}
