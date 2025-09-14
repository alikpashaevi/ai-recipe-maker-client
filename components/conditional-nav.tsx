'use client'

import { useAuth } from '@/contexts/auth-context'
import { Navigation } from '@/components/navigation'
import { DashboardNav } from '@/components/dashboard/dashboard-nav'

export function ConditionalNav() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  return isAuthenticated ? <DashboardNav /> : <Navigation />
}
