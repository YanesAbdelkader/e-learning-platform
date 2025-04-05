"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addToCart, buyNow } from "../_actions/actions";
import Image from "next/image";
import { Loader2, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { checkAuthStatus } from "@/functions/custom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { redirect } from "next/navigation";

interface CourseSidebarProps {

  price: number;
  image: string;
  courseId: string;
  title: string;
}

export default function CourseSidebar({
  price,
  image,
  courseId,
  title,
}: CourseSidebarProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = async () => {
    if (isAddingToCart) return;

    setIsAddingToCart(true);
    try {
      await addToCart(courseId);
      toast({
        title: "Added to cart",
        description: `${title} has been added to your cart.`,
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add course to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleBuyNow = async () => {
    if (isBuyingNow) return;

    const logedin = await checkAuthStatus();

    if (logedin.isLoggedIn) {
      setIsBuyingNow(true);
      try {
        const checkoutUrl = await buyNow(courseId);
        if (checkoutUrl) {
          window.open(checkoutUrl);
        } else {
          throw new Error("No checkout URL returned");
        }
      } catch (error) {
        console.log("Failed to process purchase:", error);
        toast({
          title: "Error",
          description: "Failed to process your purchase. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsBuyingNow(false);
      }
    } else {
      setShowAuthDialog(true);
    }
  };

  const formattedPrice = new Intl.NumberFormat("en-DZ", {
    style: "decimal",
  }).format(price);

  return (
    <Card className="sticky top-4 w-full max-w-md">
      <CardContent className="p-0 overflow-hidden">
        <div className="relative aspect-video w-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${image}`}
            alt={`Thumbnail for ${title}`}
            width={500}
            height={40}
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold">{formattedPrice} DA</span>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleBuyNow}
              disabled={isBuyingNow}
              size="lg"
            >
              {isBuyingNow ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Buy Now"
              )}
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              size="lg"
            >
              {isAddingToCart ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg text-destructive">
              Authentication Required
            </DialogTitle>
            <DialogDescription className="text-base">
              You need to be logged in to purchase this course.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAuthDialog(false)}>
              Cancel
            </Button>
            <Button
              className="bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {
                document.cookie = `lastVisitedPage=${window.location.href}; path=/; max-age=3600`;
                redirect("/login");
              }}
            >
              Go to Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
