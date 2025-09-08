"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { FavoriteRecipe } from "@/lib/favorites"
import { FavoritesService } from "@/lib/favorites"
import { AuthService } from "@/lib/auth"
import { Trash2, Loader2, AlertCircle } from "lucide-react"

interface RecipeCardProps {
  recipe: FavoriteRecipe
  onRemove: (recipeId: number) => void
}

export function RecipeCard({ recipe, onRemove }: RecipeCardProps) {
  const [isRemoving, setIsRemoving] = useState(false)
  const [error, setError] = useState("")

  const handleRemoveFromFavorites = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the remove button
    setError("")
    setIsRemoving(true)

    try {
      const token = AuthService.getToken()
      if (!token) throw new Error("Not authenticated")

      await FavoritesService.removeFromFavorites(recipe.recipeId, token)
      onRemove(recipe.recipeId)
    } catch (err) {
      setError("Failed to remove from favorites")
    } finally {
      setIsRemoving(false)
    }
  }

  return (
    <Link href={`/history/${recipe.recipeId}`} className="block hover:shadow-md transition-shadow rounded-lg">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg text-balance">{recipe.dishName}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveFromFavorites}
              disabled={isRemoving}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              {isRemoving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            </Button>
          </div>
          {error && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardHeader>
      </Card>
    </Link>
  )
}
