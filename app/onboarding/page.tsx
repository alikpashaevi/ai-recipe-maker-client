import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function OnboardingPage() {
  return (
    <ProtectedRoute>
      <OnboardingFlow />
    </ProtectedRoute>
  )
}
