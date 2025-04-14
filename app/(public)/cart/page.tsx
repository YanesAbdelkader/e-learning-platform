"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartAndFavorites } from "@/hooks/use-Cart-Fav";
import type { Course } from "@/data/types";
import CourseCard from "../_components/course-card-cart";
import { fetchCoursesByIds } from "@/functions/custom";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { buyNow } from "./_actions/buyAction";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, cartCount } = useCartAndFavorites();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const loadCartItems = async () => {
      try {
        if (cart.length === 0) {
          setCourses([]);
          return;
        }

        setLoading(true);
        setError(null);
        const data = await fetchCoursesByIds(cart);
        setCourses(data);
      } catch (err) {
        setError("Failed to load cart items");
        console.log("Cart load error:", err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load your cart items",
        });
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
    return () => abortController.abort();
  }, [cart]);

  const total = useMemo(() => {
    return courses.reduce((sum, course) => {
      const price = parseFloat(course.price);
      return isNaN(price) ? sum : sum + price;
    }, 0);
  }, [courses]);

  const handleCheckout = async () => {
    if (courses.length === 0) return;

    try {
      setIsCheckingOut(true);
      await buyNow(cart);
      toast({
        title: "Success!",
        description: "Your courses have been purchased",
      });
      clearCart();
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Checkout failed. Please try again.",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  const formatPrice = (price: number | string) => {
    const num = typeof price === "string" ? parseFloat(price) : price;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(isNaN(num) ? 0 : num);
  };

  if (loading) return <CartSkeleton count={Math.min(cartCount, 3)} />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="container py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        {courses.length > 0 && (
          <Button
            variant="ghost"
            onClick={clearCart}
            disabled={isCheckingOut}
            className="text-destructive"
          >
            Clear All
          </Button>
        )}
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Order Summary</h2>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({courses.length} items)</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Separator />

                <Button
                  className="w-full bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}

function CartSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-9 w-24" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex gap-4 p-4 border rounded-lg">
              <Skeleton className="h-32 w-48 rounded-md" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-10 w-24 mt-4" />
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
              <Skeleton className="h-12 w-full rounded-md" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 p-4 bg-muted rounded-full">
        <ShoppingCart className="h-12 w-12" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Looks like you haven&apos;t added any courses yet
      </p>
      <Button
        asChild
        className="bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <Link href="/courses">
          <ArrowRight className="mr-2 h-4 w-4" />
          Browse Courses
        </Link>
      </Button>
    </div>
  );
}

function ErrorState({ error }: { error: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 p-4 bg-destructive/10 rounded-full">
        <ShoppingCart className="h-12 w-12 text-destructive" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Error loading cart</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
      <Button
        variant="outline"
        className="bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => window.location.reload()}
      >
        Try Again
      </Button>
    </div>
  );
}
