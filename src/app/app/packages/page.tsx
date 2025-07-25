import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { PackagesPageClient } from "./packages-page-client"

export default async function Page() {
  const { session } = await auth()

  if (!session) {
    throw redirect("/login")
  }

  return <PackagesPageClient />
}
