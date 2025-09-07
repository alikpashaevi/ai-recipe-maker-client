import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminNav } from "@/components/admin/admin-nav"
import { AdminOverview } from "@/components/admin/admin-overview"

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-background">
        <AdminNav />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Monitor and manage your RecipeAI application.</p>
            </div>
            <AdminOverview />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
