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

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCartAndFavorites();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    const fetchCartItems = async (courseIds: string[]) => {
      try {
        setError(null);
        setLoading(true);
        const coursesByIds = await fetchCoursesByIds(courseIds);
        setCourses(coursesByIds);
      } catch (err) {
        console.log("Error fetching cart items:", err);
        setError("Failed to load cart items. Please try again.");
        toast({
          variant: "destructive",
          title: "Error loading cart",
          description: "There was a problem loading your cart items.",
        });
      } finally {
        setLoading(false);
      }
    };

    if (cart.length > 0) {
      fetchCartItems(cart);
    } else {
      setLoading(false);
      setCourses([]);
    }
  }, [cart]);

  const total = useMemo(() => {
    return courses.reduce((sum, item) => sum + parseFloat(item.price), 0);
  }, [courses]);

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      // Simulate checkout processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Checkout successful!",
        description: "Your courses are now available in your account.",
      });
      clearCart();
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Checkout failed",
        description:
          "There was a problem processing your order. Please try again.",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  const formatPrice = (
    price: number | string,
    currency: string = "DZD",
    locale: string = "en-DZ"
  ): string => {
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;

    if (isNaN(numericPrice)) {
      console.warn(`Invalid price value: ${price}`);
      return "Price not available";
    }

    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericPrice);
  };

  if (loading) {
    return <CartSkeleton />;
  }

  if (error) {
    return (
      <EmptyState
        icon={<ShoppingCart className="h-12 w-12" />}
        title="Error loading cart"
        description={error}
        action={
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
        }
      />
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
        {courses.length > 0 && (
          <Button
            variant="ghost"
            onClick={clearCart}
            className="text-destructive hover:text-destructive/90"
            disabled={isCheckingOut}
          >
            Clear Cart
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
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({courses.length} items):</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <Button
                  className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-base font-medium"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Proceed to Checkout"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  You won&apos;t be charged until the next step
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={<ShoppingCart className="h-12 w-12" />}
          title="Your cart is empty"
          description="Looks like you haven't added any courses to your cart yet."
          action={
            <Link href="/courses">
              <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-base font-medium">
                <ArrowRight className="h-4 w-4" />
                Browse Courses
              </Button>
            </Link>
          }
        />
      )}
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-9 w-24" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {[...Array(3)].map((_, i) => (
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
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
              <Skeleton className="h-[1px] w-full" />
              <Skeleton className="h-12 w-full rounded-md" />
              <Skeleton className="h-3 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
        {icon}
      </div>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {action}
    </div>
  );
}
