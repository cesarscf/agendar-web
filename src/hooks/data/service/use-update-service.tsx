import { useMutation } from "@tanstack/react-query"
import { updateService } from "@/http/service/update-service"
import { queryClient } from "@/lib/query-client"
import type { UpdateServiceRequest } from "@/lib/validations/service"

export function useUpdateService() {
  return useMutation<boolean, string, UpdateServiceRequest>({
    mutationFn: async inputs => {
      const { data, error } = await updateService(inputs)

      if (error) {
        throw error
      }

      return data!
    },
    onSuccess(_, variables) {
      const serviceId = variables.id

      queryClient.invalidateQueries({
        queryKey: ["services"],
      })

      queryClient.invalidateQueries({
        queryKey: [serviceId],
      })
    },
  })
}
