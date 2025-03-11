"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/image.jpg";
import {
  Heart,
  ShoppingCart,
  Menu,
  Search,
  Moon,
  Sun,
  LayoutDashboard,
  TvMinimalPlay,
  LogOut,
  Users,
  Youtube,
  Loader2,
} from "lucide-react";
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
import { getCookie } from "typescript-cookie";
import { logout } from "@/functions/custom";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

export function Header() {
  const [picture, setPicture] = useState(getCookie("picture"));
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const logoutUser = async () => {
    setLoading(true);
    const result = await logout();
    if (result === true) {
      toast({
        title: "Logout Successful",
        description: "You have been logged out.",
      });
      setPicture("");
    } else {
      toast({
        title: "Logout Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoggedIn(picture ? true : false);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [picture]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    redirect("/search");
  };

  return (
    <header className="border-grid sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
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
            {isloading ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${picture}`}
                    alt="Profile"
                    className="relative h-8 w-8 rounded-full"
                    width={100}
                    height={100}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/dashboard" className="flex items-center gap-1">
                      <LayoutDashboard />
                      Dashboard
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
                      disabled={loading}
                      className="flex items-center gap-1 text-red-500"
                    >
                      <LogOut />
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
          </div>
          <div className="md:hidden">
            <Sheet>
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top">
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
                    className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
                  >
                    <Youtube />
                    Courses
                  </Link>
                  <Link
                    href="/teachers"
                    className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
                  >
                    <Users />
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
                  {isloading ? (
                    <Loader2 className="h-8 w-8 animate-spin" />
                  ) : isLoggedIn ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
                      >
                        <LayoutDashboard />
                        Dashboard
                      </Link>
                      <Link
                        href="/mycourses"
                        className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
                      >
                        <TvMinimalPlay />
                        My Courses
                      </Link>
                      <Button
                        onClick={logoutUser}
                        variant="destructive"
                        className="w-full flex items-center gap-1"
                      >
                        <LogOut />
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
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
