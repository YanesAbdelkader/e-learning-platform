"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addToCart, buyNow } from "../_actions/actions";
import Image from "next/image";
import img from "@/assets/image.jpg";
interface CourseSidebarProps {
  price: number;
  thumbnail: string;
  courseId: string;
}

export default function CourseSidebar({
  price,
  thumbnail,
  courseId,
}: CourseSidebarProps) {
  const router = useRouter();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  const handleAddToCart = async () => {
    if (isAddingToCart) return;

    setIsAddingToCart(true);
    try {
      await addToCart(courseId);
      // You could show a success message or update a cart counter here
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (isBuyingNow) return;

    setIsBuyingNow(true);
    try {
      const checkoutUrl = await buyNow(courseId);
      router.push(checkoutUrl);
    } catch (error) {
      console.error("Failed to process purchase:", error);
      setIsBuyingNow(false);
    }
  };

  return (
    <Card className="sticky top-4">
      <CardContent className="p-0">
        <Image
          src={ img}
          alt="Course thumbnail"
          className="w-full h-full object-cover"
        />
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-3xl font-bold">${price.toFixed(2)}</span>
          </div>
          <div className="space-y-2">
            <Button
              className="w-full"
              onClick={handleBuyNow}
              disabled={isBuyingNow}
            >
              {isBuyingNow ? "Processing..." : "Buy now"}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
