'use client'

import { useState } from "react"
import { SearchInput } from "@/components/recipe/search-input"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { RecipeService, type SearchResponse } from "@/lib/recipe"
import { AuthService } from "@/lib/auth"
import { SearchResults } from "@/components/recipe/search-results"

export default function SearchPage() {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null)
  const [currentPage, setCurrentPage] = useState(0)

  const searchRecipes = async (page = 0) => {
    if (ingredients.length === 0) return

    setError("")
    setIsLoading(true)
    setCurrentPage(page)

    try {
      const token = AuthService.getToken()
      if (!token) {
        throw new Error("Not authenticated")
      }

      const results = await RecipeService.searchRecipes(ingredients, page, 10, token)
      setSearchResults(results)
    } catch (err) {
      setError("Failed to search recipes. Please try again.")
      console.error("Search error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Search Recipes by Ingredients</h1>
            <p className="text-muted-foreground">
              Find recipes based on the ingredients you have.
            </p>
            <h3 className="text-16 font-semibold">NOTE: the recipes get added by the community by generating with AI.</h3>
          </div>
          <SearchInput
            ingredients={ingredients}
            onIngredientsChange={setIngredients}
            onSearch={() => searchRecipes(0)}
            isLoading={isLoading}
          />
          {searchResults && (
            <div className="mt-8">
              <SearchResults
                results={searchResults}
                onPageChange={searchRecipes}
                currentPage={currentPage}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}