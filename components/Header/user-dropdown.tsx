import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { LayoutDashboard, Loader2, LogOut, TvMinimalPlay } from "lucide-react";
import { cn } from "@/lib/utils";

export function UserDropdown({
  profileImageUrl,
  logoutUser,
  loading,
}: {
  profileImageUrl: string;
  logoutUser: () => Promise<void>;
  loading: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
          aria-label="User menu"
        >
          <Image
            src={profileImageUrl || "/placeholder.svg"}
            alt="Profile"
            className="h-8 w-8 rounded-full object-cover"
            width={32}
            height={32}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href="/dashboard" className="flex items-center gap-1 w-full">
            <LayoutDashboard className="h-4 w-4 mr-1" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/mycourses" className="flex items-center gap-1 w-full">
            <TvMinimalPlay className="h-4 w-4 mr-1" />
            My Courses
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            onClick={logoutUser}
            disabled={loading}
            className={cn(
              "flex items-center gap-1 text-red-500 w-full",
              loading && "opacity-70 cursor-not-allowed"
            )}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4 mr-1" />
            )}
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
