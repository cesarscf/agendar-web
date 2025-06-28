import { jwtVerify } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { env } from "@/env"
import { getPartner } from "@/http/get-partner"

type SessionData = {
  sub: string
}

const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET)

export async function isLoggedIn() {
  const awaitedCookies = await cookies()

  return !!awaitedCookies.get("token")?.value
}

export async function getSession() {
  const awaitedCookies = await cookies()

  const token = awaitedCookies.get("token")?.value

  if (!token) {
    redirect("/login")
  }

  const { partner } = await getPartner()

  return {
    session: token ?? null,
    partner: partner ?? null,
  }
}

export async function verifyToken(input: string) {
  const { payload } = await jwtVerify(input, JWT_SECRET, {
    algorithms: ["HS256"],
  })
  return payload as SessionData
}
