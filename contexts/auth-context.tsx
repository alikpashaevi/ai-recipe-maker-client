"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { type User, AuthService } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  loginWithToken: (token: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
 const router = useRouter()
 
  useEffect(() => {
    const validateUser = async () => {
      const token = AuthService.getToken()
      if (token) {
        try {
          // In a real app, you'd validate the token with your backend
          // For this example, we'll simulate fetching user data
          const userData = await AuthService.getProfile(token)
          setUser(userData)
        } catch (error) {
          // Token is invalid or expired
          AuthService.removeToken()
          setUser(null)
        }
      }
      setIsLoading(false)
    }

    validateUser()
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response = await AuthService.login({ username, password })
      console.log("Login successful, response:", response)
      AuthService.setToken(response.accessToken)
      const userData = await AuthService.getProfile(response.accessToken)
      setUser(userData)
      console.log("Login successful, user data:", userData)
    } catch (error) {
      throw error
    }
  }

  const loginWithToken = (token: string) => {
    AuthService.setToken(token)
    AuthService.getProfile(token).then(setUser)
  }

  const logout = () => {
    AuthService.removeToken()
    setUser(null)
    router.push("/login")
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    setUser,
    loginWithToken,
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