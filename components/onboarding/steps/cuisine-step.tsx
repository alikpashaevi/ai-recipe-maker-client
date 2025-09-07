"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { type UserInfoRequest, CUISINE_OPTIONS } from "@/lib/user-info"

interface CuisineStepProps {
  formData: UserInfoRequest
  updateFormData: (updates: Partial<UserInfoRequest>) => void
}

export function CuisineStep({ formData, updateFormData }: CuisineStepProps) {
  return (
    <div className="space-y-4">
      <RadioGroup
        value={formData.favoriteCuisine}
        onValueChange={(value) => updateFormData({ favoriteCuisine: value })}
        className="grid grid-cols-2 gap-4"
      >
        {CUISINE_OPTIONS.map((cuisine) => (
          <div key={cuisine} className="flex items-center space-x-2">
            <RadioGroupItem value={cuisine} id={cuisine} />
            <Label htmlFor={cuisine} className="cursor-pointer">
              {cuisine}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
