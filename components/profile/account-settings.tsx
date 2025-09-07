"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { UserService } from "@/lib/user"
import { AuthService } from "@/lib/auth"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

export function AccountSettings() {
  const { user, setUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // Username change state
  const [newUsername, setNewUsername] = useState(user?.username || "")

  // Password change state
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleUsernameChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUsername.trim() || newUsername === user?.username) return

    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const token = AuthService.getToken()
      if (!token) throw new Error("Not authenticated")

      await UserService.changeUsername(newUsername, token)

      // Update user in context
      if (user) {
        setUser({ ...user, username: newUsername })
      }

      setSuccess("Username updated successfully!")
    } catch (err) {
      setError("Failed to update username. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match")
      return
    }

    if (passwordData.newPassword.length < 8) {
      setError("New password must be at least 8 characters long")
      return
    }

    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const token = AuthService.getToken()
      if (!token) throw new Error("Not authenticated")

      await UserService.changePassword(passwordData.oldPassword, passwordData.newPassword, token)

      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      setSuccess("Password updated successfully!")
    } catch (err) {
      setError("Failed to update password. Please check your current password and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {(success || error) && (
        <Alert variant={error ? "destructive" : "default"}>
          {error ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
          <AlertDescription>{error || success}</AlertDescription>
        </Alert>
      )}

      {/* Username Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Username</CardTitle>
          <CardDescription>Update your username. This will be visible to other users.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUsernameChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter new username"
                required
                minLength={2}
                maxLength={30}
              />
            </div>
            <Button type="submit" disabled={isLoading || !newUsername.trim() || newUsername === user?.username}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Username
            </Button>
          </form>
        </CardContent>
      </Card>

      <Separator />

      {/* Password Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password to keep your account secure.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="oldPassword">Current Password</Label>
              <Input
                id="oldPassword"
                type="password"
                value={passwordData.oldPassword}
                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                placeholder="Enter current password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                placeholder="Enter new password"
                required
                minLength={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                placeholder="Confirm new password"
                required
                minLength={8}
              />
            </div>
            <Button
              type="submit"
              disabled={
                isLoading || !passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword
              }
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
