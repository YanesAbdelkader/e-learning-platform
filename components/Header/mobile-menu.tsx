import {
  Heart,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  ShoppingCart,
  TvMinimalPlay,
  Users,
  Youtube,
} from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../ui/sheet"; // Import SheetClose
import { SearchForm } from "./search-form";
import Link from "next/link";

export function MobileMenu({
  searchQuery,
  setSearchQuery,
  handleSearch,
  isLoading,
  isLoggedIn,
  logoutUser,
  favorites,
  cart,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isLoading: boolean;
  isLoggedIn: boolean;
  logoutUser: () => Promise<void>;
  favorites: string[];
  cart: string[];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="pt-10">
        <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
          <SearchForm
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />

          <SheetClose asChild>
            <Link
              href="/courses"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 p-2 rounded-md hover:bg-accent"
            >
              <Youtube className="h-5 w-5" />
              Courses
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link
              href="/teachers"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 p-2 rounded-md hover:bg-accent"
            >
              <Users className="h-5 w-5" />
              Teachers
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link
              href="/favorite"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white flex items-center p-2 rounded-md hover:bg-accent"
            >
              <Heart className="h-5 w-5 mr-2" />
              Favorites
              {favorites.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {favorites.length}
                </span>
              )}
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link
              href="/cart"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white flex items-center p-2 rounded-md hover:bg-accent"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
              {cart.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {cart.length}
                </span>
              )}
            </Link>
          </SheetClose>

          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : isLoggedIn ? (
            <>
              <SheetClose asChild>
                <Link
                  href="/dashboard"
                  className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 p-2 rounded-md hover:bg-accent"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  href="/mycourses"
                  className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 p-2 rounded-md hover:bg-accent"
                >
                  <TvMinimalPlay className="h-5 w-5" />
                  My Courses
                </Link>
              </SheetClose>

              <Button
                onClick={logoutUser}
                variant="destructive"
                className="w-full flex items-center justify-center gap-2 mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <LogOut className="h-5 w-5" />
                )}
                Logout
              </Button>
            </>
          ) : (
            <div className="space-y-2 mt-2">
              <SheetClose asChild>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  asChild
                >
                  <Link href="/signup">Sign up</Link>
                </Button>
              </SheetClose>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}