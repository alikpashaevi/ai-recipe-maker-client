"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import SearchBar from "./search-bar";
import { RecipeDisplay } from "./recipe-display"
import { type NutritionAndRecipe, RecipeService } from "@/lib/recipe"
import { AuthService } from "@/lib/auth"
import { AlertCircle } from "lucide-react"

export function RecipeMaker() {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [currentRecipe, setCurrentRecipe] = useState<NutritionAndRecipe | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const generateRecipe = async () => {
    if (ingredients.length === 0) return

    setError("")
    setIsLoading(true)

    try {
      const token = AuthService.getToken()
      if (!token) {
        throw new Error("Not authenticated")
      }

      const recipe = await RecipeService.generateRecipe(ingredients, token)
      setCurrentRecipe(recipe)
    } catch (err) {
      setError("Failed to generate recipe. Please try again.")
      console.error("Recipe generation error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewRecipe = () => {
    setCurrentRecipe(null)
    // Keep the same ingredients for easy regeneration
  }

  return (
    <div className="space-y-8">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <SearchBar
        ingredients={ingredients}
        onIngredientsChange={setIngredients}
        onGenerateRecipe={generateRecipe}
        isLoading={isLoading}
      />

      {currentRecipe && <RecipeDisplay recipe={currentRecipe} onNewRecipe={handleNewRecipe} />}
    </div>
  )
}
