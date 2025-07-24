import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

import { PackagePageClient } from "./package-page-client"

export default async function Page() {
  const { session } = await auth()

  if (!session) {
    throw redirect("/login")
  }

  return <PackagePageClient />
}
