"use client"

import { useState, useEffect } from "react"
import { StatsCards } from "./stats-cards"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AdminService } from "@/lib/admin"
import { AuthService } from "@/lib/auth"
import { Loader2, AlertCircle } from "lucide-react"

export function AdminOverview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRecipes: 0,
    totalFavorites: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const token = AuthService.getToken()
      if (!token) throw new Error("Not authenticated")

      // Load users to get total count
      const usersResponse = await AdminService.getUsers(0, 1, token)

      // For now, we'll use mock data for recipes and favorites
      // In a real app, you'd have dedicated endpoints for these stats
      setStats({
        totalUsers: usersResponse.totalElements,
        totalRecipes: 1247, // Mock data
        totalFavorites: 892, // Mock data
      })
    } catch (err) {
      setError("Failed to load statistics")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return <StatsCards {...stats} />
}
