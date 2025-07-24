import { useMutation } from "@tanstack/react-query"
import { updatePackage } from "@/http/packages/update-package"
import { queryClient } from "@/lib/query-client"
import type { UpdatePackageRequest } from "@/lib/validations/packages"

export function useUpdatePackage() {
  return useMutation<boolean, string, UpdatePackageRequest>({
    mutationFn: async inputs => {
      const { data, error } = await updatePackage(inputs)
      console.log({ data, error })
      if (error) {
        throw error
      }

      return data!
    },
    onSuccess(_, variables) {
      const packageId = variables.id

      queryClient.invalidateQueries({
        queryKey: ["packages"],
      })

      queryClient.invalidateQueries({
        queryKey: [packageId],
      })
    },
  })
}
