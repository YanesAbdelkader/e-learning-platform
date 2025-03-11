"use client";

import { Sun, Moon, LogOut, House, TvMinimalPlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCookie } from "typescript-cookie";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { logout } from "@/functions/custom";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const { setTheme, theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const logoutUser = async () => {
    setLoading(true);
    const result = await logout();
    if (result === true) {
      toast({
        title: "Logout Successful",
        description: "You have been logged out.",
      });
      redirect("/");
    } else {
      toast({
        title: "Logout Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };
  const picture = getCookie("picture");
  return (
    <header className="bg-background border-b">
      <div className="w-full mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${picture}`}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem>
                  <Link href="/" className="flex items-center gap-1">
                    <House />
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/mycourses" className="flex items-center gap-1">
                    <TvMinimalPlay /> My Courses
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={logoutUser}
                    className="flex items-center gap-1 text-red-500"
                    disabled={loading}
                  >
                    <LogOut />
                    Log out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
