"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addToCart, buyNow } from "../_actions/actions";
import Image from "next/image";
interface CourseSidebarProps {
  price: number;
  image:string;
  courseId: string;
}

export default function CourseSidebar({
  price,
  image,
  courseId,
}: CourseSidebarProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  const handleAddToCart = async () => {
    if (isAddingToCart) return;

    setIsAddingToCart(true);
    try {
      await addToCart(courseId);
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
      window.open(checkoutUrl, "_blank");
    } catch (error) {
      console.error("Failed to process purchase:", error);
      setIsBuyingNow(false);
    }
  };

  return (
    <Card className="sticky top-4">
      <CardContent className="p-0">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${image}`}
          alt="Course thumbnail"
          className="object-cover"
          width={400}
          height={100}
        />
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-3xl font-bold">{price}DA</span>
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
