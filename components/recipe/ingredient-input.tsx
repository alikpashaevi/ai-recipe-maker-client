"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X, Sparkles } from "lucide-react"

interface IngredientInputProps {
  ingredients: string[]
  onIngredientsChange: (ingredients: string[]) => void
  onGenerateRecipe: () => void
  isLoading: boolean
}

export function IngredientInput({
  ingredients,
  onIngredientsChange,
  onGenerateRecipe,
  isLoading,
}: IngredientInputProps) {
  const [currentIngredient, setCurrentIngredient] = useState("")

  const addIngredient = () => {
    const ingredient = currentIngredient.trim()
    if (ingredient && !ingredients.includes(ingredient)) {
      onIngredientsChange([...ingredients, ingredient])
      setCurrentIngredient("")
    }
  }

  const removeIngredient = (ingredientToRemove: string) => {
    onIngredientsChange(ingredients.filter((ingredient) => ingredient !== ingredientToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addIngredient()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          What&apos;s in your kitchen?
        </CardTitle>
        <CardDescription>
          Add the ingredients you have available, and our AI will create a delicious recipe for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Ingredient Input */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="ingredient" className="sr-only">
              Add ingredient
            </Label>
            <Input
              id="ingredient"
              placeholder="Enter an ingredient (e.g., chicken, tomatoes, rice)"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <Button type="button" onClick={addIngredient} disabled={!currentIngredient.trim()}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Ingredients List */}
        {ingredients.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Your Ingredients ({ingredients.length})</Label>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient) => (
                <Badge key={ingredient} variant="secondary" className="flex items-center gap-1">
                  {ingredient}
                  <button
                    type="button"
                    onClick={() => removeIngredient(ingredient)}
                    className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Generate Button */}
        <Button
          onClick={onGenerateRecipe}
          disabled={ingredients.length === 0 || isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Creating your recipe...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Recipe
            </>
          )}
        </Button>

        {ingredients.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">Add at least one ingredient to get started</p>
        )}
      </CardContent>
    </Card>
  )
}
