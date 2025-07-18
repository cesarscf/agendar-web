import type { Establishment } from "@/lib/validators/establishment"
import { api } from "./api-client"

export async function getEstablishment() {
  const result = await api.get("establishments").json<Establishment>()

  return result
}
