"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { HistoryCard } from "./history-card"
import { HistoryService, type UserHistoryDTO } from "@/lib/history"
import { AuthService } from "@/lib/auth"
import { Loader2, AlertCircle, History } from "lucide-react"

export function HistoryList() {
  const [history, setHistory] = useState<UserHistoryDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      const token = AuthService.getToken()
      if (!token) throw new Error("Not authenticated")

      const historyData = await HistoryService.getUserHistory(token)
      // Sort by most recent first
      const sortedHistory = historyData.sort((a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime())
      setHistory(sortedHistory)
    } catch (err) {
      setError("Failed to load recipe history")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground">Loading your recipe history...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (history.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <History className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">No recipe history yet</h3>
              <p className="text-muted-foreground">Start generating recipes to see your cooking history here.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {history.map((item, index) => (
        <HistoryCard key={`${item.dishName}-${item.viewedAt}-${index}`} historyItem={item} />
      ))}
    </div>
  )
}
