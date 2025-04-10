"use client";
import { useCartAndFavorites } from "@/hooks/use-Cart-Fav";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { Logo } from "./Header/logo";
import { NavLink } from "./Header/nav-link";
import { SearchForm } from "./Header/search-form";
import Link from "next/link";
import { Heart, Loader2, Moon, ShoppingCart, Sun } from "lucide-react";
import { CountBadge } from "./Header/count-badge";
import { UserDropdown } from "./Header/user-dropdown";
import { AuthButtons } from "./Header/auth-button";
import { Button } from "./ui/button";
import { MobileMenu } from "./Header/mobile-menu";
import { checkAuthStatus, logout } from "@/functions/custom";

export function Header() {
  const { favorites, favoritesCount, cartCount, cart } = useCartAndFavorites();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [picture, setPicture] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth status
  useEffect(() => {
    const initAuth = async () => {
      const cookiePicture = getCookie("picture");
      if (cookiePicture) {
        setPicture(cookiePicture);
        setIsLoggedIn(true);
        setIsLoading(false);
        return;
      }

      try {
        const { isLoggedIn } = await checkAuthStatus();
        setIsLoggedIn(isLoggedIn);
      } catch (error) {
        console.log("Auth check failed:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const logoutUser = useCallback(async () => {
    setLoading(true);
    try {
      const result = await logout();
      if (result) {
        toast({
          title: "Logout Successful",
          description: "You have been logged out.",
        });
        setPicture(undefined);
        setIsLoggedIn(false);
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Logout Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchTerm = searchQuery.trim();
    if (searchTerm) {
      router.push(`/${searchTerm}`);
    }
  };

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const getProfileImageUrl = useCallback(() => {
    if (!picture) return "/placeholder.svg?height=32&width=32";
    return picture.startsWith("http")
      ? picture
      : `${process.env.NEXT_PUBLIC_API_URL}/storage/${picture}`;
  }, [picture]);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <NavLink href="/courses">Courses</NavLink>
              <NavLink href="/teachers">Teachers</NavLink>
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4 flex-grow justify-end">
            <SearchForm
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />

            <Link
              href="/favorite"
              className="relative text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
              aria-label={`Favorites (${favoritesCount})`}
            >
              <Heart className="h-6 w-6" />
              {favoritesCount > 0 && <CountBadge count={favoritesCount} />}
            </Link>

            <Link
              href="/cart"
              className="relative text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
              aria-label={`Cart (${cartCount})`}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && <CountBadge count={cartCount} />}
            </Link>

            {isLoading ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : isLoggedIn ? (
              <UserDropdown
                profileImageUrl={getProfileImageUrl()}
                logoutUser={logoutUser}
                loading={loading}
              />
            ) : (
              <AuthButtons />
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={toggleTheme}
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <MobileMenu
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              isLoading={isLoading}
              isLoggedIn={isLoggedIn}
              logoutUser={logoutUser}
              favorites={favorites}
              cart={cart}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
