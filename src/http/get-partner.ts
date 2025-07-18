import type { Partner } from "@/lib/validators/partner"
import { api } from "./api-client"

export async function getPartner() {
  const result = await api.get("partner").json<Partner>()

  return result
}
