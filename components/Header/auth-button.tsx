import Link from "next/link";
import { Button } from "../ui/button";

export function AuthButtons() {
  return (
    <div className="flex space-x-2">
      <Link href="/login">
        <Button variant="outline">Log in</Button>
      </Link>
      <Link href="/signup">
        <Button className="bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Sign up
        </Button>
      </Link>
    </div>
  );
}
