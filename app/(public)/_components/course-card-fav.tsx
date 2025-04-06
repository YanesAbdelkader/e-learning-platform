"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useCartAndFavorites } from "@/hooks/use-Cart-Fav";
import { Course } from "@/data/types";

type CourseCardProps = {
  course: Course;
  isFavorite: boolean;
  onFavoriteToggle?: () => void;
};

export function CourseCard({
  course,
  isFavorite,
  onFavoriteToggle,
}: CourseCardProps) {
  const { cart, addToCart, removeFromCart } = useCartAndFavorites();
  const isInCart = cart.some((item) => item === String(course.id));
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${course.image}`}
          alt={course.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 left-2">{course.category.name}</Badge>
        <button
          className={`absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white ${
            isFavorite ? "text-red-500" : "text-gray-500"
          }`}
          onClick={onFavoriteToggle}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2 mb-1">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          By {course.instructor.name}
        </p>
        <div className="flex items-center mb-2">
          <span className="font-bold mr-1">{course.rating}</span>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(course.rating) ? "fill-current" : ""
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            ({course.rating.toLocaleString()})
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          variant={isInCart ? "outline" : "default"}
          onClick={() =>
            isInCart
              ? removeFromCart(String(course.id))
              : addToCart(String(course.id))
          }
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
