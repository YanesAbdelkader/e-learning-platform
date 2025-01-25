"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/image.jpg";
import { Heart, ShoppingCart, Menu, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { registerServiceWorker } from "@/lib/serviceWorker";
import { requestNotificationPermission } from "@/lib/notifications";

const isLoggedIn = !true;

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const { setTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // useEffect(() => {
  //   const setupNotifications = async () => {
  //     await registerServiceWorker();
  //     await requestNotificationPermission();
  //   };
  //   setupNotifications();
  // }, []);

  return (
    <header className="bg-white dark:bg-black shadow-md static">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src={logo}
                alt="Logo"
                width={40}
                height={40}
                className="rounded-3xl"
              />
            </Link>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                href="/courses"
                className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
              >
                Courses
              </Link>
              <Link
                href="/teachers"
                className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
              >
                Teachers
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4 flex-grow justify-end">
            <form
              onSubmit={handleSearch}
              className="w-full md:pl-10 max-w-sm mr-4"
            >
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full  pr-10 rounded-full"
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 rounded-e-full"
                >
                  <Search className="h-5 w-5 text-gray-400" />
                </Button>
              </div>
            </form>
            <Link
              href="/favorite"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              <Heart className="h-6 w-6" />
            </Link>
            <Link
              href="/cart"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              <ShoppingCart className="h-6 w-6" />
            </Link>
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Image
                      src="/placeholder.svg?height=32&width=32"
                      alt="Profile"
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/mycourses">My Courses</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={() => console.log("Logout clicked")}>
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button
                  className="bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  asChild
                >
                  <Link href="/signup">Sign up</Link>
                </Button>
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4">
                  <form onSubmit={handleSearch} className="mb-4">
                    <div className="relative">
                      <Input
                        type="search"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pr-10 rounded-full"
                      />
                      <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 rounded-e-full"
                      >
                        <Search className="h-5 w-5 text-gray-400" />
                      </Button>
                    </div>
                  </form>
                  <Link
                    href="/courses"
                    className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                  >
                    Courses
                  </Link>
                  <Link
                    href="/teachers"
                    className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                  >
                    Teachers
                  </Link>
                  <Link
                    href="/favorite"
                    className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white flex items-center"
                  >
                    <Heart className="h-6 w-6 mr-2" /> Favorite
                  </Link>
                  <Link
                    href="/cart"
                    className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white flex items-center"
                  >
                    <ShoppingCart className="h-6 w-6 mr-2" /> Cart
                  </Link>
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/mycourses"
                        className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                      >
                        My Courses
                      </Link>
                      <Button
                        onClick={() => console.log("Logout clicked")}
                        variant="outline"
                        className="w-full"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/login">Log in</Link>
                      </Button>
                      <Button
                        className="w-full bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        asChild
                      >
                        <Link href="/signup">Sign up</Link>
                      </Button>
                    </div>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-full self-center rounded-full"
                      >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
