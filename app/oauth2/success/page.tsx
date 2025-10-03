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
    (async () => {
      try {
        loginWithToken(token)   // wait until user is fetched and set
        router.replace("/dashboard")  // replace avoids stacking history
      } catch (err) {
        console.error("Login failed", err)
        router.replace("/login?error=authentication-failed")
      }
    })()
  } else {
    router.replace("/login?error=authentication-failed")
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return <FullScreenLoader />
}
