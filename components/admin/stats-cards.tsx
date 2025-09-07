"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ChefHat, Heart, TrendingUp } from "lucide-react"

interface StatsCardsProps {
  totalUsers: number
  totalRecipes: number
  totalFavorites: number
}

export function StatsCards({ totalUsers, totalRecipes, totalFavorites }: StatsCardsProps) {
  const stats = [
    {
      title: "Total Users",
      value: totalUsers.toLocaleString(),
      icon: Users,
      description: "Registered users",
    },
    {
      title: "Recipes Generated",
      value: totalRecipes.toLocaleString(),
      icon: ChefHat,
      description: "AI-generated recipes",
    },
    {
      title: "Favorites Added",
      value: totalFavorites.toLocaleString(),
      icon: Heart,
      description: "Recipes saved as favorites",
    },
    {
      title: "Growth Rate",
      value: "+12%",
      icon: TrendingUp,
      description: "This month",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
