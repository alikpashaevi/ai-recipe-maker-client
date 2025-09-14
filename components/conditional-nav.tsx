'use client'

import { useAuth } from '@/contexts/auth-context'
import { Navigation } from '@/components/navigation'
import { DashboardNav } from '@/components/dashboard/dashboard-nav'

export function ConditionalNav() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    // You might want a placeholder or skeleton loader here
    // For now, we can render the logged-out nav or nothing to prevent layout shift
    return <Navigation />
  }

  return isAuthenticated ? <DashboardNav /> : <Navigation />
}
