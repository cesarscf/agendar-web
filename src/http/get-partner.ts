import type { Partner } from "@/lib/validations/partner"
import { api } from "./api-client"

export async function getPartner() {
  const result = await api.get("partner").json<Partner>()

  return result
}
