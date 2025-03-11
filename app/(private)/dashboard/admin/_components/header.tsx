"use client";

import { House, LogOut, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { getCookie } from "typescript-cookie";
import { logout } from "@/functions/custom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Header() {
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
    <header className="bg-background border-b border-border py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
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
    </header>
  );
}
