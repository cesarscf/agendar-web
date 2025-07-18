import { useMutation } from "@tanstack/react-query"
import { updateEstablishment } from "@/http/establishment/update-establishment"
import { queryClient } from "@/lib/query-client"
import type { UpdateEstablishmentRequest } from "@/lib/validations/establishment"

export function useUpdateEstablishment() {
  return useMutation<boolean, string, UpdateEstablishmentRequest>({
    mutationFn: async inputs => {
      const { data, error } = await updateEstablishment(inputs)

      if (error) {
        throw error
      }

      return data!
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["establishment"],
      })
    },
  })
}
