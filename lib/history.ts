// History service for managing user recipe history
export interface UserHistoryDTO {
  recipeId: number
  dishName: string
  viewedAt: string // ISO date string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export interface NutritionInfo {
  value: number;
  unit: string;
}

export interface NutritionData {
  recipesUsed?: number;
  calories?: NutritionInfo;
  fat?: NutritionInfo;
  protein?: NutritionInfo;
  carbs?: NutritionInfo;
  [key: string]: any;
}

export interface Recipe {
  recipeResponse: {
    recipeId: number;
    dish_name: string;
    ingredients: string[];
    instructions: string[];
    estimated_time_minutes: number;
    servings: number;
  };
  nutritionResponse: NutritionData | null;
}

export class HistoryService {
  static async getUserHistory(token: string): Promise<UserHistoryDTO[]> {
    const response = await fetch(`${API_BASE_URL}/user-history`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get user history")
    }

    return response.json()
  }

  static async getRecipeById(id: string, token: string): Promise<Recipe> {
    const response = await fetch(`${API_BASE_URL}/chat/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get recipe")
    }

    return response.json()
  }
}
