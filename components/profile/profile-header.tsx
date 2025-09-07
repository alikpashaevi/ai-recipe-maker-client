"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { Mail } from "lucide-react"

export function ProfileHeader() {
  const { user } = useAuth()

  if (!user) return null

  const initials = user.username
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">{user.username}</h1>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex space-x-2">
              {user.roles?.map((role) => (
                <Badge key={role.id} variant="secondary">
                  {role.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
