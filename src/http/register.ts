import { api } from "./api-client"

interface RegisterRequest {
  name: string
  email: string
  password: string
}

interface RegisterResponse {
  token: string
}

export async function register({ email, password, name }: RegisterRequest) {
  const result = await api
    .post("register", {
      json: {
        name,
        email,
        password,
      },
    })
    .json<RegisterResponse>()

  return result
}
