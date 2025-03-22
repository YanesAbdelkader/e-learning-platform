"use client";
import { Chrome, Github } from "lucide-react";

import { SocialButton } from "./socialButton";

export default function SocialLogin() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-2">
      <SocialButton
        provider="google"
        Icon={Chrome}
        description="Use your Google account to quickly and securely login."
      />
      <SocialButton
        provider="github"
        Icon={Github}
        description="Connect your GitHub account for a seamless login experience."
      />
    </div>
  );
}
