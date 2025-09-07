import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminNav } from "@/components/admin/admin-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminSettingsPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-background">
        <AdminNav />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Admin Settings</h1>
              <p className="text-muted-foreground">Configure system settings and preferences.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>
                  Admin settings and system configuration options will be available here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This section can be expanded to include various admin settings such as:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>API rate limiting configuration</li>
                  <li>Email notification settings</li>
                  <li>System maintenance mode</li>
                  <li>Feature flags and toggles</li>
                  <li>Database backup settings</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
