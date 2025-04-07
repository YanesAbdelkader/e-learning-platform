"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartAndFavorites } from "@/hooks/use-Cart-Fav";
import { Course } from "@/data/types";
import CourseCard from "../_components/course-card-cart";
import { fetchCoursesByIds } from "@/functions/custom";

export default function CartPage() {
  const { cart, removeFromCart } = useCartAndFavorites();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCartItems = async (courseIds: string[]) => {
      try {
        const coursesByIds = await fetchCoursesByIds(courseIds);
        setCourses(coursesByIds);
      } catch (error) {
        console.log("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (cart.length > 0) {
      fetchCartItems(cart);
    } else {
      setLoading(false);
    }
  }, [cart]);

  const calculateTotal = () => {
    return courses.reduce((total, item) => total + parseFloat(item.price), 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{calculateTotal()} DA</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <Button className="w-full bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Looks like you haven&apos;t added any courses to your cart yet.
          </p>
          <Link href="/courses">
            <Button className="bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Browse Courses
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
}
