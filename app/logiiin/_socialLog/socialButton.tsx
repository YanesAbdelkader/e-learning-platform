import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useActionState } from "react";
import { socialLoginAction } from "../_actions/actions";
import { Loader2 } from "lucide-react";

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
  const [, action, isPending] = useActionState(socialLoginAction, null);
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="outline"
          className="dark:border-2"
          onClick={() => action(provider)}
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
  );
}
