// User management service for profile updates
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export class UserService {
  static async changeUsername(newUsername: string, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/user/username?newUsername=${encodeURIComponent(newUsername)}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to change username")
    }
  }

  static async changePassword(oldPassword: string, newPassword: string, token: string): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}/user/password?oldPassword=${encodeURIComponent(oldPassword)}&newPassword=${encodeURIComponent(newPassword)}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to change password")
    }
  }
}
