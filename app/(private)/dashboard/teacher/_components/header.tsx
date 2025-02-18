"use client";

import { Bell, Sun, Moon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { setTheme, theme } = useTheme();

  return (
    <header className="bg-background border-b">
      <div className="w-full mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* use api to get notification */}
                <DropdownMenuItem>
                  New comment on &quot;Introduction to React&quot;
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Course &quot;Advanced JavaScript&quot; completed by a student
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant={theme === "light" ? "ghost" : "outline"}
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
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem><LogOut />Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
