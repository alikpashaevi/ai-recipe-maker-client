"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type User, AuthService } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated on mount
    const token = AuthService.getToken()
    if (token) {
      // In a real app, you'd validate the token and fetch user data
      // For now, we'll just set authenticated state
      setUser({ id: 1, username: "user", email: "user@example.com", roles: [] })
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response = await AuthService.login({ username, password })
      AuthService.setToken(response.accessToken)
      // In a real app, decode JWT to get user info
      setUser({ id: 1, username, email: "user@example.com", roles: [] })
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    AuthService.removeToken()
    setUser(null)
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}