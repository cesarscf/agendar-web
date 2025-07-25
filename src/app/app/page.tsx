import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

export default async function Page() {
  const { session } = await auth()

  if (!session) {
    throw redirect("/login")
  }

  return (
    <div>
      <h1>{session.name}</h1>
    </div>
  )
}
