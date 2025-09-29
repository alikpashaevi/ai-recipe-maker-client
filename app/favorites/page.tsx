import { ProtectedRoute } from "@/components/auth/protected-route"
import { ConditionalNav } from "@/components/conditional-nav";
import { FavoritesList } from "@/components/favorites/favorites-list"

export default function FavoritesPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <ConditionalNav />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Favorite Recipes</h1>
              <p className="text-muted-foreground">Your collection of saved recipes that you love to cook.</p>
            </div>
            <FavoritesList />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
