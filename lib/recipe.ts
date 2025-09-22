// Recipe service for AI recipe generation and management
export interface RecipeResponse {
  recipeId: number
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

export interface SearchResultRecipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  normalizedIngredients: {
    id: number;
    name: string;
  }[];
  estimatedTime: number;
  servings: number;
  nutrition: {
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    vegetarian: boolean;
  } | null;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface SearchResponse {
  content: SearchResultRecipe[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
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

  static async searchRecipes(ingredients: string[], page: number, pageSize: number, token: string): Promise<SearchResponse> {
    const params = new URLSearchParams()
    ingredients.forEach((ingredient) => params.append("ingredients", ingredient))
    params.append("page", page.toString())
    params.append("pageSize", pageSize.toString())

    const response = await fetch(`${API_BASE_URL}/chat/search?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to search recipes")
    }

    return response.json()
  }
}
