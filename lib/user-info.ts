import { AuthService, type User } from "./auth";

export const CUISINE_OPTIONS = [
  "Italian",
  "Chinese",
  "Mexican",
  "Indian",
  "Japanese",
  "Thai",
  "French",
  "Mediterranean",
  "American",
  "Korean",
  "Vietnamese",
  "Greek",
  "Spanish",
  "Middle Eastern",
  "Other",
]

export const COMMON_ALLERGIES = [
  "Nuts",
  "Peanuts",
  "Shellfish",
  "Fish",
  "Eggs",
  "Dairy",
  "Soy",
  "Wheat",
  "Sesame",
  "Sulfites",
]

export const COMMON_DISLIKES = [
  "Mushrooms",
  "Onions",
  "Garlic",
  "Cilantro",
  "Spicy food",
  "Seafood",
  "Organ meat",
  "Blue cheese",
  "Olives",
  "Coconut",
]
export interface UserInfoRequest {
  favoriteCuisine: string
  dislikedIngredients: string[]
  allergies: string[]
  vegetarian: boolean
  vegan: boolean
  glutenFree: boolean
}

export interface UserInfo extends UserInfoRequest {
  id: number
  appUser: {
    id: number
    username: string
    email: string
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export class UserInfoService {
  static async createUserInfo(userInfo: UserInfoRequest, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/user-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userInfo),
    })

    if (!response.ok) {
      throw new Error("Failed to create user info")
    }
  }

  static async updateUserInfo(userInfo: UserInfoRequest, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/user-info`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userInfo),
    })

    if (!response.ok) {
      throw new Error("Failed to update user info")
    }
  }

  static async getUserInfo(token: string): Promise<UserInfo> {
    const response = await fetch(`${API_BASE_URL}/user-info`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get user info")
    }

    if (!response.body === null) {
      return null as any
    }

    return response.json()
  }
}