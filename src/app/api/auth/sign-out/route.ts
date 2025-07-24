import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = "/login"
  const waitedCookie = await cookies()

  waitedCookie.delete("token")

  return NextResponse.redirect(redirectUrl)
}
