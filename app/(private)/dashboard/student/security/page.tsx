import { check2fa } from "../_actions/user";
import TwoFactorAuth from "../_components/2fa";
import { Suspense } from "react";

export default async function SecuritySettingsPage() {
  try {
    const has_2fa = await check2fa();
    return (
      <div className="space-y-6">
        <Suspense>
          <TwoFactorAuth tfa={Boolean(has_2fa)} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.log("Failed to load 2FA status:", error);
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Security Settings</h1>
        <div className="rounded-lg border border-destructive p-4 text-destructive">
          <p>Failed to load two-factor authentication settings.</p>
          <p className="text-sm text-muted-foreground">
            Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }
}
