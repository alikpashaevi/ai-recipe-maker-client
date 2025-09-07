// History service for managing user recipe history
export interface UserHistoryDTO {
  recipeId: number
  dishName: string
  viewedAt: string // ISO date string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

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
}
