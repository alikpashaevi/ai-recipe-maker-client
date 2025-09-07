"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountSettings } from "./account-settings"
import { DietaryPreferences } from "./dietary-preferences"
import { User, Utensils } from "lucide-react"

export function ProfileTabs() {
  return (
    <Tabs defaultValue="account" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Account
        </TabsTrigger>
        <TabsTrigger value="dietary" className="flex items-center gap-2">
          <Utensils className="h-4 w-4" />
          Dietary Preferences
        </TabsTrigger>
      </TabsList>

      <TabsContent value="account" className="space-y-6">
        <AccountSettings />
      </TabsContent>

      <TabsContent value="dietary" className="space-y-6">
        <DietaryPreferences />
      </TabsContent>
    </Tabs>
  )
}
