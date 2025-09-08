import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Recipe } from "@/lib/history"

interface RecipeDetailsProps {
  recipe: Recipe
}

export function RecipeDetails({ recipe }: RecipeDetailsProps) {
  const recipeData = recipe.recipeResponse;
  const nutritionData = recipe.nutritionResponse;

  if (!recipeData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recipe not found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The recipe details could not be loaded.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl font-bold text-foreground mb-2">{recipeData.dish_name}</CardTitle>
          <div className="flex gap-2">
            <Badge variant="secondary">{recipeData.servings} servings</Badge>
            <Badge variant="secondary">{recipeData.estimated_time_minutes} minutes</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
            <ul className="list-disc list-inside space-y-2">
              {recipeData.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Instructions</h3>
            <ol className="list-decimal list-inside space-y-4">
              {recipeData.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Nutrition Information</h3>
          {nutritionData ? (
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {Object.entries(nutritionData).map(([key, value]) => {
                if (key === 'recipesUsed') return null;
                if (value && typeof value === 'object' && 'value' in value && 'unit' in value) {
                  return (
                    <div key={key} className="flex justify-between">
                      <span className="font-medium capitalize">{key.replace(/_/g, ' ')}</span>
                      <span>{value.value} {value.unit}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <p>Nutrition information not found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}