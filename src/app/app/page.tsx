import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"

export default async function Page() {
  const { partner } = await getSession()

  if (!partner) {
    redirect("/login")
  }

  return <div>{partner.name}</div>
}
