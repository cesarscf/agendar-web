import { useMutation } from "@tanstack/react-query"

import { updateEstablishmentAvailabilities } from "@/http/establishment/update-establishment-availabilities"
import { queryClient } from "@/lib/query-client"
import type { Availability } from "@/lib/validations/establishment"

export function useUpdateAvailibilities() {
  return useMutation<boolean, string, Availability[]>({
    mutationFn: async inputs => {
      const { data, error } = await updateEstablishmentAvailabilities(inputs)

      if (error) {
        throw error
      }

      return data!
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["availabilities"],
      })
    },
  })
}
