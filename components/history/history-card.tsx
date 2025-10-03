import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { UserHistoryDTO } from "@/lib/history"
import { Clock, Calendar } from "lucide-react"

interface HistoryCardProps {
  historyItem: UserHistoryDTO
}

export function HistoryCard({ historyItem }: HistoryCardProps) {
  const viewedDate = new Date(historyItem.viewedAt)
  const isToday = viewedDate.toDateString() === new Date().toDateString()
  const isYesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString() === viewedDate.toDateString()

  const getRelativeTime = () => {
    if (isToday) return "Today"
    if (isYesterday) return "Yesterday"
    return viewedDate.toLocaleDateString()
  }

  const getTimeString = () => {
    return viewedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Link href={`/history/${historyItem.recipeId}?from=history`}>
      <Card className="hover:shadow-md transition-shadow bg-green-100">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg text-balance text-black">{historyItem.dishName}</CardTitle>
            <Badge variant="outline" className="flex items-center gap-1 text-xs">
              <Calendar className="h-3 w-3" />
              {getRelativeTime()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Viewed at {getTimeString()}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
