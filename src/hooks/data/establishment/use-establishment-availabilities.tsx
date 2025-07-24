import { useQuery } from "@tanstack/react-query"

import { getEstablishmentAvailabilities } from "@/http/establishment/get-establishment-availabilities"
import type { Availability } from "@/lib/validations/establishment"

export function useEstablishmentAvailabilities() {
  return useQuery<Availability[], string>({
    queryKey: ["availabilities"],

    queryFn: async () => {
      const { data, error } = await getEstablishmentAvailabilities()

      if (error) {
        throw error
      }

      return data!
    },
  })
}
