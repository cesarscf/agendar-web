import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { NewEmployeeBlockPageClient } from "./new-employee-block-page-client"

export default async function Page() {
  const { session } = await auth()

  if (!session) {
    throw redirect("/login")
  }

  return <NewEmployeeBlockPageClient />
}
