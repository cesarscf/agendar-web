import { api } from "./api-client"

interface GetParterResponse {
  partner: {
    id: string
    name: string
    email: string
  }
}

export async function getPartner() {
  const result = await api.get("partner").json<GetParterResponse>()

  return result
}
