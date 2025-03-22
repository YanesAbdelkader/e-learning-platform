import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { socialSignupAction } from "../_actions/actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type SocialButtonProps = {
  provider: string;
  Icon: React.ElementType;
  description: string;
};

export function SocialButton({
  provider,
  Icon,
  description,
}: SocialButtonProps) {
  const router = useRouter();
  async function socialSignup(provider: string) {
    return new Promise((resolve) => {
      const popup = window.open(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/redirect/${provider}/web`,
        "",
        "width=500,height=600"
      );

      if (!popup) {
        return resolve({
          error: "Popup blocked. Please allow popups and try again.",
        });
      }

      const checkPopup = setInterval(async () => {
        try {
          if (!popup || popup.closed) {
            clearInterval(checkPopup);
            resolve({ error: "Popup closed before authentication" });
          }
          if (popup.location.href.includes("token=")) {
            const urlParams = new URLSearchParams(popup.location.search);
            const token = urlParams.get("token");
            if (token) {
              clearInterval(checkPopup);
              popup.close();
              const result = await socialSignupAction(token);
              toast({
                title: result.title,
                description: result.description,
              });
              resolve({ success: true, token });
              router.push(result.path);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }, 500);
    });
  }
  return (
    <div className="pb-12">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-10 dark:border-2"
            onClick={async () => await socialSignup(provider)}
          >
            <Icon className="h-8 w-8" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Sign in with {provider}</h4>
            <p className="text-sm">{description}</p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">
                Powered by {provider}
              </span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
