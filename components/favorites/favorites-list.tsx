"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RecipeCard } from "./recipe-card"
import { FavoritesService, type FavoriteRecipe } from "@/lib/favorites"
import { AuthService } from "@/lib/auth"
import { Loader2, AlertCircle, Heart } from "lucide-react"

export function FavoritesList() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    try {
      const token = AuthService.getToken()
      if (!token) throw new Error("Not authenticated")

      const recipes = await FavoritesService.getFavorites(token)
      setFavorites(recipes)
    } catch (err) {
      setError("Failed to load favorite recipes")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveFavorite = (recipeId: number) => {
    setFavorites(favorites.filter((recipe) => recipe.recipeId !== recipeId))
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground">Loading your favorite recipes...</p>
          </div>
        </CardContent>
      </Card>
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

  if (favorites.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">No favorite recipes yet</h3>
              <p className="text-muted-foreground">Start adding recipes to your favorites to see them here.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {favorites.map((recipe) => (
        <RecipeCard key={recipe.recipeId} recipe={recipe} onRemove={handleRemoveFavorite} />
      ))}
    </div>
  )
}