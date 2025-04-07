"use client";

import { useState, useEffect, useCallback } from "react";
import {
  addTofavorites,
  fetchfavorites,
  removefromFavorites,
} from "@/functions/custom";
import { toast } from "./use-toast";

export function useCartAndFavorites() {
  const [cart, setCart] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // -----------------------------
  // Load Cart from localStorage
  // -----------------------------
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (err) {
      console.log("Cart Load Error:", err);
      toast({
        variant: "destructive",
        title: "Error loading cart",
        description: "Your cart data couldn't be loaded.",
      });
    }
  }, []);

  const updateCartStorage = useCallback((newCart: string[]) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
  }, []);

  const addToCart = useCallback(
    (courseId: string) => {
      setCart((prevCart) => {
        if (prevCart.includes(courseId)) {
          toast({
            title: "Already in cart",
            description: "This course is already in your cart.",
          });
          return prevCart;
        }
        const updatedCart = [...prevCart, courseId];
        updateCartStorage(updatedCart);
        toast({
          title: "Added to cart",
          description: "The course has been added to your cart.",
        });
        return updatedCart;
      });
    },
    [updateCartStorage]
  );

  const removeFromCart = useCallback(
    (courseId: string) => {
      setCart((prevCart) => {
        const updatedCart = prevCart.filter((id) => id !== courseId);
        updateCartStorage(updatedCart);
        toast({
          title: "Removed from cart",
          description: "The course has been removed from your cart.",
        });
        return updatedCart;
      });
    },
    [updateCartStorage]
  );

  // -----------------------------
  // Initial Auth + Favorites Check
  // -----------------------------
  useEffect(() => {
    async function initializeFavorites() {
      try {
        const courseIds = await fetchfavorites();
        setFavorites(courseIds);
      } catch (err) {
        console.log("Failed to fetch favorites:", err);
        toast({
          variant: "destructive",
          title: "Error loading favorites",
          description: "Couldn't load your favorite courses. Please try again.",
        });
        setError("Failed to load favorites");
      } finally {
        setLoadingFavorites(false);
      }
    }

    initializeFavorites();
  }, []);
  // -----------------------------
  // Add to Favorites
  // -----------------------------
  const addToFavorites = useCallback(
    async (courseId: string) => {
      try {
        if (favorites.includes(courseId)) {
          toast({
            title: "Already favorited",
            description: "This course is already in your favorites.",
          });
          return;
        }
        const added = await addTofavorites(courseId);
        if (added) {
          setFavorites((prev) => [...prev, courseId]);
          toast({
            title: "Added to favorites",
            description: "The course has been added to your favorites.",
          });
        }
      } catch (err) {
        console.log("Add to favorites failed:", err);
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

  // -----------------------------
  // Remove from Favorites
  // -----------------------------
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
      console.log("Remove from favorites failed:", err);
      toast({
        variant: "destructive",
        title: "Error removing favorite",
        description:
          "Couldn't remove this course from favorites. Please try again.",
      });
    }
  }, []);

  // -----------------------------
  // Toggle Favorites Handler
  // -----------------------------
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
  // -----------------------------
  // Hook Return
  // -----------------------------
  return {
    cart,
    addToCart,
    removeFromCart,
    favorites,
    loadingFavorites,
    error,
    removeFromFavorites,
    toggleFavorite,
  };
}
