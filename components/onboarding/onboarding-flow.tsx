"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { UserInfoService, type UserInfoRequest } from "@/lib/user-info"
import { AuthService } from "@/lib/auth"
import { Loader2, ChefHat } from "lucide-react"
import { CuisineStep } from "./steps/cuisine-step"
import { DietaryRestrictionsStep } from "./steps/dietary-restrictions-step"
import { AllergiesStep } from "./steps/allergies-step"
import { DislikesStep } from "./steps/dislikes-step"
import { ReviewStep } from "./steps/review-step"

const STEPS = [
  { id: "cuisine", title: "Favorite Cuisine", description: "What type of cuisine do you enjoy most?" },
  { id: "dietary", title: "Dietary Preferences", description: "Tell us about your dietary restrictions" },
  { id: "allergies", title: "Allergies", description: "Let us know about any food allergies" },
  { id: "dislikes", title: "Dislikes", description: "What ingredients do you prefer to avoid?" },
  { id: "review", title: "Review", description: "Review your preferences before finishing" },
]

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { user } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState<UserInfoRequest>({
    favoriteCuisine: "",
    dislikedIngredients: [],
    allergies: [],
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  })

  const updateFormData = (updates: Partial<UserInfoRequest>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = async () => {
    setError("")
    setIsLoading(true)

    try {
      const token = AuthService.getToken()
      if (!token) {
        throw new Error("No authentication token found")
      }

      await UserInfoService.createUserInfo(formData, token)
      router.push("/dashboard")
    } catch (err) {
      setError("Failed to save your preferences. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const progress = ((currentStep + 1) / STEPS.length) * 100

  const renderStep = () => {
    switch (STEPS[currentStep].id) {
      case "cuisine":
        return <CuisineStep formData={formData} updateFormData={updateFormData} />
      case "dietary":
        return <DietaryRestrictionsStep formData={formData} updateFormData={updateFormData} />
      case "allergies":
        return <AllergiesStep formData={formData} updateFormData={updateFormData} />
      case "dislikes":
        return <DislikesStep formData={formData} updateFormData={updateFormData} />
      case "review":
        return <ReviewStep formData={formData} />
      default:
        return null
    }
  }

  const canProceed = () => {
    switch (STEPS[currentStep].id) {
      case "cuisine":
        return formData.favoriteCuisine !== ""
      case "dietary":
      case "allergies":
      case "dislikes":
      case "review":
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ChefHat className="h-10 w-10 text-primary" />
            <span className="font-bold text-2xl text-foreground">RecipeAI</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, {user?.username}!</h1>
          <p className="text-muted-foreground">Let's personalize your cooking experience</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>
              Step {currentStep + 1} of {STEPS.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader>
            <CardTitle>{STEPS[currentStep].title}</CardTitle>
            <CardDescription>{STEPS[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                Previous
              </Button>

              {currentStep === STEPS.length - 1 ? (
                <Button onClick={handleFinish} disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Complete Setup
                </Button>
              ) : (
                <Button onClick={nextStep} disabled={!canProceed()}>
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
