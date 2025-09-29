"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserInfoService, type UserInfoRequest } from "@/lib/user-info"
import { AuthService } from "@/lib/auth"
import { CuisineStep } from "@/components/onboarding/steps/cuisine-step"
import { DietaryRestrictionsStep } from "@/components/onboarding/steps/dietary-restrictions-step"
import { AllergiesStep } from "@/components/onboarding/steps/allergies-step"
import { DislikesStep } from "@/components/onboarding/steps/dislikes-step"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

export function DietaryPreferences() {
  const [userInfo, setUserInfo] = useState<UserInfoRequest>({
    favoriteCuisine: "",
    dislikedIngredients: [],
    allergies: [],
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    loadUserInfo()
  }, [])

  const loadUserInfo = async () => {
    try {
      const token = AuthService.getToken()
      if (!token) throw new Error("Not authenticated")

      const info = await UserInfoService.getUserInfo(token)
      setUserInfo({
        favoriteCuisine: info.favoriteCuisine,
        dislikedIngredients: info.dislikedIngredients,
        allergies: info.allergies,
        vegetarian: info.vegetarian,
        vegan: info.vegan,
        glutenFree: info.glutenFree,
      })
    } catch (err) {
      setError("Failed to load dietary preferences")
    } finally {
      setIsLoading(false)
    }
  }

  const updateUserInfo = (updates: Partial<UserInfoRequest>) => {
    setUserInfo((prev) => ({ ...prev, ...updates }))
  }

  const handleSave = async () => {
    setError("")
    setSuccess("")
    setIsSaving(true)

    try {
      const token = AuthService.getToken()
      if (!token) throw new Error("Not authenticated")

      await UserInfoService.updateUserInfo(userInfo, token)
      setSuccess("Dietary preferences updated successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      console.log(err)
      setError("Failed to update dietary preferences. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {(success || error) && (
        <Alert variant={error ? "destructive" : "default"}>
          {error ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
          <AlertDescription>{error || success}</AlertDescription>
        </Alert>
      )}

      {/* Favorite Cuisine */}
      <Card>
        <CardHeader>
          <CardTitle>Favorite Cuisine</CardTitle>
          <CardDescription>What type of cuisine do you enjoy most?</CardDescription>
        </CardHeader>
        <CardContent>
          <CuisineStep formData={userInfo} updateFormData={updateUserInfo} />
        </CardContent>
      </Card>

      {/* Dietary Restrictions */}
      <Card>
        <CardHeader>
          <CardTitle>Dietary Restrictions</CardTitle>
          <CardDescription>Tell us about your dietary preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <DietaryRestrictionsStep formData={userInfo} updateFormData={updateUserInfo} />
        </CardContent>
      </Card>

      {/* Allergies */}
      <Card>
        <CardHeader>
          <CardTitle>Food Allergies</CardTitle>
          <CardDescription>Let us know about any food allergies for your safety</CardDescription>
        </CardHeader>
        <CardContent>
          <AllergiesStep formData={userInfo} updateFormData={updateUserInfo} />
        </CardContent>
      </Card>

      {/* Dislikes */}
      <Card>
        <CardHeader>
          <CardTitle>Disliked Ingredients</CardTitle>
          <CardDescription>Ingredients you prefer to avoid in recipes</CardDescription>
        </CardHeader>
        <CardContent>
          <DislikesStep formData={userInfo} updateFormData={updateUserInfo} />
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Preferences
        </Button>
      </div>
    </div>
  )
}
