"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { AuthService } from "@/lib/auth";
import { useAuth } from "@/contexts/auth-context"
import { HistoryService, Recipe } from "@/lib/history"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { RecipeDetails } from "@/components/history/recipe-details"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function RecipePage() {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id && isAuthenticated) {
      const token = AuthService.getToken()
      if (token) {
        const recipeId = Array.isArray(id) ? id[0] : id
        HistoryService.getRecipeById(recipeId, token)
          .then(data => {
            setRecipe(data)
            setLoading(false)
          })
          .catch(err => {
            setError("Failed to load recipe.")
            setLoading(false)
          })
      }
    }
  }, [id, isAuthenticated])

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {loading && 
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center space-y-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                  <p className="text-muted-foreground">Loading your favorite recipes...</p>
                </div>
              </CardContent>
            </Card>
          }
          {error && <p className="text-red-500">{error}</p>}
          {recipe && <RecipeDetails recipe={recipe} />}
        </div>
      </main>
    </div>
  )
}
