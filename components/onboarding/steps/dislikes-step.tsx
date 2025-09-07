"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type UserInfoRequest, COMMON_DISLIKES } from "@/lib/user-info"
import { X, Plus } from "lucide-react"

interface DislikesStepProps {
  formData: UserInfoRequest
  updateFormData: (updates: Partial<UserInfoRequest>) => void
}

export function DislikesStep({ formData, updateFormData }: DislikesStepProps) {
  const [customDislike, setCustomDislike] = useState("")

  const handleDislikeToggle = (dislike: string, checked: boolean) => {
    const updatedDislikes = checked
      ? [...formData.dislikedIngredients, dislike]
      : formData.dislikedIngredients.filter((d) => d !== dislike)
    updateFormData({ dislikedIngredients: updatedDislikes })
  }

  const addCustomDislike = () => {
    if (customDislike.trim() && !formData.dislikedIngredients.includes(customDislike.trim())) {
      updateFormData({ dislikedIngredients: [...formData.dislikedIngredients, customDislike.trim()] })
      setCustomDislike("")
    }
  }

  const removeDislike = (dislike: string) => {
    updateFormData({ dislikedIngredients: formData.dislikedIngredients.filter((d) => d !== dislike) })
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Tell us about ingredients you don't enjoy. We'll try to avoid these in your recipes (this is optional).
      </p>

      {/* Common Dislikes */}
      <div>
        <Label className="text-base font-medium mb-3 block">Common Dislikes</Label>
        <div className="grid grid-cols-2 gap-3">
          {COMMON_DISLIKES.map((dislike) => (
            <div key={dislike} className="flex items-center space-x-2">
              <Checkbox
                id={dislike}
                checked={formData.dislikedIngredients.includes(dislike)}
                onCheckedChange={(checked) => handleDislikeToggle(dislike, checked as boolean)}
              />
              <Label htmlFor={dislike} className="cursor-pointer">
                {dislike}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Dislike Input */}
      <div>
        <Label className="text-base font-medium mb-3 block">Add Custom Dislike</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Enter an ingredient you dislike"
            value={customDislike}
            onChange={(e) => setCustomDislike(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addCustomDislike()}
          />
          <Button type="button" variant="outline" onClick={addCustomDislike} disabled={!customDislike.trim()}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Selected Dislikes */}
      {formData.dislikedIngredients.length > 0 && (
        <div>
          <Label className="text-base font-medium mb-3 block">Your Dislikes</Label>
          <div className="flex flex-wrap gap-2">
            {formData.dislikedIngredients.map((dislike) => (
              <Badge key={dislike} variant="outline" className="flex items-center gap-1">
                {dislike}
                <button
                  type="button"
                  onClick={() => removeDislike(dislike)}
                  className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
