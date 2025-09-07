"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Recipe } from "@/lib/recipe"
import { RecipeService } from "@/lib/recipe"
import { AuthService } from "@/lib/auth"
import { Clock, Users, Trash2, Loader2, AlertCircle } from "lucide-react"

interface RecipeCardProps {
  recipe: Recipe
  onRemove: (recipeId: number) => void
}

export function RecipeCard({ recipe, onRemove }: RecipeCardProps) {
  const [isRemoving, setIsRemoving] = useState(false)
  const [error, setError] = useState("")

  const handleRemoveFromFavorites = async () => {
    setError("")
    setIsRemoving(true)

    try {
      const token = AuthService.getToken()
      if (!token) throw new Error("Not authenticated")

      await RecipeService.removeFromFavorites(recipe.id, token)
      onRemove(recipe.id)
    } catch (err) {
      setError("Failed to remove from favorites")
    } finally {
      setIsRemoving(false)
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-balance">{recipe.name}</CardTitle>
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
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Recipe Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {recipe.estimatedTime} min
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {recipe.servings} servings
          </div>
        </div>

        {/* Nutrition Info */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <div className="text-sm font-semibold text-primary">{recipe.nutrition.calories}</div>
            <div className="text-xs text-muted-foreground">cal</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-primary">{recipe.nutrition.protein}g</div>
            <div className="text-xs text-muted-foreground">protein</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-primary">{recipe.nutrition.carbs}g</div>
            <div className="text-xs text-muted-foreground">carbs</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-primary">{recipe.nutrition.fat}g</div>
            <div className="text-xs text-muted-foreground">fat</div>
          </div>
        </div>

        {/* Ingredients Preview */}
        <div>
          <div className="text-sm font-medium mb-2">Ingredients:</div>
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {ingredient}
              </Badge>
            ))}
            {recipe.ingredients.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{recipe.ingredients.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
