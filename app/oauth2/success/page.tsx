"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { FullScreenLoader } from "@/components/ui/full-screen-loader"

export default function OAuth2SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { loginWithToken } = useAuth()

  useEffect(() => {
    const token = searchParams.get("token")

    if (token) {
      loginWithToken(token)
      router.push("/dashboard")
    } else {
      // Handle the case where the token is not present
      router.push("/login?error=authentication-failed")
    }
  }, [router, searchParams, loginWithToken])

  return <FullScreenLoader />
}
