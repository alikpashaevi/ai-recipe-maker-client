import { SignupForm } from "@/components/auth/signup-form"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { ChefHat } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="mb-8 text-center">
            <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
              <ChefHat className="h-10 w-10 text-primary" />
              <span className="font-bold text-2xl text-foreground">RecipeAI</span>
            </Link>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  )
}
