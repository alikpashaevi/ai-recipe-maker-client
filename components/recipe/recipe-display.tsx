"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { NutritionAndRecipe } from "@/lib/recipe"
import { AuthService } from "@/lib/auth"
import { FavoritesService } from "@/lib/favorites"
import { Heart, Clock, Users, Loader2, RefreshCw, CheckCircle } from "lucide-react"

interface RecipeDisplayProps {
  recipe: NutritionAndRecipe
  onNewRecipe: () => void
}

export function RecipeDisplay({ recipe, onNewRecipe }: RecipeDisplayProps) {
  const [isFavoriting, setIsFavoriting] = useState(false)
  const [favoriteSuccess, setFavoriteSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleAddToFavorites = async () => {
    setError("")
    setIsFavoriting(true)

    try {
      const token = AuthService.getToken()
      if (!token) {
        throw new Error("Not authenticated")
      }

      await FavoritesService.add(recipe.recipeResponse.recipeId, token)
      setFavoriteSuccess(true)
      setTimeout(() => setFavoriteSuccess(false), 3000)
    } catch (err) {
      setError("Failed to add to favorites. Please try again.")
    } finally {
      setIsFavoriting(false)
    }
  }

  const { recipeResponse, nutritionResponse } = recipe

  return (
    <div className="space-y-6">
      {/* Recipe Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl text-balance">{recipeResponse.dish_name}</CardTitle>
              <CardDescription className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {recipeResponse.estimated_time_minutes} minutes
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {recipeResponse.servings} servings
                </div>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleAddToFavorites} disabled={isFavoriting} variant="outline">
              {isFavoriting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : favoriteSuccess ? (
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              ) : (
                <Heart className="mr-2 h-4 w-4" />
              )}
              {favoriteSuccess ? "Added!" : "Add to Favorites"}
            </Button>
            <Button onClick={onNewRecipe} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New Recipe
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {favoriteSuccess && (
            <Alert className="mt-4">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Recipe added to your favorites!</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Nutrition Information */}
      <Card>
        <CardHeader>
          <CardTitle>Nutrition Information</CardTitle>
          <CardDescription>Per serving nutritional breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{nutritionResponse.calories.value}</div>
              <div className="text-sm text-muted-foreground">{nutritionResponse.calories.unit}</div>
              <div className="text-xs text-muted-foreground">Calories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{nutritionResponse.protein.value}</div>
              <div className="text-sm text-muted-foreground">{nutritionResponse.protein.unit}</div>
              <div className="text-xs text-muted-foreground">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{nutritionResponse.carbs.value}</div>
              <div className="text-sm text-muted-foreground">{nutritionResponse.carbs.unit}</div>
              <div className="text-xs text-muted-foreground">Carbs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{nutritionResponse.fat.value}</div>
              <div className="text-sm text-muted-foreground">{nutritionResponse.fat.unit}</div>
              <div className="text-xs text-muted-foreground">Fat</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ingredients */}
      <Card>
        <CardHeader>
          <CardTitle>Ingredients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {recipeResponse.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center text-xs">
                  {index + 1}
                </Badge>
                <span>{ingredient}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recipeResponse.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-4">
                <Badge
                  variant="default"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
                >
                  {index + 1}
                </Badge>
                <p className="text-sm leading-relaxed">{instruction}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
