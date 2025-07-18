"use client"

import { useAuth } from "@/app/providers/auth-context"
import { Button } from "./ui/button"

export function Logout() {
  const { logout } = useAuth()
  return (
    <Button
      onClick={() => {
        logout()
      }}
    >
      Sair
    </Button>
  )
}
