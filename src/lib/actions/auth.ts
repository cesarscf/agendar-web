"use server"

import { HTTPError } from "ky"
import { cookies } from "next/headers"
import type { z } from "zod"
import { login } from "@/http/login"
import { register } from "@/http/register"
import type { loginSchema, registerSchema } from "@/lib/validations/auth"

export async function loginWithEmailAndPassword(
  inputs: z.infer<typeof loginSchema>
) {
  try {
    const { email, password } = inputs

    const { data, error } = await login({
      email,
      password,
    })

    const awaitedCookies = await cookies()

    if (error) {
      throw Error(error)
    }

    awaitedCookies.set("token", data!.token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return {
      data: data!.token,
      error: null,
    }
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { data: null, error: message }
    }

    return {
      data: null,
      error: "Erro inesperado, tente novamente em alguns minutos.",
    }
  }
}

export async function registerWithEmailAndPassword(
  inputs: z.infer<typeof registerSchema>
) {
  try {
    const { name, email, password } = inputs

    const { data, error } = await register({
      name,
      email,
      password,
    })

    const awaitedCookies = await cookies()

    if (error) {
      throw Error(error)
    }

    awaitedCookies.set("token", data!.token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return {
      data: data!.token,
      error: null,
    }
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { data: null, error: message }
    }

    return {
      data: null,
      error: "Erro inesperado, tente novamente em alguns minutos.",
    }
  }
}
