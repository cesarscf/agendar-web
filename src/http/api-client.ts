import axios, { type InternalAxiosRequestConfig } from "axios"
import { type CookiesFn, getCookie } from "cookies-next"
import { env } from "@/env"

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  let cookieStore: CookiesFn | undefined

  if (typeof window === "undefined") {
    const { cookies: serverCookies } = await import("next/headers")
    cookieStore = serverCookies
  }

  const token = await getCookie("token", { cookies: cookieStore })

  if (token && config.headers?.set) {
    config.headers.set("Authorization", `Bearer ${token}`)
  }

  return config
})

export { api }
