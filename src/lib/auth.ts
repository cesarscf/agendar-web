import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getPartner } from "@/http/get-partner"

export async function isAuthenticated() {
  const awaitedCookies = await cookies()

  return !!awaitedCookies.get("token")?.value
}

export async function auth() {
  const awaitedCookies = await cookies()

  const token = awaitedCookies.get("token")?.value

  if (!token) {
    redirect("/login")
  }

  try {
    const { data } = await getPartner()

    return { session: data?.partner, token }
  } catch {}

  redirect("/api/auth/sign-out")
}
