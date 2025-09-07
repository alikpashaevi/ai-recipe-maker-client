// Recipe service for AI recipe generation and management
export interface RecipeResponse {
  dish_name: string
  ingredients: string[]
  instructions: string[]
  estimated_time_minutes: number
  servings: number
}

export interface NutritionInfo {
  value: number
  unit: string
}

export interface NutritionResponse {
  recipesUsed: number
  calories: NutritionInfo
  fat: NutritionInfo
  protein: NutritionInfo
  carbs: NutritionInfo
}

export interface NutritionAndRecipe {
  recipeResponse: RecipeResponse
  nutritionResponse: NutritionResponse
}

export interface Recipe {
  id: number
  name: string
  ingredients: string[]
  instructions: string[]
  estimatedTime: number
  servings: number
  nutrition: {
    id: number
    calories: number
    fat: number
    protein: number
    carbs: number
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export class RecipeService {
  static async generateRecipe(ingredients: string[], token: string): Promise<NutritionAndRecipe> {
    const params = new URLSearchParams()
    ingredients.forEach((ingredient) => params.append("ingredients", ingredient))

    const response = await fetch(`${API_BASE_URL}/chat/ask-ai?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(response)
    if (!response.ok) {
      throw new Error("Failed to generate recipe")
    }

    return response.json()
  }

  static async getRecipes(token: string): Promise<Recipe[]> {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get recipes")
    }

    return response.json()
  }

  static async addToFavorites(recipeId: number, token: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/user/favorites/${recipeId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to add to favorites")
    }

    return response.text()
  }

  static async removeFromFavorites(recipeId: number, token: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/user/favorites/${recipeId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to remove from favorites")
    }

    return response.text()
  }
}
