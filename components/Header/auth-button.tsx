import Link from "next/link";
import { Button } from "../ui/button";

export function AuthButtons() {
  return (
    <div className="flex space-x-2">
      <Link href="/login">
        <Button variant="outline" asChild>
          Log in
        </Button>
      </Link>
      <Link href="/signup">
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          asChild
        >
          Sign up
        </Button>
      </Link>
    </div>
  );
}
