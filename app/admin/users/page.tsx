import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminNav } from "@/components/admin/admin-nav"
import { UsersTable } from "@/components/admin/users-table"

export default function AdminUsersPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-background">
        <AdminNav />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
              <p className="text-muted-foreground">View and manage all registered users in the system.</p>
            </div>
            <UsersTable />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
