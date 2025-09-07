// Authentication utilities and types
export interface User {
  id: number
  username: string
  email: string
  roles: Role[]
}

export interface Role {
  id: number
  name: string
}

export interface LoginResponse {
  accessToken: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface EmailRequest {
  email: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export class AuthService {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    return response.json()
  }

  static async register(userData: RegisterRequest): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userData
      }),
    })
    console.log(response)

    if (!response.ok) {
      throw new Error("Registration failed")
    }
  }

  static async sendVerificationCode(email: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/register/send-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      throw new Error("Failed to send verification code")
    }
  }

  static async verifyCode(email: string, code: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/register/verify-code?code=${code}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      throw new Error("Code verification failed")
    }
  }

  static setToken(token: string): void {
    localStorage.setItem("auth_token", token)
  }

  static getToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem("auth_token")
  }

  static removeToken(): void {
    localStorage.removeItem("auth_token")
  }

  static isAuthenticated(): boolean {
    return !!this.getToken()
  }
}
