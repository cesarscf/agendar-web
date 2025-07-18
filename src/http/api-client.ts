import axios from "axios"
import { getCookie } from "cookies-next"
import { env } from "@/env"

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(config => {
  const token = getCookie("token")

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export { api }
