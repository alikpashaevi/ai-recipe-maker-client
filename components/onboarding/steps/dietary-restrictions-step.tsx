import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { UserInfoRequest } from "@/lib/user-info"

interface DietaryRestrictionsStepProps {
  formData: UserInfoRequest
  updateFormData: (updates: Partial<UserInfoRequest>) => void
}

export function DietaryRestrictionsStep({ formData, updateFormData }: DietaryRestrictionsStepProps) {
  const handleCheckboxChange = (
    field: keyof Pick<UserInfoRequest, "vegetarian" | "vegan" | "glutenFree">,
    checked: boolean,
  ) => {
    updateFormData({ [field]: checked })
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Select any dietary restrictions that apply to you. This helps us suggest appropriate recipes.
      </p>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="vegetarian"
            checked={formData.vegetarian}
            onCheckedChange={(checked) => handleCheckboxChange("vegetarian", checked as boolean)}
          />
          <Label htmlFor="vegetarian" className="cursor-pointer">
            Vegetarian - I don&apos;t eat meat, poultry, or fish
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="vegan"
            checked={formData.vegan}
            onCheckedChange={(checked) => handleCheckboxChange("vegan", checked as boolean)}
          />
          <Label htmlFor="vegan" className="cursor-pointer">
            Vegan - I don&apos;t eat any animal products
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="glutenFree"
            checked={formData.glutenFree}
            onCheckedChange={(checked) => handleCheckboxChange("glutenFree", checked as boolean)}
          />
          <Label htmlFor="glutenFree" className="cursor-pointer">
            Gluten-Free - I avoid gluten-containing ingredients
          </Label>
        </div>
      </div>

      {formData.vegan && formData.vegetarian && (
        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
          Note: Vegan diet includes vegetarian restrictions, so we'll focus on vegan recipes for you.
        </p>
      )}
    </div>
  )
}
