"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import { logout } from "@/functions/custom";
import { redirect } from "next/navigation";
import { getCookie } from "typescript-cookie";
import { House, LogOut, Moon, Sun, LayoutDashboard } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { theme, setTheme } = useTheme();
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
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-semibold text-foreground">My Courses</h1>
        <div className="flex items-center gap-2 md:gap-4">
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
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${picture}`}
                  alt="picture"
                />
                <AvatarFallback>picture</AvatarFallback>
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
                <Link href="/dashboard" className="flex items-center gap-1">
                  <LayoutDashboard /> Dashboard
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
    </header>
  );
}
