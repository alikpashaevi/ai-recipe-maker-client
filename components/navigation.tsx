"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Menu, ChefHat } from "lucide-react"

export function Navigation() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl text-foreground">RecipeAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            {isAuthenticated && (
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Button variant="ghost" onClick={logout}>Logout</Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center space-x-2">
                      <ChefHat className="h-8 w-8 text-primary" />
                      <span className="font-bold text-xl text-foreground">RecipeAI</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 py-8">
                  <Link href="/about" className="text-lg text-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                  <Link href="/contact" className="text-lg text-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                  {isAuthenticated && (
                    <Link href="/dashboard" className="text-lg text-foreground hover:text-primary transition-colors">
                      Dashboard
                    </Link>
                  )}
                </div>
                <div className="flex flex-col space-y-2 absolute bottom-8 left-4 right-4">
                  {isAuthenticated ? (
                    <Button variant="ghost" onClick={logout}>Logout</Button>
                  ) : (
                    <>
                      <Link href="/login">
                        <Button variant="ghost" className="w-full">Login</Button>
                      </Link>
                      <Link href="/signup">
                        <Button className="w-full">Sign Up</Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
