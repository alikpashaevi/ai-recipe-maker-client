import { ProtectedRoute } from "@/components/auth/protected-route"
import { ConditionalNav } from "@/components/conditional-nav";
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileTabs } from "@/components/profile/profile-tabs"

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <ConditionalNav />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h1>
              <p className="text-muted-foreground">
                Manage your account settings and dietary preferences to get personalized recipe recommendations.
              </p>
            </div>

            <ProfileHeader />
            <ProfileTabs />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
