"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { ConditionalNav } from "@/components/conditional-nav";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { OnboardingPopup } from "@/components/profile/onboarding-popup";
import { getUserInfo } from "@/lib/user-info";

export default function ProfilePage() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        if (!userInfo) {
          setShowOnboarding(true);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setShowOnboarding(true);
      }
    };

    checkUserInfo();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <ConditionalNav />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Profile Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your account settings and dietary preferences to get
                personalized recipe recommendations.
              </p>
            </div>

            <ProfileHeader />
            <ProfileTabs />
          </div>
        </main>
        <OnboardingPopup
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
        />
      </div>
    </ProtectedRoute>
  );
}
