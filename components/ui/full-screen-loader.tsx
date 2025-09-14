
import { Loader2 } from "lucide-react"

export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  )
}
