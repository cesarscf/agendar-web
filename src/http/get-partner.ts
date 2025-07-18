import { api } from "./api-client"

interface GetParterResponse {
  partner: {
    id: string
    name: string
    email: string
    establishments: [
      {
        id: string
        name: string
      },
    ]
    subscriptions: [
      {
        id: string
        status: string
        endedAt: Date
        createdAt: Date
      },
    ]
  }
}

export async function getPartner() {
  const result = await api.get("partner").json<GetParterResponse>()

  return result
}
