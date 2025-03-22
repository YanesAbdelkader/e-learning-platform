import { Chrome, Github } from "lucide-react";
import { SocialButton } from "./socialButton";

export default function SocialSignup() {
  return (
    <div className=" grid grid-cols-2 gap-2">
      <SocialButton
        provider="google"
        Icon={Chrome}
        description="Use your Google account to quickly and securely sign up."
      />
      <SocialButton
        provider="github"
        Icon={Github}
        description="Connect your GitHub account for a seamless signup experience."
      />
    </div>
  );
}
