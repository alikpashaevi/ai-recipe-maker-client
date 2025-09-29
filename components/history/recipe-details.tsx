import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import type { Recipe } from "@/lib/history"
import { FavoritesService } from "@/lib/favorites";
import { AuthService } from "@/lib/auth";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface RecipeDetailsProps {
  recipe: Recipe;
  from?: string | null;
}

export function RecipeDetails({ recipe, from }: RecipeDetailsProps) {
  const recipeData = recipe.recipeResponse;
  const nutritionData = recipe.nutritionResponse;
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToFavorites = async () => {
    setIsAdding(true);
    try {
      const token = AuthService.getToken();
      if (!token) {
        throw new Error("Not authenticated");
      }
      await FavoritesService.add(recipe.recipeResponse.recipeId, token);
      setIsAdded(true);
      toast.success("Recipe added to favorites!");
    } catch (error) {
      toast.error("Failed to add to favorites.");
    } finally {
      setIsAdding(false);
    }
  };

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
          <div className="flex items-center gap-2">
            {from !== 'favorites' && (
              <Button
                variant={isAdded ? "default" : "outline"}
                size="sm"
                onClick={handleAddToFavorites}
                disabled={isAdding || isAdded}
              >
                {isAdding ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isAdded ? (
                  <>
                    <Heart className="h-4 w-4 mr-2" fill="currentColor" />
                    Added
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4 mr-2" />
                    Add to Favorites
                  </>
                )}
              </Button>
            )}
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