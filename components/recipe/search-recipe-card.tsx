'use client'

import Link from "next/link"
import type { SearchResultRecipe } from "@/lib/recipe"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SearchRecipeCardProps {
  recipe: SearchResultRecipe
}

export function SearchRecipeCard({ recipe }: SearchRecipeCardProps) {
  return (
    <Link href={`/history/${recipe.id}`} className="block hover:shadow-md transition-shadow rounded-lg">
      <Card className="bg-gray-100">
        <CardHeader>
          <CardTitle className="text-lg text-balance text-black">{recipe.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {recipe.nutrition && (
            <div className="flex flex-wrap gap-2">
              {recipe.nutrition.vegan && <Badge variant="outline">Vegan</Badge>}
              {recipe.nutrition.glutenFree && <Badge variant="outline">Gluten-Free</Badge>}
              {recipe.nutrition.dairyFree && <Badge variant="outline">Dairy-Free</Badge>}
              {recipe.nutrition.vegetarian && <Badge variant="outline">Vegetarian</Badge>}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
