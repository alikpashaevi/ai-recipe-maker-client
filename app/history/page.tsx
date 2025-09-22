import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { HistoryList } from "@/components/history/history-list"

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Recipe History</h1>
              <p className="text-muted-foreground">View all the recipes you&apos;ve generated and explored in the past.</p>
            </div>
            <HistoryList />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
