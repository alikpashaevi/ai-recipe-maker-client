import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Clock, Users, ChefHat } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/subtle-cooking-ingredients-pattern.png')] opacity-5"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Hero Content */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Create Amazing Recipes with <span className="text-primary">AI Magic</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
              Transform your ingredients into delicious meals. Our AI chef understands your preferences, dietary needs,
              and creates personalized recipes just for you.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8 py-6">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Cooking Now
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">AI-Powered Recipes</h3>
                <p className="text-muted-foreground text-sm">
                  Get personalized recipes based on your ingredients, preferences, and dietary restrictions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Quick & Easy</h3>
                <p className="text-muted-foreground text-sm">
                  From ingredients to recipe in seconds. Save time and reduce food waste.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Community Driven</h3>
                <p className="text-muted-foreground text-sm">
                  Share your creations, save favorites, and discover recipes from other food lovers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
