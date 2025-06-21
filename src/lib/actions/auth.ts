"use server"

import { HTTPError } from "ky"
import { cookies } from "next/headers"
import type { z } from "zod"

import { login } from "@/http/login"
import type { loginSchema } from "../validators/auth"

export async function signInWithEmailAndPassword(
  inputs: z.infer<typeof loginSchema>
) {
  try {
    const { email, password } = inputs

    const { token } = await login({
      email,
      password,
    })

    const awaitedCookies = await cookies()

    awaitedCookies.set("token", token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return {
      data: token,
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
