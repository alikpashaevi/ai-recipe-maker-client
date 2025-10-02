"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserInfoService, type UserInfoRequest } from "@/lib/user-info";
import { AuthService } from "@/lib/auth";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DietaryPreferences() {
  const [userInfo, setUserInfo] = useState<UserInfoRequest>({
    favoriteCuisine: "",
    dislikedIngredients: [],
    allergies: [],
    dietaryRestrictions: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error("Not authenticated");

      const info = await UserInfoService.getUserInfo(token);
      setUserInfo({
        favoriteCuisine: info.favoriteCuisine,
        dislikedIngredients: info.dislikedIngredients,
        allergies: info.allergies,
        dietaryRestrictions: info.dietaryRestrictions,
      });
    } catch (err) {
      setError("Failed to load dietary preferences");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserInfo = (updates: Partial<UserInfoRequest>) => {
    setUserInfo((prev) => ({ ...prev, ...updates }));
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      const token = AuthService.getToken();
      if (!token) throw new Error("Not authenticated");

      await UserInfoService.updateUserInfo(userInfo, token);
      setSuccess("Dietary preferences updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.log(err);
      setError("Failed to update dietary preferences. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {(success || error) && (
        <Alert variant={error ? "destructive" : "default"}>
          {error ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <CheckCircle className="h-4 w-4" />
          )}
          <AlertDescription>{error || success}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Favorite Cuisine</CardTitle>
          <CardDescription>
            What type of cuisine do you enjoy most?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            value={userInfo.favoriteCuisine}
            onChange={(e) =>
              updateUserInfo({ favoriteCuisine: e.target.value })
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dietary Restrictions</CardTitle>
          <CardDescription>
            Tell us about your dietary preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            value={(userInfo.dietaryRestrictions || []).join(", ")}
            onChange={(e) =>
              updateUserInfo({
                dietaryRestrictions: e.target.value
                  .split(",")
                  .map((s) => s.trim()),
              })
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Food Allergies</CardTitle>
          <CardDescription>
            Let us know about any food allergies for your safety
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            value={(userInfo.allergies || []).join(", ")}
            onChange={(e) =>
              updateUserInfo({
                allergies: e.target.value.split(",").map((s) => s.trim()),
              })
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Disliked Ingredients</CardTitle>
          <CardDescription>
            Ingredients you prefer to avoid in recipes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            value={userInfo.dislikedIngredients.join(", ")}
            onChange={(e) =>
              updateUserInfo({
                dislikedIngredients: e.target.value
                  .split(",")
                  .map((s) => s.trim()),
              })
            }
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
