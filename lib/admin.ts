// Admin service for managing users and admin operations
export interface AdminUser {
  id: number
  username: string
  email: string
  provider: "LOCAL" | "GOOGLE"
  roles: Array<{
    id: number
    name: string
  }>
}

export interface UsersResponse {
  content: AdminUser[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export class AdminService {
  static async getUsers(page = 0, pageSize = 10, token: string): Promise<UsersResponse> {
    const response = await fetch(`${API_BASE_URL}/user/users?page=${page}&pageSize=${pageSize}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get users")
    }

    const data = await response.json()

    // Transform the response to match our expected format
    // The API might return a different structure, so we'll adapt it
    if (Array.isArray(data)) {
      return {
        content: data,
        totalElements: data.length,
        totalPages: Math.ceil(data.length / pageSize),
        size: pageSize,
        number: page,
      }
    }

    return data
  }
}
