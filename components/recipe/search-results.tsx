'use client'

import type { SearchResponse } from "@/lib/recipe"
import { SearchRecipeCard } from "./search-recipe-card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination"

interface SearchResultsProps {
  results: SearchResponse
  onPageChange: (page: number) => void
  currentPage: number
}

export function SearchResults({ results, onPageChange, currentPage }: SearchResultsProps) {
  const { content, totalPages } = results

  if (content.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold">No recipes found</h3>
        <p className="text-muted-foreground">Try adjusting your search or adding more ingredients.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content.map((recipe) => (
          <SearchRecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 0) onPageChange(currentPage - 1)
                }}
                className={currentPage === 0 ? "pointer-events-none text-muted-foreground" : ""}
              />
            </PaginationItem>
            {[...Array(totalPages).keys()].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(page)
                  }}
                  isActive={currentPage === page}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages - 1) onPageChange(currentPage + 1)
                }}
                className={currentPage === totalPages - 1 ? "pointer-events-none text-muted-foreground" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
