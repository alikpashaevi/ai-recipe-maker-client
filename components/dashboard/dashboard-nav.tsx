"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { ChefHat, Home, Heart, History, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Recipe Maker", href: "/dashboard", icon: Home },
  { name: "Favorites", href: "/favorites", icon: Heart },
  { name: "History", href: "/history", icon: History },
  { name: "Profile", href: "/profile", icon: User },
]

export function DashboardNav() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <nav className="bg-card border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl text-foreground">RecipeAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn("flex items-center gap-2", isActive && "bg-primary text-primary-foreground")}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground hidden sm:block">Welcome, {user?.username}</span>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-border">
          <div className="flex justify-around py-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn("flex flex-col items-center gap-1 h-auto py-2", isActive && "text-primary")}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
