
export interface FavoriteRecipe {
  recipeId: number;
  dishName: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class FavoritesService {
  static async getFavorites(token: string): Promise<FavoriteRecipe[]> {
    const response = await fetch(`${API_BASE_URL}/user/favorites`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get favorite recipes");
    }

    return response.json();
  }

  static async removeFromFavorites(recipeId: number, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/user/favorites/${recipeId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to remove from favorites");
    }
  }

  static async add(recipeId: number, token: string): Promise<void> {
    console.log("Adding to favorites", recipeId);
    const response = await fetch(`${API_BASE_URL}/user/favorites/${recipeId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    if (!response.ok) {
      throw new Error("Failed to add to favorites");
    }
  }

  
}