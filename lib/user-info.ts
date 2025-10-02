import { AuthService } from "./auth";

export interface UserInfoRequest {
  favoriteCuisine: string;
  dislikedIngredients: string[];
  allergies: string[];
  dietaryRestrictions: string[];
}

export interface UserInfo extends UserInfoRequest {
  id: number;
  appUser: {
    id: number;
    username: string;
    email: string;
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class UserInfoService {
  static async createUserInfo(
    userInfo: UserInfoRequest,
    token: string
  ): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/user-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error("Failed to create user info");
    }
  }

  static async updateUserInfo(
    userInfo: UserInfoRequest,
    token: string
  ): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/user-info`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error("Failed to update user info");
    }
  }

  static async getUserInfo(token: string): Promise<UserInfo> {
    const response = await fetch(`${API_BASE_URL}/user-info`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user info");
    }

    return response.json();
  }
}

export const saveUserInfo = async (userInfo: UserInfoRequest) => {
  const token = AuthService.getToken();
  if (!token) {
    throw new Error("No auth token found");
  }
  await UserInfoService.createUserInfo(userInfo, token);
};

export const getUserInfo = async () => {
  const token = AuthService.getToken();
  if (!token) {
    return null;
  }
  try {
    return await UserInfoService.getUserInfo(token);
  } catch (error) {
    console.error("Failed to get user info:", error);
    return null;
  }
};