
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { saveUserInfo } from "@/lib/user-info";

interface OnboardingPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OnboardingPopup({ isOpen, onClose }: OnboardingPopupProps) {
  const [allergies, setAllergies] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [dislikes, setDislikes] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      await saveUserInfo({
        allergies: allergies.split(",").map((s) => s.trim()),
        favoriteCuisine: cuisine,
        dietaryRestrictions: dietaryRestrictions.split(",").map((s) => s.trim()),
        dislikedIngredients: dislikes.split(",").map((s) => s.trim()),
      });
      toast({
        title: "Success",
        description: "Your preferences have been saved.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your preferences. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome!</DialogTitle>
          <DialogDescription>
            Please tell us about your dietary preferences.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Input
              id="allergies"
              placeholder="e.g., peanuts, shellfish"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cuisine">Favorite Cuisine</Label>
            <Input
              id="cuisine"
              placeholder="e.g., Italian, Mexican"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
            <Input
              id="dietaryRestrictions"
              placeholder="e.g., vegetarian, gluten-free"
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dislikes">Disliked Ingredients</Label>
            <Input
              id="dislikes"
              placeholder="e.g., cilantro, olives"
              value={dislikes}
              onChange={(e) => setDislikes(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save Preferences</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
