"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type UserInfoRequest, COMMON_ALLERGIES } from "@/lib/user-info"
import { X, Plus } from "lucide-react"

interface AllergiesStepProps {
  formData: UserInfoRequest
  updateFormData: (updates: Partial<UserInfoRequest>) => void
}

export function AllergiesStep({ formData, updateFormData }: AllergiesStepProps) {
  const [customAllergy, setCustomAllergy] = useState("")

  const handleAllergyToggle = (allergy: string, checked: boolean) => {
    const updatedAllergies = checked
      ? [...formData.allergies, allergy]
      : formData.allergies.filter((a) => a !== allergy)
    updateFormData({ allergies: updatedAllergies })
  }

  const addCustomAllergy = () => {
    if (customAllergy.trim() && !formData.allergies.includes(customAllergy.trim())) {
      updateFormData({ allergies: [...formData.allergies, customAllergy.trim()] })
      setCustomAllergy("")
    }
  }

  const removeAllergy = (allergy: string) => {
    updateFormData({ allergies: formData.allergies.filter((a) => a !== allergy) })
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Select any food allergies you have. This is crucial for your safety - we&apos;ll make sure to avoid these
        ingredients.
      </p>

      {/* Common Allergies */}
      <div>
        <Label className="text-base font-medium mb-3 block">Common Allergies</Label>
        <div className="grid grid-cols-2 gap-3">
          {COMMON_ALLERGIES.map((allergy) => (
            <div key={allergy} className="flex items-center space-x-2">
              <Checkbox
                id={allergy}
                checked={formData.allergies.includes(allergy)}
                onCheckedChange={(checked) => handleAllergyToggle(allergy, checked as boolean)}
              />
              <Label htmlFor={allergy} className="cursor-pointer">
                {allergy}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Allergy Input */}
      <div>
        <Label className="text-base font-medium mb-3 block">Add Custom Allergy</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Enter an allergy not listed above"
            value={customAllergy}
            onChange={(e) => setCustomAllergy(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addCustomAllergy()}
          />
          <Button type="button" variant="outline" onClick={addCustomAllergy} disabled={!customAllergy.trim()}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Selected Allergies */}
      {formData.allergies.length > 0 && (
        <div>
          <Label className="text-base font-medium mb-3 block">Your Allergies</Label>
          <div className="flex flex-wrap gap-2">
            {formData.allergies.map((allergy) => (
              <Badge key={allergy} variant="secondary" className="flex items-center gap-1">
                {allergy}
                <button
                  type="button"
                  onClick={() => removeAllergy(allergy)}
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
