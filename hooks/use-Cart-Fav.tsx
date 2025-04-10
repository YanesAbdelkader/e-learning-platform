"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  addTofavorites,
  fetchfavorites,
  removefromFavorites,
} from "@/functions/custom";
import { toast } from "./use-toast";

type CartAndFavorites = {
  cart: string[];
  favorites: string[];
  loadingFavorites: boolean;
  error: string | null;
  cartCount: number;
  favoritesCount: number;
  addToCart: (courseId: string) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  addToFavorites: (courseId: string) => Promise<void>;
  removeFromFavorites: (courseId: string) => Promise<void>;
  toggleFavorite: (courseId: string) => void;
};

export function useCartAndFavorites(): CartAndFavorites {
  const [cart, setCart] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoized counts to prevent unnecessary re-renders
  const cartCount = useMemo(() => cart.length, [cart]);
  const favoritesCount = useMemo(() => favorites.length, [favorites]);

  // Load cart from localStorage
  useEffect(() => {
    const loadCart = () => {
      try {
        const storedCart = localStorage.getItem("cart");
        setCart(storedCart ? JSON.parse(storedCart) : []);
      } catch (err) {
        console.error("Cart load error:", err);
        toast({
          variant: "destructive",
          title: "Error loading cart",
          description: "Your cart data couldn't be loaded.",
        });
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((courseId: string) => {
    setCart((prevCart) => {
      if (prevCart.includes(courseId)) {
        toast({
          title: "Already in cart",
          description: "This course is already in your cart.",
        });
        return prevCart;
      }
      const updatedCart = [...prevCart, courseId];
      toast({
        title: "Added to cart",
        description: "The course has been added to your cart.",
      });
      return updatedCart;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All courses have been removed from your cart.",
    });
  }, []);

  const removeFromCart = useCallback((courseId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((id) => id !== courseId);
      toast({
        title: "Removed from cart",
        description: "The course has been removed from your cart.",
      });
      return updatedCart;
    });
  }, []);

  // Fetch favorites on mount
  useEffect(() => {
    const initializeFavorites = async () => {
      try {
        const courseIds = await fetchfavorites();
        setFavorites(courseIds);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
        toast({
          variant: "destructive",
          title: "Error loading favorites",
          description: "Couldn't load your favorite courses. Please try again.",
        });
        setError("Failed to load favorites");
      } finally {
        setLoadingFavorites(false);
      }
    };

    initializeFavorites();
  }, []);

  const addToFavorites = useCallback(
    async (courseId: string) => {
      if (favorites.includes(courseId)) return;

      try {
        const added = await addTofavorites(courseId);
        if (added) {
          setFavorites((prev) => [...prev, courseId]);
          toast({
            title: "Added to favorites",
            description: "The course has been added to your favorites.",
          });
        }
      } catch (err) {
        console.error("Add to favorites failed:", err);
        toast({
          variant: "destructive",
          title: "Error adding favorite",
          description:
            "Couldn't add this course to favorites. Please try again.",
        });
      }
    },
    [favorites]
  );

  const removeFromFavorites = useCallback(async (courseId: string) => {
    try {
      const removed = await removefromFavorites(courseId);
      if (removed) {
        setFavorites((prev) => prev.filter((id) => id !== courseId));
        toast({
          title: "Removed from favorites",
          description: "The course has been removed from your favorites.",
        });
      }
    } catch (err) {
      console.error("Remove from favorites failed:", err);
      toast({
        variant: "destructive",
        title: "Error removing favorite",
        description:
          "Couldn't remove this course from favorites. Please try again.",
      });
    }
  }, []);

  const toggleFavorite = useCallback(
    (courseId: string) => {
      if (favorites.includes(courseId)) {
        removeFromFavorites(courseId);
      } else {
        addToFavorites(courseId);
      }
    },
    [favorites, addToFavorites, removeFromFavorites]
  );

  return {
    cart,
    favorites,
    loadingFavorites,
    error,
    cartCount,
    favoritesCount,
    addToCart,
    removeFromCart,
    clearCart,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
  };
}
