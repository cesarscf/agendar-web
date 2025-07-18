import { redirect } from "next/navigation"
import { Logout } from "@/components/logout"
import { getSession } from "@/lib/session"

export default async function Page() {
  const session = await getSession()

  if (!session?.partner) {
    throw redirect("/login")
  }

  return (
    <div>
      <h1>{session.partner.name}</h1>
      <Logout />
    </div>
  )
}
