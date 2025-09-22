import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { RecipeMaker } from "@/components/recipe/recipe-maker"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">AI Recipe Maker</h1>
              <p className="text-muted-foreground">
                Transform your available ingredients into delicious, personalized recipes with the power of AI.
              </p>
            </div>
            <RecipeMaker />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
