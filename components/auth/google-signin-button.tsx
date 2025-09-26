"use client"

import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"

export function GoogleSignInButton() {
  const onClick = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/google`
  }

  return (
    <Button variant="outline" className="w-full" onClick={onClick}>
      <FcGoogle className="mr-2 h-4 w-4" />
      Sign in with Google
    </Button>
  )
}
