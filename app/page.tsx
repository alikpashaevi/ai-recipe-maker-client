import { Navigation } from "@/components/navigation"
import { RecipeMaker } from "@/components/recipe/recipe-maker"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              AI Recipe Maker
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
              Create your own recipes with the help of AI.
            </p>
          </div>
          <RecipeMaker />
        </div>
      </main>
      <Footer />
    </div>
  )
}
