"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { getPartner } from "@/http/get-partner"

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

export async function signOut() {
  const awaitedCookies = await cookies()

  awaitedCookies.delete("token")
}
