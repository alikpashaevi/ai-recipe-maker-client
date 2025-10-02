'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { type User, AuthService } from "@/lib/auth"
import { UserInfoService } from "@/lib/user-info"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  onboardingStatus: 'unknown' | 'complete' | 'required'
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  loginWithToken: (token: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [onboardingStatus, setOnboardingStatus] = useState<'unknown' | 'complete' | 'required'>('unknown')
  const router = useRouter()

  const checkOnboardingStatus = async (token: string) => {
    try {
      await UserInfoService.getUserInfo(token)
      setOnboardingStatus('complete')
    } catch (error) {
      setOnboardingStatus('required')
    }
  }

  useEffect(() => {
    const validateUser = async () => {
      const token = AuthService.getToken()
      if (token) {
        try {
          const userData = await AuthService.getProfile(token)
          setUser(userData)
          await checkOnboardingStatus(token)
        } catch (error) {
          AuthService.removeToken()
          setUser(null)
        }
      }
      setIsLoading(false)
    }

    validateUser()
  }, [])

  useEffect(() => {
    if (isAuthenticated && onboardingStatus === 'required') {
      router.push('/onboarding')
    }
  }, [isAuthenticated, onboardingStatus, router])

  const login = async (username: string, password: string) => {
    try {
      const response = await AuthService.login({ username, password })
      console.log("Login successful, response:", response)
      AuthService.setToken(response.accessToken)
      const userData = await AuthService.getProfile(response.accessToken)
      setUser(userData)
      await checkOnboardingStatus(response.accessToken)
      console.log("Login successful, user data:", userData)
    } catch (error) {
      throw error
    }
  }

  const loginWithToken = (token: string) => {
    AuthService.setToken(token)
    AuthService.getProfile(token).then(async (userData) => {
      setUser(userData)
      await checkOnboardingStatus(token)
    })
  }

  const logout = () => {
    AuthService.removeToken()
    setUser(null)
    setOnboardingStatus('unknown')
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    onboardingStatus,
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