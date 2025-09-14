'use client'

import type React from "react"
import { useAuth } from '@/contexts/auth-context'
import { FullScreenLoader } from '@/components/ui/full-screen-loader'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth()

  return (
    <>
      {isLoading && <FullScreenLoader />}
      {children}
    </>
  )
}
