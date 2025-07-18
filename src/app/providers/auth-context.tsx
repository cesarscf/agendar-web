"use client"

import { deleteCookie, getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import * as React from "react"
import { getPartner } from "@/http/get-partner"
import type { Partner } from "@/lib/validators/partner"

export interface AuthContextType {
  isAuthenticated: boolean
  partner: Partner | null
  login(): void
  logout(): void
  refreshPartner(): Promise<void>
}

function createAuthContext() {
  const AuthContext = React.createContext<AuthContextType | null>(null)

  function AuthProvider({ children }: { children: React.ReactNode }) {
    const [partner, setPartner] = React.useState<Partner | null>(null)

    const router = useRouter()

    function logout(): void {
      deleteCookie("token")
      setPartner(null)
      router.push("/login")
    }

    async function refreshPartner(): Promise<void> {
      try {
        const partner = await getPartner()
        if (!partner) {
          logout()
        } else {
          setPartner(partner)
        }
      } catch {
        logout()
      }
    }

    function login(): void {
      refreshPartner()
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: ...
    React.useEffect(() => {
      const token = getCookie("token")

      if (token) refreshPartner()
      if (!token) logout()
    }, [])

    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: !!partner,
          partner,
          login,
          logout,
          refreshPartner,
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  }

  function useAuth(): AuthContextType {
    const context = React.useContext(AuthContext)
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
  }

  return {
    AuthProvider,
    useAuth,
  }
}

export const { AuthProvider, useAuth } = createAuthContext()
