import { api } from "./api-client"

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  token: string
}

export async function login({ email, password }: LoginRequest) {
  const result = await api
    .post("login", {
      json: {
        email,
        password,
      },
    })
    .json<LoginResponse>()

  return result
}
