'use client'

import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Sparkles, Search } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to AI Recipe Maker</h1>
            <p className="text-muted-foreground">
              Choose an option below to get started.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/generate-recipe">
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Generate Recipe with AI
                  </CardTitle>
                  <CardDescription>
                    Let our AI create a unique recipe based on your ingredients.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/search">
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    Search with Ingredients
                  </CardTitle>
                  <CardDescription>
                    Find existing recipes that you can make with your ingredients.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
