"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AuthService } from "@/lib/auth"
import { Loader2, CheckCircle } from "lucide-react"
import { GoogleSignInButton } from "./google-signin-button"

export function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const handleSendCode = async () => {
    setError("")
    setSuccess("")
    setIsLoading(true)
    try {
      await AuthService.sendVerificationCode(formData.email)
      setIsCodeSent(true)
      setSuccess("Verification code sent to your email.")
    } catch (err) {
      setError("Failed to send verification code. Please check the email and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    setError("")
    setSuccess("")
    setIsLoading(true)
    try {
      await AuthService.verifyCode(formData.email, verificationCode)
      setIsVerified(true)
      setSuccess("Email verified successfully!")
    } catch (err) {
      setError("Invalid or expired verification code.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isVerified) {
      setError("Please verify your email before creating an account.")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      await AuthService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      setSuccess("Account created successfully! Redirecting to onboarding...")
      setTimeout(() => {
        window.location.href = "/onboarding"
      }, 2000)
    } catch (err) {
      setError("Registration failed. The username or email might already be taken.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Create an account</CardTitle>
        <CardDescription className="text-center">Enter your details to get started with RecipeAI</CardDescription>
      </CardHeader>
      <form onSubmit={handleRegister}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              disabled={isVerified}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex space-x-2">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isCodeSent}
              />
              <Button type="button" onClick={handleSendCode} disabled={isLoading || isCodeSent || !formData.email}>
                {isLoading && !isCodeSent ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isCodeSent ? "Sent" : "Send Code"}
              </Button>
            </div>
          </div>

          {isCodeSent && !isVerified && (
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <div className="flex space-x-2">
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
                <Button type="button" onClick={handleVerifyCode} disabled={isLoading || !verificationCode}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Verify
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading || !isVerified}>
            {isLoading && isVerified && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
          <div className="relative w-full flex justify-center items-center my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <GoogleSignInButton />
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}