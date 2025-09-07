import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { UserInfoRequest } from "@/lib/user-info"
import { Check, X } from "lucide-react"

interface ReviewStepProps {
  formData: UserInfoRequest
}

export function ReviewStep({ formData }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Please review your preferences below. You can always change these later in your profile settings.
      </p>

      <div className="grid gap-4">
        {/* Favorite Cuisine */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Favorite Cuisine</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="text-sm">
              {formData.favoriteCuisine || "Not specified"}
            </Badge>
          </CardContent>
        </Card>

        {/* Dietary Restrictions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Dietary Restrictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                {formData.vegetarian ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-muted-foreground" />
                )}
                <span className={formData.vegetarian ? "text-foreground" : "text-muted-foreground"}>Vegetarian</span>
              </div>
              <div className="flex items-center gap-2">
                {formData.vegan ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-muted-foreground" />
                )}
                <span className={formData.vegan ? "text-foreground" : "text-muted-foreground"}>Vegan</span>
              </div>
              <div className="flex items-center gap-2">
                {formData.glutenFree ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-muted-foreground" />
                )}
                <span className={formData.glutenFree ? "text-foreground" : "text-muted-foreground"}>Gluten-Free</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Allergies */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Allergies</CardTitle>
          </CardHeader>
          <CardContent>
            {formData.allergies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {formData.allergies.map((allergy) => (
                  <Badge key={allergy} variant="destructive" className="text-sm">
                    {allergy}
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground">No allergies specified</span>
            )}
          </CardContent>
        </Card>

        {/* Dislikes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Disliked Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            {formData.dislikedIngredients.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {formData.dislikedIngredients.map((dislike) => (
                  <Badge key={dislike} variant="outline" className="text-sm">
                    {dislike}
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground">No dislikes specified</span>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
