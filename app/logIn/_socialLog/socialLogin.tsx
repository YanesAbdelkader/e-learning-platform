"use client";
import { Chrome, Facebook, Github, Instagram } from "lucide-react";

import { SocialButton } from "./socialButton";

export default function SocialLogin() {
  return (
    <div className="mt-6 grid grid-cols-4 gap-2">
      <SocialButton
        provider="facebook"
        Icon={Facebook}
        description="Use your Facebook account for a quick and easy login process."
      />
      <SocialButton
        provider="instagram"
        Icon={Instagram}
        description="Connect your Instagram account for a seamless login experience."
      />
      <SocialButton
        provider="google"
        Icon={Chrome}
        description="Use your Google account to quickly and securely sign in."
      />
      <SocialButton
        provider="github"
        Icon={Github}
        description="Connect your GitHub account for a seamless login experience."
      />
    </div>
  );
}
